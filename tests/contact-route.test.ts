import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { POST } from "@/app/api/contact/route";
import { makeBrief } from "./fixtures";

let ipCounter = 0;
const post = (body: unknown) =>
  POST(
    new NextRequest("http://localhost/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // A fresh IP per request keeps the in-memory rate limiter out of the way.
        "x-forwarded-for": `10.0.0.${++ipCounter}`,
      },
      body: JSON.stringify(body),
    }),
  );

describe("POST /api/contact → ntfy", () => {
  let fetchMock: ReturnType<typeof vi.fn>;
  let errorSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    vi.stubEnv("NTFY_SERVER_URL", "https://ntfy.example.com/");
    vi.stubEnv("NTFY_TOPIC", "cwt-leads-test");
    vi.stubEnv("NTFY_TOKEN", "tk_secret");
    vi.stubEnv("NTFY_EMAIL", "");
    vi.stubEnv("RECAPTCHA_SECRET", "");
    vi.stubEnv("ZOHO_WEBHOOK_URL", "");
    vi.stubEnv("WHATSAPP_WEBHOOK_URL", "");
    fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("publishes JSON to ntfy and returns the reference on success", async () => {
    fetchMock.mockResolvedValue(new Response('{"id":"abc"}', { status: 200 }));

    const res = await post({ brief: makeBrief({ message: "बजट ₹5L" }) });
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data).toEqual({ ok: true, reference: expect.stringMatching(/^CWT-\d{6}-\d{4}$/) });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0]!;
    expect(url).toBe("https://ntfy.example.com/");
    expect(init.method).toBe("POST");
    expect(init.headers).toEqual({
      "Content-Type": "application/json",
      Authorization: "Bearer tk_secret",
    });
    expect(init.signal).toBeInstanceOf(AbortSignal);
    const payload = JSON.parse(init.body);
    expect(payload.topic).toBe("cwt-leads-test");
    expect(payload.title).toBe(`New brief ${data.reference} · Asha Rao`);
    expect(payload.message).toContain("> बजट ₹5L");
    expect(payload).not.toHaveProperty("email");
    expect(errorSpy).not.toHaveBeenCalled();
  });

  it("returns 502 and logs the full brief when ntfy answers non-2xx", async () => {
    fetchMock.mockResolvedValue(new Response("forbidden", { status: 403 }));

    const res = await post({ brief: makeBrief({ name: "Lead Keeper" }) });

    expect(res.status).toBe(502);
    expect(await res.json()).toEqual({ ok: false, error: "Could not deliver the brief." });
    expect(errorSpy).toHaveBeenCalledTimes(1);
    const logged = errorSpy.mock.calls[0]!;
    expect(String(logged[0])).toMatch(/CWT-\d{6}-\d{4}/);
    expect(String(logged[1])).toContain("Lead Keeper");
    expect(String(logged[1])).toContain("asha@example.in");
    expect(logged[2]).toMatchObject({ name: "NtfyError", kind: "http", status: 403 });
  });

  it("aborts after 5 seconds and returns 502 when ntfy hangs", async () => {
    // Only fake setTimeout (used for the ntfy timeout); real setImmediate flushes I/O below.
    vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout"] });
    fetchMock.mockImplementation(
      (_url: string, init: RequestInit) =>
        new Promise((_resolve, reject) => {
          init.signal?.addEventListener("abort", () =>
            reject(new DOMException("This operation was aborted", "AbortError")),
          );
        }),
    );

    const pending = post({ brief: makeBrief() });
    for (let i = 0; i < 100 && fetchMock.mock.calls.length === 0; i++) {
      await new Promise((r) => setImmediate(r));
    }
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const signal = (fetchMock.mock.calls[0]![1] as RequestInit).signal!;

    await vi.advanceTimersByTimeAsync(4999);
    expect(signal.aborted).toBe(false);
    await vi.advanceTimersByTimeAsync(1);
    expect(signal.aborted).toBe(true);

    const res = await pending;
    expect(res.status).toBe(502);
    expect(errorSpy.mock.calls[0]![2]).toMatchObject({ name: "NtfyError", kind: "timeout" });
  });

  it("adds the email key when NTFY_EMAIL is set", async () => {
    vi.stubEnv("NTFY_EMAIL", "leads@codewavetech.in");
    fetchMock.mockResolvedValue(new Response("{}", { status: 200 }));

    const res = await post({ brief: makeBrief() });

    expect(res.status).toBe(200);
    expect(JSON.parse(fetchMock.mock.calls[0]![1].body).email).toBe("leads@codewavetech.in");
  });

  it("keeps validation in front of ntfy", async () => {
    const res = await post({ brief: makeBrief({ phone: "12345" }) });
    expect(res.status).toBe(422);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});

import { describe, expect, it } from "vitest";
import {
  MAX_MESSAGE_BYTES,
  buildBriefNotification,
  buildMessage,
  byteLength,
  escapeMarkdown,
} from "@/lib/ntfy-message";
import { REF, makeBrief } from "./fixtures";

const config = { topic: "cwt-leads-test" };

describe("buildMessage", () => {
  it("renders every answer in the documented order and format", () => {
    const msg = buildMessage(
      makeBrief({ company: "Rao Bakers", link: "https://raobakers.in", message: "Two outlets." }),
      REF,
    );
    expect(msg.split("  \n")).toEqual([
      `**Reference:** ${REF}`,
      "**Name:** Asha Rao · Rao Bakers",
      "**Email:** asha@example.in",
      "**Mobile:** +91 98765 43210",
      "**Contact via:** WhatsApp · Evening (4 – 7 pm)",
      "**Services:** Web Development, AI & Automation",
      "**Stage:** Planned",
      "**Budget:** ₹2L – 5L",
      "**Launch:** 1–3 months",
      "**Existing link:** https://raobakers.in",
      "**Project:**",
      "> Two outlets.",
    ]);
  });

  it("omits company, link and project when they are empty", () => {
    const msg = buildMessage(makeBrief(), REF);
    expect(msg).toContain("**Name:** Asha Rao  \n");
    expect(msg).not.toContain(" · Rao");
    expect(msg).not.toContain("Existing link");
    expect(msg).not.toContain("Project");
    expect(msg.endsWith("**Launch:** 1–3 months")).toBe(true);
  });

  it("escapes markdown in user input", () => {
    const msg = buildMessage(
      makeBrief({
        name: "*Asha* _Rao_",
        company: "[Click](https://evil.example) <b>",
        message: "# Heading\n- item\n1. first\n`code` | ~strike~",
      }),
      REF,
    );
    expect(msg).toContain(
      "**Name:** \\*Asha\\* \\_Rao\\_ · \\[Click\\](https://evil.example) \\<b\\>",
    );
    expect(msg).toContain(
      "> \\# Heading  \n> \\- item  \n> 1\\. first  \n> \\`code\\` \\| \\~strike\\~",
    );
    // Trusted labels are not escaped
    expect(msg).toContain("**Reference:**");
  });

  it("keeps multi-byte text (₹, Hindi) intact", () => {
    const msg = buildMessage(makeBrief({ name: "आशा राव", message: "बजट ₹5L" }), REF);
    expect(msg).toContain("**Name:** आशा राव");
    expect(msg).toContain("> बजट ₹5L");
  });

  it("truncates a long description to stay under the byte limit", () => {
    // Hindi characters are 3 bytes each in UTF-8, so this is ~6,000 bytes.
    const long = "नमस्ते ".repeat(300);
    const msg = buildMessage(makeBrief({ message: long }), REF);
    expect(byteLength(msg)).toBeLessThan(MAX_MESSAGE_BYTES);
    expect(msg.endsWith("… (truncated)")).toBe(true);
    expect(msg).toContain("**Project:**  \n> नमस्ते");
    // As much of the description as possible is kept
    expect(byteLength(msg)).toBeGreaterThan(MAX_MESSAGE_BYTES - 50);
  });

  it("does not truncate a description that fits", () => {
    const msg = buildMessage(makeBrief({ message: "a".repeat(1000) }), REF);
    expect(msg).not.toContain("truncated");
    expect(msg.endsWith("a".repeat(50))).toBe(true);
  });
});

describe("buildBriefNotification", () => {
  it("builds the JSON publish payload", () => {
    const p = buildBriefNotification(makeBrief(), REF, config);
    expect(p).toEqual({
      topic: "cwt-leads-test",
      title: `New brief ${REF} · Asha Rao`,
      message: expect.stringContaining(`**Reference:** ${REF}`),
      markdown: true,
      priority: 4,
      tags: ["briefcase"],
      click: "mailto:asha@example.in",
      actions: [
        { action: "view", label: "WhatsApp", url: "https://wa.me/919876543210", clear: false },
        { action: "view", label: "Call", url: "tel:+919876543210" },
        {
          action: "view",
          label: "Email",
          url: `mailto:asha@example.in?subject=${encodeURIComponent(`Re: your project brief ${REF}`)}`,
        },
      ],
    });
  });

  it("raises priority and adds a tag for government briefs", () => {
    const p = buildBriefNotification(makeBrief({ services: ["web", "gov"] }), REF, config);
    expect(p.priority).toBe(5);
    expect(p.tags).toEqual(["briefcase", "classical_building"]);
    expect(p.message).toContain("**Services:** Web Development, Government portal");
  });

  it("includes the email key only when NTFY_EMAIL is configured", () => {
    const without = buildBriefNotification(makeBrief(), REF, config);
    expect("email" in without).toBe(false);
    expect(JSON.stringify(without)).not.toContain('"email"');

    const withEmail = buildBriefNotification(makeBrief(), REF, {
      ...config,
      email: "leads@codewavetech.in",
    });
    expect(withEmail.email).toBe("leads@codewavetech.in");
  });
});

describe("escapeMarkdown", () => {
  it("leaves plain text untouched", () => {
    expect(escapeMarkdown("Asha Rao, Pune 411001")).toBe("Asha Rao, Pune 411001");
  });
});

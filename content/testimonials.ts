/**
 * PLACEHOLDER testimonials, verbatim from the reference `Q` array.
 * Replace each with a real, approved client quote, then set `sample: false`
 * so the dashed "Sample" tag disappears.
 */

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  sample: boolean;
}

export const sampleTag = "Sample, replace with a real quote";

export const testimonials: Testimonial[] = [
  {
    name: "Restaurant owner",
    role: "3-outlet chain, Pune",
    quote:
      "Our KOT and billing now run on one system, and month-end GST filing takes an hour instead of a day.",
    sample: true,
  },
  {
    name: "Retail founder",
    role: "D2C brand",
    quote:
      "They moved us from a slow WordPress store to a fast custom site with Razorpay and Shiprocket built in.",
    sample: true,
  },
  {
    name: "Department official",
    role: "Municipal corporation",
    quote:
      "The citizen portal went live bilingual and GIGW compliant, and complaints are now tracked end to end.",
    sample: true,
  },
  {
    name: "Clinic director",
    role: "Multi-speciality clinic",
    quote:
      "Appointments, billing and patient records finally live in one place our staff actually enjoy using.",
    sample: true,
  },
];

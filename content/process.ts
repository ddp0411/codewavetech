/** Process steps (reference `P`) and engagement models, verbatim. */

export interface ProcessStep {
  title: string;
  sub: string;
  description: string;
  deliverables: string[];
  duration: string;
}

export const processSteps: ProcessStep[] = [
  {
    title: "Discovery call",
    sub: "Goals, users and budget",
    description:
      "A 30-minute call to understand your business, who will use the software and what success looks like.",
    deliverables: ["Requirements summary", "Recommended approach", "Budget range"],
    duration: "Day 1",
  },
  {
    title: "Plan & design",
    sub: "Scope, wireframes, estimate",
    description:
      "We write the scope, design key screens in Figma and send a fixed, itemised estimate with milestones.",
    deliverables: ["Scope document", "Clickable Figma prototype", "Fixed quote and timeline"],
    duration: "1–2 weeks",
  },
  {
    title: "Build & test",
    sub: "Sprints with weekly demos",
    description:
      "Development in short sprints. You see working software every week and give feedback before the next sprint.",
    deliverables: ["Weekly demo link", "Manual and automated QA", "Security and speed checks"],
    duration: "2–12 weeks",
  },
  {
    title: "Launch & support",
    sub: "Go-live, AMC, monitoring",
    description:
      "We deploy, publish to stores where needed, train your team and keep everything updated under an AMC.",
    deliverables: ["Deployment and SSL", "Staff training", "Ongoing maintenance"],
    duration: "Ongoing",
  },
];

export interface EngagementModel {
  eyebrow: string;
  title: string;
  description: string;
  points: string[];
  highlight?: boolean;
}

export const engagementModels: EngagementModel[] = [
  {
    eyebrow: "Best for new builds",
    title: "Fixed-scope project",
    description: "One price for a clearly defined product, paid in milestones.",
    points: [
      "Written scope and quote",
      "Milestone-based payments",
      "3 months free support after launch",
    ],
  },
  {
    eyebrow: "Best for growing teams",
    title: "Dedicated developers",
    description: "Our developers work as part of your team, hourly or monthly.",
    points: ["Pick the skills you need", "Daily updates, your tools", "Scale up or down monthly"],
    highlight: true,
  },
  {
    eyebrow: "Best after launch",
    title: "Annual maintenance (AMC)",
    description: "We keep your website, app or software secure and up to date.",
    points: [
      "Updates, backups, monitoring",
      "Bug fixes and small changes",
      "24/7 technical support",
    ],
  },
];

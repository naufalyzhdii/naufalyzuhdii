// Content source: portfolio-summary.md. TODO items need the owner's confirmation before publishing.
// TODO: replace every picsum placeholder image with real photos / approved project screenshots.
const img = (seed: string, w: number, h: number) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const site = {
  name: "Naufaly Zuhdi Indriandi",
  short: "Naufaly Zuhdi",
  location: "Tangerang, Indonesia",
  email: "naufaly.zuhdii@gmail.com",
  socials: [
    {
      label: "LinkedIn",
      icon: "linkedin",
      href: "https://www.linkedin.com/in/naufalyzuhdii/",
    }, // TODO: confirmed public LinkedIn URL
    {
      label: "Instagram",
      icon: "instagram",
      href: "https://www.instagram.com/naufalyzhdii/",
    }, // TODO: confirmed Instagram URL
  ],
};
export const nav = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];
export const hero = {
  image: "/hero.png", // TODO: professional portrait
  eyebrow: "Solutions Engineer / Technical Consultant",
  heading: "Turning Complex Business Needs into Systems That Work.",
  description:
    "Solutions Engineer & Technical Consultant helping businesses design, build, and automate practical software and AI systems.",
};
export const profile = {
  heading: "Bridging messy business needs and systems that actually work.",
  intro:
    "I'm a Solutions Engineer, Technical Consultant and Founder at Neightive. I build custom software and AI tools for businesses that still rely on manual processes, from early discovery to production.",
  approach:
    "I turn business problems into system designs through feasibility checks, requirements gathering and a quick proof of concept before the full build. I integrate LLMs such as ChatGPT, Claude and Gemini into real workflows, including automated pipelines and data processing.",
  perspective:
    "The goal is to solve operational problems, reduce manual work and deliver results that can be evaluated. I build with PHP/Laravel, Next.js, React.js, Node.js, NestJS, TypeScript, PostgreSQL, Redis and BullMQ.",
  capabilities: [
    "Solution architecture & consulting",
    "Custom software development",
    "AI integration & automation",
    "Data processing pipelines",
    "Requirements & feasibility",
  ],
};
export type Project = {
  title: string;
  category: string;
  year?: string;
  summary: string;
  image: string;
  imageAlt: string;
  href: string;
  ratio: string;
  span: number;
  pos?: string;
};
// TODO: href -> case study pages / live URLs once confirmed; add periods and personal role per project.
export const projects: Project[] = [
  {
    title: "AI-Driven Brand Visibility & Sentiment Audit Platform",
    category: "Eightlab, Australia",
    summary:
      "Developing an AI brand audit platform that combines web crawling, multi-LLM orchestration, dynamic scoring, automated PDF reports and Stripe payments.",
    image: "/projects/eightlab.png",
    imageAlt: "Placeholder image for the brand audit platform",
    href: "#contact",
    ratio: "16 / 9",
    span: 7,
  },
  {
    title: "Consular Public Service Platform & Application Engine",
    category: "Embassy of the Republic of Indonesia, Islamabad",
    summary:
      "Building a consular public service platform with a modular workflow, high-concurrency document upload handling, and a focus on government service reliability.",
    image: "/projects/kbri.png",
    imageAlt: "Placeholder image for the consular public service platform",
    href: "#contact",
    ratio: "4 / 5",
    span: 5,
  },
  {
    title: "Dekalegal Corporate Law Firm",
    category: "Corporate Legal Services & Advisory, Indonesia",
    summary:
      "A premier corporate law firm delivering comprehensive legal solutions, regulatory compliance advisory, and strategic cross-border transactional support.",
    image: "/projects/dekalegal.png",
    imageAlt: "Dekalegal corporate law firm company profile",
    href: "#contact",
    ratio: "4 / 5",
    span: 5,
  },
  {
    title: "Djemat Odang Law Firm",
    category: "Litigation, Dispute Resolution & Legal Counsel, Indonesia",
    summary:
      "An established law firm offering expert legal representation, meticulous contract negotiations, and dispute resolution services for commercial enterprises.",
    image: "/projects/dolf.png",
    imageAlt: "Djemat Odang Law Firm company profile",
    href: "#contact",
    ratio: "16 / 9",
    span: 7,
  },
];
export const cinema = {
  image: "/founder.png",
  eyebrow: "Founder",
  title: "Neightive",
  caption:
    "Custom software and AI tools for businesses that still rely on manual processes",
};
export const services = [
  {
    title: "Solution Architecture & Technical Consulting",
    description:
      "Feasibility assessment, requirements gathering, system design and proof of concept before the full build.",
  },
  {
    title: "Custom Software Development",
    description:
      "Applications and backends built with Laravel, Next.js, React.js, Node.js, NestJS and TypeScript.",
  },
  {
    title: "AI Integration & Workflow Automation",
    description:
      "LLM integration (OpenAI, Anthropic, Gemini) into real workflows, with automated pipelines and web crawling.",
  },
  {
    title: "Data Engineering & Analytics",
    description:
      "Data ingestion, processing pipelines and reporting automation backed by PostgreSQL, Redis and BullMQ.",
  },
];
// "How I work" steps (rendered with the Recognition row layout)
export const recognition = [
  {
    title: "Discover the problem",
    organization: "Understand the operational challenge and who it affects.",
    year: "01",
  },
  {
    title: "Define requirements & feasibility",
    organization: "Gather requirements and assess what is practical to build.",
    year: "02",
  },
  {
    title: "Prototype and validate",
    organization: "Test the idea with a quick proof of concept.",
    year: "03",
  },
  {
    title: "Build and integrate",
    organization: "Develop the system and connect it to existing workflows.",
    year: "04",
  },
  {
    title: "Measure, improve, and support",
    organization: "Evaluate results and keep refining the system.",
    year: "05",
  },
];
export type Client = { name: string; logo: string };
// TODO: confirm relationship and logo permission for each name before publishing.
export const clients: Client[] = [
  { name: "Government of Indonesia", logo: "/logos/kbri-pakistan.png" },
  { name: "IBM", logo: "/logos/ibm.png" },
  { name: "ATM", logo: "/logos/atm.png" },
  { name: "Eightlab", logo: "/logos/eightlab.png" },
  { name: "Deka Legal", logo: "/logos/deka-legal.png" },
  { name: "D&O", logo: "/logos/dop.png" },
];

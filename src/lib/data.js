export const profile = {
  name: "Abdul Haq",
  role: "Full-Stack Developer",
  roleLong: "Full-Stack Developer · Freelancer · MERN",
  tagline:
    "Building practical web applications and backend systems with JavaScript, React, Node.js and MongoDB.",
  github: "https://github.com/TheHaqHub",
  githubUser: "TheHaqHub",
  email: "abdulhaq.swe@gmail.com",
  availability: "Open to freelance & full-time work",
};

export const principles = [
  {
    id: "rest",
    label: "API Design",
    text: "RESTful endpoints structured around resources, not routes — predictable, versioned, and validated at the boundary before anything touches a database.",
  },
  {
    id: "auth",
    label: "Auth & Security",
    text: "JWT-based sessions, bcrypt-hashed credentials, and authorization checked server-side on every mutation — never trusting the client's word for who's allowed to do what.",
  },
  {
    id: "data",
    label: "Data Modeling",
    text: "Schemas designed for the queries they'll actually serve, whether that's MongoDB/Mongoose for flexible documents or SQL for relational integrity.",
  },
  {
    id: "git",
    label: "Git Workflow",
    text: "Feature branches, focused pull requests, and merge conflicts treated as a normal part of collaborating — not something to avoid by working alone.",
  },
  {
    id: "arch",
    label: "Architecture",
    text: "MVC on the backend, component-driven UI on the frontend — code organized so the next person (often future me) can find what they're looking for.",
  },
];

export const quotes = [
  { text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.", author: "Martin Fowler" },
  { text: "Premature optimization is the root of all evil.", author: "Donald Knuth" },
  { text: "Talk is cheap. Show me the code.", author: "Linus Torvalds" },
  { text: "The best error message is the one that never shows up.", author: "Thomas Fuchs" },
  { text: "Simplicity is prerequisite for reliability.", author: "Edsger W. Dijkstra" },
  { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
  { text: "Programs must be written for people to read, and only incidentally for machines to execute.", author: "Harold Abelson" },
  { text: "Make it work, make it right, make it fast.", author: "Kent Beck" },
  { text: "The only way to go fast is to go well.", author: "Robert C. Martin" },
  { text: "Debugging is twice as hard as writing the code in the first place.", author: "Brian Kernighan" },
  { text: "Code is like humor. When you have to explain it, it's bad.", author: "Cory House" },
  { text: "A good API is not just easy to use but also hard to misuse.", author: "Josh Bloch" },
];

export const skillCategories = [
  {
    id: "frontend",
    label: "Frontend",
    blurb: "Where most of my hands-on production work has happened — building interfaces that hold up on a live product, not just in a sandbox.",
    core: true,
    items: ["JavaScript", "React", "Vite", "Tailwind CSS", "HTML", "CSS"],
  },
  {
    id: "backend",
    label: "Backend",
    blurb: "REST APIs, authentication, and authorization — the layer I'm actively pushing deeper into.",
    core: true,
    items: ["Node.js", "Express.js", "REST APIs", "JWT", "Authentication", "Authorization", "bcrypt", "Multer"],
  },
  {
    id: "database",
    label: "Database",
    blurb: "Schema design and querying across both document and relational stores.",
    core: true,
    items: ["MongoDB", "Mongoose", "MySQL", "SQL", "SQLite / sql.js"],
  },
  {
    id: "languages",
    label: "Languages",
    blurb: "JavaScript is home base; the rest get used where the problem calls for them.",
    core: false,
    items: ["JavaScript", "Java", "Python", "SQL", "PHP"],
  },
  {
    id: "tools",
    label: "Tools",
    blurb: "Daily-driver tooling for writing, testing, and shipping code.",
    core: true,
    items: ["Git", "GitHub", "VS Code", "Postman"],
  },
  {
    id: "deployment",
    label: "Deployment & Services",
    blurb: "Where projects actually end up running once they leave localhost.",
    core: false,
    items: ["Vercel", "Railway", "Cloudinary", "Pantheon", "Hostinger", "GoDaddy"],
  },
  {
    id: "cms",
    label: "CMS / Freelance",
    blurb: "The stack behind client-facing store and business sites.",
    core: false,
    items: ["WordPress", "WooCommerce"],
  },
];

export const projects = [
  {
    id: "optimusblog",
    name: "OptimusBlog",
    period: "Internship · 1 of 3",
    description:
      "A full-stack MERN blogging platform with JWT authentication, rich-text editing, image uploads, and one-level comment threading — built and deployed end to end from a custom dark design system, not a template.",
    features: [
      "JWT auth with server-side authorization on every mutation, not just hidden UI buttons",
      "Rich text editing via Tiptap with inline images, sanitized with DOMPurify before render",
      "Cover + inline images streamed directly to Cloudinary (no local disk dependency)",
      "One-level nested comments enforced at the controller layer",
      "Author-only edit/delete, paginated + searchable home feed, draft visibility via optionalAuth middleware",
    ],
    stack: ["React", "Vite", "Tailwind CSS", "Tiptap", "DOMPurify", "Node.js", "Express", "MongoDB", "JWT", "bcrypt", "Multer", "Cloudinary"],
    github: "https://github.com/TheHaqHub/OptimusAutomate_OptimusBlog",
    live: "https://optimus-automate-optimus-blog.vercel.app",
    featured: true,
  },
  {
    id: "optimuspm",
    name: "OptimusPM",
    period: "Internship · Jun 2026",
    description:
      "A full-stack Kanban-style project management app inspired by Trello — boards, lists, and drag-and-drop task cards on a RESTful MERN backend, with optimistic UI updates and MVC-structured API design.",
    features: [
      "Drag-and-drop cards between and within lists via @dnd-kit, persisted to MongoDB",
      "JWT auth with protected routes and persistent sessions",
      "Priority levels and due dates, with overdue dates flagged automatically",
      "Comments and multi-member boards with avatar/initials display",
      "MVC backend: routes → controllers → Mongoose models, with express-validator + helmet",
    ],
    stack: ["React 18", "Vite", "Tailwind CSS v4", "Zustand", "@dnd-kit", "Axios", "Node.js", "Express", "MongoDB", "Mongoose", "JWT"],
    github: "https://github.com/TheHaqHub/OptimusAutomate_OptimusPM",
    live: "https://optimus-automate-optimus-pm.vercel.app",
    featured: true,
  },
  {
    id: "realtimechat",
    name: "Real-Time Chat",
    period: "Full-Stack Project",
    description:
      "A real-time messaging application built on Socket.io over an Express/MongoDB backend, with a React + Zustand frontend and JWT-based auth for persistent, authenticated sessions.",
    features: [
      "Real-time bidirectional messaging with Socket.io + socket.io-client",
      "JWT authentication with bcrypt password hashing and express-validator input checks",
      "Global state handled with Zustand rather than prop-drilling or Context",
      "Hardened Express backend: helmet, morgan logging, async error handling",
    ],
    stack: ["React 19", "Vite", "Tailwind CSS v4", "Zustand", "Socket.io-client", "Node.js", "Express", "Socket.io", "MongoDB", "Mongoose", "JWT"],
    github: "https://github.com/TheHaqHub/OptimusAutomate_RealTimeChat",
    live: "https://optimus-automate-real-time-chat.vercel.app",
    featured: true,
  },
];

export const experience = [
  {
    id: "agenzo",
    org: "Agenzo",
    role: "Full-Stack / Software Development Intern",
    summary:
      "Built and shipped real frontend features on a production React + Vite admin dashboard, integrated against live backend endpoints, and worked inside an active Git/GitHub team workflow.",
    points: [
      "Developed dashboard modules: Products, Sales, Suppliers, Reports, Users/Roles, Settings, and routing",
      "Integrated frontend views against real backend API endpoints, including supplier and inventory functionality",
      "Worked in feature branches (e.g. feature/SCRUM-1544-real-suppliers, feature/SCRUM-1543-real-inventory), opening pull requests and resolving merge conflicts as part of a collaborative development branch workflow",
    ],
    tags: ["React", "Vite", "REST APIs", "Git/GitHub", "Team Collaboration"],
  },
  {
    id: "decodelabs",
    org: "DecodeLabs",
    role: "Full-Stack Internship — Batch 2026",
    summary: "Full-stack internship track focused on end-to-end web application development.",
    points: [],
    tags: ["Full-Stack Development"],
  },
  {
    id: "optimusautomate",
    org: "Optimus Automate",
    role: "Full-Stack Development Internship",
    summary:
      "A three-project full-stack track: OptimusBlog, OptimusPM, and a real-time chat application — each built solo, deployed independently, and shipped as a separate repository.",
    points: [
      "OptimusBlog — MERN blogging platform with auth, rich text, and image uploads",
      "OptimusPM — Kanban-style project management app with drag-and-drop",
      "Real-Time Chat — Socket.io messaging app with JWT auth",
    ],
    tags: ["MERN", "REST APIs", "JWT", "Deployment"],
  },
  {
    id: "freelance",
    org: "Freelance",
    role: "Client Website Development",
    summary:
      "Independent web development for local businesses, spanning custom-built sites and WordPress/WooCommerce store work.",
    points: [
      "Bawaqar Store — WordPress/WooCommerce store with a WhatsApp cart/checkout workflow, bank transfer, and shipping configuration",
      "Pamir Afghan Restaurant — website development and project work",
      "Best Ways Pest Control — website migration and project work",
      "The Royal Mughlai Catering — custom digital banquet menu site with tab-based category navigation and a light/dark theme toggle",
    ],
    tags: ["WordPress", "WooCommerce", "Client Work"],
  },
];

export const freelance = {
  intro: "I build software for both learning and real-world clients.",
  points: [
    "WordPress & WooCommerce store builds and customization",
    "Full custom-built business websites, from design to deployment",
    "Website migrations between hosts and platforms",
    "Client-specific functionality — WhatsApp checkout flows, shipping configuration, theme toggles",
    "Ongoing troubleshooting and support after launch",
  ],
};

export const contact = {
  heading: "Have an idea worth building?",
  sub: "Let's turn it into something real.",
};

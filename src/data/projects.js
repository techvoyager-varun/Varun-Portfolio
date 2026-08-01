export const projects = [
  {
    id: 'code-collab',
    name: 'CodeCollab',
    role: 'Full Stack Developer',
    start: '2024',
    end: '2025',
    type: 'Personal',
    stack: ['Monaco Editor', 'Socket.IO', 'Next.js', 'Gemini API', 'pgvector', 'Redis', 'Playwright'],
    description:
      'AI-powered real-time collaborative code editor with room-based live editing, user presence tracking, and persistent workspace state.',
    outcomes: [
      'Built a real-time collaborative code editor using Socket.IO and Next.js for room-based live editing, user presence tracking, and persistent workspace state, with a Monaco-based workspace supporting whiteboard drawing, in-browser terminals, and WebRTC voice/screen sharing.',
      'Integrated an AI coding assistant using the Gemini API, PostgreSQL, and pgvector embeddings to deliver grounded code complexity analysis, compiler error explanations, and Mermaid.js flowcharts, with Redis caching and CI automation via Vitest unit tests and Playwright E2E coverage.',
    ],
    link: 'https://code-collab-ivory-five.vercel.app',
    github: 'https://github.com/techvoyager-varun/CodeCollab',
  },
  {
    id: 'enrich-diamonds',
    name: 'Enrich Diamonds',
    role: 'Frontend Developer',
    start: '2024',
    end: '2025',
    type: 'Freelance',
    stack: ['React', 'CSS', 'Responsive Design'],
    description:
      'Worked on a freelance client project with my senior, building a professional diamond industry website with a polished, responsive UI.',
    outcomes: [
      'Delivered a production-ready client website for the diamond industry with a premium look and feel.',
      'Collaborated closely with a senior developer to meet client requirements and tight deadlines.',
    ],
    link: 'https://www.enrichdiamonds.com/',
  },
  {
    id: 'shopverse',
    name: 'ShopVerse',
    role: 'Full Stack Developer',
    start: '2023',
    end: '2024',
    type: 'Personal',
    stack: ['MERN Stack', 'JWT', 'MongoDB', 'Express.js', 'React.js'],
    description:
      'Full-stack e-commerce platform using the MERN stack, supporting user authentication, product catalog browsing, cart management, and end-to-end order workflow.',
    outcomes: [
      'Developed a full-stack e-commerce platform using the MERN stack, supporting user authentication, product catalog browsing, cart management, and end-to-end order workflow.',
      'Implemented secure JWT-based authentication with protected routes and role-based access control for customer and admin user types.',
      'Built product filtering, a responsive UI, and MongoDB-backed inventory management to support real-time stock updates.',
    ],
    link: 'https://ecommerce-nu-ten-69.vercel.app',
    github: 'https://github.com/techvoyager-varun/Ecommerce',
  },
  {
    id: 'golf-charity',
    name: 'Golf Charity Subscription Platform',
    role: 'Full Stack Developer',
    start: '2023',
    end: '2024',
    type: 'Personal',
    stack: ['MERN', 'JWT', 'Stripe'],
    description:
      'Built a MERN-based subscription platform for golf tracking, prize draws, and charitable contributions. Developed role-based dashboards (Subscribers, Admins, Visitors) with JWT-based access control.',
    outcomes: [
      'Designed a draw engine supporting random and score-weighted prize selection with automated 40/35/25 distribution and jackpot rollover.',
      'Integrated Stripe for subscriptions (plans, webhooks, renewals) and implemented winner verification with admin approval.',
    ],
    link: 'https://golf-charity-omega.vercel.app/',
    github: 'https://github.com/techvoyager-varun/Golf-Charity',
  },
  {
    id: 'plinth-lnmiit',
    name: 'Plinth LNMIIT',
    role: 'Frontend Developer',
    start: '2024',
    end: '2025',
    type: 'College',
    stack: ['React', 'CSS', 'Responsive Design'],
    description:
      "Contributed to frontend development and responsiveness for LNMIIT's official college fest website, Plinth.",
    outcomes: [
      'Improved mobile responsiveness and cross-browser compatibility for the fest website.',
      'Collaborated with a team to deliver a polished, event-ready website for the college fest.',
    ],
    link: 'https://plinth.lnmiit.ac.in/',
  }
];

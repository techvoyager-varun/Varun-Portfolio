export const projects = [
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
    link: 'https://github.com/techvoyager-varun/Golf-Charity',
  },
  {
    id: 'ecommerce',
    name: 'E-Commerce Website',
    role: 'Full Stack Developer',
    start: '2023',
    end: '2024',
    type: 'Personal',
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT'],
    description:
      'Developed a full-stack e-commerce web application with user authentication, product listings, cart management, and order workflow.',
    outcomes: [
      'Implemented secure JWT-based authentication, protected routes, and role-based access for users and admins.',
      'Integrated features such as product filtering, responsive UI, and MongoDB-based inventory management.',
    ],
    link: 'https://github.com/techvoyager-varun/Ecommerce',
  }
];

export const openSourceContributions = [
  {
    organization: 'TEAMMATES',
    repo: 'TEAMMATES/teammates',
    repoUrl: 'https://github.com/TEAMMATES/teammates',
    description: 'An open-source peer evaluation system used by thousands of students and faculty worldwide.',
    prs: [
      {
        prNumber: 13849,
        title: '[#13850] Optimize GetNotificationsAction with DB-level unread filtering',
        description: 'Optimized notification query performance by implementing DB-level unread filtering rather than in-memory filtering.',
        url: 'https://github.com/TEAMMATES/teammates/pull/13849',
        tags: ['Java', 'PostgreSQL', 'Performance', 'Backend']
      },
      {
        prNumber: 13864,
        title: '[#13853] Migrate midnight adjustment logic to frontend',
        description: 'Migrated timezone-sensitive midnight calculation logic to the frontend to ensure accurate local date/time adjustments.',
        url: 'https://github.com/TEAMMATES/teammates/pull/13864',
        tags: ['TypeScript', 'Angular', 'Frontend', 'Timezone']
      }
    ]
  },
  {
    organization: 'Activist',
    repo: 'activist-org/activist',
    repoUrl: 'https://github.com/activist-org/activist',
    description: 'Open-source platform empowering civic action and community organization.',
    prs: [
      {
        prNumber: 2128,
        title: 'fix: correct bugs, typos, and misconfigurations across backend and docs',
        description: 'Resolved multiple backend bugs, typos, and configuration inconsistencies across documentation and core code.',
        url: 'https://github.com/activist-org/activist/pull/2128',
        tags: ['Python', 'Django', 'Bug Fix', 'Backend']
      },
      {
        prNumber: 2129,
        title: 'add authentication enforcement and proper authorization to EventDetailAPIView',
        description: 'Enforced strict authentication requirements and permission checks on event detail API endpoints.',
        url: 'https://github.com/activist-org/activist/pull/2129',
        tags: ['Django REST Framework', 'Security', 'Authentication', 'API']
      },
      {
        prNumber: 2133,
        title: 'fix(backend): add authentication enforcement and proper authorization to OrganizationDetailAPIView',
        description: 'Added authentication guards and granular role authorization to organization detail API endpoints.',
        url: 'https://github.com/activist-org/activist/pull/2133',
        tags: ['Django REST Framework', 'Security', 'Authorization', 'API']
      }
    ]
  }
];

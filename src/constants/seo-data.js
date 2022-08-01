export default {
  jobs: {
    title: 'Jobs — Neon',
  },
  team: {
    title: 'Our Team — Neon',
  },
  earlyAccess: {
    title: 'Get Early Access — Neon',
  },
  blog: {
    title: 'Our Blog — Neon',
  },
  blogPost: ({ title, description }) => ({
    title: `${title} — Neon`,
    description,
  }),
  static: ({ title }) => ({
    title: `${title} — Neon`,
  }),
  doc: ({ title, description }) => ({
    title: `${title} — Neon Docs`,
    description,
  }),
  changelog: {
    title: 'Changelog — Neon',
  },
  changelogPost: ({ title, version }) => ({
    title: `${title} — Neon`,
    version,
  }),
};

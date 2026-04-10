export const blogPosts = [
  {
    id: 1,
    title: 'Building a Design System from Scratch',
    date: '2025-03-15',
    readTime: '5 min read',
    tags: ['React', 'Design'],
    excerpt:
      'How I built a consistent, scalable design system using CSS custom properties and React components — from color tokens to complex layouts.',
    content: `<h2>Why Build a Design System?</h2>
<p>Every product starts simple, but as features grow, inconsistencies creep in. Different shades of gray here, mismatched padding there. A design system solves this by establishing a single source of truth for visual language.</p>

<h2>Starting with Tokens</h2>
<p>I began with CSS custom properties (variables) for colors, spacing, typography, and shadows. This makes it trivial to implement dark mode or brand theme changes — just swap the token values.</p>

<p>The key insight was organizing tokens into three layers: primitive (raw values), semantic (purpose-based aliases), and component (specific overrides). This hierarchy keeps things maintainable as the system scales.</p>

<h2>Component Architecture</h2>
<p>Each component is self-contained with its own CSS Module. No global class name collisions, no specificity wars. Components accept variant props that map to predefined styles from the token system.</p>

<p>The result? A library of 24 components that can be composed to build any page in the product, with guaranteed visual consistency across every screen.</p>`,
  },
  {
    id: 2,
    title: 'Optimizing React Performance: A Deep Dive',
    date: '2025-02-28',
    readTime: '8 min read',
    tags: ['React', 'Performance'],
    excerpt:
      'Practical techniques for making React apps faster — from memo strategies to virtualization and bundle analysis.',
    content: `<h2>The Performance Mindset</h2>
<p>Performance optimization in React isn't about premature micro-optimizations. It's about understanding the rendering cycle, measuring actual bottlenecks, and applying targeted fixes where they matter most.</p>

<h2>React.memo Done Right</h2>
<p>The most common mistake is wrapping everything in React.memo. This adds overhead for components that already render quickly. Instead, identify components that re-render frequently with expensive operations — those are your memo candidates.</p>

<p>Use the React DevTools Profiler to measure render times. If a component takes less than 1ms to render, memo-izing it probably isn't worth the complexity.</p>

<h2>Virtualization for Large Lists</h2>
<p>When rendering hundreds or thousands of items, virtualization is essential. Libraries like react-window render only the visible items, reducing DOM nodes from thousands to dozens. The performance improvement is dramatic — from unusable to buttery smooth.</p>

<h2>Bundle Analysis</h2>
<p>Run webpack-bundle-analyzer or vite-bundle-visualizer to identify bloated dependencies. I found that switching from moment.js to dayjs saved 60KB gzipped. Small wins like this compound into significant load time improvements.</p>`,
  },
  {
    id: 3,
    title: 'CSS Architecture for Scale',
    date: '2025-01-10',
    readTime: '6 min read',
    tags: ['CSS', 'Architecture'],
    excerpt:
      'Exploring CSS Modules, utility-first approaches, and the future of styling in modern web applications.',
    content: `<h2>The CSS Wars</h2>
<p>The frontend community has been debating CSS methodologies for years — BEM, SMACSS, utility-first, CSS-in-JS, CSS Modules. Each has tradeoffs, and the "best" approach depends heavily on team size, project complexity, and personal preference.</p>

<h2>Why I Chose CSS Modules</h2>
<p>For this portfolio project, I went with CSS Modules because they offer the best balance of developer experience, performance, and maintainability. Class names are locally scoped by default, eliminating specificity conflicts without runtime overhead.</p>

<p>The composability feature lets you extend styles across modules, and the plain CSS syntax means no learning curve — any CSS knowledge transfers directly.</p>

<h2>Design Token Integration</h2>
<p>CSS custom properties serve as the bridge between the design system and component styles. Components reference semantic tokens rather than raw values, making theme switching and brand customization straightforward.</p>

<p>This approach also enables runtime theme changes without rebuilding — just update the custom properties on the document root, and every component reflects the change instantly.</p>`,
  },
  {
    id: 4,
    title: 'Terminal UI: Building an Interactive CLI in the Browser',
    date: '2024-12-05',
    readTime: '7 min read',
    tags: ['JavaScript', 'UI'],
    excerpt:
      'How I built a fully functional terminal emulator inside a React app — complete with command history, tab completion, and easter eggs.',
    content: `<h2>The Concept</h2>
<p>A portfolio that looks like an operating system needs a terminal. Not a fake one that just prints static text, but a real interactive experience with command parsing, history, auto-completion, and even fun easter eggs.</p>

<h2>Command Parser</h2>
<p>The command parser splits input into the command name and arguments, then looks up the handler from a registry. Unknown commands get a helpful error message. This architecture makes it trivial to add new commands — just add an entry to the registry.</p>

<h2>History and Tab Completion</h2>
<p>Command history stores every executed command in an array. Up/down arrow keys navigate through history, mimicking real terminal behavior. Tab completion matches partial input against the command registry and available file names.</p>

<h2>Easter Eggs</h2>
<p>The terminal includes several easter eggs: the matrix rain animation, a neofetch-style system info display, and appropriate responses to dangerous commands like "sudo rm -rf /". These details make the experience feel polished and delightful.</p>`,
  },
];

import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Nicholas Lynardakis",
  description: "Cybersecurity | Security Engineering | AI Security",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'About', link: '/about' },
      { text: 'Projects', link: '/projects/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: {
      '/projects/': [
      {
        text: 'Projects',
        items: [
          { text: 'Overview', link: '/projects/' },
          { text: 'AI-Assisted Detection Engineering', link: '/projects/ai-detection-engineering' }
        ]
      }
    ]
  },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Beginn-coder' }
    ]
  }
})

export const siteConfig = {
  name: 'hebbie',
  tagline: '用代码与好奇心,探索技术世界的边界。',
  bio: '全栈开发者 / 独立创作者。热爱前端工程、AI 应用与一切有美感的技术,在这里记录思考与作品。',
  email: 'hello@hebbie.dev',
  social: [
    { label: 'GitHub', href: 'https://github.com/hd54wxby4f-star' },
    { label: 'X / Twitter', href: 'https://x.com/' },
    { label: '邮箱', href: 'mailto:hello@hebbie.dev' },
    { label: 'RSS', href: '/rss.xml' },
  ],
  projects: [
    {
      title: 'Nebula UI',
      description: '暗色科技感组件库,玻璃拟态与渐变描边的设计系统实践。',
      image: '/images/project-1.png',
      tags: ['React', 'TypeScript', 'Design System'],
      link: 'https://github.com/hd54wxby4f-star',
    },
    {
      title: 'NotionPress',
      description: '把 Notion 变成博客后台的静态站点生成管线,自动拉取、渲染、部署。',
      image: '/images/project-2.png',
      tags: ['Vite', 'Notion API', 'GitHub Actions'],
      link: 'https://github.com/hd54wxby4f-star',
    },
    {
      title: 'Lumen CLI',
      description: '终端里的 AI 助手,支持语音、OCR 与多模型路由,让效率触手可及。',
      image: '/images/project-3.png',
      tags: ['Node.js', 'AI', 'CLI'],
      link: 'https://github.com/hd54wxby4f-star',
    },
  ],
  giscus: {
    repo: '',
    repoId: '',
    category: 'Announcements',
    categoryId: '',
  },
  busuanzi: true,
}

export type SiteConfig = typeof siteConfig

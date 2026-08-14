export type Block =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; level: 1 | 2 | 3; text: string }
  | { type: 'bulleted_list'; text: string }
  | { type: 'numbered_list'; text: string }
  | { type: 'code'; text: string; language: string }
  | { type: 'quote'; text: string }
  | { type: 'image'; url: string; caption?: string }
  | { type: 'divider' }
  | { type: 'callout'; text: string }

export interface Post {
  id: string
  slug: string
  title: string
  excerpt: string
  tags: string[]
  cover: string
  date: string
  pinned?: boolean
  content: Block[]
}

export interface Project {
  title: string
  description: string
  image: string
  tags: string[]
  link?: string
}

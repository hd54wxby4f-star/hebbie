import postsJson from '../generated/posts.json'
import { asset } from './asset'
import type { Post } from '../types'

export const posts = (postsJson as Post[]).map((p) =>
  p.cover ? { ...p, cover: asset(p.cover) } : p,
)

export function getSortedPosts(): Post[] {
  return [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )
}

export function getPinnedPosts(): Post[] {
  return getSortedPosts().filter((p) => p.pinned)
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug)
}

export function getAllTags(): string[] {
  const set = new Set<string>()
  for (const post of posts) {
    for (const tag of post.tags ?? []) set.add(tag)
  }
  return [...set].sort((a, b) => a.localeCompare(b, 'zh-CN'))
}

export function formatDate(iso: string): string {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function asset(p: string): string {
  return import.meta.env.BASE_URL + p.replace(/^\//, '')
}

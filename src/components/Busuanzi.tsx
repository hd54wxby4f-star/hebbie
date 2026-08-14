import { useEffect } from 'react'

export default function Busuanzi() {
  useEffect(() => {
    const id = 'busuanzi-script'
    if (!document.getElementById(id)) {
      const s = document.createElement('script')
      s.id = id
      s.async = true
      s.src = 'https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js'
      document.body.appendChild(s)
    }
  }, [])

  return (
    <p className="busuanzi">
      本站访问 <span id="busuanzi_value_site_pv">—</span> 次
    </p>
  )
}

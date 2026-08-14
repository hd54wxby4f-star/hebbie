import { HashRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Blog from './pages/Blog'
import PostDetail from './pages/PostDetail'
import Archive from './pages/Archive'
import About from './pages/About'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<PostDetail />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/about" element={<About />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

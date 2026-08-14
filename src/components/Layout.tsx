import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout() {
  return (
    <div className="app">
      <div className="bg-glow bg-glow-1" aria-hidden="true" />
      <div className="bg-glow bg-glow-2" aria-hidden="true" />
      <div className="bg-glow bg-glow-3" aria-hidden="true" />
      <Navbar />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

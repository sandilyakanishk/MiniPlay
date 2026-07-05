import { Gamepad2 } from 'lucide-react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout() {
  const location = useLocation()

  return (
    <div className="page-shell flex min-h-screen flex-col" key={location.pathname}>
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      {location.pathname.startsWith('/games/') && (
        <Link
          className="fixed bottom-4 right-4 z-40 inline-flex min-h-12 items-center gap-2 rounded-2xl bg-coral px-4 py-3 text-sm font-extrabold text-white shadow-2xl shadow-coral/25 transition active:scale-95 md:hidden"
          to="/games"
        >
          <Gamepad2 size={18} /> Games
        </Link>
      )}
      <Footer />
    </div>
  )
}

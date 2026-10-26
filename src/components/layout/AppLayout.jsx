import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'
import MobileBottomNav from './MobileBottomNav'
import MobileHeader from './MobileHeader'

export default function AppLayout() {
  return (
    <div className="flex min-h-svh flex-col">
      <Header />
      <MobileHeader />
      <Outlet />
      <Footer />
      <MobileBottomNav />
    </div>
  )
}

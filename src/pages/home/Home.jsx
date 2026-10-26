import { useDocumentTitle } from '../../hooks/useDocumentTitle'
import DesktopHome from './DesktopHome'
import MobileHome from './mobile/MobileHome'

export default function Home() {
  useDocumentTitle('Dashboard | Vitalis')

  return (
    <>
      <div className="lg:hidden">
        <MobileHome />
      </div>
      <div className="hidden lg:block">
        <DesktopHome />
      </div>
    </>
  )
}

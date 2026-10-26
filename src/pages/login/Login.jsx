import { useDocumentTitle } from '../../hooks/useDocumentTitle'
import DesktopLogin from './DesktopLogin'
import MobileLogin from './mobile/MobileLogin'

export default function Login() {
  useDocumentTitle('Iniciar Sesión | Vitalis')

  return (
    <>
      <div className="lg:hidden">
        <MobileLogin />
      </div>
      <div className="hidden lg:block">
        <DesktopLogin />
      </div>
    </>
  )
}

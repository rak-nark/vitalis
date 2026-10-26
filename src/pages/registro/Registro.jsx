import { useDocumentTitle } from '../../hooks/useDocumentTitle'
import DesktopRegister from './DesktopRegister'
import MobileRegister from './mobile/MobileRegister'

export default function Registro() {
  useDocumentTitle('Crear cuenta | Vitalis')

  return (
    <>
      <div className="lg:hidden">
        <MobileRegister />
      </div>
      <div className="hidden lg:block">
        <DesktopRegister />
      </div>
    </>
  )
}

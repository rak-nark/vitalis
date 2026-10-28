import DesktopHabitos from './DesktopHabitos'
import MobileHabitos from './mobile/MobileHabitos'

export default function Habitos() {
  return (
    <>
      <div className="lg:hidden">
        <MobileHabitos />
      </div>
      <div className="hidden lg:block">
        <DesktopHabitos />
      </div>
    </>
  )
}

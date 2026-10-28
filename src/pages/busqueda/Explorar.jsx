import NoticeToast from '../../components/ui/NoticeToast'
import DesktopExplorar from './DesktopExplorar'
import MobileExplorar from './mobile/MobileExplorar'
import { useExplorarPage } from './hooks/useExplorarPage'

export default function Explorar() {
  const explore = useExplorarPage()

  return (
    <>
      <div className="lg:hidden">
        <MobileExplorar explore={explore} />
      </div>
      <div className="hidden lg:block">
        <DesktopExplorar explore={explore} />
      </div>
      <NoticeToast
        notice={explore.notice}
        onDismiss={explore.handleDismissNotice}
      />
    </>
  )
}

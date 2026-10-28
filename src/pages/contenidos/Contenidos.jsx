import NoticeToast from '../../components/ui/NoticeToast'
import DesktopContenidos from './DesktopContenidos'
import { useContenidosPage } from './hooks/useContenidosPage'
import MobileContenidos from './mobile/MobileContenidos'

export default function Contenidos() {
  const contenidos = useContenidosPage()

  return (
    <>
      <div className="lg:hidden">
        <MobileContenidos contenidos={contenidos} />
      </div>
      <div className="hidden lg:block">
        <DesktopContenidos contenidos={contenidos} />
      </div>
      <NoticeToast
        notice={contenidos.notice}
        onDismiss={contenidos.handleDismissNotice}
      />
    </>
  )
}

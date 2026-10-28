import DesktopPerfil from './DesktopPerfil'
import MobilePerfil from './mobile/MobilePerfil'
import ProfileNotice from './components/ProfileNotice'
import { useProfile } from './hooks/useProfile'

export default function Perfil() {
  const profile = useProfile()

  return (
    <>
      <div className="lg:hidden">
        <MobilePerfil profile={profile} />
      </div>
      <div className="hidden lg:block">
        <DesktopPerfil profile={profile} />
      </div>
      <ProfileNotice
        notice={profile.notice}
        onDismiss={profile.handleDismissNotice}
      />
    </>
  )
}

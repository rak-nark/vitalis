import { Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import ScrollToTop from './components/layout/ScrollToTop'
import Explorar from './pages/busqueda/Explorar'
import Contenidos from './pages/contenidos/Contenidos'
import Habitos from './pages/habitos/Habitos'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Perfil from './pages/perfil/Perfil'
import Registro from './pages/registro/Registro'

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="contenidos" element={<Contenidos />} />
          <Route path="busqueda" element={<Explorar />} />
          <Route path="favoritos" element={<Habitos />} />
          <Route path="habitos" element={<Navigate to="/favoritos" replace />} />
          <Route path="perfil" element={<Perfil />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </>
  )
}

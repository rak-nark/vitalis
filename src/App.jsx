import { Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import Busqueda from './pages/busqueda/Busqueda'
import Contenidos from './pages/contenidos/Contenidos'
import Favoritos from './pages/favoritos/Favoritos'
import Habitos from './pages/habitos/Habitos'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Perfil from './pages/perfil/Perfil'
import Registro from './pages/registro/Registro'

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="contenidos" element={<Contenidos />} />
        <Route path="busqueda" element={<Busqueda />} />
        <Route path="habitos" element={<Habitos />} />
        <Route path="favoritos" element={<Favoritos />} />
        <Route path="perfil" element={<Perfil />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

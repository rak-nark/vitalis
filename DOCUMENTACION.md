# Documentación funcional y de variables — Vitalis

Referencia técnica de la aplicación: qué hace cada funcionalidad, cómo está
implementada, dónde vive y qué variables/estados intervienen.

- **Proyecto:** `Vitalis/`
- **Última revisión:** 26/10/2026
- **Alcance:** flujos simulados sin backend (autenticación, sesión, búsqueda,
  contenidos, favoritos, hábitos y perfil).

---

## Índice

1. [Resumen y arquitectura](#1-resumen-y-arquitectura)
2. [Rutas y composición de la interfaz](#2-rutas-y-composición-de-la-interfaz)
3. [Mapa de funcionalidades](#3-mapa-de-funcionalidades)
4. [Inventario de variables de estado](#4-inventario-de-variables-de-estado)
5. [Constantes, referencias y catálogos de UI](#5-constantes-referencias-y-catálogos-de-ui)
6. [Contratos de datos y almacenamiento](#6-contratos-de-datos-y-almacenamiento)
7. [Autenticación y sesión](#7-autenticación-y-sesión)
8. [Home (dashboard)](#8-home-dashboard)
9. [Búsqueda](#9-búsqueda)
10. [Contenidos](#10-contenidos)
11. [Favoritos y hábitos](#11-favoritos-y-hábitos)
12. [Perfil](#12-perfil)
13. [Componentes compartidos, layout y autenticación](#13-componentes-compartidos-layout-y-autenticación)
14. [Utilidades](#14-utilidades)
15. [Datos mock](#15-datos-mock)
16. [Flujos de extremo a extremo](#16-flujos-de-extremo-a-extremo)
17. [Limitaciones y comportamiento no persistente](#17-limitaciones-y-comportamiento-no-persistente)
18. [Ejecutar y verificar](#18-ejecutar-y-verificar)
19. [Dónde cambiar cada cosa](#19-dónde-cambiar-cada-cosa)

---

## 1. Resumen y arquitectura

Vitalis es una SPA de nutrición, hábitos y bienestar. Toda la información es
mock y vive en el frontend; no hay API ni base de datos. La aplicación conserva
la sesión simulada en el navegador y mantiene favoritos/hábitos en memoria
durante la navegación SPA.

### 1.1 Stack

| Tecnología | Versión | Uso |
| --- | --- | --- |
| React | 19.3.1 | Componentes y estado |
| React DOM | 19.3.1 | Render |
| React Router DOM | 7.18.4 | Rutas SPA con `BrowserRouter` |
| Tailwind CSS | 4.3.3 | Estilos CSS-first; theme en `src/index.css` |
| Vite | 8.3.5 | Dev server y build |
| clsx | 2.1.1 | Clases condicionales |
| ESLint | 10.13.0 | Lint |

### 1.2 Punto de entrada y providers

Archivo: `src/main.jsx`.

```jsx
<BrowserRouter>
  <AuthProvider>
    <UserProvider>
      <HabitsProvider>
        <FavoritesProvider>
          <App />
        </FavoritesProvider>
      </HabitsProvider>
    </UserProvider>
  </AuthProvider>
</BrowserRouter>
```

Orden importante:

- `AuthProvider` debe ir antes de `UserProvider` porque el perfil de usuario
  consume la sesión.
- `HabitsProvider` y `FavoritesProvider` son independientes entre sí.
- Cada provider expone su estado mediante un hook de consumo separado, lo que
  mantiene los archivos `.jsx` centrados en presentación.

### 1.3 Contextos exportados

| Archivo | Contexto | Valor del provider | Hook de consumo |
| --- | --- | --- | --- |
| `context/AuthContext.jsx` | `AuthContext` | Resultado de `useAuthSession` | `useAuth` |
| `context/UserContext.jsx` | `UserContext` | Resultado de `useUserProfile` | `useUser` |
| `context/HabitsContext.jsx` | `HabitsContext` | Resultado de `useHabitsState` | `useHabits` |
| `context/FavoritesContext.jsx` | `FavoritesContext` | Resultado de `useFavoritesState` | `useFavorites` |

Cada contexto se crea con `createContext(null)`. Los hooks de consumo lanzan un
error explícito si se usan fuera de su provider.

### 1.4 Convención de carpetas

| Ruta | Responsabilidad |
| --- | --- |
| `src/pages/<área>/` | Componentes de página y subcomponentes visuales |
| `src/pages/<área>/hooks/` | Estado, derivados, handlers y validaciones de esa página |
| `src/context/` | Providers y almacenamiento de estado global |
| `src/context/hooks/` | Hooks que implementan o consumen cada contexto |
| `src/components/` | Componentes compartidos (`ui`, `layout`, `auth`) |
| `src/hooks/` | Hooks globales reutilizables |
| `src/utils/` | Funciones puras y utilidades compartidas |
| `src/data/` | Datos y textos mock |
| `src/App.jsx` | Definición de rutas |
| `src/index.css` | Tailwind v4, theme y estilos base |

Regla del proyecto: **la lógica no vive en los `.jsx`**. Los componentes leen
variables y handlers desde un hook co-locado o desde un contexto. Las únicas
excepciones son mapas de estilos/copys y cálculos puramente visuales.

---

## 2. Rutas y composición de la interfaz

Definidas en `src/App.jsx`.

| Ruta | Componente | Layout | Título del documento |
| --- | --- | --- | --- |
| `/login` | `pages/login/Login.jsx` | Sin layout | `Iniciar Sesión \| Vitalis` |
| `/registro` | `pages/registro/Registro.jsx` | Sin layout | `Crear cuenta \| Vitalis` |
| `/` | `pages/home/Home.jsx` | `AppLayout` | `Dashboard \| Vitalis` |
| `/contenidos` | `pages/contenidos/Contenidos.jsx` | `AppLayout` | `Contenidos Saludables \| Vitalis` |
| `/busqueda` | `pages/busqueda/Busqueda.jsx` | `AppLayout` | `Búsqueda \| Vitalis` o `Resultados para … \| Vitalis` |
| `/habitos` | `pages/habitos/Habitos.jsx` | `AppLayout` | `Mis Hábitos \| Vitalis` |
| `/favoritos` | `pages/favoritos/Favoritos.jsx` | `AppLayout` | `Mis Favoritos y Hábitos \| Vitalis` |
| `/perfil` | `pages/perfil/Perfil.jsx` | `AppLayout` | `Mi Perfil \| Vitalis` |
| `*` | Redirección a `/` | — | — |

`AppLayout` (`src/components/layout/AppLayout.jsx`) compone:

1. `Header` (escritorio).
2. `MobileHeader` (móvil).
3. `<Outlet />` con la página.
4. `Footer` (escritorio).
5. `MobileBottomNav` (móvil).

### 2.1 Separación escritorio/móvil

El breakpoint es `lg` (1024 px). Home, Login y Registro montan ambas variantes y
las alternan por CSS (`lg:hidden` / `hidden lg:block`), no por JavaScript. Cada
variante tiene su propia instancia de formulario/hook, por lo que el estado de
las dos no se comparte.

---

## 3. Mapa de funcionalidades

| Funcionalidad | Entrada | Lógica principal | Interfaz | Datos |
| --- | --- | --- | --- | --- |
| Login con correo | `/login` | `pages/login/hooks/useLoginForm.js` | `DesktopLoginForm.jsx`, `MobileLoginForm.jsx` | `data/loginData.js` |
| Recuperar contraseña | Enlace del login | `pages/login/hooks/usePasswordRecovery.js` | `PasswordRecoveryDialog.jsx` | `loginCopy.recovery` |
| Registro | `/registro` | `pages/registro/hooks/useRegisterForm.js` | `DesktopRegisterForm.jsx`, `MobileRegisterForm.jsx` | `data/registerData.js` |
| Fuerza de contraseña | Dentro del registro | `pages/registro/utils/passwordStrength.js` | `PasswordStrengthBars.jsx` | `registerCopy.strength` |
| Sesión persistente | Global | `context/hooks/useAuthSession.js` + `context/authStorage.js` | Header/Perfil | Clave `vitalis.auth.session` |
| Acceso social | Login/Registro | `hooks/useSocialAuthLogin.js` + `components/auth/hooks/useSocialAuth.js` | `SocialAuthButtons.jsx` | `data/authData.js` |
| Búsqueda desde Home | Home | `pages/home/hooks/useSearchForm.js` | `SearchSection.jsx`, `MobileSearch.jsx` | `contentFilters` |
| Búsqueda avanzada | `/busqueda` | `pages/busqueda/hooks/useBusquedaPage.js` | `Busqueda.jsx` | `recommendedContent` |
| Catálogo y filtros | `/contenidos` | `pages/contenidos/hooks/useContentsPage.js` | `Contenidos.jsx` | `recommendedContent` |
| Favoritos | Corazón de tarjetas y `/favoritos` | `context/hooks/useFavoritesState.js`, `useFavoritesPage.js` | `ContentCard.jsx`, `MobileContentCard.jsx`, `Favoritos.jsx` | `recommendedContent` |
| Hábitos | Home, `/habitos`, `/favoritos` | `context/hooks/useHabitsState.js` | `HabitsSection.jsx`, `MobileHabits.jsx`, `HabitRow.jsx` | `initialHabits` |
| Desafío semanal | Home escritorio | `pages/home/hooks/useWeeklyChallenge.js` | `WeeklyChallenge.jsx` | `weeklyChallenge` |
| Perfil y logout | `/perfil` | `pages/perfil/hooks/useProfile.js` | `Perfil.jsx` | Sesión + contextos |
| Navegación | Global | — | `Header.jsx`, `MobileHeader.jsx`, `MobileBottomNav.jsx` | — |

---

## 4. Inventario de variables de estado

Todas las declaraciones `useState` de la aplicación están en hooks. Esta tabla
es el inventario completo; sirve para localizar de inmediato dónde se guarda
cada dato.

| Archivo | Variable | Declaración | Valor inicial | Función |
| --- | --- | --- | --- | --- |
| `context/hooks/useAuthSession.js` | `session` | `useState(readStoredSession)` | Sesión almacenada o `null` | Sesión activa normalizada |
| `context/hooks/useHabitsState.js` | `habits` | `useState(initialHabits)` | 5 hábitos mock | Lista y estado de hábitos |
| `context/hooks/useFavoritesState.js` | `favorites` | `useState(() => new Set())` | `Set` vacío | IDs de contenidos favoritos |
| `pages/login/hooks/useLoginForm.js` | `email` | `useState('')` | `''` | Correo del formulario |
|  | `password` | `useState('')` | `''` | Contraseña del formulario |
|  | `remember` | `useState(false)` | `false` | Persistencia en `localStorage` |
|  | `showPassword` | `useState(false)` | `false` | Visibilidad de la contraseña |
|  | `errors` | `useState({ email: '', password: '' })` | Objeto | Mensajes por campo |
|  | `status` | `useState('idle')` | `idle` | `idle`, `loading` o `success` |
| `pages/login/hooks/usePasswordRecovery.js` | `isOpen` | `useState(false)` | `false` | Visibilidad del diálogo |
|  | `email` | `useState('')` | `''` | Correo de recuperación |
|  | `error` | `useState('')` | `''` | Error del correo |
|  | `status` | `useState('idle')` | `idle` | `idle`, `loading` o `success` |
| `pages/registro/hooks/useRegisterForm.js` | `fullName` | `useState('')` | `''` | Nombre completo |
|  | `email` | `useState('')` | `''` | Correo |
|  | `password` | `useState('')` | `''` | Contraseña |
|  | `confirmPassword` | `useState('')` | `''` | Confirmación |
|  | `showPassword` | `useState(false)` | `false` | Visibilidad de contraseña |
|  | `showConfirmPassword` | `useState(false)` | `false` | Visibilidad de confirmación |
|  | `acceptedTerms` | `useState(false)` | `false` | Términos aceptados |
|  | `newsletter` | `useState(true)` | `true` | Preferencia de newsletter (solo escritorio) |
|  | `errors` | `useState({})` | Objeto vacío | Errores por campo |
|  | `status` | `useState('idle')` | `idle` | `idle`, `loading` o `success` |
| `components/auth/hooks/useSocialAuth.js` | `loadingProvider` | `useState(null)` | `null` | Proveedor social en curso |
| `pages/home/hooks/useSearchForm.js` | `query` | `useState('')` | `''` | Texto de búsqueda de Home |
|  | `activeFilter` | `useState('all')` | `'all'` | Filtro temático de Home |
| `pages/home/hooks/useWeeklyChallenge.js` | `registered` | `useState(false)` | `false` | Cena del desafío registrada |
| `pages/home/hooks/useMobileHabitRow.js` | `expanded` | `useState(false)` | `false` | Detalle clínico desplegado |
| `pages/busqueda/hooks/useBusquedaPage.js` | `draft` | `useState({ source: urlQuery, value: urlQuery })` | Según URL | Borrador sincronizado con la URL |
| `pages/contenidos/hooks/useContentsPage.js` | `query` | `useState('')` | `''` | Búsqueda en vivo del catálogo |
|  | `activeFilter` | `useState('all')` | `'all'` | Filtro del catálogo |
| `pages/perfil/hooks/useProfile.js` | `logoutStatus` | `useState('idle')` | `idle` | Estado del cierre de sesión |
|  | `notice` | `useState('')` | `''` | Aviso posterior al logout |

No hay `useState` en archivos `.jsx`: la presentación recibe todo por props o
por hooks.

---

## 5. Constantes, referencias y catálogos de UI

| Archivo | Nombre | Tipo/valor | Uso |
| --- | --- | --- | --- |
| `context/authStorage.js` | `STORAGE_KEY` | `'vitalis.auth.session'` | Clave de almacenamiento |
| `context/hooks/useAuthSession.js` | `STORAGE_KEY` | `'vitalis.auth.session'` | Escucha eventos `storage` |
| `utils/validation.js` | `EMAIL_PATTERN` | `/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/` | Validación de correo |
| `pages/home/hooks/useWelcomeBanner.js` | `CIRCUMFERENCE` | `188.4` | Perímetro del anillo SVG |
| `pages/home/hooks/useSearchForm.js` | `searchInputRef` | `useRef(null)` | Foco con `Ctrl/Cmd + K` |
| `pages/login/hooks/useLoginForm.js` | `errorMessages` | Mapa de códigos → copy | Traducción de errores |
| `pages/registro/hooks/useRegisterForm.js` | `fieldErrorMessages` | Mapa de códigos → copy | Traducción de errores |
| `pages/registro/utils/passwordStrength.js` | `strengthMeta` | `0..3` → etiqueta y tono | Fuerza de contraseña |
| `components/auth/SocialAuthButtons.jsx` | `providers` | `google`, `apple` | Etiqueta e icono social |
| `pages/home/ContentCard.jsx` | `ctaStyles` | `primary`, `secondary` | Variantes visuales del CTA |
| `pages/home/mobile/MobileContentCard.jsx` | `ctaStyles` | `primary`, `secondary` | Variantes móviles |
| `pages/registro/components/PasswordStrengthBars.jsx` | `toneClasses` | `neutral`, `error`, `warning`, `success` | Color de barras |
| `pages/registro/components/DesktopRegisterForm.jsx` | `strengthTextClass`, `matchState` | Mapas visuales | Texto de fuerza y coincidencia |
| `pages/registro/mobile/MobileRegisterForm.jsx` | `strengthTextClass`, `matchState` | Mapas visuales | Texto de fuerza y coincidencia |
| `components/layout/Header.jsx` | `navItems` | 5 rutas | Navegación superior |
| `components/layout/MobileBottomNav.jsx` | `items` | 5 rutas | Navegación inferior |
| `components/layout/Footer.jsx` | `footerLinks` | 4 enlaces | Footer de escritorio |
| `components/auth/AuthFooter.jsx` | `legalLinks` | 5 textos | Footer de autenticación |

---

## 6. Contratos de datos y almacenamiento

### 6.1 Sesión

Clave única en `localStorage` o `sessionStorage`:

```text
vitalis.auth.session
```

Forma del objeto guardado:

```js
{
  id: 'camila@example.com',        // correo normalizado
  name: 'Camila Morales',          // nombre visible
  email: 'camila@example.com',     // correo normalizado
  provider: 'email',               // 'email' | 'google' | 'apple'
  remember: true,                  // localStorage si true
  loggedInAt: '2026-10-26T21:39:07.494Z'
}
```

| Campo | Tipo | Origen | Regla |
| --- | --- | --- | --- |
| `id` | `string` | `profile.email` | `trim().toLowerCase()` |
| `name` | `string` | `profile.name` | `trim()`; si falla, `Usuario Vitalis` |
| `email` | `string` | `profile.email` | `trim().toLowerCase()` |
| `provider` | `string` | `profile.provider` | `email` por defecto |
| `remember` | `boolean` | `profile.remember` | `Boolean(...)` |
| `loggedInAt` | `string` | `new Date().toISOString()` | Fecha ISO de acceso |

### 6.2 Contenido

Definido en `data/homeData.js` (`recommendedContent`). Forma relevante:

```js
{
  id: 'nordic-salmon-bowl',
  image: '/images/salmon-bowl.jpg',
  imageAlt: '...',
  topBadgeIcon: 'verified_user',
  topBadgeLabel: 'Basado en tu perfil',
  tags: [{ label: '32g Proteína', className: '...' }],
  duration: '15 min prep',
  durationIcon: 'schedule',
  difficulty: 'Fácil',
  difficultyIcon: 'signal_cellular_alt_1_bar',
  difficultyClass: 'text-primary',
  title: '...',
  description: '...',
  category: 'Almuerzo / Cena',
  cta: 'Ver receta',
  ctaIcon: 'restaurant_menu',
  ctaVariant: 'secondary',
  filterIds: ['breakfast', 'gluten-free'],
  mobile: {
    category: 'Nutrición',
    categoryClass: 'text-primary',
    time: '15 min',
    cta: 'Ver receta',
    ctaIcon: 'arrow_forward',
    ctaVariant: 'primary'
  }
}
```

### 6.3 Hábito

```js
{
  id: 'water',
  title: 'Beber 2.5L de agua filtrada',
  detail: 'Meta de termorregulación y digestión celular',
  tag: '2.1 / 2.5 L',
  tagClass: '...',
  icon: 'water_drop',
  completed: true,
  mobileDetail: '2.1L registrados • Cumplido al 84%',
  mobileTip: 'Tip clínico: ...'
}
```

### 6.4 Filtro de contenido

```js
{
  id: 'gluten-free',
  label: 'Sin Gluten',
  mobileLabel: 'Sin Gluten',
  icon: 'eco',
  iconClass: 'text-emerald-600'
}
```

`mobileLabel`, `icon` e `iconClass` son opcionales; el filtro `all` no tiene
icono.

### 6.5 Usuario y resumen

`currentUser` (fallback sin sesión) contiene `firstName`, `fullName`,
`streakDays`, `avatar` y `avatarAlt`. `dailySummary` contiene
`goalPercentage`, hidratación restante, vitalidad y textos asociados.

---

## 7. Autenticación y sesión

### 7.1 Archivos

| Archivo | Responsabilidad |
| --- | --- |
| `src/context/AuthContext.jsx` | Crea el contexto y monta `useAuthSession` |
| `src/context/hooks/useAuthSession.js` | Estado de sesión, login/logout y sincronización |
| `src/context/authStorage.js` | Lectura/escritura/limpieza de ambos storages |
| `src/context/hooks/useAuth.js` | Hook de consumo con validación de provider |
| `src/context/UserContext.jsx` | Expone usuario + resumen |
| `src/context/hooks/useUserProfile.js` | Fusiona sesión con el usuario mock |
| `src/pages/login/hooks/useLoginForm.js` | Estado, validación y envío de login |
| `src/pages/login/hooks/usePasswordRecovery.js` | Estado del diálogo de recuperación |
| `src/pages/registro/hooks/useRegisterForm.js` | Estado, validación y envío de registro |
| `src/hooks/useSocialAuthLogin.js` | Login social + redirección |
| `src/components/auth/hooks/useSocialAuth.js` | Simulación de carga del proveedor |
| `src/utils/validation.js` | Validaciones compartidas |
| `src/utils/user.js` | Nombre, iniciales y fecha de sesión |

### 7.2 `useAuthSession`

Declaración principal:

```js
const [session, setSession] = useState(readStoredSession)
```

| Variable | Tipo | Origen | Descripción |
| --- | --- | --- | --- |
| `session` | `Session \| null` | `readStoredSession` | Sesión activa recuperada al montar |
| `isAuthenticated` | `boolean` | `Boolean(session)` | Indica si hay sesión |
| `login(profile)` | `función` | `useCallback` | Normaliza, guarda y devuelve la sesión |
| `logout()` | `función` | `useCallback` | Limpia storages y deja `session` en `null` |

Comportamiento:

1. Al montar, `readStoredSession()` busca primero en `localStorage` y luego en
   `sessionStorage`.
2. `login(profile)` crea el objeto de sesión, llama a
   `storeSession(nextSession, nextSession.remember)` y actualiza el estado.
3. `storeSession` limpia ambas claves antes de escribir, por lo que nunca
   quedan dos sesiones simultáneas.
4. Con `remember: true` se escribe en `localStorage`; con `false`, en
   `sessionStorage`.
5. El hook escucha el evento `storage`; si otra pestaña modifica la clave,
   vuelve a leer la sesión.
6. `logout()` elimina la clave de ambos storages y limpia el estado.

### 7.3 `authStorage`

| Función | Entrada | Devuelve | Comportamiento |
| --- | --- | --- | --- |
| `safeParse(value)` | `string \| null` | objeto o `null` | JSON seguro; captura errores |
| `isValidSession(value)` | `unknown` | `boolean` | Exige objeto con `name` y `email` string |
| `readFromStorage(storage)` | `Storage` | objeto o `null` | Lee y parsea la clave |
| `readStoredSession()` | — | `Session \| null` | Prioriza `localStorage`, luego `sessionStorage` |
| `storeSession(session, remember)` | sesión + `boolean` | — | Limpia y escribe en el storage elegido |
| `clearStoredSession()` | — | — | Elimina la clave de ambos storages |

Los accesos están envueltos en `try/catch` para tolerar mode privado, bloqueo de
almacenamiento o cuota excedida.

### 7.4 `useAuth`

```js
const context = useContext(AuthContext)

if (!context) {
  throw new Error('useAuth debe usarse dentro de <AuthProvider>')
}

return context
```

Es el único punto de acceso al contexto de autenticación para el resto de la
aplicación.

### 7.5 `useUserProfile`

| Variable | Tipo | Descripción |
| --- | --- | --- |
| `user` | objeto | `currentUser` o versión fusionada con la sesión |
| `summary` | objeto | `dailySummary` estático |
| `session` | `Session \| null` | Sesión activa |

Con sesión, el usuario resultante cambia `firstName`, `fullName`, `email` y
`avatarAlt`. Sin sesión se usa directamente `currentUser`, por lo que la Home y
el header muestran el perfil mock de Camila.

### 7.6 Login por correo

Hook: `src/pages/login/hooks/useLoginForm.js`.

Declaraciones principales:

```js
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [remember, setRemember] = useState(false)
const [showPassword, setShowPassword] = useState(false)
const [errors, setErrors] = useState({ email: '', password: '' })
const [status, setStatus] = useState('idle')
```

| Variable | Tipo | Descripción |
| --- | --- | --- |
| `email` | `string` | Correo escrito |
| `password` | `string` | Contraseña escrita |
| `remember` | `boolean` | Si se marca “Recordarme” |
| `showPassword` | `boolean` | Alterna `password`/`text` |
| `errors` | `{ email, password }` | Mensajes visibles por campo |
| `status` | `idle \| loading \| success` | Estado del envío |
| `isSubmitting` | `boolean` | `status === 'loading'` |
| `isSuccess` | `boolean` | `status === 'success'` |
| `recovery` | objeto | Hook de recuperación listo para el diálogo |
| `handleEmailChange` | `función` | Actualiza correo y limpia su error |
| `handlePasswordChange` | `función` | Actualiza contraseña y limpia su error |
| `handleRememberChange` | `función` | Actualiza `remember` |
| `togglePasswordVisibility` | `función` | Cambia `showPassword` |
| `handleForgotPassword` | `función` | Abre recuperación con el correo actual |
| `handleSubmit` | `función async` | Valida, simula carga, inicia sesión |
| `handleSocialLogin` | `función` | Delega en `useSocialAuthLogin` |

Flujo de `handleSubmit`:

1. `preventDefault()`.
2. Evita reenvíos si está cargando o ya tuvo éxito.
3. `validateLoginFields({ email, password })` devuelve códigos.
4. `mapErrors` traduce los códigos a los textos de `loginCopy.validation`.
5. Si hay errores, los muestra y termina.
6. `status = 'loading'` y `await wait(850)`.
7. `login({ name: getDisplayNameFromEmail(email), email, remember, provider: 'email' })`.
8. `status = 'success'`; un efecto navega a `/` con `replace` tras 900 ms.

No hay validación contra backend: cualquier correo válido y contraseña de al
menos 8 caracteres inicia sesión.

### 7.7 Recuperación de contraseña

Hook: `src/pages/login/hooks/usePasswordRecovery.js`.
Diálogo: `src/pages/login/components/PasswordRecoveryDialog.jsx`.

| Variable | Tipo | Descripción |
| --- | --- | --- |
| `isOpen` | `boolean` | Diálogo abierto/cerrado |
| `email` | `string` | Correo de recuperación |
| `error` | `string` | Error de validación |
| `status` | `idle \| loading \| success` | Estado del envío |
| `open(initialEmail)` | `función` | Abre y precarga el correo |
| `close()` | `función` | Cierra si no está cargando |
| `reset()` | `función` | Vuelve al formulario y limpia datos |
| `handleEmailChange` | `función` | Actualiza y limpia error/éxito |
| `handleSubmit` | `función async` | Valida, simula envío y muestra éxito |
| `isLoading` | `boolean` | `status === 'loading'` |
| `isSuccess` | `boolean` | `status === 'success'` |

Detalles:

- `open(email)` reinicia error y estado, y abre el diálogo.
- Al abrir se bloquea el scroll del `body` y `Escape` cierra el diálogo.
- Mientras `isLoading` es `true`, ni el botón de cierre, ni el backdrop, ni
  `Escape` cierran el diálogo.
- `handleSubmit` exige correo y valida el patrón; luego espera 900 ms y pasa a
  `success`.
- El diálogo usa `role="dialog"`, `aria-modal`, foco automático en el correo y
  `aria-describedby` dinámico.
- “Entendido” cierra; “Usar otro correo” ejecuta `reset()` sin cerrar.

### 7.8 Registro

Hook: `src/pages/registro/hooks/useRegisterForm.js`.

Recibe `{ idPrefix = 'register' }` para generar IDs únicos (`register-desktop`,
`register-mobile`).

| Variable | Tipo | Descripción |
| --- | --- | --- |
| `fullName` | `string` | Nombre completo |
| `email` | `string` | Correo |
| `password` | `string` | Contraseña |
| `confirmPassword` | `string` | Confirmación |
| `showPassword` | `boolean` | Visibilidad de contraseña |
| `showConfirmPassword` | `boolean` | Visibilidad de confirmación |
| `acceptedTerms` | `boolean` | Términos aceptados |
| `newsletter` | `boolean` | Preferencia informativa; por defecto `true` |
| `errors` | `object` | Errores por campo |
| `status` | `idle \| loading \| success` | Estado del envío |
| `isSubmitting` | `boolean` | `status === 'loading'` |
| `isSuccess` | `boolean` | `status === 'success'` |
| `passwordStrength` | `{ score, label, tone }` | Calculado con `useMemo` |
| `passwordsMatch` | `boolean` | Hay confirmación y ambas coinciden |
| `matchStatus` | `empty \| success \| error` | Estado visual de coincidencia |
| `handleNameChange` | `función` | Actualiza nombre y limpia error |
| `handleEmailChange` | `función` | Actualiza correo y limpia error |
| `handlePasswordChange` | `función` | Actualiza contraseña y limpia errores |
| `handleConfirmPasswordChange` | `función` | Actualiza confirmación |
| `handleTermsChange` | `función` | Actualiza términos y limpia error |
| `handleNewsletterChange` | `función` | Actualiza newsletter |
| `handleSubmit` | `función async` | Valida, enfoca el primer error y crea sesión |
| `handleSocialLogin` | `función` | Delega en `useSocialAuthLogin` |

Flujo de `handleSubmit`:

1. Evita reenvíos en carga/éxito.
2. `validateRegisterFields` valida nombre, correo, contraseña, confirmación y
   términos.
3. `mapErrors` traduce los códigos a `registerCopy.validation`.
4. Si hay errores, busca el primer campo inválido y hace foco en:
   `${idPrefix}-name`, `-email`, `-password`, `-confirm-password` o `-terms`.
5. `status = 'loading'` y `await wait(950)`.
6. `login({ name: fullName.trim(), email, remember: true, provider: 'email' })`.
7. `status = 'success'`; un efecto navega a `/` con `replace` tras 1000 ms.

Condiciones:

- La contraseña solo se valida por longitud mínima (8); la fuerza es
  informativa y **no bloquea** el envío.
- El registro siempre crea sesión persistente (`remember: true`).
- La newsletter es opcional y solo se muestra en escritorio; no se persiste.
- `setShowPassword` y `setShowConfirmPassword` se exponen para los botones de
  visibilidad de los formularios.

### 7.9 Fuerza de contraseña

Archivo: `src/pages/registro/utils/passwordStrength.js`.

Puntuación:

| Condición | Suma |
| --- | --- |
| Longitud ≥ 8 | +1 |
| Contiene dígito | +1 |
| Contiene símbolo o longitud ≥ 12 | +1 |

Normalización:

- Sin contraseña: `score: 0`, etiqueta `Sin evaluar`, tono `neutral`.
- Con contraseña: `score = Math.max(1, score)`, por lo que nunca queda “vacía”
  si hay texto.
- Etiquetas: 1 `Débil` / `error`, 2 `Media` / `warning`, 3 `Fuerte` /
  `success`.

`PasswordStrengthBars` recibe `score`, `tone` y `segments` (3 por defecto, 4 en
móvil). Si `score >= 3`, llena todos los segmentos.

### 7.10 Acceso social

Archivos:

- `src/components/auth/SocialAuthButtons.jsx`
- `src/components/auth/hooks/useSocialAuth.js`
- `src/hooks/useSocialAuthLogin.js`
- `src/data/authData.js`

Proveedores:

| ID | Nombre | Correo mock |
| --- | --- | --- |
| `google` | Google | `camila.morales@gmail.com` |
| `apple` | Apple | `camila.morales@icloud.com` |

Variables de `useSocialAuth`:

| Variable | Tipo | Descripción |
| --- | --- | --- |
| `loadingProvider` | `string \| null` | Proveedor que está conectando |
| `handleSelect(providerId)` | `función async` | Espera 650 ms y llama a `onSelect` |
| `isLoading` | `boolean` | `Boolean(loadingProvider)` |

`useSocialAuthLogin({ redirectTo = '/' })` devuelve una función que:

1. Busca el perfil en `socialProfiles` (Google como fallback).
2. Ejecuta `login` con `remember: true` y el proveedor elegido.
3. Navega a `redirectTo` con `replace: true`.

El botón muestra “Conectando…” y desactiva ambos proveedores mientras dura la
simulación. No se abre ninguna ventana externa ni se valida identidad real.

---

## 8. Home (dashboard)

Composición:

| Archivo | Rol |
| --- | --- |
| `pages/home/Home.jsx` | Alterna `MobileHome` / `DesktopHome` |
| `pages/home/DesktopHome.jsx` | Banner, búsqueda, recomendados, hábitos y sidebar |
| `pages/home/mobile/MobileHome.jsx` | Saludo, métricas, búsqueda, recomendados, hábitos y desafío |
| `pages/home/WelcomeBanner.jsx` | Bienvenida y métricas de escritorio |
| `pages/home/SearchSection.jsx` | Búsqueda de escritorio |
| `pages/home/RecommendedSection.jsx` | Catálogo recomendado |
| `pages/home/HabitsSection.jsx` | Hábitos de escritorio |
| `pages/home/HomeSidebar.jsx` | Tip de evidencia + desafío |
| `pages/home/ContentCard.jsx` | Tarjeta de contenido de escritorio |
| `pages/home/mobile/MobileSearch.jsx` | Búsqueda móvil |
| `pages/home/mobile/MobileRecommendations.jsx` | Carrusel de recomendados |
| `pages/home/mobile/MobileHabits.jsx` | Hábitos móviles + gráfica |
| `pages/home/mobile/MobileEvidenceChallenge.jsx` | Evidencia y desafío móvil |

### 8.1 `useSearchForm`

Archivo: `src/pages/home/hooks/useSearchForm.js`.
Recibe `{ enableShortcut = false }`.

| Variable | Tipo | Descripción |
| --- | --- | --- |
| `query` | `string` | Texto de búsqueda |
| `activeFilter` | `string` | Filtro activo (`all` por defecto) |
| `searchInputRef` | `RefObject` | Referencia al input de escritorio |
| `filters` | `array` | `contentFilters` |
| `handleQueryChange` | `función` | Actualiza el texto |
| `handleFilterChange` | `función` | Actualiza el filtro |
| `handleSubmit` | `función` | Navega a `/busqueda` con parámetros |
| `handleOpenFilters` | `función` | Navega a `/busqueda` con filtros |

`buildSearchPath(query, filterId)`:

- Hace `trim()` al texto.
- Añade `q` solo si hay texto.
- Añade `filtro` solo si no es `all`.
- Devuelve `/busqueda` sin query si no hay filtros.

El atajo `Ctrl/Cmd + K` solo se registra cuando `enableShortcut` es `true`
(escritorio) y hace foco en el input. En móvil no se activa.

### 8.2 `useWeeklyChallenge`

| Variable | Tipo | Descripción |
| --- | --- | --- |
| `registered` | `boolean` | Si ya se registró la cena |
| `completedDinners` | `number` | 3 inicial; 4 tras registrar |
| `progress` | `number` | 60 inicial; 80 tras registrar |
| `registerDinner` | `función` | Marca `registered = true` |

Es estado local en memoria. El CTA se deshabilita y cambia de texto después de
registrar. La tarjeta móvil (`MobileEvidenceChallenge`) usa los valores
estáticos de `weeklyChallenge` y no está conectada a este hook.

### 8.3 `useHabitsOverview`

Consume `HabitsContext` y devuelve exactamente:

- `habits`
- `toggleHabit`
- `completedCount`
- `totalCount`
- `progress`

No duplica estado; cualquier cambio se refleja en Home, `/habitos`,
`/favoritos`, el banner y la gráfica semanal.

### 8.4 `useWelcomeBanner`

| Variable | Tipo | Descripción |
| --- | --- | --- |
| `user` | objeto | Usuario activo o mock |
| `summary` | objeto | Resumen diario |
| `completedCount` | `number` | Hábitos completados |
| `totalCount` | `number` | Total de hábitos |
| `circumference` | `number` | Constante `188.4` |
| `dashOffset` | `number` | `188.4 - (188.4 * goalPercentage) / 100` |

`dashOffset` controla el trazo del anillo SVG del banner.

### 8.5 `useFavoriteContent`

Recibe `contentId` y devuelve:

| Variable | Tipo | Descripción |
| --- | --- | --- |
| `favorite` | `boolean` | `isFavorite(contentId)` |
| `handleToggleFavorite` | `función` | Alterna el favorito |

Se usa en `ContentCard` y `MobileContentCard`; el estado real está en
`FavoritesContext`.

### 8.6 `useMobileHabitRow`

Recibe `habitId` y devuelve:

| Variable | Tipo | Descripción |
| --- | --- | --- |
| `expanded` | `boolean` | Detalle clínico abierto |
| `toggleExpanded` | `función` | Alterna el detalle |
| `detailId` | `string` | `mobile-habit-detail-${habitId}` para `aria-controls` |

### 8.7 `useMobileGreeting`

Devuelve `{ user, summary }` desde `useUser`. Alimenta el saludo, el puntaje
Vitalis y el anillo de progreso móvil.

---

## 9. Búsqueda

Página: `src/pages/busqueda/Busqueda.jsx`.
Hook: `src/pages/busqueda/hooks/useBusquedaPage.js`.

### 9.1 Contrato de URL

| Parámetro | Ejemplo | Regla |
| --- | --- | --- |
| `q` | `?q=salmón` | Texto libre; se recorta con `trim()` |
| `filtro` | `?filtro=gluten-free` | Debe existir en `contentFilters`; si no, se usa `all` |

La página es la fuente de verdad de la búsqueda comprometida. El formulario usa
un borrador local para escribir sin actualizar la URL en cada tecla.

### 9.2 `useBusquedaPage`

Declaraciones:

```js
const [searchParams, setSearchParams] = useSearchParams()
const urlQuery = searchParams.get('q')?.trim() ?? ''
const urlFilter = resolveFilter(searchParams.get('filtro') ?? 'all')
const [draft, setDraft] = useState({ source: urlQuery, value: urlQuery })
const query = draft.source === urlQuery ? draft.value : urlQuery
```

| Variable | Tipo | Descripción |
| --- | --- | --- |
| `query` | `string` | Borrador visible; se resincroniza si cambia la URL |
| `activeFilter` | `string` | `urlFilter` resuelto |
| `filters` | `array` | `contentFilters` |
| `results` | `array` | Contenidos filtrados por la URL |
| `total` | `number` | Total del catálogo |
| `committedQuery` | `string` | Consulta realmente aplicada |
| `hasFilters` | `boolean` | Hay `q` o filtro distinto de `all` |
| `handleQueryChange` | `función` | Actualiza solo el borrador |
| `handleSubmit` | `función` | Compromete texto y filtro actuales |
| `handleFilterChange` | `función` | Compromete el filtro con el texto actual |
| `clearFilters` | `función` | Limpia borrador, `q` y `filtro` |

`updateParams(nextQuery, nextFilter)` construye un `URLSearchParams` limpio,
recorta el texto, omite `q` vacío y omite `filtro=all`, y llama a
`setSearchParams(params, { replace: true })`.

La estrategia `draft.source === urlQuery` evita `setState` dentro de un efecto:
si la URL cambia por navegación externa, el input muestra el valor nuevo; si el
usuario escribe, se conserva el borrador.

`useDocumentTitle` alterna entre `Resultados para <q> | Vitalis` y
`Búsqueda | Vitalis`.

---

## 10. Contenidos

Página: `src/pages/contenidos/Contenidos.jsx`.
Hook: `src/pages/contenidos/hooks/useContentsPage.js`.

| Variable | Tipo | Descripción |
| --- | --- | --- |
| `query` | `string` | Búsqueda en vivo |
| `activeFilter` | `string` | Filtro activo |
| `filters` | `array` | `contentFilters` |
| `results` | `array` | Catálogo filtrado con `useMemo` |
| `total` | `number` | Total de contenidos |
| `hasFilters` | `boolean` | `query.trim()` o filtro distinto de `all` |
| `handleQueryChange` | `función` | Actualiza el texto |
| `handleFilterChange` | `función` | Actualiza el filtro |
| `clearFilters` | `función` | Limpia texto y filtro |
| `clearQuery` | `función` | Limpia solo el texto |

La búsqueda es inmediata: cada cambio de `query` o `activeFilter` recalcula
`results`. El botón “Limpiar búsqueda” del input solo borra el texto; “Limpiar
filtros” reinicia ambos.

---

## 11. Favoritos y hábitos

### 11.1 Estado global de favoritos

Archivo: `src/context/hooks/useFavoritesState.js`.

```js
const [favorites, setFavorites] = useState(() => new Set())
```

| Variable | Tipo | Descripción |
| --- | --- | --- |
| `favorites` | `Set<string>` | IDs de contenidos guardados |
| `toggleFavorite(contentId)` | `función` | Crea un nuevo `Set` y añade/elimina |
| `isFavorite(contentId)` | `función` | Consulta el `Set` |

`toggleFavorite` es `useCallback` y usa actualización funcional para no mutar el
estado anterior. `isFavorite` depende de `favorites`, por lo que las tarjetas se
re-renderizan al cambiar.

El estado vive en memoria: **se pierde al recargar la página**, pero se conserva
al navegar entre rutas de la SPA.

### 11.2 Estado global de hábitos

Archivo: `src/context/hooks/useHabitsState.js`.

```js
const [habits, setHabits] = useState(initialHabits)
```

| Variable | Tipo | Descripción |
| --- | --- | --- |
| `habits` | `array` | Los 5 hábitos |
| `toggleHabit(habitId)` | `función` | Alterna `completed` por ID |
| `completedCount` | `number` | Hábitos completados |
| `totalCount` | `number` | Total (`5`) |
| `progress` | `number` | Porcentaje redondeado `0–100` |

`toggleHabit` mapea el array y crea un objeto nuevo solo para el hábito tocado.
Los consumidores son `useHabitsOverview` (Home/Hábitos) y `useFavoritesPage`.

### 11.3 Página de favoritos

Hook: `src/pages/favoritos/hooks/useFavoritesPage.js`.

| Variable | Tipo | Descripción |
| --- | --- | --- |
| `favoriteContents` | `array` | Contenidos del catálogo cuyo ID está en `favorites` |
| `favoriteCount` | `number` | `favorites.size` |
| `habits` | `array` | Primeros 3 hábitos para el panel lateral |
| `pendingCount` | `number` | Hábitos pendientes sobre los 5 totales |
| `completedCount` | `number` | Completados |
| `totalCount` | `number` | Total |
| `progress` | `number` | Porcentaje |
| `toggleHabit` | `función` | Alterna un hábito |

La página muestra tarjetas de resumen, los contenidos guardados, una barra de
progreso y 3 hábitos. Si no hay favoritos, muestra un estado vacío con enlace a
`/contenidos`.

---

## 12. Perfil

Hook: `src/pages/perfil/hooks/useProfile.js`.
Página: `src/pages/perfil/Perfil.jsx`.

| Variable | Tipo | Descripción |
| --- | --- | --- |
| `isAuthenticated` | `boolean` | Hay sesión |
| `session` | objeto o `null` | Sesión activa |
| `user` | objeto | Usuario mock o fusionado |
| `summary` | objeto | Resumen diario |
| `displayName` | `string` | `session.name` o `''` |
| `initials` | `string` | Iniciales del nombre (`getInitials`) |
| `providerLabel` | `string` | `Correo electrónico`, `Google` o `Apple` |
| `sessionDate` | `string` | Fecha formateada en `es-ES` |
| `isRemembered` | `boolean` | `session.remember` |
| `stats` | objeto | `completedCount`, `totalCount`, `progress`, `favoriteCount`, `streakDays` |
| `notice` | `string` | “Has cerrado sesión correctamente.” |
| `isLoggingOut` | `boolean` | `logoutStatus === 'loading'` |
| `handleLogout` | `función async` | Espera 600 ms, hace logout y muestra aviso |

Comportamiento:

- Con sesión: muestra nombre, correo, método de acceso, persistencia, fecha,
  estadísticas, favoritos y accesos rápidos.
- Sin sesión: muestra “Modo invitado”, botones a `/login` y `/registro`, y
  estadísticas locales (hábitos/favoritos en memoria).
- `handleLogout` evita doble clic mientras `logoutStatus` es `loading`.
- Tras cerrar sesión, `notice` queda visible en esa montura del componente; al
  navegar o recargar desaparece.
- La racha (`streakDays`) proviene de `currentUser` y no se modifica.

---

## 13. Componentes compartidos, layout y autenticación

### 13.1 Layout

| Componente | Archivo | Variables/props | Funcionalidad |
| --- | --- | --- | --- |
| `AppLayout` | `components/layout/AppLayout.jsx` | — | Compone header, outlet, footer y nav móvil |
| `Header` | `components/layout/Header.jsx` | `navItems`, `user` | Navegación de escritorio, racha, avatar, CTA a `/habitos` |
| `DesktopNavLink` | Igual | `item` | Enlace activo con `NavLink` |
| `MobileNavLink` | Igual | `item` | Variante móvil del enlace |
| `MobileHeader` | `components/layout/MobileHeader.jsx` | `user` | Avatar, marca, racha y notificaciones |
| `MobileBottomNav` | `components/layout/MobileBottomNav.jsx` | `items` | 5 destinos: Dashboard, Explorar, Hábitos, Favoritos, Perfil |
| `Footer` | `components/layout/Footer.jsx` | `footerLinks`, `currentYear` | Enlaces legales de escritorio |

Notas:

- “Nuevo Registro” del header solo se muestra desde `xl` (1280 px) para evitar
  overflow a 1024 px; enlaza a `/habitos`.
- El botón de notificaciones y su punto rojo son decorativos; no abren panel.
- La racha que se muestra es `user.streakDays` (14 por defecto).
- `MobileHeader` y `MobileBottomNav` solo se ven por debajo de `lg`.

### 13.2 Autenticación

| Componente | Archivo | Props | Rol |
| --- | --- | --- | --- |
| `AuthBrand` | `components/auth/AuthBrand.jsx` | `showPortal`, `icon` | Marca y portal |
| `AuthHeader` | `pages/login/components/AuthHeader.jsx` | — | Header de login de escritorio |
| `AuthVisualPanel` | `pages/login/components/AuthVisualPanel.jsx` | — | Panel visual con imagen y cita |
| `AuthFooter` | `components/auth/AuthFooter.jsx` | — | Footer legal |
| `MobileAuthHeader` | `components/auth/MobileAuthHeader.jsx` | `step`, `backTo`, `backLabel` | Header móvil con volver y paso |
| `SecurityNotice` | `components/auth/SecurityNotice.jsx` | `variant` | Aviso de seguridad desktop/móvil |
| `SocialAuthButtons` | `components/auth/SocialAuthButtons.jsx` | `variant`, `onSelect` | Botones Google/Apple con carga |
| `PasswordStrengthBars` | `pages/registro/components/PasswordStrengthBars.jsx` | `score`, `tone`, `segments` | Barras de fuerza |
| `DesktopLoginForm` | `pages/login/components/DesktopLoginForm.jsx` | — | Formulario y recuperación |
| `MobileLoginForm` | `pages/login/mobile/MobileLoginForm.jsx` | — | Formulario móvil y recuperación |
| `PasswordRecoveryDialog` | `pages/login/components/PasswordRecoveryDialog.jsx` | `recovery`, `idPrefix` | Diálogo de recuperación |
| `DesktopRegisterForm` | `pages/registro/components/DesktopRegisterForm.jsx` | — | Formulario desktop |
| `MobileRegisterForm` | `pages/registro/mobile/MobileRegisterForm.jsx` | — | Formulario móvil |
| `RegisterHeader` | `pages/registro/components/RegisterHeader.jsx` | — | Header de registro |
| `RegisterBenefitsPanel` | `pages/registro/components/RegisterBenefitsPanel.jsx` | — | Beneficios y prueba social |

### 13.3 Variables visuales de los formularios

`DesktopLoginForm` y `MobileLoginForm` consumen `useLoginForm`; además de los
campos, usan:

| Variable | Tipo | Descripción |
| --- | --- | --- |
| `isSuccess` | `boolean` | Muestra el aviso de éxito |
| `isSubmitting` | `boolean` | Deshabilita el botón y muestra spinner |
| `recovery` | objeto | Se pasa completo al diálogo |
| IDs | `string` | `desktop-email`, `desktop-password`, `mobile-email`, `mobile-password` |

`DesktopRegisterForm` y `MobileRegisterForm` consumen `useRegisterForm` y añaden:

| Variable | Tipo | Descripción |
| --- | --- | --- |
| `match` | objeto | Icono, texto y clase según `matchStatus` |
| `hasConfirmError` | `boolean` | Error de confirmación o desajuste |
| `FieldError` | componente | Mensaje `role="alert"` con icono |
| IDs | `string` | Prefijo `register-desktop` o `register-mobile` |

Diferencias:

- Escritorio muestra newsletter y 3 barras de fuerza.
- Móvil no muestra newsletter y usa 4 barras.
- Ambos exigen términos y comparten validaciones.

### 13.4 Tarjetas de contenido

| Componente | Archivo | Props | Hook |
| --- | --- | --- | --- |
| `ContentCard` | `pages/home/ContentCard.jsx` | `content` | `useFavoriteContent` |
| `MobileContentCard` | `pages/home/mobile/MobileContentCard.jsx` | `content` | `useFavoriteContent` |

Ambas tarjetas:

- Muestran imagen, badges, etiquetas, duración, dificultad, título y categoría.
- Alternan el corazón con `favorite` y `handleToggleFavorite`.
- Usan `aria-label` “Guardar en favoritos” / “Quitar de favoritos” y
  `aria-pressed`.
- El botón CTA de la tarjeta es visual; no abre un detalle ni navega.

---

## 14. Utilidades

### 14.1 `utils/validation.js`

| Función | Entrada | Salida | Reglas |
| --- | --- | --- | --- |
| `isValidEmail(value)` | `string` | `boolean` | `EMAIL_PATTERN` sobre `trim()` |
| `validateLoginFields({ email, password })` | objeto | `{ email?, password? }` | Correo requerido/válido; contraseña requerida/≥8 |
| `validateRegisterFields({...})` | objeto | `{...}` | Nombre ≥2, correo válido, contraseña ≥8, confirmación igual, términos |
| `hasErrors(errors)` | objeto | `boolean` | Algún valor truthy |

Códigos generados:

| Campo | Código | Significado |
| --- | --- | --- |
| `email` | `required` | Vacío |
| `email` | `invalid` | No cumple el patrón |
| `password` | `required` | Vacío |
| `password` | `short` | Menos de 8 caracteres |
| `fullName` | `required` | Vacío |
| `fullName` | `short` | Menos de 2 caracteres |
| `confirmPassword` | `required` | Vacío |
| `confirmPassword` | `mismatch` | No coincide con la contraseña |
| `acceptedTerms` | `required` | No aceptados |

Los hooks traducen estos códigos a textos de `loginCopy.validation` y
`registerCopy.validation`. Para cambiar un mensaje, se edita el copy; para
cambiar una regla, se edita `validation.js`.

### 14.2 `utils/content.js`

`filterContents(contents, { query = '', filterId = 'all' })`:

1. Filtra por categoría: `filterId === 'all'` o
   `content.filterIds.includes(filterId)`.
2. Filtra por texto con `matchesQuery`.
3. `matchesQuery` normaliza a minúsculas y busca en título, descripción,
   categoría, etiquetas (`tags[].label`) y categoría móvil.
4. Un texto vacío devuelve todos los contenidos del filtro.

### 14.3 `utils/user.js`

| Función | Entrada | Salida | Comportamiento |
| --- | --- | --- | --- |
| `getDisplayNameFromEmail(email)` | correo | nombre | Toma la parte local, separa por `.`, `_` o `-`, capitaliza |
| `getFirstName(name)` | nombre | primera palabra | `trim()` + split por espacios |
| `getInitials(name)` | nombre | 1–2 iniciales | Primeras dos palabras; fallback `V` |
| `formatSessionDate(value)` | ISO | fecha local | `Intl.DateTimeFormat('es-ES', { dateStyle: 'long', timeStyle: 'short' })` |

### 14.4 `utils/async.js`

`wait(milliseconds)` devuelve una promesa que se resuelve con
`window.setTimeout`. Se usa para simular latencia:

- Login: 850 ms.
- Recuperación: 900 ms.
- Registro: 950 ms.
- Logout: 600 ms.
- Acceso social: 650 ms.

### 14.5 `hooks/useDocumentTitle.js`

Guarda el título anterior, aplica el nuevo y lo restaura en el cleanup. Se usa
en todas las páginas para mantener el título de la pestaña.

### 14.6 `hooks/useSocialAuthLogin.js`

Recibe `{ redirectTo = '/' }`. Devuelve una función `useCallback` que hace login
con el perfil social, `remember: true`, y navega con `replace: true`.

---

## 15. Datos mock

### 15.1 `data/homeData.js`

| Export | Tipo | Contenido |
| --- | --- | --- |
| `currentUser` | objeto | Camila, racha de 14 días, avatar |
| `dailySummary` | objeto | Meta 68%, hidratación, vitalidad |
| `dailyMetrics` | array | Hidratación, calorías, actividad y sueño (con variante móvil) |
| `contentFilters` | array | `all`, desayunos, sin gluten, HIIT, fuerza, mindfulness |
| `recommendedContent` | array | 2 contenidos completos (salmón y core) |
| `initialHabits` | array | 5 hábitos; 3 completados |
| `weeklyConsistency` | array | 7 días; el domingo es “Hoy” |
| `weeklyAdherence` | string | `92% de adherencia` |
| `weeklyAdherenceMobile` | string | `92% promedio` |
| `wellnessTip` | objeto | Tip de luz solar y referencia |
| `weeklyChallenge` | objeto | Reto de 5 cenas, progreso 60%, textos desktop/móvil |

### 15.2 `data/loginData.js`

| Export | Uso |
| --- | --- |
| `authBrand` | Marca, portal, soporte y CTA |
| `authVisual` | Imagen, badge, título, descripción y cita |
| `loginCopy` | Todo el copy del login, validaciones, feedback y recuperación |
| `authSecurity` | Aviso de seguridad desktop/móvil |

### 15.3 `data/registerData.js`

| Export | Uso |
| --- | --- |
| `registerCopy` | Copy, validaciones, feedback, términos, newsletter y fuerza |
| `registerBenefits` | Panel de beneficios, features y prueba social |

### 15.4 `data/authData.js`

| Export | Uso |
| --- | --- |
| `socialProfiles` | Perfiles mock de Google y Apple |
| `providerLabels` | Etiquetas de proveedor para el perfil |

---

## 16. Flujos de extremo a extremo

### 16.1 Login con correo

1. `/login` monta `Login` → variante desktop o móvil.
2. El formulario escribe `email`, `password` y opcionalmente `remember`.
3. Al enviar, `useLoginForm` valida con `validateLoginFields`.
4. Si hay errores, se muestran junto a cada campo y no se navega.
5. Si es válido, `status = loading`, espera 850 ms y llama a `login`.
6. `useAuthSession` crea la sesión y la guarda en el storage según `remember`.
7. `status = success`, se muestra el aviso y a los 900 ms se navega a `/`.
8. Home y Header leen `useUser` y muestran el nombre derivado del correo.

### 16.2 Sesión recordada vs. temporal

| Acción | `remember` | Storage | Persiste al cerrar pestaña |
| --- | --- | --- | --- |
| Login con “Recordarme” | `true` | `localStorage` | Sí |
| Login sin “Recordarme” | `false` | `sessionStorage` | No |
| Registro | `true` (forzado) | `localStorage` | Sí |
| Acceso social | `true` (forzado) | `localStorage` | Sí |

### 16.3 Recuperación

1. El usuario pulsa “¿Olvidaste tu contraseña?”.
2. `handleForgotPassword` llama a `recovery.open(email)`.
3. El diálogo valida correo requerido y formato.
4. `status = loading` durante 900 ms; luego `success`.
5. Se muestra el correo y el aviso de que el envío es simulado.
6. “Entendido” cierra; “Usar otro correo” reinicia el formulario.

### 16.4 Registro

1. `/registro` monta la variante correspondiente.
2. El usuario completa nombre, correo, contraseña, confirmación y términos.
3. La fuerza y la coincidencia se calculan en tiempo real.
4. Al enviar, se validan todos los campos; si hay error, foco en el primero.
5. `status = loading` durante 950 ms.
6. Se crea la sesión persistente y se navega a `/` tras 1000 ms.
7. El perfil muestra el nombre real y el proveedor “Correo electrónico”.

### 16.5 Búsqueda desde Home

1. En Home, `useSearchForm` mantiene `query` y `activeFilter`.
2. Al enviar, `buildSearchPath` genera `/busqueda?q=...&filtro=...`.
3. `useBusquedaPage` lee los parámetros y calcula `results`.
4. El input de la página se sincroniza con la URL.
5. Cambiar filtro o enviar actualiza la URL con `replace`.
6. “Limpiar búsqueda” elimina ambos parámetros y muestra el catálogo completo.

### 16.6 Favorito

1. `ContentCard` usa `useFavoriteContent(content.id)`.
2. El corazón llama a `toggleFavorite`.
3. `useFavoritesState` crea un nuevo `Set` y actualiza el contexto.
4. La tarjeta cambia el icono y `aria-pressed`.
5. `/favoritos` filtra `recommendedContent` por los IDs guardados.
6. Al recargar, el `Set` vuelve a estar vacío.

### 16.7 Hábito

1. `HabitsSection`/`MobileHabits` obtienen `habits` y `toggleHabit`.
2. El checkbox o botón circular llama a `toggleHabit(habit.id)`.
3. El provider actualiza `completed` y recalcula contadores.
4. Cambian el banner, el badge, la gráfica semanal, `/habitos` y `/favoritos`.
5. Al recargar, se vuelve a `initialHabits`.

### 16.8 Logout

1. `/perfil` muestra “Cerrar sesión” si hay sesión.
2. `handleLogout` pone `logoutStatus = loading` y espera 600 ms.
3. `logout()` limpia `localStorage` y `sessionStorage` y deja `session = null`.
4. El perfil pasa a “Modo invitado” y muestra el aviso.
5. Header/Home vuelven al usuario mock.

---

## 17. Limitaciones y comportamiento no persistente

- **Sin backend:** no hay API, base de datos ni validación real de
  credenciales. Cualquier correo válido y contraseña de 8+ caracteres entra.
- **Recuperación simulada:** no se envía correo real; el diálogo solo confirma
  el flujo.
- **Acceso social simulado:** no se abre OAuth ni se valida identidad. Usa
  perfiles mock.
- **Sesión:** solo se guardan `id`, `name`, `email`, `provider`, `remember` y
  `loggedInAt`. No se guardan contraseñas.
- **Favoritos y hábitos:** estado en memoria; se reinician al recargar. Solo la
  sesión persiste.
- **Desafío semanal:** el registro de cena es local y se pierde al recargar. En
  móvil la tarjeta es informativa/estática.
- **Newsletter:** checkbox visual en escritorio; no se envía ni persiste.
- **CTAs de contenido y notificaciones:** son visuales, sin detalle ni panel.
- **Sin guards de ruta:** `/perfil` funciona en modo invitado; `/login` y
  `/registro` son accesibles con o sin sesión.
- **Datos clínicos:** todos los valores son mock y no representan consejo
  médico real.

---

## 18. Ejecutar y verificar

```bash
npm install
npm run dev
npm run lint
npm run build
npm run preview
```

Rutas de prueba recomendadas:

- `/` — dashboard y búsqueda.
- `/login` — validaciones, recuperación y accesos sociales.
- `/registro` — fuerza, coincidencia y términos.
- `/contenidos` — búsqueda y filtros.
- `/busqueda?q=salmón&filtro=gluten-free` — URL directa.
- `/favoritos` — vacío, guardado y hábitos.
- `/perfil` — invitado, sesión y logout.

Comprobaciones manuales útiles:

1. Iniciar sesión con “Recordarme” y recargar: la sesión debe persistir.
2. Repetir sin “Recordarme” y abrir una pestaña nueva: no debe compartirse.
3. Cerrar sesión: ambos storages deben quedar limpios.
4. Guardar un favorito, navegar a `/favoritos` y recargar: el favorito debe
   desaparecer (estado en memoria).
5. Cambiar un hábito y comprobar banner, gráfica y perfil.
6. Escribir una búsqueda desde Home y verificar `q`/`filtro` en la URL.

---

## 19. Dónde cambiar cada cosa

| Si quieres cambiar… | Edita… |
| --- | --- |
| Textos, placeholders o mensajes de login | `src/data/loginData.js` |
| Textos del registro | `src/data/registerData.js` |
| Perfiles sociales mock | `src/data/authData.js` |
| Reglas de validación | `src/utils/validation.js` |
| Comportamiento de la sesión | `src/context/hooks/useAuthSession.js` |
| Clave o lectura del storage | `src/context/authStorage.js` |
| Flujo de login | `src/pages/login/hooks/useLoginForm.js` |
| Flujo de recuperación | `src/pages/login/hooks/usePasswordRecovery.js` |
| Flujo de registro | `src/pages/registro/hooks/useRegisterForm.js` |
| Cálculo de fuerza | `src/pages/registro/utils/passwordStrength.js` |
| Contenidos, filtros, hábitos o métricas | `src/data/homeData.js` |
| Lógica de búsqueda del catálogo | `src/utils/content.js` |
| Búsqueda desde Home | `src/pages/home/hooks/useSearchForm.js` |
| Búsqueda avanzada y URL | `src/pages/busqueda/hooks/useBusquedaPage.js` |
| Catálogo `/contenidos` | `src/pages/contenidos/hooks/useContentsPage.js` |
| Favoritos | `src/context/hooks/useFavoritesState.js` |
| Hábitos | `src/context/hooks/useHabitsState.js` |
| Perfil y logout | `src/pages/perfil/hooks/useProfile.js` |
| Navegación superior | `src/components/layout/Header.jsx` |
| Navegación inferior móvil | `src/components/layout/MobileBottomNav.jsx` |
| Rutas | `src/App.jsx` |
| Providers globales | `src/main.jsx` |

---

### Resumen de archivos clave

```text
src/
├── context/
│   ├── AuthContext.jsx
│   ├── UserContext.jsx
│   ├── HabitsContext.jsx
│   ├── FavoritesContext.jsx
│   ├── authStorage.js
│   └── hooks/
│       ├── useAuthSession.js
│       ├── useAuth.js
│       ├── useUserProfile.js
│       ├── useUser.js
│       ├── useHabitsState.js
│       ├── useHabits.js
│       ├── useFavoritesState.js
│       └── useFavorites.js
├── hooks/
│   ├── useDocumentTitle.js
│   └── useSocialAuthLogin.js
├── components/
│   ├── auth/hooks/useSocialAuth.js
│   ├── auth/*.jsx
│   ├── layout/*.jsx
│   └── ui/Icon.jsx
├── pages/
│   ├── home/hooks/*.js
│   ├── login/hooks/*.js
│   ├── registro/hooks/useRegisterForm.js
│   ├── registro/utils/passwordStrength.js
│   ├── busqueda/hooks/useBusquedaPage.js
│   ├── contenidos/hooks/useContentsPage.js
│   ├── favoritos/hooks/useFavoritesPage.js
│   └── perfil/hooks/useProfile.js
├── data/
│   ├── homeData.js
│   ├── loginData.js
│   ├── registerData.js
│   └── authData.js
├── utils/
│   ├── validation.js
│   ├── content.js
│   ├── user.js
│   └── async.js
├── App.jsx
└── main.jsx
```

Para una vista rápida de instalación, stack y estado del proyecto, consulta
también `README.md`.

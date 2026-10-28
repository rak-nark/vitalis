# Documentación funcional y de variables — Vitalis

Referencia técnica de la aplicación: qué hace cada funcionalidad, cómo está
implementada, dónde vive y qué variables/estados intervienen.

- **Proyecto:** `Vitalis/`
- **Última revisión:** 28/10/2026
- **Alcance:** flujos simulados sin backend (autenticación, sesión, búsqueda,
  exploración, contenidos, favoritos, hábitos y perfil).

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
9. [Contenidos Saludables (biblioteca)](#9-contenidos-saludables-biblioteca)
10. [Explorar (biblioteca)](#10-explorar-biblioteca)
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
| `/busqueda` | `pages/busqueda/Explorar.jsx` | `AppLayout` | `Explorar \| Vitalis` |
| `/contenidos` | `pages/contenidos/Contenidos.jsx` | `AppLayout` | `Contenidos Saludables \| Vitalis` |
| `/favoritos` | `pages/habitos/Habitos.jsx` | `AppLayout` | `Mis Favoritos y Hábitos \| Vitalis` |
| `/habitos` | Redirección a `/favoritos` | `AppLayout` | — |
| `/perfil` | `pages/perfil/Perfil.jsx` | `AppLayout` | `Mi Perfil \| Vitalis` |
| `*` | Redirección a `/` | — | — |

`AppLayout` (`src/components/layout/AppLayout.jsx`) compone:

1. `Header` (escritorio).
2. `MobileHeader` (móvil).
3. `<Outlet />` con la página.
4. `Footer` (escritorio).
5. `MobileBottomNav` (móvil).

En `App.jsx`, el componente `ScrollToTop` (`src/components/layout/ScrollToTop.jsx`)
escucha los cambios de ruta (`pathname`) y restablece de inmediato el desplazamiento
de la ventana y del documento (`window.scrollTo({ top: 0, left: 0, behavior: 'instant' })`)
hacia el encabezado en cada transición entre páginas de la aplicación.

### 2.1 Separación escritorio/móvil

El breakpoint es `lg` (1024 px). Home, Login, Registro y `/favoritos` montan
ambas variantes y las alternan por CSS (`lg:hidden` / `hidden lg:block`), no por
JavaScript. En esas páginas cada variante tiene su propia instancia de
formulario/hook, por lo que el estado local (por ejemplo, filtros o día
seleccionado) no se comparte; los hábitos y favoritos globales sí viven en sus
contextos. `/perfil`, `/busqueda` y `/contenidos` son la excepción: un único `useProfile`,
`useExplorarPage` o `useContenidosPage` alimenta las dos vistas con el mismo
objeto (`profile`, `explore` o `contenidos`), de modo que edición, preferencias,
avisos y logout —o búsqueda, filtros, favoritos y avisos— se comparten aunque
cambie el viewport.

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
| Explorar biblioteca | `/busqueda` | `pages/busqueda/hooks/useExplorarPage.js` | `Explorar.jsx`, `DesktopExplorar.jsx`, `mobile/MobileExplorar.jsx` y subcomponentes | `exploreContentData.js`, `explorePageData.js` |
| Biblioteca de contenidos | `/contenidos` | `pages/contenidos/hooks/useContenidosPage.js` | `Contenidos.jsx`, `DesktopContenidos.jsx`, `mobile/MobileContenidos.jsx` y subcomponentes | `exploreContents`, `contenidosPageData.js` |
| Favoritos | Corazón de tarjetas y `/favoritos` | `context/hooks/useFavoritesState.js` + `useExplorarPage`/`useHabitosPage` | `ContentCard.jsx`, `MobileContentCard.jsx`, `ExploreContentCard.jsx`, `MobileExploreCard.jsx`, `SavedContents.jsx`, `MobileSavedContents.jsx` | `recommendedContent` |
| Checklist de hábitos | Home y `/favoritos` | `context/hooks/useHabitsState.js` | `HabitsSection.jsx`, `MobileHabits.jsx`, `HabitRow.jsx` | `initialHabits` |
| Página de favoritos y hábitos | `/favoritos` | `useHabitosPage` + `useHabitCard` | `DesktopHabitos.jsx`, `mobile/MobileHabitos.jsx` y subcomponentes | `initialHabits`, `habitsPageData`, `recommendedContent` |
| Desafío semanal | Home escritorio | `pages/home/hooks/useWeeklyChallenge.js` | `WeeklyChallenge.jsx` | `weeklyChallenge` |
| Perfil y logout | `/perfil` | `pages/perfil/hooks/useProfile.js` | `DesktopPerfil.jsx`, `mobile/MobilePerfil.jsx` y subcomponentes | `data/profileData.js`, sesión, hábitos y favoritos |
| Navegación | Global | — | `Header.jsx`, `MobileHeader.jsx`, `MobileBottomNav.jsx` | — |

---

## 4. Inventario de variables de estado

Todas las declaraciones `useState` de la aplicación están en hooks. Esta tabla
es el inventario completo; sirve para localizar de inmediato dónde se guarda
cada dato.

| Archivo | Variable | Declaración | Valor inicial | Función |
| --- | --- | --- | --- | --- |
| `context/hooks/useAuthSession.js` | `session` | `useState(readStoredSession)` | Sesión almacenada o `null` | Sesión activa normalizada |
| `context/hooks/useHabitsState.js` | `habits` | `useState(initialHabits)` | 6 hábitos mock | Lista y estado de hábitos |
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
| `pages/home/hooks/useMobileHabitRow.js` | `expanded` | `useState(false)` | `false` | Detalle clínico desplegado en Home móvil |
| `pages/habitos/hooks/useHabitosPage.js` | `activeTimeFilter` | `useState('all')` | `'all'` | Filtro por momento del día en `/favoritos` |
|  | `selectedDayId` | `useState(fn)` | Día de hoy | Día seleccionado en la semana |
|  | `logStatus` | `useState('idle')` | `'idle'` | Envío simulado de bitácora al médico |
| `pages/habitos/hooks/useHabitCard.js` | `expanded` | `useState(false)` | `false` | Detalle clínico desplegado en tarjetas desktop |
| `pages/contenidos/hooks/useContenidosPage.js` | `draft` | `useState({ source: urlQuery, value: urlQuery })` | Según URL | Borrador del buscador sincronizado con la URL |
|  | `sort` | `useState('recent')` | `'recent'` | Orden de los resultados |
|  | `view` | `useState('grid')` | `'grid'` | Vista de cuadrícula o lista |
|  | `notice` | `useState('')` | `''` | Aviso de favoritos y acciones simuladas |
| `pages/busqueda/hooks/useExplorarPage.js` | `query` | `useState(fn)` | `q` de la URL o `''` | Búsqueda en vivo de Explorar |
|  | `activeFilter` | `useState(fn)` | `filtro` de la URL mapeado o `'all'` | Categoría activa |
|  | `quickFilters` | `useState(defaultQuickFilters)` | `{ duration: 'any', goal: 'any', evidence: 'any', diet: 'any' }` | Filtros rápidos de duración, objetivo, evidencia y dieta |
|  | `isMobileFiltersOpen` | `useState(false)` | `false` | Panel de filtros móvil abierto |
|  | `isLoadingMore` | `useState(false)` | `false` | Carga simulada de más contenidos |
|  | `isFeaturedSaved` | `useState(false)` | `false` | Guía destacada guardada (simulado) |
|  | `notice` | `useState('')` | `''` | Aviso de favoritos y acciones simuladas |
| `pages/perfil/hooks/useProfile.js` | `logoutStatus` | `useState('idle')` | `idle` | Estado del cierre de sesión |
|  | `notice` | `useState('')` | `''` | Aviso de logout y acciones simuladas |
|  | `exportStatus` | `useState('idle')` | `idle` | Generación simulada del informe |
|  | `preferences` | `useState(fn)` | Toggles de `profilePrivacySettings` | Preferencias de privacidad |
|  | `mobilePanel` | `useState(null)` | `null` | Panel móvil abierto: `notifications`, `privacy` o ninguno |
|  | `savedName` | `useState({ sessionId: null, name: '' })` | Objeto | Nombre editado ligado a la sesión |
|  | `isEditing` | `useState(false)` | `false` | Formulario de nombre abierto |
|  | `draftName` | `useState('')` | `''` | Borrador del nombre visible |

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
| `pages/busqueda/hooks/useExplorarPage.js` | `defaultQuickFilters` | `{ duration: 'any', goal: 'any', evidence: 'any', diet: 'any' }` | Valores iniciales y reset de filtros |
| `pages/busqueda/hooks/useExplorarPage.js` | `legacyFilterMap` | `breakfast/gluten-free → nutrition`, `hiit/strength → training`, `mindfulness → mental` | Traduce los filtros de Home a categorías de Explorar |
| `pages/busqueda/components/ExplorePagination.jsx` | `pages` | `[1, 2, 3, 'ellipsis', 24]` | Paginación simulada |
| `components/ui/FavoriteButton.jsx` | `variantStyles` | `overlay`, `mini`, `outline`, `plain` | Variantes visuales del corazón compartido |
| `pages/contenidos/hooks/useContenidosPage.js` | `legacyTypeMap` | `breakfast/gluten-free/nutrition → recipe`, `hiit/strength/training/mindfulness/mental → routine`, `articles/sleep → article` | Traduce los filtros de Home a tipos de `/contenidos` |
| `pages/contenidos/hooks/useContenidosPage.js` | `evidenceRank`, `typeRank` | `level-1 > peer > clinical`; `recipe < article < routine` | Desempate del orden por tipo |
| `data/contenidosPageData.js` | `contentSortOptions` | `recent`, `duration`, `popularity`, `type` | Orden de `/contenidos` |
| `data/contenidosPageData.js` | `contentTypes` | `all`, `recipe`, `article`, `routine` | Filtros por tipo |
| `data/contenidosPageData.js` | `contentCollections` | `all`, `nutrition`, `movement`, `evidence`, `calm` | Colecciones de la biblioteca |
| `data/contenidosPageData.js` | `contentPopularity` | Mapa de los 6 IDs | Orden por popularidad |
| `data/contenidosPageData.js` | `contentPresentation` | Mapa de los 6 IDs | Variante de tarjeta, acciones y copy específico |
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

El catálogo compartido se define en `data/exploreContentData.js` como
`exploreContents` (6 elementos). `homeData.js` exporta `recommendedContent`
mapeando esos mismos objetos y añadiendo `category` desde `homeCategory`, de
modo que Home, `/busqueda`, `/contenidos` y `/favoritos` comparten IDs y
favoritos. Forma relevante:

```js
{
  id: 'nordic-salmon-bowl',
  type: 'recipe',                       // 'recipe' | 'article' | 'routine'
  exploreFilterIds: ['nutrition'],      // categorías de Explorar
  quick: {
    minutes: 20,
    goals: ['longevity', 'anti-inflammatory'],
    evidence: 'peer',
    diets: ['gluten-free', 'mediterranean']
  },
  image: '/images/salmon-bowl.jpg',
  imageAlt: '...',
  badge: 'Nutrición Celular',
  badgeClass: '...',
  title: '...',
  shortTitle: '...',
  description: '...',
  meta: '20 min prep',
  metaIcon: 'schedule',
  secondaryMeta: '420 kcal',
  tags: [{ label: '34g Proteína', className: '...' }],
  evidence: null,
  author: 'Lic. Carlos Méndez',
  authorRole: 'Nutrición Funcional',
  footerNote: '...',
  footerIcon: 'restaurant',
  quote: null,
  cta: 'Ver receta',
  ctaIcon: 'restaurant_menu',
  ctaVariant: 'secondary',
  homeCategory: 'Almuerzo / Cena',
  filterIds: ['breakfast', 'gluten-free'], // filtros de Home/Contenidos Saludables
  mobile: {
    category: 'Nutrición Celular',
    categoryClass: 'text-primary',
    time: '20 min',
    cta: 'Ver receta',
    ctaIcon: 'chevron_right',
    ctaVariant: 'secondary',
    footer: 'Almuerzo antiinflamatorio',
    footerIcon: 'restaurant',
    kcal: '420 kcal',
    protein: '34g Proteína',
    note: ''
  }
}
```

`quick` alimenta los filtros rápidos; `mobile` contiene las variantes compactas
de la tarjeta móvil. Los artículos usan `quote` y `evidence`, y las tarjetas de
Explorar cambian de composición según `type`.

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

No duplica estado; cualquier cambio se refleja en Home, `/favoritos`, el banner y
la gráfica semanal.

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

## 9. Contenidos Saludables (biblioteca)

Página: `src/pages/contenidos/Contenidos.jsx`.
Hook: `src/pages/contenidos/hooks/useContenidosPage.js`.
Datos: `src/data/contenidosPageData.js` (copy, colecciones, tipos, orden y
presentación) y `src/data/exploreContentData.js` (catálogo compartido).
Vistas: `DesktopContenidos.jsx` y `mobile/MobileContenidos.jsx`.

`Contenidos.jsx` ejecuta una sola vez `useContenidosPage` y pasa el mismo objeto
`contenidos` a ambas vistas. Búsqueda, tipo, colección, orden, vista, favoritos y
avisos sobreviven al cambio de viewport; el chrome global (`Header`,
`MobileHeader`, `MobileBottomNav` y `Footer`) lo aporta `AppLayout`. El aviso
compartido se monta una sola vez con `NoticeToast`.

### 9.1 Composición

| Archivo | Rol |
| --- | --- |
| `pages/contenidos/Contenidos.jsx` | Controlador: hook compartido, alternancia desktop/móvil y aviso |
| `pages/contenidos/DesktopContenidos.jsx` | Hero, colecciones, filtros, grid/lista, estado vacío y paginación |
| `pages/contenidos/mobile/MobileContenidos.jsx` | Cabecera compacta, pestañas, buscador/orden, tarjetas y CTA |
| `pages/contenidos/components/ContentHero.jsx` | Contador, buscador con `Ctrl/Cmd + K`, orden y conmutador grid/lista |
| `pages/contenidos/components/ContentCollections.jsx` | Colecciones con conteo real, gestión simulada y “Nueva Colección” |
| `pages/contenidos/components/ContentTypeFilters.jsx` | Chips de tipo con conteo dentro de la colección activa |
| `pages/contenidos/components/ContentLibraryCard.jsx` | Selector de tarjeta según `contentPresentation.desktopVariant` |
| `pages/contenidos/components/ContentVisualCard.jsx` | Tarjeta visual de receta/rutina con macros o equipo, CTA y acciones |
| `pages/contenidos/components/ContentArticleCard.jsx` | Tarjeta de artículo con autoría, cita o insight y acción clínica |
| `pages/contenidos/components/ContentRoutineCard.jsx` | Tarjeta de rutina con impacto biométrico, recomendación y agenda |
| `pages/contenidos/components/ContentPagination.jsx` | Resumen “Mostrando X de Y” y paginación de una sola página |
| `pages/contenidos/components/ContentEmptyState.jsx` | Estado vacío con reinicio de búsqueda, tipo y colección |
| `pages/contenidos/mobile/MobileContentHeader.jsx` | Título, conteo y descripción móvil |
| `pages/contenidos/mobile/MobileContentTypeFilters.jsx` | Pestañas deslizables por tipo |
| `pages/contenidos/mobile/MobileContentToolbar.jsx` | Buscador y orden rápido |
| `pages/contenidos/mobile/MobileLibraryCard.jsx` | Variantes `recipeHero`, `recipeCompact`, `article` y `routine` |
| `pages/contenidos/mobile/MobileNewCollectionCta.jsx` | CTA inferior “+ Nueva Colección” |
| `components/ui/FavoriteButton.jsx` | Corazón compartido con `/busqueda` |
| `components/ui/NoticeToast.jsx` | Aviso `role="status"` compartido con `/busqueda` |

### 9.2 Contrato de URL

| Parámetro | Ejemplo | Regla |
| --- | --- | --- |
| `q` | `?q=salmón` | Texto libre; se recorta con `trim()`; se omite si queda vacío |
| `filtro` | `?filtro=recipe` | Debe ser un tipo de `contentTypes` o un filtro heredado; si no, `all` |
| `coleccion` | `?coleccion=calm` | Debe existir en `contentCollections`; si no, `all` |

`updateParams(nextQuery, nextType, nextCollection)` construye un
`URLSearchParams` limpio y llama a `setSearchParams(params, { replace: true })`.
La URL es la fuente de verdad de la búsqueda comprometida; el formulario usa un
borrador local (`draft.source === urlQuery`) para escribir sin actualizar la URL
en cada tecla.

`filtro` también acepta los identificadores de Home y los traduce a tipos:

| `filtro` heredado | Tipo |
| --- | --- |
| `breakfast`, `gluten-free`, `nutrition` | `recipe` |
| `hiit`, `strength`, `training`, `mindfulness`, `mental` | `routine` |
| `articles`, `sleep` | `article` |

Cualquier otro valor cae en `all`.

### 9.3 Estado y derivados de `useContenidosPage`

| Variable | Tipo | Descripción |
| --- | --- | --- |
| `copy` | objeto | `contenidosCopy` |
| `sortOptions` | array | `contentSortOptions` |
| `typeFilters` | array | `contentTypes` con conteo dentro de la colección activa |
| `collections` | array | `contentCollections` con conteo real |
| `results` | array | Contenidos de la colección que cumplen tipo y búsqueda, ya ordenados |
| `total` | `number` | Total del catálogo (`exploreContents.length`, 6) |
| `collectionTotal` | `number` | Contenidos de la colección activa antes de tipo/búsqueda |
| `query` | `string` | Borrador visible; se resincroniza si cambia la URL |
| `activeType` | `string` | Tipo resuelto desde `filtro` |
| `activeCollection` | `string` | Colección resuelta desde `coleccion` |
| `sort` | `string` | `recent`, `duration`, `popularity` o `type` |
| `view` | `string` | `grid` o `list` |
| `hasFilters` | `boolean` | Hay `q` comprometida, tipo o colección distinta de `all` |
| `notice` | `string` | Aviso visible de la página |
| `searchInputRef` | `ref` | Foco del buscador con `Ctrl/Cmd + K` |
| `isFavorite` | `función` | Consulta `FavoritesContext` |
| `handleQueryChange` | `función` | Actualiza solo el borrador |
| `handleSubmit` | `función` | Compromete texto, tipo y colección en la URL |
| `handleClearQuery` | `función` | Limpia la búsqueda y la URL |
| `handleTypeChange` | `función` | Cambia el tipo y lo escribe en la URL |
| `handleCollectionChange` | `función` | Cambia la colección y la escribe en la URL |
| `handleSortChange` | `función` | Cambia el orden (estado local) |
| `handleViewChange` | `función` | Cambia entre grid y lista (estado local) |
| `handleResetFilters` | `función` | Limpia búsqueda, tipo y colección, y vuelve a `recent` |
| `handleToggleFavorite` | `función` | Alterna el favorito y muestra aviso |
| `handleOpenContent` | `función` | Aviso de apertura simulada |
| `handleAction` | `función` | Resuelve acciones de tarjeta desde `contenidosCopy` |
| `handleCreateCollection` | `función` | Aviso de creación simulada |
| `handleManageCollections` | `función` | Aviso de gestión simulada |
| `handlePageChange` | `función` | Aviso de paginación simulada |
| `handleDismissNotice` | `función` | Cierra el aviso |

El atajo `Ctrl/Cmd + K` enfoca `searchInputRef`; se registra en un efecto y se
retira al desmontar.

### 9.4 Filtrado, colecciones y orden

1. `collectionContents` filtra `exploreContents` por la colección activa:
   - `nutrition` incluye `recipe`;
   - `movement` incluye `routine`;
   - `evidence` incluye `article`;
   - `calm` usa IDs concretos (`circadian-glucose`, `vagal-mobility`);
   - `all` no filtra.
2. `typeFilters` cuenta `all`, recetas, artículos y entrenamientos (rutinas)
   dentro de la colección activa. El chip de escritorio dice “Entrenamientos”,
   como `content.html`; el móvil dice “Rutinas”, como `content2.html`.
3. `results` aplica el tipo activo y `matchesContentQuery` de
   `src/utils/content.js`, que normaliza mayúsculas y acentos y busca en título,
   `shortTitle`, descripción, categoría, badge, autoría, evidencia, etiquetas y
   campos `mobile`.
4. El orden se aplica al final:
   - `recent`: orden del catálogo;
   - `duration`: minutos ascendentes;
   - `popularity`: `contentPopularity` descendente;
   - `type`: receta → artículo → rutina y, dentro del mismo tipo, mayor
     evidencia (`level-1`, `peer`, `clinical`).

Los conteos son reales: 6 en total y 2 por cada colección. `Rituales de Calma`
se solapa con otras colecciones, por lo que los conteos no suman el total. La
referencia muestra 24 contenidos; la demo conserva 6 y una sola página.

### 9.5 Tarjetas, favoritos y avisos

`contentPresentation` decide la variante de cada contenido:

| ID | Escritorio | Móvil | Rasgo |
| --- | --- | --- | --- |
| `nordic-salmon-bowl` | visual | `recipeHero` | Macros clínicos; plan semanal y compartir |
| `circadian-glucose` | article | `article` | Autoría, cita y “Notas” |
| `vagal-mobility` | visual | `routine` | Equipo, articulaciones y agenda |
| `chia-cacao-pudding` | visual | `recipeCompact` | Perfil prebiótico y lista de compras |
| `scfa-longevity` | article | `article` | Insight de revisión clínica y “Mi plan” |
| `zone2-mitochondria` | routine | `routine` | Impacto biométrico y agenda |

- El corazón usa `FavoritesContext`: al entrar, los seis IDs de
  `defaultFavoriteIds` ya están guardados. Cada cambio muestra un aviso propio y
  se refleja en Home, `/busqueda` y `/favoritos` durante la navegación SPA.
- “Nueva Colección”, “Gestionar colecciones”, “Ver receta/artículo/rutina”,
  “Notas”, “Mi plan”, compartir, plan semanal, lista de compras, agenda y
  paginación son acciones simuladas que muestran un aviso.
- La paginación de escritorio muestra “Mostrando X de Y” con los conteos reales;
  si hay búsqueda, tipo o colección activos cambia el sufijo a “en la selección
  actual”. “Anterior” y “Siguiente” están deshabilitados porque solo existe una
  página.
- El estado vacío permite reiniciar búsqueda, tipo y colección.
- En escritorio (`≥ 1024 px`) se muestra el hero completo, las colecciones
  deslizables, los chips de tipo, el grid de 3 columnas o la lista y la
  paginación. En móvil (`< 1024 px`) se muestra la cabecera compacta, una franja
  con la colección activa cuando llega por URL, las pestañas de tipo, el buscador
  con orden, las tarjetas apiladas, el CTA de nueva colección y el aviso por
  encima del bottom nav.

---

## 10. Explorar (biblioteca)

Página: `src/pages/busqueda/Explorar.jsx`.
Hook único: `src/pages/busqueda/hooks/useExplorarPage.js`.
Datos: `src/data/exploreContentData.js` y `src/data/explorePageData.js`.
Vistas: `DesktopExplorar.jsx` y `mobile/MobileExplorar.jsx`.

`Explorar.jsx` ejecuta una sola vez `useExplorarPage` y pasa el mismo objeto
`explore` a ambas vistas. La página representa la biblioteca “Explorar” y
conserva el catálogo compartido con Home, `/contenidos` y `/favoritos`.

### 10.1 Composición

| Archivo | Rol |
| --- | --- |
| `pages/busqueda/DesktopExplorar.jsx` | Cabecera, buscador, tendencias, categorías, filtros rápidos, guía, grid de tarjetas y paginación |
| `pages/busqueda/mobile/MobileExplorar.jsx` | Header compacto, panel de filtros, tendencias, categorías, guía, tarjetas y carga simulada |
| `pages/busqueda/components/ExploreHeader.jsx` | Breadcrumb, título, descripción, sello de actualización y EBM |
| `pages/busqueda/components/DesktopSearch.jsx` | Buscador con `Ctrl/Cmd + K`, búsquedas recientes y acceso a filtros |
| `pages/busqueda/components/TrendingTopics.jsx` | Chips de tendencias en versión escritorio y móvil |
| `pages/busqueda/components/CategoryFilters.jsx` | Categorías con conteos en versión escritorio y móvil |
| `pages/busqueda/components/QuickFilters.jsx` | Selects de duración, objetivo, evidencia y dieta |
| `pages/busqueda/components/FeaturedGuide.jsx` | Guía destacada de escritorio y guardado simulado |
| `pages/busqueda/components/ExploreContentCard.jsx` | Tarjeta de artículo o tarjeta visual con CTA y corazón |
| `components/ui/FavoriteButton.jsx` | Corazón reutilizable con variantes `overlay`, `mini`, `outline` y `plain`; compartido con `/contenidos` |
| `pages/busqueda/components/ExplorePagination.jsx` | “Cargar más” y paginación simulada |
| `pages/busqueda/components/ExploreEmptyState.jsx` | Estado vacío con reinicio de filtros |
| `components/ui/NoticeToast.jsx` | Aviso global `role="status"` compartido con `/contenidos` |
| `pages/busqueda/mobile/MobileExploreHeader.jsx` | Título, conteo, buscador y botón de filtros con badge |
| `pages/busqueda/mobile/MobileFilterPanel.jsx` | Panel plegable de filtros rápidos |
| `pages/busqueda/mobile/MobileFeaturedGuide.jsx` | Guía destacada compacta y guardado simulado |
| `pages/busqueda/mobile/MobileExploreCard.jsx` | Tarjetas compactas de artículo, receta o rutina |

### 10.2 Estado y derivados de `useExplorarPage`

| Variable | Tipo | Descripción |
| --- | --- | --- |
| `copy` | objeto | `exploreCopy` |
| `featured` | objeto | `exploreFeatured` |
| `filters` | array | `exploreFilters` (categorías con conteos) |
| `trends` | array | `exploreTrends` |
| `recentSearches` | array | `exploreRecentSearches` |
| `quickFilterGroups` | array | `exploreQuickFilters` |
| `results` | array | Contenidos que cumplen categoría, filtros rápidos y búsqueda |
| `totalLibrary` | `number` | `142`, total simulado de la biblioteca |
| `query` | `string` | Texto de búsqueda en vivo; se inicializa con `q` |
| `activeFilter` | `string` | Categoría activa (`all` por defecto); se inicializa con `filtro` |
| `quickFilters` | objeto | `duration`, `goal`, `evidence` y `diet` |
| `activeFilterCount` | `number` | Filtros rápidos activos + categoría distinta de `all` |
| `hasFilters` | `boolean` | Hay texto, categoría o filtro rápido activo |
| `isMobileFiltersOpen` | `boolean` | Panel móvil desplegado |
| `isLoadingMore` | `boolean` | Carga simulada en curso |
| `isFeaturedSaved` | `boolean` | Guía destacada marcada (estado local) |
| `notice` | `string` | Aviso visible de la página |
| `isFavorite` | `función` | Consulta `FavoritesContext` |
| `handleQueryChange` | `función` | Actualiza la búsqueda |
| `handleClearQuery` | `función` | Limpia solo el texto |
| `handleFilterChange` | `función` | Cambia la categoría |
| `handleQuickFilterChange` | `función` | Cambia un filtro rápido por grupo |
| `handleResetFilters` | `función` | Limpia búsqueda, categoría y filtros rápidos |
| `handleSearchSuggestion` | `función` | Aplica una tendencia o búsqueda reciente |
| `handleToggleMobileFilters` | `función` | Abre o cierra el panel móvil |
| `handleToggleFavorite` | `función` | Alterna el favorito y muestra aviso |
| `handleOpenContent` | `función` | Aviso de apertura simulada del contenido |
| `handleOpenFeatured` | `función` | Aviso de apertura simulada de la guía |
| `handleToggleFeaturedSaved` | `función` | Guarda o quita la guía con aviso |
| `handlePageChange` | `función` | Aviso de paginación simulada |
| `handleLoadMore` | `función async` | Espera 700 ms y muestra el final de la demo |

La URL se lee solo al montar: `q` inicializa `query` y `filtro` inicializa
`activeFilter`. `resolveInitialFilter` acepta los ids de `exploreFilters` y
traduce los filtros del catálogo de Home:

| `filtro` de Home | Categoría de Explorar |
| --- | --- |
| `breakfast`, `gluten-free` | `nutrition` |
| `hiit`, `strength` | `training` |
| `mindfulness` | `mental` |

Si el filtro no existe en ninguno de los dos catálogos, se usa `all`. Los
cambios posteriores de búsqueda o categoría viven en el estado local y no se
escriben de vuelta en la URL.

### 10.3 Filtrado

`results` se calcula con `useMemo` y aplica, en este orden:

1. **Categoría:** `activeFilter === 'all'` o
   `content.exploreFilterIds.includes(activeFilter)`.
2. **Filtros rápidos** (`matchesQuickFilters`):
   - `duration`: `15` y `30` limitan por minutos; `45` exige 45 minutos o más.
   - `goal`: debe estar en `content.quick.goals`.
   - `evidence`: debe coincidir con `content.quick.evidence`.
   - `diet`: debe estar en `content.quick.diets`.
3. **Texto** (`matchesContentQuery`): normaliza mayúsculas y acentos y busca en
   título, título corto, descripción, badge, autoría, evidencia, categoría móvil,
   footer móvil, nota móvil y etiquetas.

Las tendencias y búsquedas recientes llaman a `handleSearchSuggestion`, que
aplica el texto y reinicia categoría y filtros rápidos. El estado vacío ofrece
`handleResetFilters`; el botón “Ver filtros” de la sección de resultados abre el
panel móvil si está cerrado y hace scroll al inicio.

### 10.4 Comportamiento

- La búsqueda es inmediata en ambas vistas; no se envía a la URL ni navega,
  salvo los parámetros `q`/`filtro` que recibe al montar desde Home.
- El atajo `Ctrl/Cmd + K` solo existe en el buscador de escritorio y hace foco
  en el input.
- Los conteos de categorías (142 total; 54 recetas, 38 artículos, 26 rutinas, 14
  sueño y 10 bienestar) son mock; la demo solo carga 6 contenidos.
- El corazón usa `FavoritesContext`: un contenido guardado en Explorar aparece
  en Home, `/contenidos`, `/favoritos` y en la propia página. El aviso indica si
  se guardó o se quitó.
- Los CTA de las tarjetas y de la guía abren avisos de demostración; no existe
  vista de detalle.
- “Cargar más” simula 700 ms y termina con el aviso de que se vieron todos los
  contenidos de la demo. La paginación numérica y “Página 1 de 24” son mock.
- El guardado de la guía destacada es independiente de `FavoritesContext` y se
  pierde al recargar.
- En móvil, el panel de filtros vive debajo del header; el botón de filtros
  muestra un badge con `activeFilterCount` y “Ver filtros” solo añade el número
  cuando hay filtros activos.
- Todas las acciones sin backend muestran un aviso claro y se descartan con el
  botón de cierre.

---

## 11. Favoritos y hábitos

### 11.1 Estado global de favoritos

Archivo: `src/context/hooks/useFavoritesState.js`.

```js
const [favorites, setFavorites] = useState(() => new Set(defaultFavoriteIds))
const [collections, setCollections] = useState(initialCollections)
const [itemCollections] = useState(contentCollectionMap)
const [scheduledIds, setScheduledIds] = useState(() => new Set())
const [feedback, setFeedback] = useState(null)
```

| Variable / Método | Tipo | Descripción |
| --- | --- | --- |
| `favorites` | `Set<string>` | IDs de contenidos guardados (inicializado con 6 favoritos por defecto) |
| `toggleFavorite(contentId)` | `función` | Crea un nuevo `Set`, añade/elimina y dispara notificación toast de feedback |
| `isFavorite(contentId)` | `función` | Consulta si un ID pertenece a `favorites` |
| `collections` | `array` | Colecciones activas (`initialCollections` + personalizadas dinámicas) |
| `createCollection(name)` | `función` | Añade una colección personalizada con ID normalizado y aviso toast; rechaza nombres duplicados |
| `itemCollections` | `object` | Mapeo asociativo `contentId` -> `collectionId` |
| `scheduleItem(contentId, title)` | `función` | Añade un contenido al plan semanal del usuario con confirmación |
| `isScheduled(contentId)` | `función` | Indica si el contenido ya fue agendado en el plan semanal |
| `feedback` | `object \| null` | Notificación accesible `{ type: 'success' \| 'info', message: string }` |
| `dismissFeedback()` | `función` | Cierra la notificación toast visible |

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
| `habits` | `array` | Los 6 hábitos enriquecidos del protocolo |
| `toggleHabit(habitId)` | `función` | Alterna `completed` por ID |
| `addHabit(habit)` | `función` | Añade un hábito si su ID no existe |
| `completedCount` | `number` | Hábitos completados |
| `totalCount` | `number` | Total actual (`6`, o `7`/`8` tras añadir sugerencias) |
| `progress` | `number` | Porcentaje redondeado `0–100` |

`toggleHabit` mapea el array y crea un objeto nuevo solo para el hábito tocado.
`addHabit` usa actualización funcional y comprueba el ID para evitar duplicados;
lo usan las sugerencias IA de `/favoritos`. Los consumidores son
`useHabitsOverview` (Home) y `useHabitosPage`.

Cada hábito conserva los campos antiguos (`title`, `detail`, `tag`, `icon`,
`mobileDetail`, `mobileTip`) y añade metadatos para la nueva página:
`categoryId`, `badge`, `badgeClass`, `streakDays`, `timeOfDay`,
`scheduleLabel`, `showProgressBar`, `progress` y etiquetas de progreso.

### 11.3 Colecciones, filtros, búsqueda y modales en Favoritos

La sección de contenidos favoritos se amplió con capacidades avanzadas inspiradas
en las maquetas `content.html` y `content2.html`:

1. **Gestión de Colecciones Dinámicas (`Collections Tabs`)**:
   - Barra horizontal de pestañas: *Todas las colecciones*, *Recetas Antiinflamatorias*,
     *Movimiento & Recuperación*, *Artículos Clínicos*, *Meditaciones Guiadas*.
   - Botón `+ Nueva Colección`: Abre `CreateCollectionModal.jsx`, permitiendo crear
     en tiempo real nuevas carpetas temáticas que se integran con sus conteos reactivos.

2. **Filtros por Tipo de Contenido (`Category Chips`)**:
   - Píldoras con conteo en vivo: *Todos*, *Recetas*, *Artículos & Guías*, *Entrenamientos*.

3. **Búsqueda en Tiempo Real y Selector de Ordenación (`Search & Sort`)**:
   - `searchQuery`: Búsqueda instantánea insensible a mayúsculas que examina título,
     descripción, autor y etiquetas clínicas.
   - `sortBy`: Reordena por `recent` (orden de guardado), `duration` (tiempo estimado) o
     `popularity` (relevancia).
   - Alternador de modo de vista: Cuadrícula (`grid_view`) vs Lista (`view_list`).

4. **Acciones Interactivas y Diálogos Modales**:
   - `CreateCollectionModal.jsx`: Creación interactiva de colecciones con foco accesible
     y cierre con `Escape`.
   - `ContentDetailModal.jsx`: Diálogo accesible para inspeccionar en profundidad la
     receta, cita de evidencia clínica o protocolo de rutina antes de ejecutarlo.
   - `ContentNoteModal.jsx`: Permite guardar y editar notas clínicas o de preparación
     personales vinculadas al contenido.
   - Agendamiento en el plan semanal (`scheduleItem`) con microinteracción visual en el
     botón de calendario y feedback toast no invasivo.

Los componentes `SavedContents` (escritorio) y `MobileSavedContents` (móvil)
consumen `FavoritesContext` y exponen esta experiencia en ambas resoluciones.

### 11.4 Página `/favoritos` (Mis Favoritos y Hábitos)

Ruta canónica: `/favoritos`. `/habitos` redirige a `/favoritos` para conservar
enlaces antiguos. `Habitos.jsx` alterna las dos vistas con `lg:hidden` /
`hidden lg:block`:

| Archivo | Rol |
| --- | --- |
| `pages/habitos/DesktopHabitos.jsx` | Composición de escritorio: hero, progreso, semana, categorías, guardados, analítica, IA y especialista |
| `pages/habitos/mobile/MobileHabitos.jsx` | Composición móvil: hero compacto, tira semanal, filtros, tarjetas, sugerencia, guardados y FAB |
| `pages/habitos/hooks/useHabitosPage.js` | Estado, derivados y handlers de toda la página |
| `pages/habitos/hooks/useHabitCard.js` | Expansión del detalle clínico por tarjeta desktop |

Componentes de escritorio:

| Componente | Rol |
| --- | --- |
| `HabitsHero.jsx` | Bienvenida, resumen 4/6 y micro-métricas |
| `DailyProgressCard.jsx` | Anillo de cumplimiento y progreso por categoría |
| `WeeklyCalendar.jsx` | Semana, navegación de días y filtros por momento |
| `HabitCategoryGroups.jsx` | Agrupación por categorías y estado vacío del filtro |
| `HabitCard.jsx` | Tarjeta con checkbox, racha, progreso y detalle expandible |
| `HabitCheckbox.jsx` | Checkbox reutilizable de escritorio y móvil |
| `HabitTipCard.jsx` | Tip de preparación para mañana |
| `SavedContents.jsx` | Contenidos favoritos y estado vacío de escritorio |
| `ConsistencyChart.jsx` | Barras de adherencia de los últimos 7 días |
| `ConsistencyHeatmap.jsx` | Mapa de calor de 35 días |
| `AiSuggestions.jsx` | Sugerencias IA que añaden hábitos reales al contexto |
| `SpecialistCard.jsx` | Tarjeta médica y envío simulado de bitácora |

Componentes móviles:

| Componente | Rol |
| --- | --- |
| `MobileHabitsHero.jsx` | Resumen 4/6, anillo y 3 micro-métricas |
| `MobileWeekStrip.jsx` | Selector semanal compacto |
| `MobileHabitList.jsx` | Filtros deslizables, lista y estado vacío |
| `MobileHabitCard.jsx` | Tarjeta táctil con racha, icono y progreso |
| `MobileSuggestionBanner.jsx` | Sugerencia IA con acción “Añadir” |
| `MobileSavedContents.jsx` | Contenidos favoritos y estado vacío en móvil |
| `MobileRegisterFab.jsx` | FAB “Registrar Hábito” |

`useHabitosPage({ listId })` devuelve:

| Variable | Tipo | Descripción |
| --- | --- | --- |
| `user` | objeto | Usuario activo |
| `habits` / `filteredHabits` | `array` | Protocolo completo / filtrado por momento |
| `favoriteContents`, `favoriteCount` | varios | Contenidos favoritos derivados de `FavoritesContext` |
| `categorizedHabits` | `array` | Categorías con hábitos y progreso propio |
| `categoryProgress` | `array` | Progreso por categoría para el panel general |
| `completedCount`, `totalCount`, `progress`, `remainingCount` | `number` | Contadores globales derivados |
| `toggleHabit` | `función` | Alterna un hábito en el contexto |
| `activeTimeFilter`, `timeFilterOptions`, `handleTimeFilterChange` | varios | Filtro `all`/`morning`/`afternoon`/`evening` con conteos |
| `selectedDay`, `selectedDayId`, `handleSelectDay`, `handlePreviousDay`, `handleNextDay`, `canGoPrevious`, `canGoNext` | varios | Semana navegable |
| `week` | objeto | Semana con el día de hoy sincronizado a los contadores reales |
| `metrics`, `adherence`, `heatmap` | objetos | Datos mock; hoy y la última celda se recalculan con el progreso |
| `suggestions`, `isSuggestionAdded`, `handleAddSuggestion` | varios | Sugerencias IA y alta en `HabitsContext` |
| `recoveryTip`, `specialist`, `copy` | objetos | Copy y tarjetas informativas |
| `logStatus`, `handleSendLog` | varios | Envío simulado (`idle` → `loading` → `success`, 700 ms) |
| `handleRegisterHabit` | `función` | Scroll suave a la lista visible (`scroll-mt-24`) |

Comportamiento:

- Las dos vistas están montadas a la vez y comparten los hábitos y favoritos
  globales, pero cada una mantiene su propio filtro, día seleccionado y estado de
  bitácora.
- “Registrar hábito” no abre un formulario: desplaza a la lista para registrar
  el hábito desde su checkbox.
- Añadir una sugerencia incrementa el total global (6 → 7 → 8) y actualiza el
  hero, el anillo, la semana, Home y esta misma página.
- Los contenidos guardados se derivan de `FavoritesContext`; el corazón de cada
  tarjeta añade o quita el contenido y la sección se actualiza al instante.
- La semana, la gráfica y la última celda del mapa de calor reflejan el progreso
  actual; el resto de valores analíticos son mock estáticos.
- El detalle expandible de cada tarjeta desktop usa `mobileTip` como nota
  clínica y `aria-expanded`/`aria-controls`.

---

## 12. Perfil

Página: `src/pages/perfil/Perfil.jsx`.
Hook único: `src/pages/perfil/hooks/useProfile.js`.
Datos: `src/data/profileData.js`.
Vistas: `DesktopPerfil.jsx` y `mobile/MobilePerfil.jsx`.

`Perfil.jsx` ejecuta una sola vez `useProfile` y pasa el mismo objeto `profile` a
ambas vistas. No hay estado duplicado entre escritorio y móvil.

### 12.1 Datos y estado

| Variable | Tipo | Descripción |
| --- | --- | --- |
| `isAuthenticated` | `boolean` | Hay sesión activa |
| `session` | objeto o `null` | Sesión normalizada de `useAuth` |
| `user` | objeto | Usuario mock (`currentUser`) |
| `summary` | objeto | Resumen diario de `useUser` |
| `displayName` | `string` | `session.name` o `''` |
| `profileName` | `string` | Nombre editado para la sesión o `displayName` |
| `initials` | `string` | Iniciales de `profileName` |
| `providerLabel` | `string` | `Correo electrónico`, `Google`, `Apple` o `Acceso seguro` |
| `sessionDate` | `string` | `loggedInAt` formateado en `es-ES` |
| `isRemembered` | `boolean` | `session.remember` |
| `stats` | objeto | `completedCount`, `totalCount`, `progress`, `favoriteCount`, `streakDays` |
| `copy` | objeto | `profileCopy` |
| `desktopBiomarkers` | array | 4 biomarcadores de escritorio |
| `mobileBiomarkers` | array | 4 biomarcadores móviles (incluye hidratación) |
| `goals` | array | 4 objetivos biológicos |
| `restrictions` | array | 3 restricciones alimentarias |
| `devices` | array | 3 dispositivos; 2 activos |
| `specialists` | array | 2 especialistas con acciones |
| `privacySettings` | array | 3 preferencias clínicas |
| `preferences` | objeto | `id → boolean` inicializado desde `enabled` |
| `mobilePanel` | `string` o `null` | Panel móvil abierto |
| `notice` | `string` | Aviso global del perfil |
| `isEditing` | `boolean` | Formulario de nombre visible |
| `draftName` | `string` | Borrador del nombre |
| `exportStatus` | `'idle'` o `'loading'` | Generación simulada del PDF |
| `isLoggingOut` | `boolean` | `logoutStatus === 'loading'` |

### 12.2 Acciones

| Acción | Comportamiento |
| --- | --- |
| `togglePreference(id)` | Invierte el toggle compartido entre ambas vistas |
| `toggleMobilePanel(id)` | Abre o cierra un panel; solo uno a la vez |
| `handleStartEdit` / `handleCancelEdit` | Abre el formulario con el nombre actual o lo descarta |
| `handleSaveEdit` | Valida que no esté vacío, guarda el nombre para esa sesión y muestra aviso |
| `setDraftName` | Actualiza el borrador del input |
| `handleExportReport` | `loading` durante 700 ms y aviso de informe generado |
| `handleAnalytics` | Aviso de próxima versión |
| `handleAddGoal` | Aviso de acuerdo con el especialista |
| `handleLinkDevice` | Aviso de vinculación simulada |
| `handleOpenDirectory` | Aviso de directorio próximamente |
| `handleSpecialistAction(specialist, action)` | Mensajes para `contact`, `schedule`, `share` y `log` |
| `handleDismissNotice` | Limpia el aviso |
| `handleLogout` | `loading` 600 ms, limpia la sesión, resetea edición/paneles/nombre y muestra aviso |

### 12.3 Comportamiento

- Con sesión, el hero muestra avatar, nombre visible, edad/ciudad, membresía,
  grupo sanguíneo, alergias, monitoreo, anillo de adherencia y estadísticas.
- El nombre editado se guarda como `{ sessionId, name }`. Si cambia el `id` de la
  sesión, se descarta automáticamente; no persiste al recargar.
- Las preferencias y los paneles viven en `useProfile`, por lo que el cambio de
  viewport conserva los toggles abiertos.
- Las acciones de especialistas, dispositivos, objetivos y analítica solo
  muestran avisos; no hay llamadas externas.
- `handleLogout` espera 600 ms, limpia `localStorage` y `sessionStorage`, vuelve
  a la vista de invitado y deja visible “Has cerrado sesión correctamente.”.
- Sin sesión, ambas vistas muestran `GuestProfile` / `MobileGuestProfile` con
  CTAs a `/login` y `/registro`, beneficios y actividad local de hábitos y
  favoritos.
- La racha (`streakDays`) proviene de `currentUser`; los hábitos y favoritos
  provienen de sus contextos. Ninguno se persiste.
- La vista móvil adapta badges, títulos y filas a 320 px: el ciclo se apila, los
  estados de dispositivos tienen texto corto y los paneles de notificaciones y
  privacidad son acordeones de un solo panel.

---

## 13. Componentes compartidos, layout y autenticación

### 13.1 Layout

| Componente | Archivo | Variables/props | Funcionalidad |
| --- | --- | --- | --- |
| `AppLayout` | `components/layout/AppLayout.jsx` | — | Compone header, outlet, footer y nav móvil |
| `Header` | `components/layout/Header.jsx` | `navItems`, `user` | Navegación de escritorio (incluye `/favoritos`), racha, avatar y CTA a `/favoritos` |
| `DesktopNavLink` | Igual | `item` | Enlace activo con `NavLink` |
| `MobileNavLink` | Igual | `item` | Variante móvil del enlace |
| `MobileHeader` | `components/layout/MobileHeader.jsx` | `user` | Avatar, marca, racha y notificaciones |
| `MobileBottomNav` | `components/layout/MobileBottomNav.jsx` | `items` | 5 destinos: Dashboard, Contenido (`/contenidos`), Explorar (`/busqueda`), Hábitos (`/favoritos`) y Perfil |
| `Footer` | `components/layout/Footer.jsx` | `footerLinks`, `currentYear` | Enlaces legales de escritorio |

Notas:

- “Nuevo Registro” del header solo se muestra desde `xl` (1280 px) para evitar
  overflow a 1024 px; enlaza a `/favoritos`.
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

### 13.5 Perfil

Escritorio:

| Componente | Archivo | Rol |
| --- | --- | --- |
| `DesktopPerfil` | `pages/perfil/DesktopPerfil.jsx` | Cabecera, acciones y composición de secciones |
| `ProfileHero` | `components/ProfileHero.jsx` | Identidad, badges, anillo de adherencia, edición y estadísticas |
| `ProfileStatsStrip` | `components/ProfileStatsStrip.jsx` | Hábitos, favoritos y racha del hero |
| `ProfileProgressRing` | `components/ProfileProgressRing.jsx` | Anillo SVG accesible |
| `ProfileEditForm` | `components/ProfileEditForm.jsx` | Nombre visible y guardado simulado |
| `BiomarkerGrid` | `components/BiomarkerGrid.jsx` | 4 tarjetas con footer de barras, progreso o filas |
| `ProfileGoals` | `components/ProfileGoals.jsx` | Objetivos, restricciones y CTA de alta |
| `ConnectedDevices` | `components/ConnectedDevices.jsx` | Dispositivos, estado y vinculación |
| `SpecialistGrid` | `components/SpecialistGrid.jsx` | Equipo clínico y acciones |
| `PrivacySettings` | `components/PrivacySettings.jsx` | Toggles, sesión y logout |
| `GuestProfile` | `components/GuestProfile.jsx` | Estado sin sesión |
| `ProfileStatsGrid` | `components/ProfileStatsGrid.jsx` | 4 métricas locales del invitado |
| `ProfileNotice` | `components/ProfileNotice.jsx` | Aviso global `role="status"` |
| `ToggleSwitch` | `components/ToggleSwitch.jsx` | Switch accesible `role="switch"` |

Móvil:

| Componente | Archivo | Rol |
| --- | --- | --- |
| `MobilePerfil` | `pages/perfil/mobile/MobilePerfil.jsx` | Composición y cabecera móvil |
| `MobileProfileHero` | `pages/perfil/mobile/MobileProfileHero.jsx` | Identidad, adherencia, edición y stats |
| `MobileBiomarkers` | `pages/perfil/mobile/MobileBiomarkers.jsx` | Biomarcadores 2×2 |
| `MobileProfileGoals` | `pages/perfil/mobile/MobileProfileGoals.jsx` | Objetivos y restricciones compactas |
| `MobileSpecialists` | `pages/perfil/mobile/MobileSpecialists.jsx` | Especialistas con CTA |
| `MobileDevices` | `pages/perfil/mobile/MobileDevices.jsx` | Dispositivos activos |
| `MobileProfileActions` | `pages/perfil/mobile/MobileProfileActions.jsx` | Sesión, exportar, paneles y logout |
| `MobileGuestProfile` | `pages/perfil/mobile/MobileGuestProfile.jsx` | Estado sin sesión |

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

`normalizeSearchText(value)` normaliza a NFD, elimina diacríticos y pasa a
minúsculas. `matchesContentQuery(content, query)` usa esa normalización para
buscar en título, `shortTitle`, descripción, categoría, badge, autoría,
evidencia, etiquetas y campos `mobile`; un texto vacío devuelve `true`.

La misma función alimenta la búsqueda de `/contenidos`, `/busqueda` y los
buscadores de contenidos guardados de `/favoritos`, de modo que “salmon” y
“salmón” encuentran el mismo resultado en las tres páginas.

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
| `recommendedContent` | array | 6 contenidos derivados de `exploreContents`; añade `category` desde `homeCategory` |
| `initialHabits` | array | 6 hábitos enriquecidos; 4 completados |
| `weeklyConsistency` | array | 7 días con totales de 6; el domingo es “Hoy” con 4/6 |
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

### 15.5 `data/habitsPageData.js`

| Export | Contenido |
| --- | --- |
| `habitPageCopy` | Marca, breadcrumb, títulos, fecha, fase, CTAs y copy de guardados de `/favoritos` |
| `habitCategories` | 4 categorías con icono y clases de color |
| `habitTimeFilters` | `all`, `morning`, `afternoon`, `evening` |
| `habitHeroMetrics` | Agua, calma, pasos y sueño para el hero |
| `habitWeek` | Semana 43 (21–27 de octubre) con hoy = 24 |
| `habitAdherence` | 7 días de barras y promedio 92% |
| `consistencyHeatmap` | 35 días generados con `Intl.DateTimeFormat` |
| `habitSuggestions` | 2 sugerencias IA con el hábito completo que se añade |
| `habitRecoveryTip` | Tip de preparación para mañana |
| `habitSpecialist` | Especialista, próxima consulta y copy de bitácora |

### 15.6 `data/profileData.js`

| Export | Contenido |
| --- | --- |
| `profileCopy` | Copy desktop/móvil del perfil, acciones, privacidad y estadísticas |
| `profileMetrics` | Día 48/60, tendencia, membresía y grupo sanguíneo |
| `desktopBiomarkers` | 4 biomarcadores con footer de barras, progreso o filas |
| `mobileBiomarkers` | 4 biomarcadores con etiqueta y nota móvil |
| `profileGoals` | 4 objetivos con icono y etiqueta móvil |
| `profileRestrictions` | 3 restricciones con clases de chip |
| `profileDevices` | 3 dispositivos con estado desktop/móvil y actividad |
| `profileSpecialists` | 2 especialistas con monograma, notas, badges y CTAs |
| `profilePrivacySettings` | 3 preferencias con título, descripción e `enabled` |
| `guestProfileCopy` | Copy, beneficios y actividad local del estado invitado |

### 15.7 `data/exploreContentData.js`

| Export | Contenido |
| --- | --- |
| `exploreContents` | 6 contenidos completos (2 recetas, 2 artículos y 2 rutinas) con `type`, `exploreFilterIds`, `quick`, imagen local, badge, textos, autoría, evidencia/cita, CTA, `homeCategory`, `filterIds` y variante `mobile` |

Los IDs (`nordic-salmon-bowl`, `circadian-glucose`, `vagal-mobility`,
`chia-cacao-pudding`, `scfa-longevity` y `zone2-mitochondria`) son los mismos que
usa `recommendedContent`, por lo que los favoritos se comparten entre Home,
`/busqueda`, `/contenidos` y `/favoritos`.

### 15.8 `data/explorePageData.js`

| Export | Contenido |
| --- | --- |
| `exploreCopy` | Títulos, descripciones, placeholders, conteos, CTAs, avisos y copy de la guía destacada |
| `exploreFilters` | `all`, nutrición, artículos, entrenamientos, sueño y salud mental con `label`, `mobileLabel` y `count` |
| `exploreTrends` | 6 tendencias con etiqueta de escritorio, etiqueta móvil y consulta aplicada |
| `exploreRecentSearches` | 3 búsquedas recientes con texto y consulta |
| `exploreQuickFilters` | 4 grupos (`duration`, `goal`, `evidence`, `diet`) con sus opciones |
| `exploreFeatured` | Guía destacada de 21 días con imagen, autoría, evidencia y CTAs desktop/móvil |

Estos textos y catálogos alimentan exclusivamente la página `/busqueda`.

### 15.9 `data/contenidosPageData.js`

| Export | Contenido |
| --- | --- |
| `contenidosCopy` | Títulos, descripciones, placeholders, labels, avisos y CTAs de `/contenidos` |
| `contentSortOptions` | 4 órdenes con etiqueta para escritorio y móvil |
| `contentTypes` | `all`, recetas, artículos & guías y entrenamientos (etiqueta móvil “Rutinas”) |
| `contentCollections` | 5 colecciones; nutrición, movimiento y evidencia filtran por tipo; calma por IDs |
| `contentPopularity` | Puntuación de los 6 IDs para el orden por popularidad |
| `contentPresentation` | Variante desktop/móvil, autoría, macros, impacto, recomendación y acciones por ID |

Estos datos solo alimentan `/contenidos`; el catálogo de contenidos se comparte
con Home, Explorar y Favoritos.

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
3. `useExplorarPage` lee `q` y `filtro` al montar, traduce el filtro de Home a
   una categoría de Explorar y calcula `results`.
4. El input y la categoría arrancan con esos valores.
5. A partir de ahí, escribir o cambiar filtros actualiza solo el estado local; la
   URL conserva los parámetros de entrada.

### 16.6 Favorito

1. `ContentCard` y `MobileContentCard` usan `useFavoriteContent(content.id)`;
   las tarjetas de Explorar reciben `favorite` y `handleToggleFavorite` desde
   `useExplorarPage`.
2. El corazón llama a `toggleFavorite`.
3. `useFavoritesState` crea un nuevo `Set` y actualiza el contexto.
4. La tarjeta cambia el icono y `aria-pressed`.
5. Home, `/contenidos` y `/busqueda` muestran el corazón con el mismo estado;
   `/favoritos` filtra `recommendedContent` por los IDs guardados.
6. Al recargar, el `Set` se reinicia con `defaultFavoriteIds` (los seis
   contenidos iniciales).

### 16.7 Hábito

1. Home y `/favoritos` obtienen `habits` y `toggleHabit` del contexto.
2. El checkbox desktop/móvil o la tarjeta de `/favoritos` llama a
   `toggleHabit(habit.id)`.
3. El provider actualiza `completed` y recalcula contadores y progreso.
4. Cambian el banner de Home, el badge de la sección, la gráfica semanal, el
   hero de `/favoritos`, el anillo general, la celda de hoy de la semana, la
   barra de hoy del gráfico y la última celda del heatmap.
5. Las sugerencias IA llaman a `addHabit(suggestion.habit)`; el total global
   pasa de 6 a 7 u 8 y el nuevo hábito aparece en su categoría.
6. En `/favoritos`, “Enviar bitácora al doctor” simula 700 ms y queda en estado
   `success`; “Registrar hábito” desplaza a la lista.
7. Al recargar, se vuelve a `initialHabits` (solo la sesión persiste).

### 16.8 Logout

1. `/perfil` muestra “Cerrar sesión” si hay sesión.
2. `handleLogout` pone `logoutStatus = loading` y espera 600 ms.
3. `logout()` limpia `localStorage` y `sessionStorage` y deja `session = null`.
4. El perfil pasa a “Modo invitado” y muestra el aviso.
5. Se resetean el nombre editado, la edición, el borrador y el panel móvil.
6. Header/Home vuelven al usuario mock.

### 16.9 Edición, informe y preferencias del perfil

1. “Editar Perfil” (o “Editar” en el hero) abre `ProfileEditForm` con el nombre
   actual en `draftName`.
2. Guardar recorta el texto; vacío muestra aviso y no cierra el formulario.
3. Un nombre válido se guarda como `savedName` ligado al `session.id` y aparece
   en las dos vistas.
4. “Exportar Informe Clínico” cambia a `loading` durante 700 ms y muestra aviso.
5. Los toggles de privacidad actualizan `preferences`; el cambio se conserva al
   cambiar entre escritorio y móvil.
6. En móvil, “Notificaciones” y “Privacidad” abren un panel cada uno; abrir uno
   cierra el otro.
7. Las acciones de especialistas, añadir objetivo, vincular dispositivo y abrir
   el directorio solo muestran avisos simulados.
8. Al recargar, el nombre, los toggles, los paneles y los avisos se reinician.

### 16.10 Explorar

1. `/busqueda` monta la vista móvil y la de escritorio con un único
   `useExplorarPage`; ambas reciben el mismo `explore`.
2. Al montar, `query` y `activeFilter` se inicializan desde `q`/`filtro`; al
   escribir en el buscador, `query` cambia y `results` se recalcula de inmediato
   con `matchesContentQuery`.
3. Al elegir una categoría, `activeFilter` filtra por `exploreFilterIds`.
4. Al cambiar un select de `QuickFilters` o `MobileFilterPanel`, se actualiza
   `quickFilters` y se aplica `matchesQuickFilters`.
5. Una tendencia o búsqueda reciente reemplaza el texto y reinicia categoría y
   filtros rápidos.
6. Si no hay coincidencias, `ExploreEmptyState` permite reiniciar todo con
   `handleResetFilters`.
7. El corazón guarda o quita el contenido en `FavoritesContext` y muestra el
   aviso correspondiente; el cambio se refleja en `/favoritos` y Home.
8. “Cargar más” espera 700 ms y avisa del final de la demo; la paginación
   numérica solo muestra avisos.
9. La guía destacada abre un aviso al leerla y su botón de guardado alterna
   `isFeaturedSaved` con aviso; no se integra en `FavoritesContext`.
10. En móvil, el botón de filtros abre el panel debajo del header y “Ver filtros”
    lo abre y desplaza al inicio de la página.

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
- **Favoritos y hábitos:** estado en memoria; al recargar se restauran los seis
  favoritos iniciales y las colecciones personalizadas desaparecen. Solo la
  sesión persiste. Las sugerencias IA añadidas también se pierden.
- **Explorar (`/busqueda`):** los conteos de la biblioteca (142 y el desglose
  por categoría) son simulados; solo hay 6 contenidos mock. “Cargar más”, la
  paginación, los CTA de contenido y el guardado de la guía destacada no tienen
  backend: muestran avisos o estados locales. La búsqueda, la categoría, los
  filtros rápidos, el panel móvil y el aviso se reinician al recargar.
- **Contenidos (`/contenidos`):** la búsqueda comprometida, el tipo y la
  colección se reflejan en la URL (`q`, `filtro`, `coleccion`), pero el catálogo
  solo contiene los 6 contenidos mock, los conteos son reales y la paginación se
  limita a una página. Crear/gestionar colecciones, abrir contenidos y las
  acciones clínicas de las tarjetas son simulados; no existe una vista de
  detalle. El orden, la vista y los avisos se reinician al recargar.
- **Sugerencias IA y bitácora:** son simuladas; no hay llamada a un modelo ni
  envío real de correo. El botón de la bitácora solo cambia de estado.
- **Calendario de `/favoritos`:** seleccionar otro día cambia la selección y el
  resumen textual, pero la lista de hábitos siempre representa el protocolo de
  hoy; no hay históricos por día.
- **Desafío semanal:** el registro de cena es local y se pierde al recargar. En
  móvil la tarjeta es informativa/estática.
- **Newsletter:** checkbox visual en escritorio; no se envía ni persiste.
- **Perfil:** nombre visible, toggles de privacidad, paneles móviles, informe,
  acciones de especialistas y vinculación de dispositivos son simulados; no
  persisten al recargar. El nombre solo se conserva mientras dure la sesión
  montada y se descarta si cambia el `session.id`.
- **CTAs de contenido y campana del header:** en Home y las tarjetas heredadas
  son visuales; en Explorar abren un aviso de demostración. Los paneles de
  notificaciones y privacidad existen solo dentro de `/perfil` móvil.
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
- `/busqueda` — Explorar: búsqueda, categorías, filtros rápidos, tendencias,
  favoritos y acciones simuladas.
- `/contenidos` — biblioteca: búsqueda, tipos, colecciones, orden, grid/lista,
  favoritos y acciones simuladas.
- `/busqueda?q=salmón&filtro=gluten-free` — URL directa de Explorar.
- `/contenidos?q=salmón&filtro=recipe&coleccion=nutrition` — URL directa de la
  biblioteca; `filtro=gluten-free` también se traduce al tipo `recipe`.
- `/favoritos` — página combinada con hábitos y contenidos guardados.
- `/habitos` — redirección a `/favoritos`.
- `/perfil` — invitado, sesión y logout.

Comprobaciones manuales útiles:

1. Iniciar sesión con “Recordarme” y recargar: la sesión debe persistir.
2. Repetir sin “Recordarme” y abrir una pestaña nueva: no debe compartirse.
3. Cerrar sesión: ambos storages deben quedar limpios.
4. Guardar un favorito en `/busqueda` o `/contenidos`, navegar por la SPA a
   `/favoritos` y comprobar que aparece en “Contenidos guardados”. Al recargar
   debe desaparecer (estado en memoria).
5. Cambiar un hábito en `/favoritos` y comprobar hero, anillo, semana, gráfica y
   Home.
6. Añadir una sugerencia IA y verificar que el total pasa de 6 a 7/8 y que el
   hábito aparece en su categoría.
7. Pulsar “Enviar bitácora al doctor” y comprobar `loading` → “Bitácora enviada”.
8. Probar los filtros y la navegación semanal en escritorio y móvil.
9. Escribir una búsqueda desde Home y verificar `q`/`filtro` en la URL.
10. Abrir `/habitos` y comprobar que redirige a `/favoritos`.
11. En `/perfil`, editar el nombre y comprobar que se refleja en escritorio y
    móvil; recargar y verificar que vuelve al nombre de la sesión.
12. En `/perfil`, exportar el informe, alternar los toggles, abrir ambos paneles
    móviles y cerrar sesión; al terminar deben verse los CTAs de invitado.
13. En `/busqueda`, buscar “microbiota” y comprobar las coincidencias; probar
    una tendencia, una categoría, los filtros rápidos, el estado vacío y
    “Limpiar filtros”.
14. En móvil, abrir el panel de filtros de Explorar, cambiar un filtro y
    comprobar el badge; usar “Ver filtros” desde la sección de resultados.
15. En escritorio, pulsar `Ctrl/Cmd + K` y verificar que el foco va al buscador
    de Explorar.
16. Pulsar “Cargar más” y comprobar el estado de carga y el aviso de demo.
17. En `/contenidos`, buscar “microbiota”, cambiar de tipo y colección, y
    comprobar que `q`/`filtro`/`coleccion` se reflejan en la URL.
18. En `/contenidos`, alternar grid/lista, probar los cuatro órdenes, vaciar la
    búsqueda, verificar el estado vacío y usar “Ver todos los contenidos”.
19. En `/contenidos`, quitar y volver a guardar un favorito, navegar por la SPA
    a `/favoritos` y comprobar que “Contenidos guardados” cambia de 5 a 6.
20. En `/contenidos` móvil, abrir “+ Nueva Colección” y comprobar el aviso por
    encima del bottom nav.

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
| Contenidos de Home (derivados), filtros, checklist de hábitos o métricas | `src/data/homeData.js` |
| Catálogo de Explorar | `src/data/exploreContentData.js` |
| Copy, colecciones, tipos, orden y variantes de `/contenidos` | `src/data/contenidosPageData.js` |
| Copy, categorías, tendencias y filtros de Explorar | `src/data/explorePageData.js` |
| Copy, categorías, semana, heatmap y sugerencias de `/favoritos` | `src/data/habitsPageData.js` |
| Copy, biomarcadores, objetivos, dispositivos y especialistas de `/perfil` | `src/data/profileData.js` |
| Búsqueda y filtrado compartido de contenidos | `src/utils/content.js` |
| Búsqueda desde Home | `src/pages/home/hooks/useSearchForm.js` |
| Búsqueda, tipo, colección, orden, URL, favoritos y avisos de `/contenidos` | `src/pages/contenidos/hooks/useContenidosPage.js` |
| Vistas y componentes de `/contenidos` | `src/pages/contenidos/DesktopContenidos.jsx`, `src/pages/contenidos/mobile/MobileContenidos.jsx` y `src/pages/contenidos/components/` |
| Búsqueda, filtros y acciones simuladas de Explorar | `src/pages/busqueda/hooks/useExplorarPage.js` |
| Vistas y componentes de `/busqueda` | `src/pages/busqueda/DesktopExplorar.jsx`, `src/pages/busqueda/mobile/MobileExplorar.jsx` y `src/pages/busqueda/components/` |
| Favoritos | `src/context/hooks/useFavoritesState.js` |
| Estado global de hábitos | `src/context/hooks/useHabitsState.js` |
| Lógica de la página `/favoritos` | `src/pages/habitos/hooks/useHabitosPage.js` |
| Expansión del detalle de tarjeta desktop | `src/pages/habitos/hooks/useHabitCard.js` |
| Perfil y logout | `src/pages/perfil/hooks/useProfile.js` |
| Vistas y componentes de `/perfil` | `src/pages/perfil/DesktopPerfil.jsx`, `src/pages/perfil/mobile/MobilePerfil.jsx` y `src/pages/perfil/components/` |
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
│   └── ui/
│       ├── Icon.jsx
│       ├── FavoriteButton.jsx
│       └── NoticeToast.jsx
├── pages/
│   ├── home/hooks/*.js
│   ├── login/hooks/*.js
│   ├── registro/hooks/useRegisterForm.js
│   ├── registro/utils/passwordStrength.js
│   ├── busqueda/
│   │   ├── components/*.jsx
│   │   ├── hooks/useExplorarPage.js
│   │   ├── mobile/*.jsx
│   │   ├── DesktopExplorar.jsx
│   │   └── Explorar.jsx
│   ├── contenidos/
│   │   ├── components/*.jsx
│   │   ├── hooks/useContenidosPage.js
│   │   ├── mobile/*.jsx
│   │   ├── DesktopContenidos.jsx
│   │   └── Contenidos.jsx
│   ├── habitos/
│   │   ├── components/*.jsx
│   │   ├── hooks/useHabitosPage.js
│   │   ├── hooks/useHabitCard.js
│   │   ├── mobile/*.jsx
│   │   ├── DesktopHabitos.jsx
│   │   └── Habitos.jsx
│   └── perfil/
│       ├── components/*.jsx
│       ├── hooks/useProfile.js
│       ├── mobile/*.jsx
│       ├── DesktopPerfil.jsx
│       └── Perfil.jsx
├── data/
│   ├── homeData.js
│   ├── exploreContentData.js
│   ├── explorePageData.js
│   ├── habitsPageData.js
│   ├── profileData.js
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

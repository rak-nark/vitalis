# Vitalis

Dashboard de nutrición, hábitos y bienestar construido con React. La interfaz
parte de `reference.html` y `reference2.html` para el dashboard, de
`loginreference.html` y `loginreference2.html` para iniciar sesión, y de
`registerreference.html` y `registerreference2.html` para el registro. Está
desestructurada en componentes reutilizables e incorpora flujos simulados de
autenticación, búsqueda, favoritos, hábitos y perfil sin backend.

> **Documentación detallada:** consulta
> [`DOCUMENTACION.md`](./DOCUMENTACION.md) para ver el inventario de variables,
> el funcionamiento de cada hook y el mapa completo de funcionalidades, rutas y
> archivos.

## Stack y versiones

| Tecnología | Versión | Notas |
| --- | --- | --- |
| React | 19.3.1 | Con React Compiler habilitado vía Babel. |
| React DOM | 19.3.1 | — |
| React Router DOM | 7.18.4 | Rutas SPA con `BrowserRouter`. |
| Tailwind CSS | 4.3.3 | **v4, CSS-first**. Sin `tailwind.config.js`. |
| Vite | 8.3.5 | Dev server y build. |
| Node.js | 24.19.0 | Requerido por el entorno actual. |
| clsx | 2.1.1 | Composición de clases condicionales. |
| ESLint | 10.13.0 | Flat config. |

### Tailwind v4 vs. la referencia

`reference.html` usa Tailwind v3 por CDN y un `tailwind.config.js`. Este proyecto
usa Tailwind v4, por lo que:

- El theme vive en `src/index.css` dentro de `@theme`.
- No existe `tailwind.config.js`.
- Los gradientes usan `bg-linear-to-*` (sintaxis v4).
- La paleta Material 3, las tipografías y los tokens de espaciado de la
  referencia están portados como variables CSS.

## Diseño responsive

La app usa un único árbol de rutas con dos capas de presentación:

| Viewport | Referencia | Comportamiento |
| --- | --- | --- |
| `< 1024px` (`lg`) | `reference2.html` | Shell móvil con top bar, bottom nav, métricas 2×2, tarjetas deslizables y hábitos en acordeón. |
| `≥ 1024px` (`lg`) | `reference.html` | Header, hero, grid de 12 columnas, sidebar y footer de escritorio. |

- El cambio de capa se hace con las utilidades `lg:hidden` / `hidden lg:block`,
  sin duplicar rutas.
- El bottom nav es una rejilla de 5 columnas y respeta `safe-area-inset-bottom`
  mediante `pb-safe`. En pantallas de 320 px reduce la tipografía de los labels.
- El top bar móvil es fijo y las páginas reservan espacio superior e inferior
  para no quedar tapadas por la navegación.
- Los carruseles horizontales usan scroll táctil con `snap-x` y conservan sus
  chips fuera del flujo del documento.
- Las páginas secundarias adaptan padding y tipografía en móvil y comparten el
  catálogo mock del dashboard.

### Login responsive

`/login` es una pantalla independiente del shell del dashboard:

| Viewport | Referencia | Comportamiento |
| --- | --- | --- |
| `< 1024px` (`lg`) | `loginreference2.html` | Top bar transaccional, acceso social, formulario en tarjetas y aviso de seguridad clínica. |
| `≥ 1024px` (`lg`) | `loginreference.html` | Header institucional, panel visual con testimonio, formulario y footer legal. |

La referencia móvil original contiene el formulario de registro; para `/login` se
reutilizó su lenguaje visual con los campos de inicio de sesión.

### Registro responsive

`/registro` también vive fuera del shell del dashboard:

| Viewport | Referencia | Comportamiento |
| --- | --- | --- |
| `< 1024px` (`lg`) | `registerreference2.html` | Top bar transaccional, acceso social, formulario en tarjetas, medidor de fuerza, coincidencia de contraseña y consentimiento HIPAA. |
| `≥ 1024px` (`lg`) | `registerreference.html` | Header institucional, panel de beneficios con prueba social, formulario completo y footer legal. |

El formulario valida cada campo en JavaScript, exige aceptar los términos,
compara ambas contraseñas y muestra la fuerza en 3 segmentos en escritorio y 4
en móvil. La newsletter es opcional y solo aparece en escritorio. El envío
simula la creación de la cuenta con estados de carga y éxito, inicia sesión y
abre el dashboard. Los accesos sociales reutilizan el mismo flujo; no hay
backend en esta fase.

## Estructura

```text
src/
├── components/
│   ├── auth/            Marca, headers, footer, botones sociales, aviso y hook de acceso social
│   ├── layout/          Header, MobileHeader, MobileBottomNav, Footer y AppLayout
│   └── ui/              Icon
├── context/
│   ├── AuthContext.jsx       Provider de sesión simulada
│   ├── UserContext.jsx       Usuario y resumen diario
│   ├── HabitsContext.jsx     Estado e interacción de hábitos
│   ├── FavoritesContext.jsx  Contenidos favoritos
│   ├── authStorage.js        Lectura/escritura en localStorage y sessionStorage
│   └── hooks/                Consumo de contextos y estado de los providers
├── data/
│   ├── homeData.js      Contenido mock del dashboard y catálogo
│   ├── loginData.js     Copy e imagen de inicio de sesión
│   ├── registerData.js  Copy, beneficios y prueba social del registro
│   └── authData.js      Perfiles simulados de acceso social
├── hooks/
│   ├── useDocumentTitle.js
│   └── useSocialAuthLogin.js
├── pages/
│   ├── home/
│   │   ├── hooks/       Búsqueda, desafío, banner, hábitos y favoritos de Home
│   │   ├── mobile/      Componentes de la Home móvil
│   │   └── *.jsx        Secciones de la Home de escritorio
│   ├── login/
│   │   ├── components/  Header, panel visual, formularios y diálogo de recuperación
│   │   ├── hooks/       Estado/validación del login y recuperación
│   │   ├── mobile/      Shell y formulario móvil
│   │   └── Login.jsx
│   ├── registro/
│   │   ├── components/  Header, panel de beneficios, formulario desktop y barras de fuerza
│   │   ├── hooks/       Estado y validación del formulario
│   │   ├── mobile/      Shell y formulario móvil
│   │   ├── utils/       Cálculo de fuerza de contraseña
│   │   ├── DesktopRegister.jsx
│   │   └── Registro.jsx
│   ├── contenidos/      Catálogo con búsqueda y filtros + hooks/
│   ├── busqueda/        Búsqueda sincronizada con la URL + hooks/
│   ├── habitos/         Vista dedicada de hábitos
│   ├── favoritos/       Favoritos y seguimiento + hooks/
│   └── perfil/          Sesión, estadísticas y logout + hooks/
├── utils/
│   ├── async.js         Esperas simuladas
│   ├── content.js       Búsqueda y filtrado del catálogo
│   ├── user.js          Nombre, iniciales y fecha de sesión
│   └── validation.js    Validadores de login y registro
├── App.jsx              Definición de rutas
├── main.jsx             Providers + BrowserRouter
└── index.css            Tailwind v4 + theme + estilos base
```

Cada pestaña tiene su carpeta en `src/pages`. Los componentes que solo usa una
página viven directamente en esa carpeta; los compartidos van en
`src/components`.

### Separación entre lógica y presentación

- Los archivos `.jsx` se enfocan en el render y reciben estado/handlers desde
  hooks co-locados en `hooks/` dentro de la misma página o componente.
- La lógica compartida vive en `src/hooks`, `src/utils` y
  `src/context/hooks`; los datos y copys mock permanecen en `src/data`.
- `AuthProvider` conserva la sesión simulada; `UserProvider`,
  `HabitsProvider` y `FavoritesProvider` exponen estado global mediante hooks
  de consumo separados.
- Las validaciones se centralizan en `src/utils/validation.js` y los
  formularios muestran mensajes por campo, estados de carga y confirmación de
  éxito.

## Rutas

| Ruta | Pestaña |
| --- | --- |
| `/` | Dashboard (Home) |
| `/login` | Iniciar Sesión |
| `/registro` | Crear cuenta |
| `/contenidos` | Contenidos Saludables |
| `/busqueda` | Búsqueda |
| `/habitos` | Mis Hábitos |
| `/favoritos` | Mis Favoritos y Hábitos |
| `/perfil` | Perfil |

El bottom nav móvil enlaza Dashboard, Explorar, Hábitos, Favoritos y Perfil.
`/login` y `/registro` viven fuera de `AppLayout` para no mostrar la navegación
del dashboard.

## Interacciones funcionales

- Autenticación simulada: validación por campo con mensajes claros, mostrar y
  ocultar contraseña, estados de carga/éxito y diálogo de recuperación con
  validación y confirmación. No se envía correo real ni se persisten
  contraseñas.
- Sesión: con “Recordarme” se guarda en `localStorage`; sin la casilla se usa
  `sessionStorage`. La sesión sobrevive a la recarga, el header y el perfil la
  reflejan y el logout limpia ambos almacenes.
- Registro: fuerza de contraseña en tiempo real, coincidencia entre contraseñas,
  visibilidad independiente de ambos campos, términos obligatorios, newsletter
  opcional, accesos sociales simulados y creación de sesión.
- Búsqueda: la Home (escritorio y móvil) navega a `/busqueda?q=...&filtro=...`;
  la página sincroniza el formulario con la URL, filtra el catálogo y permite
  limpiar la consulta y los filtros.
- Contenidos: búsqueda en vivo por texto y filtros por categoría sobre el
  catálogo mock existente.
- Favoritos: el corazón de las tarjetas actualiza el estado global (persistente
  durante la navegación SPA) y la pestaña muestra los guardados más el
  seguimiento de hábitos.
- Perfil: muestra los datos de la sesión activa, método de acceso, persistencia,
  estadísticas de hábitos/favoritos y logout; sin sesión ofrece acceder o
  registrarse.
- Checklist de hábitos: actualiza el contador del banner, el badge de la sección,
  la vista dedicada y la barra de “Hoy” en la gráfica semanal.
- Acordeón móvil de hábitos con detalle clínico desplegable.
- Registro del desafío semanal.
- Búsqueda con atajo `Ctrl/Cmd + K` y filtros seleccionables.
- Navegación activa del header de escritorio y del bottom nav móvil; el botón
  “Nuevo Registro” enlaza a `/habitos`.
- Todas las vistas se validaron de 320 a 1440 px sin overflow horizontal.

## Scripts

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run lint     # ESLint
npm run preview  # Previsualizar el build
```

`reference.html`, `reference2.html`, `loginreference.html`,
`loginreference2.html`, `registerreference.html` y `registerreference2.html` se
conservan como fuentes visuales, pero Vite no las sirve.

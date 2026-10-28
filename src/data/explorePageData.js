export const exploreCopy = {
  brand: 'Vitalis Wellness',
  breadcrumb: 'Biblioteca de Exploración',
  title: 'Explorar Biblioteca de Salud',
  mobileTitle: 'Explorar Biblioteca',
  description:
    'Evidencia científica, recetas de nutrición celular y rutinas bioadaptativas validadas para acompañar tu progreso.',
  mobileDescription:
    'Nutrición regenerativa, medicina del estilo de vida y biohacking funcional.',
  updatedLabel: 'Actualizado hoy',
  ebmLabel: 'Estándares de Medicina Basada en la Evidencia (EBM)',
  searchPlaceholder:
    'Buscar recetas antiinflamatorias, estudios clínicos, rutinas de movilidad, ingredientes...',
  mobileSearchPlaceholder: 'Buscar recetas, artículos, rutinas...',
  searchLabel: 'Buscar en la biblioteca de contenidos',
  recentLabel: 'Búsquedas recientes:',
  trendsDesktopLabel: 'Tendencias en la comunidad médica:',
  trendsMobileLabel: 'Tendencias en salud',
  trendsRealtime: '• tiempo real',
  filtersTitle: 'Ajusta tu exploración',
  filtersButton: 'Filtros avanzados',
  filtersActiveLabel: 'Ver filtros',
  clearFilters: 'Limpiar filtros',
  clearQuery: 'Limpiar búsqueda',
  resultsTitle: 'Recomendaciones para tu Plan',
  mobileResultsTitle: 'Exploración Recomendada',
  resultsPrefix: 'Mostrando',
  resultsSuffix: 'de',
  libraryTotal: 142,
  availableLabel: 'contenidos disponibles',
  matchesLabel: 'coincidencias',
  mobileCountLabel: '142 contenidos',
  loadMore: 'Cargar más contenidos saludables',
  mobileLoadMore: 'Cargar más contenidos',
  loadingMore: 'Cargando contenidos...',
  endOfResults: 'Has visto todos los contenidos de esta demostración.',
  emptyTitle: 'No encontramos contenidos',
  emptyDescription:
    'Prueba con otra palabra clave o selecciona un área diferente de la biblioteca.',
  emptyCta: 'Ver todos los contenidos',
  pageLabel: 'Página',
  pageOf: 'de',
  pageTotal: '142 recursos clínicos totales',
  featuredBadge: 'Protocolo Destacado · Vitalis Editorial',
  featuredWeek: 'Semana 12',
  featuredTitle:
    'Guía Completa del Eje Intestino-Cerebro: Protocolo Nutricional de 21 Días',
  featuredMobileTitle:
    'Guía del Eje Intestino-Cerebro: Protocolo 21 Días',
  featuredDescription:
    'Estrategias clínicas para optimizar neurotransmisores, reducir neuroinflamación y restaurar la barrera mucosa intestinal mediante alimentos fermentados y fibra prebiótica.',
  featuredMobileDescription:
    'Estrategias clínicas para optimizar neurotransmisores y microbiota.',
  featuredAuthor: 'Dra. Helena Ruiz',
  featuredAuthorRole: 'Medicina del Sueño y Cronobiología',
  featuredReadTime: '8 min de lectura',
  featuredEvidence: 'Evidencia Clase I',
  featuredCta: 'Leer Guía Completa',
  featuredMobileCta: 'Leer Guía',
  featuredPhase: 'Fase 1: Repoblación Microbiota',
  featuredRecipes: '21 recetas terapéuticas incluidas',
  featuredSaved: 'Guía destacada guardada en tus favoritos (demostración).',
  featuredRemoved: 'Guía destacada eliminada de favoritos (demostración).',
  featuredNotice:
    'Abriendo la guía completa del eje intestino-cerebro (demostración).',
  paginationNotice: 'Paginación simulada en esta demostración.',
  savedNotice: 'Contenido guardado en tus favoritos.',
  removedNotice: 'Contenido eliminado de tus favoritos.',
}

export const exploreFilters = [
  {
    id: 'all',
    label: 'Todo el contenido',
    mobileLabel: 'Todo',
    count: 142,
  },
  {
    id: 'nutrition',
    label: 'Nutrición y Recetas',
    mobileLabel: 'Recetas',
    count: 54,
  },
  {
    id: 'articles',
    label: 'Artículos y Evidencia Clínica',
    mobileLabel: 'Artículos Médicos',
    count: 38,
  },
  {
    id: 'training',
    label: 'Entrenamientos y Movilidad',
    mobileLabel: 'Rutinas',
    count: 26,
  },
  {
    id: 'sleep',
    label: 'Sueño y Ritmo Circadiano',
    mobileLabel: 'Sueño',
    count: 14,
  },
  {
    id: 'mental',
    label: 'Salud Mental y Mindfulness',
    mobileLabel: 'Bienestar',
    count: 10,
  },
]

export const exploreTrends = [
  {
    id: 'morning-light',
    label: '#LuzSolarMatutina',
    mobileLabel: 'LuzSolar',
    query: 'luz solar',
  },
  {
    id: 'microbiome',
    label: '#MicrobiotaIntestinal',
    mobileLabel: 'Microbiota',
    query: 'microbiota',
  },
  {
    id: 'clean-protein',
    label: '#ProteinaLimpia',
    mobileLabel: 'ProteínaLimpia',
    query: 'proteína',
  },
  {
    id: 'zone-2',
    label: '#Zone2Cardio',
    mobileLabel: 'Zone2',
    query: 'zone 2',
  },
  {
    id: 'vagal-breathing',
    label: '#RespiracionVagal',
    mobileLabel: 'Calma',
    query: 'vagal',
  },
  {
    id: 'magnesium',
    label: '#MagnesioGlicinato',
    mobileLabel: 'Magnesio',
    query: 'magnesio',
  },
]

export const exploreRecentSearches = [
  {
    id: 'magnesium',
    label: 'Magnesio glicinato',
    query: 'magnesio',
  },
  {
    id: 'zone-2',
    label: 'Cardio Zona 2',
    query: 'zone 2',
  },
  {
    id: 'microbiome',
    label: 'Microbioma',
    query: 'microbiota',
  },
]

export const exploreQuickFilters = [
  {
    id: 'duration',
    label: 'Tiempo',
    icon: 'schedule',
    options: [
      { id: 'any', label: 'Cualquier duración' },
      { id: '15', label: '≤ 15 min' },
      { id: '30', label: '≤ 30 min' },
      { id: '45', label: '45+ min' },
    ],
  },
  {
    id: 'goal',
    label: 'Objetivo',
    icon: 'flag',
    options: [
      { id: 'any', label: 'Cualquier objetivo' },
      { id: 'longevity', label: 'Longevidad' },
      { id: 'anti-inflammatory', label: 'Antiinflamatorio' },
      { id: 'stress', label: 'Reducción de estrés' },
      { id: 'performance', label: 'Masa muscular' },
      { id: 'mobility', label: 'Movilidad' },
    ],
  },
  {
    id: 'evidence',
    label: 'Evidencia',
    icon: 'policy',
    options: [
      { id: 'any', label: 'Cualquier nivel' },
      { id: 'level-1', label: 'Metaanálisis / Nivel I' },
      { id: 'peer', label: 'Revisión por pares' },
      { id: 'clinical', label: 'Estudio clínico' },
    ],
  },
  {
    id: 'diet',
    label: 'Dieta',
    icon: 'restaurant',
    options: [
      { id: 'any', label: 'Sin restricción' },
      { id: 'gluten-free', label: 'Sin gluten' },
      { id: 'vegan', label: 'Vegano' },
      { id: 'mediterranean', label: 'Mediterránea' },
    ],
  },
]

export const exploreFeatured = {
  id: 'gut-brain-protocol',
  image: '/images/login-wellness.jpg',
  imageAlt:
    'Mujer practicando respiración consciente en un invernadero con plantas',
  badge: exploreCopy.featuredBadge,
  week: exploreCopy.featuredWeek,
  title: exploreCopy.featuredTitle,
  mobileTitle: exploreCopy.featuredMobileTitle,
  description: exploreCopy.featuredDescription,
  mobileDescription: exploreCopy.featuredMobileDescription,
  author: exploreCopy.featuredAuthor,
  authorRole: exploreCopy.featuredAuthorRole,
  readTime: exploreCopy.featuredReadTime,
  evidence: exploreCopy.featuredEvidence,
  cta: exploreCopy.featuredCta,
  mobileCta: exploreCopy.featuredMobileCta,
  phase: exploreCopy.featuredPhase,
  recipes: exploreCopy.featuredRecipes,
}

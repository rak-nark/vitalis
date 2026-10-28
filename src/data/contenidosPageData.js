export const contenidosCopy = {
  title: 'Contenidos Saludables',
  description:
    'Tu biblioteca personalizada de nutrición celular, rutinas activas y evidencia clínica para tu plan de salud preventiva y longevidad sostenible.',
  mobileDescription:
    'Nutrición celular, rutinas y evidencia clínica para tu plan de longevidad.',
  availableLabel: 'contenidos disponibles',
  mobileAvailableLabel: 'contenidos',
  searchPlaceholder: 'Buscar por ingrediente, autor o rutina...',
  mobileSearchPlaceholder: 'Buscar en tus contenidos...',
  searchLabel: 'Buscar contenidos saludables',
  clearQuery: 'Limpiar búsqueda',
  shortcut: '⌘K',
  sortLabel: 'Ordenar contenidos',
  gridViewLabel: 'Vista en cuadrícula',
  listViewLabel: 'Vista en lista',
  collectionsLabel: 'COLECCIONES ORGANIZADAS',
  manageCollections: 'Gestionar colecciones',
  newCollection: 'Nueva Colección',
  collectionPrefix: 'Colección:',
  clearCollection: 'Quitar',
  filterLabel: 'Filtrar por:',
  resultsPrefix: 'Mostrando',
  resultsMiddle: 'de',
  resultsSuffix:
    'contenidos disponibles en tu biblioteca clínica',
  filteredResultsSuffix: 'contenidos en la selección actual',
  previousPage: 'Anterior',
  nextPage: 'Siguiente',
  libraryLabel: 'En tu biblioteca',
  emptyTitle: 'No encontramos contenidos',
  emptyDescription:
    'Prueba con otra palabra clave o selecciona otra colección o tipo de contenido.',
  emptyCta: 'Ver todos los contenidos',
  savedNotice: 'Contenido guardado en tus favoritos.',
  removedNotice: 'Contenido eliminado de tus favoritos.',
  createCollectionNotice:
    'La creación de colecciones estará disponible próximamente (demostración).',
  manageCollectionsNotice:
    'La gestión de colecciones estará disponible próximamente (demostración).',
  pageNotice: 'Solo hay una página de contenidos en esta demostración.',
  optionsNotice:
    'Las opciones del contenido estarán disponibles próximamente (demostración).',
  planNotice: 'Contenido añadido a tu plan semanal (demostración).',
  shoppingNotice: 'Contenido añadido a tu lista de compras (demostración).',
  notesNotice: 'Notas clínicas abiertas (demostración).',
  scheduleNotice: 'Contenido agendado en tu calendario (demostración).',
  shareNotice: 'Enlace del contenido copiado (demostración).',
  genericNotice: 'Acción simulada en esta demostración.',
}

export const contentSortOptions = [
  { id: 'recent', label: 'Más recientes', mobileLabel: 'Recientes' },
  {
    id: 'duration',
    label: 'Por duración / tiempo',
    mobileLabel: 'Duración',
  },
  {
    id: 'popularity',
    label: 'Mayor popularidad',
    mobileLabel: 'Popularidad',
  },
  {
    id: 'type',
    label: 'Por tipo de contenido',
    mobileLabel: 'Tipo',
  },
]

export const contentTypes = [
  { id: 'all', label: 'Todos', mobileLabel: 'Todos' },
  { id: 'recipe', label: 'Recetas', mobileLabel: 'Recetas' },
  {
    id: 'article',
    label: 'Artículos & Guías',
    mobileLabel: 'Artículos',
  },
  { id: 'routine', label: 'Entrenamientos', mobileLabel: 'Rutinas' },
]

export const contentCollections = [
  {
    id: 'all',
    label: 'Todas las colecciones',
    icon: 'folder_special',
    iconClass: 'text-on-primary',
  },
  {
    id: 'nutrition',
    label: 'Recetas Antiinflamatorias',
    icon: 'restaurant',
    iconClass: 'text-secondary',
    types: ['recipe'],
  },
  {
    id: 'movement',
    label: 'Movimiento & Recuperación',
    icon: 'fitness_center',
    iconClass: 'text-tertiary-container',
    types: ['routine'],
  },
  {
    id: 'evidence',
    label: 'Artículos Clínicos',
    icon: 'chips',
    iconClass: 'text-primary',
    types: ['article'],
  },
  {
    id: 'calm',
    label: 'Rituales de Calma',
    icon: 'self_improvement',
    iconClass: 'text-secondary',
    contentIds: ['circadian-glucose', 'vagal-mobility'],
  },
]

export const contentPopularity = {
  'nordic-salmon-bowl': 98,
  'circadian-glucose': 91,
  'vagal-mobility': 88,
  'chia-cacao-pudding': 95,
  'scfa-longevity': 84,
  'zone2-mitochondria': 90,
}

export const contentPresentation = {
  'nordic-salmon-bowl': {
    desktopVariant: 'visual',
    mobileVariant: 'recipeHero',
    macroLabel: 'MACRONUTRIENTES CLÍNICOS:',
    secondaryActions: [
      {
        icon: 'calendar_add_on',
        label: 'Añadir a mi plan semanal',
        notice: 'planNotice',
      },
      {
        icon: 'share',
        label: 'Compartir contenido',
        notice: 'shareNotice',
      },
    ],
    mobileFooterLabel: 'En tu biblioteca',
  },
  'circadian-glucose': {
    desktopVariant: 'article',
    mobileVariant: 'article',
    authorInitials: 'HR',
    insightTitle: 'Cita Clínica Clave',
    articleAction: {
      label: 'Notas',
      icon: 'edit_note',
      notice: 'notesNotice',
    },
  },
  'vagal-mobility': {
    desktopVariant: 'visual',
    mobileVariant: 'routine',
    equipment: 'Esterilla / Peso corporal',
    joints: 'Bajo impacto articular',
    mobileIcon: 'self_improvement',
    mobileIntensity: 'Moderada',
    mobileEquipment: 'Esterilla',
    mobileNote: 'Sin impacto articular',
    impactLabel: 'IMPACTO BIOMÉTRICO ESTIMADO',
    impactValue: '-34% de reducción',
    impactDescription:
      'En la frecuencia cardíaca de reposo y reactivación inmediata del tono vagal parasimpático antes del descanso.',
    recommendation: 'Ideal antes de dormir (21:30 - 23:00)',
    scheduleIcon: 'bedtime',
    secondaryActions: [
      {
        icon: 'event_repeat',
        label: 'Agendar para mañana',
        notice: 'scheduleNotice',
      },
    ],
  },
  'chia-cacao-pudding': {
    desktopVariant: 'visual',
    mobileVariant: 'recipeCompact',
    macroLabel: 'PERFIL PREBIÓTICO:',
    secondaryActions: [
      {
        icon: 'playlist_add',
        label: 'Añadir a lista de compras',
        notice: 'shoppingNotice',
      },
      {
        icon: 'share',
        label: 'Compartir contenido',
        notice: 'shareNotice',
      },
    ],
    mobileFooterLabel: 'Prebiótico',
    mobileFooterIcon: 'eco',
  },
  'scfa-longevity': {
    desktopVariant: 'article',
    mobileVariant: 'article',
    authorInitials: 'DG',
    insightTitle: 'Revisión clínica certificada',
    insightText:
      'Evidencia robusta sobre cómo los ácidos grasos de cadena corta modulan la inflamación subclínica y la integridad de la barrera intestinal.',
    articleAction: {
      label: 'Mi plan',
      title: 'Añadir a mi plan semanal',
      icon: 'bookmark_add',
      notice: 'planNotice',
    },
  },
  'zone2-mitochondria': {
    desktopVariant: 'routine',
    mobileVariant: 'routine',
    equipment: 'Bicicleta / Cinta / Caminata',
    joints: 'Bajo impacto articular',
    mobileIcon: 'monitor_heart',
    mobileIntensity: 'Zona 2',
    mobileEquipment: 'Cardio',
    mobileNote: 'Frecuencia controlada',
    impactLabel: 'IMPACTO BIOMÉTRICO ESTIMADO',
    impactValue: '+22% biogénesis mitocondrial',
    impactDescription:
      'Optimiza la oxidación lipídica y la capacidad aeróbica con lactato plasmático inferior a 2.0 mmol/L.',
    recommendation: 'Ideal en ayunas o 2 h después de comer',
    scheduleIcon: 'schedule',
    desktopCtaLabel: 'Comenzar sesión guiada',
    secondaryActions: [
      {
        icon: 'calendar_today',
        label: 'Agendar en el calendario',
        notice: 'scheduleNotice',
      },
    ],
  },
}

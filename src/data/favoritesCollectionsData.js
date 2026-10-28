export const initialCollections = [
  {
    id: 'all',
    label: 'Todas las colecciones',
    icon: 'folder_special',
    iconClass: 'text-primary',
  },
  {
    id: 'recipes',
    label: 'Recetas Antiinflamatorias',
    icon: 'restaurant',
    iconClass: 'text-secondary',
  },
  {
    id: 'routines',
    label: 'Movimiento & Recuperación',
    icon: 'wb_sunny',
    iconClass: 'text-tertiary-container',
  },
  {
    id: 'articles',
    label: 'Artículos Clínicos',
    icon: 'menu_book',
    iconClass: 'text-primary',
  },
  {
    id: 'meditations',
    label: 'Meditaciones Guiadas',
    icon: 'self_improvement',
    iconClass: 'text-secondary',
  },
]

export const contentCategoryFilters = [
  { id: 'all', label: 'Todos', mobileLabel: 'Todas' },
  {
    id: 'recipe',
    label: 'Recetas',
    mobileLabel: 'Recetas',
    icon: 'restaurant',
  },
  {
    id: 'article',
    label: 'Artículos & Guías',
    mobileLabel: 'Artículos',
    icon: 'menu_book',
  },
  {
    id: 'routine',
    label: 'Entrenamientos',
    mobileLabel: 'Rutinas',
    icon: 'fitness_center',
  },
]

export const sortOptions = [
  { value: 'recent', label: 'Más recientes' },
  { value: 'duration', label: 'Por duración / tiempo' },
  { value: 'popularity', label: 'Mayor popularidad' },
]

export const defaultFavoriteIds = [
  'nordic-salmon-bowl',
  'circadian-glucose',
  'vagal-mobility',
  'chia-cacao-pudding',
  'scfa-longevity',
  'zone2-mitochondria',
]

export const contentCollectionMap = {
  'nordic-salmon-bowl': 'recipes',
  'chia-cacao-pudding': 'recipes',
  'vagal-mobility': 'routines',
  'zone2-mitochondria': 'routines',
  'circadian-glucose': 'articles',
  'scfa-longevity': 'articles',
}

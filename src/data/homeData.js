export const currentUser = {
  firstName: 'Camila',
  fullName: 'Camila',
  streakDays: 14,
  avatar: '/images/avatar.jpg',
  avatarAlt: 'Foto de perfil de Camila',
}

export const dailySummary = {
  goalPercentage: 68,
  hydrationRemaining: '400 ml',
  vitalityLabel: 'Excelente',
  vitalityDelta: '+4% mejor que ayer a esta hora',
  vitalityDeltaCompact: '(+4%)',
  vitalityCopy:
    'Ritmo metabólico óptimo. Mantén la hidratación vespertina.',
}

export const dailyMetrics = [
  {
    id: 'hydration',
    label: 'Hidratación',
    icon: 'water_drop',
    iconClass: 'text-cyan-700',
    badge: '84%',
    badgeClass: 'bg-[#ECFEFF] text-[#0E7490]',
    value: '2.1L',
    total: '/ 2.5L',
    progress: 84,
    progressClass: 'bg-linear-to-r from-[#0E7490] to-[#06b6d4]',
    hoverClass: 'hover:border-cyan-200',
    mobile: {
      label: 'Hidratación',
      value: '2.1',
      unit: '/ 2.5L',
      hint: '84% de meta',
      icon: 'water_drop',
      iconClass: 'bg-[#ECFEFF] text-[#0E7490]',
      barClass: 'bg-[#0E7490]',
      showProgress: true,
    },
  },
  {
    id: 'calories',
    label: 'Calorías Saludables',
    icon: 'nutrition',
    iconClass: 'text-amber-700',
    badge: '1,420 kcal',
    badgeClass: 'bg-[#FEF3C7] text-[#92400E]',
    value: '1,420',
    total: '/ 1,950 kcal',
    progress: 72,
    progressClass: 'bg-linear-to-r from-amber-500 to-amber-600',
    hoverClass: 'hover:border-amber-200',
    mobile: {
      label: 'Calorías',
      value: '1,420',
      unit: 'kcal',
      hint: 'Meta: 1,950 kcal',
      icon: 'restaurant',
      iconClass: 'bg-[#FEF3C7] text-[#92400E]',
      barClass: 'bg-primary',
      showProgress: true,
    },
  },
  {
    id: 'activity',
    label: 'Actividad Física',
    icon: 'fitness_center',
    iconClass: 'text-primary',
    badge: '35 min',
    badgeClass: 'bg-[#ECFDF5] text-[#064E3B]',
    value: '35 min',
    total: '/ 45 min meta',
    progress: 77,
    progressClass: 'bg-primary',
    hoverClass: 'hover:border-emerald-200',
    mobile: {
      label: 'Actividad',
      value: '35',
      unit: '/ 45 min',
      hint: 'Faltan 10 min',
      icon: 'directions_run',
      iconClass: 'bg-secondary-container text-on-secondary-container',
      barClass: 'bg-secondary',
      showProgress: true,
    },
  },
  {
    id: 'sleep',
    label: 'Calidad de Sueño',
    icon: 'bedtime',
    iconClass: 'text-indigo-700',
    badge: 'Profundo',
    badgeClass: 'bg-[#EFF6FF] text-[#1E40AF]',
    value: '7h 45m',
    total: '91% eficiencia',
    progress: 91,
    progressClass: 'bg-linear-to-r from-blue-600 to-indigo-600',
    hoverClass: 'hover:border-indigo-200',
    mobile: {
      label: 'Sueño reparador',
      value: '7h 45m',
      unit: '',
      hint: 'Fase REM óptima',
      icon: 'bedtime',
      iconClass: 'bg-[#EFF6FF] text-[#1E40AF]',
      barClass: 'bg-primary',
      showProgress: false,
      status: '91% eficiencia',
    },
  },
]

export const contentFilters = [
  { id: 'all', label: 'Todas las áreas', mobileLabel: 'Todas' },
  {
    id: 'breakfast',
    label: 'Desayunos Rápidos',
    mobileLabel: 'Desayunos Rápidos',
    icon: 'egg_alt',
    iconClass: 'text-amber-600',
  },
  {
    id: 'gluten-free',
    label: 'Sin Gluten',
    mobileLabel: 'Sin Gluten',
    icon: 'eco',
    iconClass: 'text-emerald-600',
  },
  {
    id: 'hiit',
    label: 'HIIT 20 min',
    mobileLabel: 'HIIT 20 min',
    icon: 'timer',
    iconClass: 'text-rose-600',
  },
  {
    id: 'strength',
    label: 'Fuerza y Resistencia',
    mobileLabel: 'Fuerza',
    icon: 'exercise',
    iconClass: 'text-blue-600',
  },
  {
    id: 'mindfulness',
    label: 'Salud Mental & Respiración',
    mobileLabel: 'Mindfulness',
    icon: 'self_improvement',
    iconClass: 'text-purple-600',
  },
]

export const recommendedContent = [
  {
    id: 'nordic-salmon-bowl',
    image: '/images/salmon-bowl.jpg',
    imageAlt:
      'Bowl proteico de quinua con aguacate, vegetales crujientes y salmón fresco',
    topBadgeIcon: 'verified_user',
    topBadgeLabel: 'Basado en tu perfil',
    tags: [
      {
        label: '32g Proteína',
        className: 'bg-[#EFF6FF] text-[#1E40AF]',
      },
      {
        label: '420 kcal',
        className: 'bg-[#FEF3C7] text-[#92400E]',
      },
    ],
    duration: '15 min prep',
    durationIcon: 'schedule',
    difficulty: 'Fácil',
    difficultyIcon: 'signal_cellular_alt_1_bar',
    difficultyClass: 'text-primary',
    title: 'Bowl Nórdico de Salmón y Quinua Silvestre',
    description:
      'Optimizado para tu recuperación post-caminata de hoy con ácidos grasos esenciales Omega-3 y carbohidratos complejos de absorción lenta.',
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
      ctaVariant: 'primary',
    },
  },
  {
    id: 'core-stability',
    image: '/images/core-routine.jpg',
    imageAlt:
      'Entrenamiento de fuerza y core en casa con esterilla ecológica',
    topBadgeIcon: 'bolt',
    topBadgeLabel: 'Ajustado a tu objetivo',
    tags: [
      {
        label: 'Bajo Impacto',
        className: 'bg-[#ECFEFF] text-[#0E7490]',
      },
      {
        label: '180 kcal',
        className: 'bg-[#FDF2F8] text-[#9D174D]',
      },
    ],
    duration: '20 min',
    durationIcon: 'timer',
    difficulty: 'Moderado',
    difficultyIcon: 'signal_cellular_alt_2_bar',
    difficultyClass: 'text-amber-700',
    title: 'Core & Estabilidad Funcional sin Equipamiento',
    description:
      'Secuencia de 5 ejercicios diseñada para aliviar tensión postural lumbar y activar musculatura profunda del abdomen.',
    category: 'Rutina en Casa',
    cta: 'Iniciar ahora',
    ctaIcon: 'play_arrow',
    ctaVariant: 'primary',
    filterIds: ['hiit', 'strength'],
    mobile: {
      category: 'Movimiento',
      categoryClass: 'text-secondary',
      time: '20 min',
      cta: 'Iniciar rutina',
      ctaIcon: 'play_circle',
      ctaVariant: 'secondary',
    },
  },
]

export const initialHabits = [
  {
    id: 'water',
    title: 'Beber 2.5L de agua filtrada',
    detail: 'Meta de termorregulación y digestión celular',
    tag: '2.1 / 2.5 L',
    tagClass: 'bg-[#ECFEFF] text-[#0E7490]',
    icon: 'water_drop',
    completed: true,
    mobileDetail: '2.1L registrados • Cumplido al 84%',
    mobileTip:
      'Tip clínico: añade una pizca de sal marina celta para mejorar el balance electrolítico celular.',
  },
  {
    id: 'walk',
    title: '30 min de caminata aeróbica o ejercicio',
    detail: 'Registrado automáticamente: 35 min activos',
    tag: 'Cumplido',
    tagClass: 'bg-[#ECFDF5] text-[#064E3B]',
    icon: 'directions_walk',
    completed: true,
    mobileDetail: 'Completado a las 08:45 AM (3,840 pasos)',
    mobileTip:
      'Los paseos postprandiales mejoran la sensibilidad a la insulina durante el resto del día.',
  },
  {
    id: 'breakfast',
    title: 'Desayuno alto en proteína (>25g)',
    detail: 'Tortilla de claras, espinacas y semillas de chía',
    tag: '28g registrados',
    tagClass: 'bg-[#EFF6FF] text-[#1E40AF]',
    icon: 'restaurant',
    completed: true,
    mobileDetail: 'Registrado con éxito (32g asimilados)',
    mobileTip:
      'Distribuir la proteína en el desayuno reduce los picos de glucosa y prolonga la saciedad.',
  },
  {
    id: 'meditation',
    title: 'Meditación y respiración consciente 10 min',
    detail: 'Sugerido para las 18:30 (transición laboral)',
    tag: 'Pendiente',
    tagClass: 'bg-slate-100 text-slate-600',
    icon: 'self_improvement',
    completed: false,
    mobileDetail: 'Pendiente para las 18:30',
    mobileTip:
      'Dos minutos de respiración diafragmática antes de empezar reducen la activación del sistema nervioso simpático.',
  },
  {
    id: 'screen-free',
    title: 'Desconexión digital nocturna (sin pantallas 45 min)',
    detail: 'Alineación circadiana y secreción de melatonina',
    tag: 'Noche',
    tagClass: 'bg-slate-100 text-slate-600',
    icon: 'dark_mode',
    completed: false,
    mobileDetail: 'Programado para las 22:00',
    mobileTip:
      'Evitar pantallas 45 minutos antes de dormir favorece la secreción natural de melatonina.',
  },
]

export const weeklyConsistency = [
  { id: 'mon', label: 'Lun', shortLabel: 'L', completed: 5, total: 5 },
  { id: 'tue', label: 'Mar', shortLabel: 'M', completed: 4, total: 5 },
  { id: 'wed', label: 'Mié', shortLabel: 'X', completed: 5, total: 5 },
  { id: 'thu', label: 'Jue', shortLabel: 'J', completed: 5, total: 5 },
  { id: 'fri', label: 'Vie', shortLabel: 'V', completed: 4, total: 5 },
  { id: 'sat', label: 'Sáb', shortLabel: 'S', completed: 5, total: 5 },
  {
    id: 'sun',
    label: 'Hoy',
    shortLabel: 'Hoy',
    completed: 3,
    total: 5,
    isToday: true,
  },
]

export const weeklyAdherence = '92% de adherencia'
export const weeklyAdherenceMobile = '92% promedio'

export const wellnessTip = {
  label: 'Evidencia Científica del Día',
  title: 'Luz solar matutina y ritmo circadiano',
  descriptionBefore:
    'Exponerse a 10–15 minutos de luz natural directa dentro de la primera hora tras despertar suprime la melatonina e incrementa el cortisol saludable, mejorando la concentración diurna y la calidad del sueño profundo en un',
  highlight: '27%',
  descriptionAfter: '.',
  reference: 'Ref: Harvard Medical School (2023)',
  source: 'Harvard Medical School',
  readingTime: '4 min lectura',
  shortDescription:
    'Exposición a 10,000 lux en los primeros 30 minutos mejora la síntesis de melatonina nocturna.',
  linkLabel: 'Leer estudio',
}

export const weeklyChallenge = {
  label: 'Desafío Semanal',
  daysLeft: '3 días restantes',
  title: '5 Días de Cenas Bajas en Sodio',
  description:
    'Únete a otros 420 miembros de Vitalis en la optimización de presión arterial y reducción de retención de líquidos.',
  progressLabel: '3 de 5 cenas',
  progress: 60,
  cta: 'Registrar cena de hoy',
  mobileTitle: 'Desafío: Cenas Bajas en Sodio',
  mobileDays: '3/5 días',
  mobileMessage:
    '¡2 días más para ganar la insignia de Presión Saludable!',
}

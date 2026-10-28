export const habitPageCopy = {
  brand: 'Vitalis Wellness',
  breadcrumb: 'Mis Favoritos y Hábitos',
  title: 'Mis Favoritos y Hábitos',
  description:
    'Completa tu protocolo diario y retoma los contenidos que guardaste, todo desde un mismo espacio.',
  dateLabel: 'Hoy, 24 de Octubre',
  mobileDateLabel: 'Jueves, 24 de Octubre',
  phaseLabel: 'Fase Regenerativa',
  registerLabel: 'Registrar hábito',
  sectionTitle: 'Hábitos Activos del Protocolo',
  heroBadge: 'Ritmo Óptimo Biológico',
  mobileHeroBadge: 'Ritmo Óptimo',
  heroUpdated: 'Actualizado hace 12 min',
  savedTitle: 'Contenidos guardados',
  savedDescription:
    'Tus recetas, artículos y rutinas favoritas, listos para retomar.',
  savedLinkLabel: 'Explorar más',
  savedCta: 'Explorar contenidos',
  savedEmptyTitle: 'Aún no tienes favoritos',
  savedEmptyDescription:
    'Toca el corazón de una receta, artículo o rutina para guardarla aquí.',
}

export const habitCategories = [
  {
    id: 'nutrition',
    label: 'Nutrición y Biomarcadores',
    icon: 'nutrition',
    dotClass: 'bg-primary',
    barClass: 'bg-primary',
    textClass: 'text-primary',
  },
  {
    id: 'mental',
    label: 'Salud Mental y Calma',
    icon: 'psychology',
    dotClass: 'bg-primary',
    barClass: 'bg-primary',
    textClass: 'text-primary',
  },
  {
    id: 'activity',
    label: 'Actividad y Condición Física',
    icon: 'fitness_center',
    dotClass: 'bg-amber-500',
    barClass: 'bg-amber-500',
    textClass: 'text-amber-700',
  },
  {
    id: 'recovery',
    label: 'Reparación y Sueño Profundo',
    icon: 'bed',
    dotClass: 'bg-indigo-500',
    barClass: 'bg-indigo-500',
    textClass: 'text-indigo-700',
  },
]

export const habitTimeFilters = [
  { id: 'all', label: 'Todos' },
  { id: 'morning', label: 'Mañana' },
  { id: 'afternoon', label: 'Tarde' },
  { id: 'evening', label: 'Noche' },
]

export const habitHeroMetrics = [
  {
    id: 'hydration',
    value: '2.1L',
    label: 'Meta 2.5L',
    mobileLabel: 'Agua Celular',
    icon: 'water_drop',
    iconClass: 'text-[#0E7490]',
    iconBgClass: 'bg-[#ECFEFF]',
  },
  {
    id: 'calm',
    value: '15 min',
    label: 'Calma mental',
    mobileLabel: 'Calma Mental',
    icon: 'self_improvement',
    iconClass: 'text-primary',
    iconBgClass: 'bg-emerald-50',
  },
  {
    id: 'steps',
    value: '8,420',
    label: 'De 10k pasos',
    mobileLabel: 'Pasos Hoy',
    icon: 'footprint',
    iconClass: 'text-amber-800',
    iconBgClass: 'bg-amber-50',
  },
  {
    id: 'sleep',
    value: '7h 45m',
    label: 'Sueño REM',
    mobileLabel: 'Sueño REM',
    icon: 'bedtime',
    iconClass: 'text-indigo-700',
    iconBgClass: 'bg-indigo-50',
  },
]

export const habitWeek = {
  label: 'Semana 43 • Octubre',
  average: '92%',
  trend: '+6.4% mejor que la semana pasada',
  trendLabel: 'Excelente constancia',
  days: [
    {
      id: 'mon',
      label: 'Lun',
      shortLabel: 'LUN',
      date: '21',
      completed: 6,
      total: 6,
      status: 'complete',
    },
    {
      id: 'tue',
      label: 'Mar',
      shortLabel: 'MAR',
      date: '22',
      completed: 6,
      total: 6,
      status: 'complete',
    },
    {
      id: 'wed',
      label: 'Mié',
      shortLabel: 'MIÉ',
      date: '23',
      completed: 6,
      total: 6,
      status: 'complete',
    },
    {
      id: 'thu',
      label: 'Jue',
      shortLabel: 'HOY',
      date: '24',
      completed: 4,
      total: 6,
      status: 'today',
      isToday: true,
    },
    {
      id: 'fri',
      label: 'Vie',
      shortLabel: 'VIE',
      date: '25',
      completed: 0,
      total: 6,
      status: 'upcoming',
    },
    {
      id: 'sat',
      label: 'Sáb',
      shortLabel: 'SÁB',
      date: '26',
      completed: 0,
      total: 6,
      status: 'upcoming',
    },
    {
      id: 'sun',
      label: 'Dom',
      shortLabel: 'DOM',
      date: '27',
      completed: 0,
      total: 6,
      status: 'upcoming',
    },
  ],
}

export const habitAdherence = {
  title: 'Consistencia Semanal vs. Promedio Mensual',
  subtitle: 'Tasa de cumplimiento de protocolo en los últimos 7 días',
  average: '92%',
  trend: '+6.4% mejor que la semana pasada',
  days: [
    { id: 'mon', label: 'Lun', percent: 100, state: 'complete' },
    { id: 'tue', label: 'Mar', percent: 100, state: 'complete' },
    { id: 'wed', label: 'Mié', percent: 95, state: 'complete' },
    { id: 'thu', label: 'Hoy', percent: 67, state: 'today' },
    { id: 'fri', label: 'Vie', percent: 15, state: 'upcoming' },
    { id: 'sat', label: 'Sáb', percent: 15, state: 'upcoming' },
    { id: 'sun', label: 'Dom', percent: 15, state: 'upcoming' },
  ],
}

const heatmapLevels = [
  4, 4, 3, 4, 2, 4, 4, 4, 3, 4, 4, 4, 4, 4, 3, 4, 4, 4, 4, 2, 4, 4, 4, 4, 4,
  4, 4, 4, 4, 4, 3, 4, 4, 4, 3,
]

const heatmapStart = new Date(Date.UTC(2025, 8, 20))
const heatmapDateFormatter = new Intl.DateTimeFormat('es-ES', {
  day: 'numeric',
  month: 'short',
  timeZone: 'UTC',
})

export const consistencyHeatmap = {
  title: 'Mapa Anual de Racha y Rango',
  subtitle: 'Registro continuo de los últimos 30 días',
  rangeLabels: ['20 Sep', '8 Oct', '24 Oct (Hoy)'],
  days: heatmapLevels.map((level, index) => {
    const date = new Date(heatmapStart)
    date.setUTCDate(date.getUTCDate() + index)

    return {
      id: `heatmap-${index}`,
      level,
      dateLabel: heatmapDateFormatter.format(date),
      percentage: [0, 25, 50, 75, 100][level],
    }
  }),
}

export const habitSuggestions = [
  {
    id: 'morning-light',
    title: 'Exposición a luz solar matutina',
    description:
      'Primeros 30 min tras despertar. Sincroniza el ritmo circadiano.',
    impact: '+22% energía diurna estimada',
    impactClass: 'text-primary',
    icon: 'light_mode',
    iconBgClass: 'bg-amber-100',
    iconClass: 'text-amber-800',
    habit: {
      id: 'morning-light',
      title: 'Exposición a luz solar matutina',
      detail: '10–15 min de luz natural directa al despertar.',
      categoryId: 'mental',
      badge: 'Circadiano',
      badgeClass: 'bg-amber-50 text-amber-800',
      tag: 'Nuevo',
      tagClass: 'bg-secondary-container text-on-secondary-container',
      icon: 'light_mode',
      iconClass: 'text-amber-700',
      iconBgClass: 'bg-amber-100',
      metaIcon: 'schedule',
      completed: false,
      streakDays: 0,
      timeOfDay: 'morning',
      scheduleLabel: 'Sugerido: 07:30',
      showProgressBar: false,
      progress: 0,
      progressLabel: 'Sin registros',
      progressBarClass: 'bg-primary',
      progressTextClass: 'text-primary',
      completedLabel: 'Sugerido para las 07:30',
      mobileDetail: 'Sugerido para las 07:30',
      mobileTip:
        'La exposición temprana a la luz natural regula el cortisol saludable y mejora la energía durante el día.',
    },
  },
  {
    id: 'magnesium',
    title: 'Magnesio glicinato post-cena',
    description:
      '300 mg una hora antes de dormir para aumentar las ondas lentas delta.',
    impact: '+18% descanso muscular',
    impactClass: 'text-indigo-700',
    icon: 'medication',
    iconBgClass: 'bg-indigo-100',
    iconClass: 'text-indigo-800',
    habit: {
      id: 'magnesium',
      title: 'Magnesio glicinato post-cena',
      detail: '300 mg una hora antes de dormir.',
      categoryId: 'recovery',
      badge: 'Recuperación',
      badgeClass: 'bg-indigo-50 text-indigo-700',
      tag: 'Nuevo',
      tagClass: 'bg-secondary-container text-on-secondary-container',
      icon: 'medication',
      iconClass: 'text-indigo-700',
      iconBgClass: 'bg-indigo-100',
      metaIcon: 'schedule',
      completed: false,
      streakDays: 0,
      timeOfDay: 'evening',
      scheduleLabel: 'Sugerido: 21:00',
      showProgressBar: false,
      progress: 0,
      progressLabel: 'Sin registros',
      progressBarClass: 'bg-primary',
      progressTextClass: 'text-primary',
      completedLabel: 'Sugerido para las 21:00',
      mobileDetail: 'Sugerido para las 21:00',
      mobileTip:
        'El magnesio glicinato favorece la relajación muscular y la calidad del sueño profundo.',
    },
  },
]

export const habitRecoveryTip = {
  title: 'Hábito de preparación para mañana',
  description:
    'Mantén tu dormitorio a 19°C para potenciar la fase REM.',
  cta: 'Ver detalle',
  to: '/contenidos',
}

export const habitSpecialist = {
  label: 'Revisión Médica Semanal',
  name: 'Dra. Helena Ruiz',
  description:
    'Tu adherencia del 92% cumple con los parámetros para la optimización metabólica.',
  nextAppointment: '29 de Octubre',
  cta: 'Enviar bitácora al doctor',
  successLabel: 'Bitácora enviada',
}

export const profileCopy = {
  brand: 'Vitalis Wellness',
  breadcrumb: 'Perfil de Usuario',
  breadcrumbActive: 'Salud Integral',
  title: 'Perfil de Bienestar Integral',
  mobileTitle: 'Mi Perfil',
  description:
    'Tu identidad clínica, biomarcadores, objetivos y equipo médico en un solo lugar.',
  mobileDescription: 'Tu salud integral, en un vistazo.',
  memberBadge: 'Miembro Vitalis Pro · Longevidad Activa',
  mobileMemberBadge: 'Vitalis Pro · Longevidad',
  demographics: '32 años · Ciudad de México / Madrid',
  mobileDemographics: '32 años · Ciudad de México',
  memberSince: 'Miembro desde Enero 2024',
  bloodType: 'Grupo Sanguíneo: A+',
  mobileBloodType: 'Grupo: A+',
  allergies: 'Sin alergias severas',
  monitoring: 'Monitoreo Biomédico Activo',
  adherenceTitle: 'Consistencia del Protocolo',
  mobileAdherenceTitle: 'Consistencia del Protocolo',
  adherenceSubtitle: 'Adherencia clínica mensual',
  adherenceTrend: '+3.2% vs ciclo anterior',
  cycleLabel: 'Adherencia clínica mensual',
  mobileCycleLabel: 'Adherencia clínica mensual',
  updatedLabel: 'Actualizado 09:30',
  editLabel: 'Editar Perfil',
  editShortLabel: 'Editar',
  mobileEditLabel: 'Editar',
  exportLabel: 'Exportar Informe Clínico (PDF)',
  mobileExportLabel: 'Exportar Informe Clínico Integral (PDF)',
  exportingLabel: 'Generando informe...',
  saveLabel: 'Guardar',
  cancelLabel: 'Cancelar',
  nameLabel: 'Nombre visible',
  namePlaceholder: 'Escribe tu nombre',
  editHint: 'Este cambio es una simulación local y no modifica tu cuenta.',
  biometryTitle: 'Resumen de Biometría y Estado Metabólico',
  biometrySubtitle:
    'Lecturas automatizadas validadas por hardware clínico en las últimas 24 horas.',
  analyticsLink: 'Ver analítica completa',
  mobileBiomarkersTitle: 'Biomarcadores en Tiempo Real',
  goalsTitle: 'Objetivos Biológicos y Dietarios',
  goalsActiveLabel: 'Protocolos en Marcha',
  restrictionsLabel: 'Restricciones & Pautas Clínicas',
  mobileRestrictionsLabel: 'Restricciones Clínicas Activas',
  addGoal: 'Añadir',
  goalCta: '+ Añadir Objetivo o Restricción Nutricional',
  devicesTitle: 'Ecosistema de Dispositivos Conectados',
  devicesActiveLabel: '3 Activos',
  deviceCta: '+ Vincular Nuevo Dispositivo Médico',
  mobileDevicesTitle: 'Dispositivos Conectados',
  mobileDevicesActiveLabel: '2 Activos',
  mobileLinkDevice: '+ Vincular',
  specialistsTitle: 'Equipo Clínico & Especialistas Asignados',
  specialistsSubtitle:
    'Supervisión médica multidisciplinar para la consecución de objetivos preventivos.',
  specialistsLink: 'Directorio Vitalis',
  mobileSpecialistsTitle: 'Especialistas Médicos Asignados',
  mobileSpecialistsActiveLabel: '2 activos',
  privacyTitle: 'Configuración de Privacidad y Notificaciones Clínicas',
  privacySubtitle:
    'Control granular sobre cómo se procesan y alertan tus biomarcadores personales.',
  privacyBadge: 'Cifrado E2E Activo',
  privacySessionNote:
    'Tu sesión se guarda de forma simulada en este navegador. No se almacenan contraseñas ni datos clínicos reales.',
  accountLabel: 'Sesión activa',
  sessionStartLabel: 'Inicio de sesión',
  nowLabel: 'Ahora',
  logoutLabel: 'Cerrar sesión',
  loggingOutLabel: 'Cerrando sesión...',
  notificationsRow: 'Notificaciones & Recordatorios de Salud',
  notificationsRowMobile: 'Notificaciones & recordatorios',
  privacyRow: 'Privacidad Médica (HIPAA / GDPR)',
  privacyRowMobile: 'Privacidad médica',
  privacyRowHint: 'Cifrado de grado biomédico E2E',
  statsHabitsLabel: 'Hábitos de hoy',
  statsHabitsHint: 'Completados',
  statsFavoritesLabel: 'Contenidos guardados',
  statsFavoritesHint: 'Favoritos',
  statsStreakLabel: 'Racha activa',
  statsStreakHint: 'Constancia sostenida',
  statsProgressLabel: 'Adherencia',
  statsProgressHint: 'Meta diaria',
}

export const profileMetrics = {
  cycleDay: 48,
  cycleTotal: 60,
  adherenceTrend: '+3.2%',
  memberSince: 'Enero 2024',
  bloodType: 'A+',
}

const biomarkers = [
  {
    id: 'resting-heart-rate',
    label: 'FC en Reposo',
    mobileLabel: 'FC Reposo',
    icon: 'cardiology',
    desktopIconClass: 'bg-red-50 text-red-600',
    mobileIconClass: 'text-primary',
    badge: 'Óptimo',
    badgeClass: 'bg-secondary-fixed text-on-secondary-fixed',
    value: '58',
    unit: 'bpm',
    desktop: true,
    mobile: true,
    mobileLive: true,
    mobileNote: 'Óptimo',
    mobileNoteClass: 'bg-secondary-container/60 text-on-secondary-container',
    desktopFooter: {
      type: 'bars',
      values: [14, 18, 12, 17, 11, 24],
      caption: 'Media etaria: 68 bpm',
      highlight: '-10 bpm',
    },
  },
  {
    id: 'vo2-max',
    label: 'VO2 Max Estimado',
    mobileLabel: 'VO2 Max',
    icon: 'air',
    desktopIconClass: 'bg-blue-50 text-blue-600',
    mobileIconClass: 'text-primary',
    badge: 'Top 15%',
    badgeClass: 'bg-secondary-fixed text-on-secondary-fixed',
    value: '42',
    unit: 'ml/kg/min',
    desktop: true,
    mobile: true,
    mobileNote: 'Top 15% · Excelente',
    mobileNoteClass: 'bg-secondary-container/60 text-on-secondary-container',
    desktopFooter: {
      type: 'progress',
      progress: 82,
      caption: 'Capacidad cardiorrespiratoria excelente.',
    },
  },
  {
    id: 'deep-sleep',
    label: 'Sueño Profundo',
    mobileLabel: 'Calidad Sueño',
    icon: 'bedtime',
    desktopIconClass: 'bg-indigo-50 text-indigo-600',
    mobileIconClass: 'text-secondary',
    badge: 'Fase Delta',
    badgeClass: 'bg-secondary-fixed text-on-secondary-fixed',
    value: '88%',
    unit: 'calidad',
    desktop: true,
    mobile: true,
    mobileNote: 'Delta: 1h 45m prof.',
    mobileNoteClass: 'bg-surface-container text-on-surface',
    desktopFooter: {
      type: 'rows',
      rows: [{ label: 'Fase reparadora:', value: '1h 45m' }],
      note: 'Consistencia circadiana alta',
      noteIcon: 'check',
      noteClass: 'text-primary',
    },
  },
  {
    id: 'body-composition',
    label: 'Composición Corporal',
    mobileLabel: 'Comp. Corporal',
    icon: 'accessibility_new',
    desktopIconClass: 'bg-emerald-50 text-primary',
    mobileIconClass: 'text-primary',
    badge: 'Withings',
    badgeClass: 'bg-surface-container text-on-surface-variant',
    value: '74%',
    unit: 'masa magra',
    desktop: true,
    mobile: true,
    mobileNote: 'Grasa: 21% · Agua: 62%',
    mobileNoteClass: 'bg-surface-container text-on-surface-variant',
    desktopFooter: {
      type: 'rows',
      rows: [
        { label: 'Grasa Corporal:', value: '21%' },
        { label: 'Agua Celular:', value: '62%' },
      ],
    },
  },
]

export const desktopBiomarkers = biomarkers.filter(
  (biomarker) => biomarker.desktop,
)

export const mobileBiomarkers = biomarkers.filter(
  (biomarker) => biomarker.mobile,
)

export const profileGoals = [
  {
    id: 'circadian',
    label: 'Optimización Circadiana',
    icon: 'schedule',
  },
  {
    id: 'anti-inflammatory',
    label: 'Dieta Antiinflamatoria',
    icon: 'restaurant',
  },
  {
    id: 'functional-strength',
    label: 'Fuerza & Hipertrofia Funcional',
    mobileLabel: 'Fuerza Funcional',
    icon: 'fitness_center',
  },
  {
    id: 'vagal-stress',
    label: 'Regulación del Estrés Vagal',
    icon: 'self_improvement',
  },
]

export const profileRestrictions = [
  {
    id: 'gluten',
    label: 'Sin gluten (intolerancia digestiva)',
    mobileLabel: 'Sin gluten (intolerancia)',
    icon: 'do_not_disturb_on',
    chipClass: 'border-amber-200 bg-amber-50 text-amber-800',
  },
  {
    id: 'lactose',
    label: 'Baja en lactosa',
    icon: 'do_not_disturb_on',
    chipClass: 'border-amber-200 bg-amber-50 text-amber-800',
  },
  {
    id: 'ultraprocessed',
    label: 'Evitar ultraprocesados',
    icon: 'block',
    chipClass: 'border-outline-variant/30 bg-surface-container text-on-surface',
  },
]

export const profileDevices = [
  {
    id: 'apple-watch',
    name: 'Apple Watch Ultra 2',
    icon: 'watch',
    status: 'Sincronizado hace 8 min · Batería 82%',
    mobileStatus: 'Sincronizado · Batería 82%',
    statusClass: 'text-primary',
    dotClass: 'bg-primary',
    active: true,
  },
  {
    id: 'oura-ring',
    name: 'Oura Ring Gen 3 (Heritage)',
    mobileName: 'Oura Ring Gen 3',
    icon: 'fingerprint',
    status: 'Temperatura basal & Sueño sincronizados',
    mobileStatus: 'Temp. basal y sueño en sync',
    statusClass: 'text-primary',
    dotClass: 'bg-primary',
    active: true,
  },
  {
    id: 'withings-scale',
    name: 'Withings Body+ Smart Scale',
    icon: 'scale',
    status: 'Conectada · Último pesaje hace 2 días',
    statusClass: 'text-on-surface-variant',
    dotClass: 'bg-outline',
    active: false,
  },
]

export const profileSpecialists = [
  {
    id: 'helena-ruiz',
    name: 'Dra. Helena Ruiz',
    specialty: 'Medicina del Sueño & Cronobiología',
    mobileSpecialty: 'Medicina del Sueño & Cronobiología',
    credential: 'Colegiado Clínico Nº 280942',
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCd8QM5HM9turRrvDMSHYsCFiiuhrnGWcvoRMu9NXeJW36mivLXxuseRxLQgB-sX-igPmNhjC6Rqpb-3HaJisS4qF1RyAmBL66WfsZyG1BZPqXyD_hWrPq5R4f5bRrIM9kRne3ywpigIodGm7vkRDj0CqNLHIXz703wKy1vC7rZWCl4M469VL85nBIbCHr5f4blir3m8HfAg1XlWISeT-87XNw4LqZms7CjAQmpIUrBYAVFVUasnmNRRYiqfKeulZa3H-BCEJ3xtLM',
    avatarAlt:
      'Retrato profesional de la Dra. Helena Ruiz, especialista en medicina circadiana y del sueño.',
    initials: 'HR',
    avatarClass: 'bg-primary/10 text-primary',
    note:
      'Ritmo circadiano alineado con fase REM estable. Se recomienda mantener ventana de exposición a luz natural antes de las 9:00 AM.',
    badge: 'Próxima Rev: 29 Oct',
    badgeClass: 'bg-secondary-container text-on-secondary-container',
    mobileStatus: 'Disponible hoy',
    mobileStatusClass: 'text-primary',
    mobileDotClass: 'bg-primary',
    mobileCta: 'Agendar Sesión',
    mobileCtaClass:
      'bg-primary text-on-primary shadow-sm hover:bg-primary-container',
    desktopPrimary: 'Agendar Sesión',
    desktopPrimaryIcon: 'calendar_month',
    desktopSecondary: 'Compartir Métricas',
    desktopSecondaryIcon: 'share',
  },
  {
    id: 'carlos-mendez',
    name: 'Lic. Carlos Méndez',
    specialty: 'Nutrición Funcional & Metabolismo',
    mobileSpecialty: 'Nutrición Funcional & Microbioma',
    credential: 'Especialista en Longevidad y Microbioma',
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDu_2-IODHAtG8WeInqrolpau3X4wlJeE3y_PDFF6zknd6vkJ4kE2oi06S8yZyUuLS44wQfV8EhVy9IUQUOYQyT8v0ADs-fVuc8sY77RmAWc8z3MMyjaybK7WHJUz9QNlkcpez4cZhXgOOynmSMrbH7emYzGGBrat4PBm_p9zufGA1-zKCTLKkWK5ctdS751_b1T1TTCdiRSHhb7ekHxPukR8VGg2Crpj2FPDe0N8Em7WyGpTo6c3PQlK9bJEuNsIWAvkDAMaO4_iA',
    avatarAlt:
      'Retrato profesional del nutricionista Lic. Carlos Méndez.',
    initials: 'CM',
    avatarClass: 'bg-tertiary-fixed text-tertiary',
    note:
      'Protocolo de ayuno intermitente 14/10 asimilado favorablemente. Micronutrientes y ferritina en niveles de homeostasis óptima.',
    badge: 'Seguimiento Activo',
    badgeClass: 'bg-secondary-fixed text-on-secondary-fixed',
    mobileStatus: 'Revisión: Jueves',
    mobileStatusClass: 'text-on-surface-variant',
    mobileDotClass: 'bg-outline-variant',
    mobileCta: 'Agendar Sesión',
    mobileCtaClass:
      'bg-primary text-on-primary shadow-sm hover:bg-primary-container',
    desktopPrimary: 'Agendar Sesión',
    desktopPrimaryIcon: 'calendar_month',
    desktopSecondary: 'Enviar Registro Nutricional',
    desktopSecondaryIcon: 'receipt_long',
  },
]

export const profilePrivacySettings = [
  {
    id: 'cortisol',
    icon: 'wb_sunny',
    iconClass: 'text-amber-600',
    title: 'Ventana de Cortisol Matutino & Exposición Solar',
    mobileTitle: 'Cortisol matutino & luz solar',
    description:
      'Recibir aviso inteligente entre 7:00 AM y 8:30 AM para estimular el pico natural de cortisol y regular la producción nocturna de melatonina.',
    enabled: true,
  },
  {
    id: 'hydration',
    icon: 'water_drop',
    iconClass: 'text-blue-600',
    title: 'Recordatorios de Hidratación y Electrolitos Personalizados',
    mobileTitle: 'Hidratación y electrolitos',
    description:
      'Ajuste dinámico según gasto calórico medido por Apple Watch y clima local para mantener el agua intracelular por encima del 60%.',
    enabled: true,
  },
  {
    id: 'clinical-consent',
    icon: 'shield',
    iconClass: 'text-primary',
    title:
      'Consentimiento Clínico Compartido (HIPAA / GDPR Compliance)',
    mobileTitle: 'Consentimiento clínico compartido',
    description:
      'Permitir acceso de lectura directo a tus biomarcadores solo a los miembros acreditados de tu equipo clínico de Vitalis.',
    enabled: true,
  },
]

export const guestProfileCopy = {
  eyebrow: 'Modo invitado',
  title: 'Inicia sesión para personalizar tu experiencia',
  mobileTitle: 'Tu perfil clínico te espera',
  description:
    'Con una cuenta podrás guardar tus favoritos, conservar tu sesión y acceder a recomendaciones adaptadas a tu progreso.',
  loginCta: 'Iniciar sesión',
  registerCta: 'Crear cuenta',
  activityEyebrow: 'Actividad local',
  activityTitle: 'Tu progreso en este dispositivo',
  activityHint:
    'Estos datos se mantienen mientras no cierres el navegador.',
  benefits: [
    {
      id: 'favorites',
      icon: 'favorite',
      iconClass: 'text-error',
      label: 'Guarda contenidos favoritos',
    },
    {
      id: 'tracking',
      icon: 'check_circle',
      iconClass: 'text-primary',
      label: 'Conserva tu seguimiento',
    },
    {
      id: 'recommendations',
      icon: 'auto_awesome',
      iconClass: 'text-tertiary',
      label: 'Recibe recomendaciones',
    },
  ],
}

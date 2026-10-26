export const registerCopy = {
  step: 'Paso 1 de 1 · Registro Seguro',
  eyebrow: 'Ecosistema Preventivo Vitalis',
  title: 'Crea tu cuenta',
  subtitle:
    'Comienza tu plan de hábitos saludables y nutrición personalizada.',
  desktopTitle: 'Crea tu cuenta en Vitalis',
  desktopSubtitle:
    'Comienza hoy tu plan de hábitos saludables y recomendaciones a tu medida.',
  platformBadge: 'Plataforma Médica & Nutricional',
  headerQuestion: '¿Ya tienes cuenta?',
  headerSignIn: 'Iniciar Sesión',
  nameLabel: 'Nombre completo',
  namePlaceholder: 'Camila Morales',
  nameDesktopPlaceholder: 'Ej. Camila Morales',
  required: 'Requerido',
  emailLabel: 'Correo electrónico',
  emailPlaceholder: 'tu.correo@ejemplo.com',
  passwordLabel: 'Contraseña',
  passwordPlaceholder: 'Mínimo 8 caracteres, números y símbolos',
  passwordMobilePlaceholder: 'Mínimo 8 caracteres',
  passwordHint: 'Usa números, mayúsculas y un símbolo especial.',
  confirmLabel: 'Confirmar contraseña',
  confirmPlaceholder: 'Repite tu contraseña',
  socialDivider: 'O regístrate con correo',
  submit: 'Crear Cuenta y Comenzar',
  trust:
    'Privacidad garantizada. Nunca compartiremos tus datos con terceros.',
  loginQuestion: '¿Ya tienes una cuenta registrada?',
  loginLink: 'Inicia sesión aquí',
  matchEmpty: 'Escribe la misma contraseña para verificar',
  matchSuccess: 'Las contraseñas coinciden perfectamente',
  matchError: 'Las contraseñas aún no coinciden',
  matchLabel: 'Coincide',
  matchLabelError: 'No coincide',
  validation: {
    nameRequired: 'Escribe tu nombre completo.',
    nameShort: 'El nombre debe tener al menos 2 caracteres.',
    emailRequired: 'Ingresa tu correo electrónico.',
    emailInvalid:
      'Escribe un correo válido, por ejemplo: nombre@dominio.com.',
    passwordRequired: 'Crea una contraseña.',
    passwordShort: 'La contraseña debe tener al menos 8 caracteres.',
    confirmRequired: 'Confirma tu contraseña.',
    confirmMismatch: 'Las contraseñas deben coincidir.',
    termsRequired:
      'Debes aceptar los Términos de Servicio y la Política de Privacidad.',
  },
  feedback: {
    loading: 'Creando tu cuenta...',
    success: 'Cuenta creada. Preparando tu panel personalizado...',
    successButton: 'Cuenta creada',
  },
  termsPrefix: 'Acepto los ',
  termsLink: 'Términos de Servicio',
  termsMiddle: ' y la ',
  privacyLink: 'Política de Privacidad de datos médicos y biométricos',
  termsSuffix: '.',
  termsMobileMiddle: ' y el consentimiento de ',
  privacyMobileLink: 'Privacidad médica de datos',
  termsMobileSuffix: ' (cifrado clínico HIPAA compliant).',
  newsletter:
    'Deseo recibir recomendaciones semanales de nutrición y bienestar por correo.',
  strength: {
    empty: 'Sin evaluar',
    weak: 'Débil',
    medium: 'Media',
    strong: 'Fuerte',
  },
}

export const registerBenefits = {
  badge: 'Salud Basada en Evidencia',
  title: 'Construye hábitos con rigor clínico y calidez diaria.',
  description:
    'Únete a Vitalis para sincronizar tus rutinas biológicas, alimentación personalizada y metas sostenibles de bienestar.',
  featuresTitle: 'Lo que obtendrás al unirte:',
  features: [
    {
      id: 'nutrition',
      icon: 'restaurant',
      iconClass: 'bg-secondary-container/60 text-primary',
      title: 'Recomendaciones nutricionales personalizadas',
      description:
        'Planes calibrados a tus biomarcadores, alergias y estilo de vida activo.',
    },
    {
      id: 'habits',
      icon: 'monitoring',
      iconClass: 'bg-surface-variant/70 text-secondary',
      title: 'Seguimiento inteligente de hábitos diarios',
      description:
        'Monitoreo holístico de descanso, hidratación y pausas activas.',
    },
    {
      id: 'evidence',
      icon: 'menu_book',
      iconClass: 'bg-tertiary-fixed/40 text-tertiary',
      title: 'Artículos respaldados por evidencia científica',
      description:
        'Investigaciones médicas explicadas con sencillez y aplicabilidad.',
    },
  ],
  proof: {
    rating: '4.9 / 5',
    users: '+12,800 usuarios activos',
    certification: 'Certificado Clínico',
    avatars: [
      {
        src: '/images/register-proof-1.jpg',
        alt: 'Nutricionista de Vitalis',
      },
      {
        src: '/images/register-proof-2.jpg',
        alt: 'Médico de Vitalis',
      },
      {
        src: '/images/register-proof-3.jpg',
        alt: 'Especialista en bienestar de Vitalis',
      },
    ],
  },
}

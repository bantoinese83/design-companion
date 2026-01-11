/**
 * Application constants to eliminate magic numbers
 * Centralizes all hardcoded values for better maintainability
 */

// UI Constants
export const UI = {
  // Z-index layers
  Z_INDEX: {
    SIDEBAR: 60,
    MAIN_CONTENT: 50,
    MODAL: 100,
    TOOLTIP: 150,
    DROPDOWN: 200,
  },

  // Animation durations (in ms)
  ANIMATIONS: {
    FAST: 200,
    NORMAL: 500,
    SLOW: 700,
    SLOWER: 1000,
    SLOWEST: 2000,
  },

  // Icon sizes
  ICON_SIZES: {
    SMALL: 16,
    MEDIUM: 20,
    LARGE: 24,
    XLARGE: 28,
    XXLARGE: 48,
  },

  // Font sizes (Tailwind classes)
  FONT_SIZES: {
    XS: 'text-[9px]',
    SMALL: 'text-[10px]',
    BASE: 'text-[11px]',
    MEDIUM: 'text-[12px]',
    LARGE: 'text-base',
    XLARGE: 'text-xl',
    XXLARGE: 'text-2xl',
    XXXLARGE: 'text-6xl',
  },

  // Spacing values
  SPACING: {
    SMALL: 4,
    MEDIUM: 6,
    LARGE: 8,
    XLARGE: 10,
    XXLARGE: 12,
    XXXLARGE: 16,
    HUGE: 20,
    MASSIVE: 24,
    GIGANTIC: 48,
  },

  // Border radius
  BORDER_RADIUS: {
    SMALL: 'rounded-lg',
    MEDIUM: 'rounded-2xl',
    LARGE: 'rounded-[2.5rem]',
    XLARGE: 'rounded-[3rem]',
    XXLARGE: 'rounded-[4rem]',
    XXXLARGE: 'rounded-[5rem]',
  },

  // Max widths
  MAX_WIDTHS: {
    MOBILE_MESSAGE: 'max-w-[92%]',
    DESKTOP_MESSAGE: 'md:max-w-[85%]',
    CONTENT: 'max-w-4xl',
    SIDEBAR: 'max-w-5xl',
    MODAL: 'max-w-2xl',
    TITLE: 'max-w-[200px]',
    DESKTOP_TITLE: 'md:max-w-md',
  },

  // Max heights
  MAX_HEIGHTS: {
    IMAGE: 'max-h-[600px]',
    TEXTAREA: 'max-h-48',
    SIDEBAR: 'max-h-[90vh]',
  },
} as const;

// Business Logic Constants
export const BUSINESS = {
  // Rating system
  RATING: {
    MAX_RATING: 10,
    DISPLAY_STARS: 10,
  },

  // File handling
  FILES: {
    MAX_SIZE_MB: 10,
    MAX_SIZE_BYTES: 10 * 1024 * 1024, // 10MB
    ALLOWED_EXTENSIONS: ['.pdf', '.txt', '.doc', '.docx'],
  },

  // File processing and storage constants
  RAG: {
    FILE_LIMITS: {
      MAX_SIZE_BYTES: 100 * 1024 * 1024, // 100MB (per Gemini docs)
      MAX_SIZE_MB: 100,
    },
    CHUNKING: {
      MAX_TOKENS_PER_CHUNK: 200,
      MAX_OVERLAP_TOKENS: 20,
    },
    STORE_LIMITS: {
      FREE_TIER_GB: 1,
      TIER_1_GB: 10,
      TIER_2_GB: 100,
      TIER_3_TB: 1,
      RECOMMENDED_MAX_GB: 20, // For optimal performance
    },
    SUPPORTED_FILE_TYPES: {
      APPLICATION: [
        'application/dart',
        'application/ecmascript',
        'application/json',
        'application/ms-java',
        'application/msword',
        'application/pdf',
        'application/sql',
        'application/typescript',
        'application/vnd.curl',
        'application/vnd.dart',
        'application/vnd.ibm.secure-container',
        'application/vnd.jupyter',
        'application/vnd.ms-excel',
        'application/vnd.oasis.opendocument.text',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.template',
        'application/x-csh',
        'application/x-hwp',
        'application/x-hwp-v5',
        'application/x-latex',
        'application/x-php',
        'application/x-powershell',
        'application/x-sh',
        'application/x-shellscript',
        'application/x-tex',
        'application/xml',
        'application/zip',
      ],
      TEXT: [
        'text/1d-interleaved-parityfec',
        'text/RED',
        'text/SGML',
        'text/cache-manifest',
        'text/calendar',
        'text/cql',
        'text/cql-extension',
        'text/cql-identifier',
        'text/css',
        'text/csv',
        'text/csv-schema',
        'text/dns',
        'text/encaprtp',
        'text/enriched',
        'text/example',
        'text/fhirpath',
        'text/flexfec',
        'text/fwdred',
        'text/gff3',
        'text/grammar-ref-list',
        'text/hl7v2',
        'text/html',
        'text/javascript',
        'text/jcr-cnd',
        'text/jsx',
        'text/markdown',
        'text/mizar',
        'text/n3',
        'text/parameters',
        'text/parityfec',
        'text/php',
        'text/plain',
        'text/provenance-notation',
        'text/prs.fallenstein.rst',
        'text/prs.lines.tag',
        'text/prs.prop.logic',
        'text/raptorfec',
        'text/rfc822-headers',
        'text/rtf',
        'text/rtp-enc-aescm128',
        'text/rtploopback',
        'text/rtx',
        'text/sgml',
        'text/shaclc',
        'text/shex',
        'text/spdx',
        'text/strings',
        'text/t140',
        'text/tab-separated-values',
        'text/texmacs',
        'text/troff',
        'text/tsv',
        'text/tsx',
        'text/turtle',
        'text/ulpfec',
        'text/uri-list',
        'text/vcard',
        'text/vnd.DMClientScript',
        'text/vnd.IPTC.NITF',
        'text/vnd.IPTC.NewsML',
        'text/vnd.a',
        'text/vnd.abc',
        'text/vnd.ascii-art',
        'text/vnd.curl',
        'text/vnd.debian.copyright',
        'text/vnd.dvb.subtitle',
        'text/vnd.esmertec.theme-descriptor',
        'text/vnd.exchangeable',
        'text/vnd.familysearch.gedcom',
        'text/vnd.ficlab.flt',
        'text/vnd.fly',
        'text/vnd.fmi.flexstor',
        'text/vnd.gml',
        'text/vnd.graphviz',
        'text/vnd.hans',
        'text/vnd.hgl',
        'text/vnd.in3d.3dml',
        'text/vnd.in3d.spot',
        'text/vnd.latex-z',
        'text/vnd.motorola.reflex',
        'text/vnd.ms-mediapackage',
        'text/vnd.net2phone.commcenter.command',
        'text/vnd.radisys.msml-basic-layout',
        'text/vnd.senx.warpscript',
        'text/vnd.sosi',
        'text/vnd.sun.j2me.app-descriptor',
        'text/vnd.trolltech.linguist',
        'text/vnd.wap.si',
        'text/vnd.wap.sl',
        'text/vnd.wap.wml',
        'text/vnd.wap.wmlscript',
        'text/vtt',
        'text/wgsl',
        'text/x-asm',
        'text/x-bibtex',
        'text/x-boo',
        'text/x-c',
        'text/x-c++hdr',
        'text/x-c++src',
        'text/x-cassandra',
        'text/x-chdr',
        'text/x-coffeescript',
        'text/x-component',
        'text/x-csh',
        'text/x-csharp',
        'text/x-csrc',
        'text/x-cuda',
        'text/x-d',
        'text/x-diff',
        'text/x-dsrc',
        'text/x-emacs-lisp',
        'text/x-erlang',
        'text/x-gff3',
        'text/x-go',
        'text/x-haskell',
        'text/x-java',
        'text/x-java-properties',
        'text/x-java-source',
        'text/x-kotlin',
        'text/x-lilypond',
        'text/x-lisp',
        'text/x-literate-haskell',
        'text/x-lua',
        'text/x-moc',
        'text/x-objcsrc',
        'text/x-pascal',
        'text/x-pcs-gcd',
        'text/x-perl',
        'text/x-perl-script',
        'text/x-python',
        'text/x-python-script',
        'text/x-r-markdown',
        'text/x-rsrc',
        'text/x-rst',
        'text/x-ruby-script',
        'text/x-rust',
        'text/x-sass',
        'text/x-scala',
        'text/x-scheme',
        'text/x-script.python',
        'text/x-scss',
        'text/x-setext',
        'text/x-sfv',
        'text/x-sh',
        'text/x-siesta',
        'text/x-sos',
        'text/x-sql',
        'text/x-swift',
        'text/x-tcl',
        'text/x-tex',
        'text/x-vbasic',
        'text/x-vcalendar',
        'text/xml',
        'text/xml-dtd',
        'text/xml-external-parsed-entity',
        'text/yaml',
      ],
    },
  },

  // Session management
  SESSIONS: {
    TITLE_MAX_LENGTH: 30,
    TITLE_TRUNCATE_SUFFIX: '...',
  },

  // Message handling
  MESSAGES: {
    CITATION_DISPLAY_LIMIT: 10,
  },

  // UI loading states
  LOADING: {
    SKELETON_COUNT: 3,
  },
} as const;

// Time Constants
export const TIME = {
  // Delays and timeouts
  DELAYS: {
    UPLOAD_PROGRESS_HIDE: 3000, // 3 seconds
    DEBOUNCE_DEFAULT: 300, // 300ms
    THROTTLE_DEFAULT: 100, // 100ms
  },

  // Animation delays
  ANIMATIONS: {
    STAGGER_DELAY: 100, // 100ms between staggered animations
  },
} as const;

// API Constants
export const API = {
  // Request limits
  LIMITS: {
    MAX_RETRIES: 3,
    TIMEOUT_MS: 30000, // 30 seconds
  },

  // Pagination
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 20,
    MAX_PAGE_SIZE: 100,
  },
} as const;

// Feature Flags
export const FEATURES = {
  ENABLE_DEBUG_LOGGING: process.env.NODE_ENV === 'development',
  ENABLE_ANALYTICS: false,
  ENABLE_ERROR_REPORTING: true,
} as const;

// CSS Class Constants
export const CSS_CLASSES = {
  // Common patterns
  TRANSITIONS: {
    FAST: 'transition-all duration-200',
    NORMAL: 'transition-all duration-500',
    SCALE_HOVER: 'hover:scale-[1.02] transition-transform',
  },

  // Shadow patterns
  SHADOWS: {
    SMALL: 'shadow-sm',
    MEDIUM: 'shadow-xl',
    LARGE: 'shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)]',
  },

  // Color schemes
  COLORS: {
    PRIMARY: 'text-indigo-600 bg-indigo-50 border-indigo-100',
    SUCCESS: 'text-green-800 bg-green-50 border-green-100',
    WARNING: 'text-amber-800 bg-amber-50 border-amber-100',
    ERROR: 'text-rose-800 bg-rose-50 border-rose-100',
  },
} as const;

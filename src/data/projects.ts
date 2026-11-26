import { screens } from './screens';

export interface StoreLinks {
  appStore?: string;
  playStore?: string;
}
export interface Decision {
  title: string;
  body: string;
}
export interface Project {
  slug: string;
  name: string;
  short: string; // card tagline
  category: string;
  platform: string;
  problem: string;
  solution: string;
  role: string;
  decisions: Decision[];
  featureGroups: { title: string; items: string[] }[];
  stack: string[];
  outcome: string;
  links: StoreLinks;
  linkNote?: string;
  logo?: string; // path under public/
  notes?: string[];
  timeline?: string;
  credits?: string;
  /** Real screenshots/demos only. Empty => section hidden. See ASSETS_NEEDED.md */
  screenshots?: { src: string; alt: string }[];
}

export const projects: Project[] = [
  {
    slug: 'white-label-academy-platform',
    name: 'White-label Academy Platform',
    short: 'A reusable Flutter platform powering nine published, branded academy apps.',
    category: 'Platform engineering',
    platform: 'Flutter · iOS & Android',
    problem:
      'Every new academy application used to start by copying an existing codebase. Fixes and feature updates then had to be repeated by hand across every separate app.',
    solution:
      'I designed and built a reusable core package, tech_app_core, together with a template application. A new academy app is now a typed configuration over a shared foundation instead of a fork of another app.',
    role: 'Designed and built the platform: architecture, the core package, the template app and the content-protection layer.',
    decisions: [
      {
        title: 'Configuration as a typed contract',
        body: 'Branding, tenant identity and enabled features are expressed through AppTenantConfig, AppColorScheme and AppFeatureFlags. Branded apps provide values; the core owns behaviour, so apps cannot diverge in logic.',
      },
      {
        title: 'Feature flags decide the product',
        body: 'Capabilities such as payments, parent monitoring, QR attendance and exams are switched per tenant, so one codebase ships different products without branching.',
      },
      {
        title: 'One networking layer, tenant-aware',
        body: 'A shared Dio client with tenant-aware authentication means every app reaches its backend through the same path.',
      },
      {
        title: 'Cubit-based state, reusable routing',
        body: 'Features are Cubit-driven modules with shared routing and UI components, keeping screens consistent across apps.',
      },
      {
        title: 'Security that fails closed',
        body: 'Protected content is only shown when protection is confirmed. If the platform refuses protection, the content stays hidden instead of falling back to an unprotected display.',
      },
    ],
    featureGroups: [
      {
        title: 'Platform capabilities',
        items: [
          'Configurable feature flags',
          'Multiple payment methods',
          'Purchases from a whole package down to a single lecture',
          'Video playback from direct/R2 and YouTube sources',
          'PDF viewer',
          'Exams and results',
          'QR attendance',
          'Parent monitoring',
        ],
      },
      {
        title: 'Operations',
        items: ['Firebase messaging', 'Crashlytics and performance monitoring', 'Offline handling', 'Forced update system'],
      },
    ],
    stack: ['Flutter', 'Dart', 'Dio', 'Cubit / BLoC', 'Firebase', 'Kotlin method channel', 'Cloudflare R2'],
    outcome: 'Nine published applications run on the same reusable foundation, so a fix or feature is written once and reaches every app.',
    links: {
      appStore: 'https://apps.apple.com/us/app/id6789908891',
      playStore: 'https://play.google.com/store/apps/details?id=com.edulens.golden',
    },
    linkNote: 'Public reference app built on the platform: Golden Academy.',
  },
  {
    slug: 'nasu-university-learning-app',
    screenshots: screens['nasu-university-learning-app'],
    logo: 'logos/nasu-university-learning-app.webp',
    name: 'NASU',
    short: 'A university learning management app, from first commit to store launch in about six weeks.',
    category: 'University LMS',
    platform: 'Flutter · iOS & Android',
    problem:
      'A university needed one mobile home for student life: live and recorded lectures, timed exams, assignments and results, delivered on a tight schedule.',
    solution:
      'I defined the feature set and user flows and led the mobile build as an MVVM + Cubit Flutter app, reaching the stores roughly six weeks after the first commit.',
    role: 'Managed the project, defined the features and user flows, and led mobile development.',
    credits: 'Backend engineers: Mahmoud Sayed and Adel Hany.',
    decisions: [
      {
        title: 'MVVM with Cubit',
        body: 'Presentation, business logic and API access are decoupled, which let the team build screens in parallel on a short timeline.',
      },
      {
        title: 'Live sessions via join link',
        body: 'Live lectures run on a backend-hosted LiveKit service. The app gives students access through a join link; LiveKit is not implemented inside the app.',
      },
      {
        title: 'Custom video controls',
        body: 'Recorded lectures use video_player with custom playback controls rather than the stock UI.',
      },
      {
        title: 'Resilient by default',
        body: 'Offline-state handling and a forced-update mechanism keep students informed about connectivity and on supported versions.',
      },
    ],
    featureGroups: [
      { title: 'Learning', items: ['Student dashboard', 'Live lecture access', 'Recorded lectures', 'Custom video playback controls'] },
      { title: 'Assessment', items: ['Timed exams', 'Question navigation', 'Assignment uploads', 'Results archive'] },
      { title: 'Platform', items: ['Firebase push notifications', 'Account management', 'Offline state', 'Forced updates'] },
    ],
    stack: ['Flutter', 'BLoC / Cubit', 'MVVM', 'Dio', 'Firebase Messaging', 'flutter_local_notifications', 'video_player'],
    outcome: 'Launched on the App Store and Google Play approximately six weeks after the first commit.',
    timeline: 'About six weeks, first commit to store launch',
    links: {
      appStore: 'https://apps.apple.com/us/app/nasu/id6761329211',
      playStore: 'https://play.google.com/store/apps/details?id=com.edulens.nasu',
    },
  },
  {
    slug: 'edulens-student-app',
    logo: 'logos/edulens-student-app.webp',
    screenshots: screens['edulens-student-app'],
    name: 'EduLens Student App',
    short: 'A production education marketplace that I took over, maintained and extended.',
    category: 'Education marketplace',
    platform: 'Flutter · iOS & Android',
    problem:
      'An established production app with real users needed to keep evolving: richer content types, wallet and payment flows and stronger content security, without breaking what already worked.',
    solution:
      'I took over the existing codebase and extended it incrementally: content experiences, wallet and payment integrations, Arabic RTL and content protection.',
    role: 'Maintained and extended the existing application. I did not build the original app from scratch.',
    decisions: [
      {
        title: 'Extend a live product safely',
        body: 'Work focused on adding capability to an app already in users’ hands: incremental changes to an existing codebase.',
      },
      {
        title: 'Arabic RTL as a first-class concern',
        body: 'Layouts and content are designed for right-to-left reading.',
      },
      {
        title: 'Protected content',
        body: 'Content security measures protect paid learning material such as video lectures and books.',
      },
    ],
    featureGroups: [
      { title: 'Content', items: ['Teacher discovery', 'Video lectures', 'PDFs', 'Audiobooks', 'Quizzes', 'Solved exams', 'Digital bookstore'] },
      { title: 'Commerce & platform', items: ['Wallet and coupons', 'Arabic RTL', 'Content protection'] },
    ],
    stack: ['Flutter', 'Dart', 'Firebase', 'REST APIs'],
    outcome: 'A live education marketplace on both stores, continuously extended under my ownership.',
    links: {
      appStore: 'https://apps.apple.com/us/app/edulens/id1666623278',
      playStore: 'https://play.google.com/store/apps/details?id=com.edu.lens.tec',
    },
  },
  {
    slug: 'carven',
    logo: 'logos/carven.webp',
    screenshots: screens['carven'],
    name: 'CARVEN',
    short: 'Online courses combined with physical-center attendance, led alongside another developer.',
    category: 'Learning platform',
    platform: 'Flutter · iOS & Android',
    problem:
      'Learners needed online courses and in-person center attendance in one Arabic-first app, with a purchase flow that fits how its audience buys.',
    solution:
      'A Flutter app that unites recorded courses and exams with QR-based center attendance and a WhatsApp purchase flow, monitored through Firebase.',
    role: 'Led the project alongside another developer.',
    decisions: [
      {
        title: 'Structured for a small team',
        body: 'Dependency injection with get_it, declarative routing with go_router and BLoC/Cubit state keep features cleanly separated.',
      },
      {
        title: 'Arabic-first localisation',
        body: 'easy_localization with right-to-left support built in from the start.',
      },
      {
        title: 'Production observability',
        body: 'Firebase monitoring and analytics provide visibility into stability and usage after release.',
      },
    ],
    featureGroups: [
      { title: 'Learning', items: ['Online courses', 'Recorded video', 'PDFs', 'Exams'] },
      { title: 'Center & commerce', items: ['Physical center attendance', 'QR scanning', 'WhatsApp purchase flow', 'Arabic RTL'] },
    ],
    stack: ['Flutter', 'Dio', 'get_it', 'go_router', 'BLoC / Cubit', 'Firebase', 'easy_localization'],
    outcome: 'Published on the App Store and Google Play.',
    links: {
      appStore: 'https://apps.apple.com/us/app/carven-%D9%83%D8%A7%D8%B1%D9%81%D9%86/id6822079153',
      playStore: 'https://play.google.com/store/apps/details?id=com.edulens.carven',
    },
  },
  {
    slug: 'edulens-scanner',
    logo: 'logos/edulens-scanner.webp',
    screenshots: screens['edulens-scanner'],
    name: 'EduLens Scanner',
    short: 'An offline-first QR attendance app that I designed and built.',
    category: 'Offline-first utility',
    platform: 'Flutter · Android',
    problem:
      'In physical centers, many students check in quickly while the network is slow or absent. Attendance capture cannot depend on connectivity, and it cannot lose data.',
    solution:
      'An offline-first scanner: scans are validated and stored on the device first, then synchronised in bulk when a connection is available.',
    role: 'Designed and built the application.',
    decisions: [
      {
        title: 'Local first, sync later',
        body: 'Hive persistence keeps every scan safe on the device immediately; bulk synchronisation uploads them together.',
      },
      {
        title: 'Validate and de-duplicate at the camera',
        body: 'Each QR payload is validated and duplicates are rejected from an in-memory set, so the continuous scan loop never waits on disk or network.',
      },
      {
        title: 'Never lose unsynced data',
        body: 'Exiting a session or logging out is blocked behind a confirmation while unsynced records remain.',
      },
    ],
    featureGroups: [
      { title: 'Scanning', items: ['Continuous QR scanning', 'QR payload validation', 'Duplicate scan prevention'] },
      {
        title: 'Reliability',
        items: ['Hive local persistence', 'Bulk synchronisation', 'Offline handling', 'Unsynced data protection', 'Attendance history'],
      },
    ],
    stack: ['Flutter', 'flutter_bloc', 'Dio', 'Hive', 'mobile_scanner'],
    outcome: 'Published on Google Play for attendance capture in physical centers.',
    links: { playStore: 'https://play.google.com/store/apps/details?id=com.edulens.scanner' },
  },
];

export interface MoreProject {
  name: string;
  text: string;
  logo?: string;
  links?: StoreLinks;
}

// Only verified, public information. Add links only once confirmed public.
export const moreProjects: MoreProject[] = [
  {
    name: 'Qanoni',
    logo: 'logos/qanoni.webp',
    text: 'A Flutter application I worked on at EduLens.',
    links: {
      appStore: 'https://apps.apple.com/us/app/%D9%82%D8%A7%D9%86%D9%88%D9%86%D9%8A-qanuni/id6755084229',
      playStore: 'https://play.google.com/store/apps/details?id=app.qanoniapp.com',
    },
  },
  { name: 'Mr.Heta', text: 'An educational app with video lessons, PDFs and exams for students.' },
  { name: 'Branded academy apps', text: 'Further academy applications published from the same reusable foundation, each with its own identity.' },
  { name: 'TrendZone', text: 'A Flutter mobile project.' },
];

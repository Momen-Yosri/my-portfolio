export interface Role {
  org: string;
  title: string;
  period: string;
  current?: boolean;
  summary?: string;
  points: string[];
}

export const experience: Role[] = [
  {
    org: 'EduLens',
    title: 'Team Lead',
    period: 'July 2025 – Present',
    current: true,
    points: [
      'Lead a team of 4–6 developers: task planning, technical delivery and code ownership.',
      'Own mobile architecture and the reusable white-label Flutter platform behind nine published apps.',
      'Led NASU, a university learning app, from planning to store launch in roughly six weeks.',
      'Mentor junior developers and drive App Store and Google Play releases.',
      'Built content protection and payment integrations used across the product line.',
      'Led CARVEN, built the offline-first EduLens Scanner, and worked on Qanoni.',
    ],
  },
  {
    org: 'EduLens',
    title: 'Flutter Developer',
    period: 'September 2022 – June 2025',
    points: [
      'Maintained and extended the existing student application in production.',
      'Delivered video lectures and digital content: PDFs, audiobooks, quizzes and a bookstore.',
      'Integrated wallet and payment flows, Firebase and REST APIs.',
      'Shipped an Arabic RTL experience and content security measures.',
    ],
  },
  {
    org: 'IEEE Cairo University Student Branch',
    title: 'Vice Head, Mobile Committee',
    period: 'October 2024 – September 2025',
    points: ['Mentored student members learning Flutter and Dart.'],
  },
];

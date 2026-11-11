export const profile = {
  name: "Mo'men Yosri",
  monogram: 'MY',
  role: 'Team Lead, Mobile Engineering',
  company: 'EduLens',
  // TODO(confirm): location is not stated in the brief. "Egypt" is inferred from education; confirm city.
  location: 'Egypt',
  focus: 'Flutter & Mobile Engineering',
  email: 'momen.yosri@gmail.com',
  linkedin: 'https://www.linkedin.com/in/momen-yosri',
  github: 'https://github.com/Momen-Yosri',
  siteUrl: 'https://momen-yosri.github.io/my-portfolio/',
  headline: 'Building mobile products that scale.',
  heroText:
    'I lead mobile engineering at EduLens, building scalable Flutter applications for education. From architecture and product planning to production releases across iOS and Android.',
  about: [
    "I'm Mo'men Yosri, a Mobile Engineering Team Lead at EduLens. I've been building Flutter applications since 2022, focusing on scalable architecture, reusable engineering systems, and reliable production experiences.",
    'My work spans mobile architecture, technical planning, mentoring developers, complex integrations, product delivery, and publishing applications across iOS and Android.',
    'I enjoy transforming repeated engineering challenges into reusable systems that help teams deliver products faster and more consistently.',
  ],
  seoDescription:
    "Mo'men Yosri is a Mobile Engineering Team Lead at EduLens, building scalable Flutter applications, reusable white-label platforms and production mobile releases on iOS and Android.",
};

export interface Stat { label: string; to?: number; prefix?: string; suffix?: string; text?: string }

export const snapshot: Stat[] = [
  { to: 4, suffix: '+', label: 'Years building Flutter apps' },
  { text: '4–6', label: 'Developers led' },
  { to: 13, label: 'Apps live on Google Play' },
  { to: 11, label: 'Apps on the App Store' },
  { to: 8, label: 'Apps powered by my white-label platform' },
  { text: '~6 wks', label: 'NASU, first commit to store launch' },
];

export const career = {
  title: 'Where I’m heading',
  text: 'I’m interested in expanding toward AI engineering, deep learning and AI research. It is a learning direction I’m actively exploring, alongside my mobile engineering work. It is not a current professional AI engineering role.',
};

export const nav = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Expertise', href: '#expertise' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

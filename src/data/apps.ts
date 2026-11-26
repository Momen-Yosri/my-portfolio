import type { StoreLinks } from './projects';

export interface BrandedApp {
  slug: string; // file name in public/apps/ (<slug>.mp4 + <slug>.webp)
  name: string;
  color: string; // splash background colour, shown behind the video while it loads
  glow: string;
  links: StoreLinks;
}

const play = (id: string) => `https://play.google.com/store/apps/details?id=com.edulens.${id}`;
const apple = (path: string) => `https://apps.apple.com/us/app/${path}`;

// Apps built on tech_app_core, shown through their real splash screens.
export const brandedApps: BrandedApp[] = [
  {
    slug: 'golden-academy',
    name: 'Golden',
    color: '#0e192f',
    glow: '#c9a24a',
    links: { appStore: apple('id6789908891'), playStore: play('golden') },
  },
  {
    slug: 'abaza',
    name: 'ABAZA',
    color: '#087243',
    glow: '#22b573',
    links: { appStore: apple('abaza/id6800786121'), playStore: play('abaza') },
  },
  {
    slug: 'sms-academy',
    name: 'SMS Academy',
    color: '#ccdff6',
    glow: '#4fa8ff',
    links: { appStore: apple('id6807188189'), playStore: play('smsacademy') },
  },
  {
    slug: 'cash-chat',
    name: 'Cash Chat',
    color: '#c6521a',
    glow: '#ff7a2f',
    links: { appStore: apple('id6806787743'), playStore: play('cashchat') },
  },
  {
    slug: 'dr-safwat',
    name: 'Dr Safwat',
    color: '#e8eef8',
    glow: '#2f7de1',
    links: { playStore: play('safwat') },
  },
  {
    slug: 'heta',
    name: 'Mr.Heta',
    color: '#851522',
    glow: '#e0405a',
    links: { appStore: apple('mr-heta/id6756027547'), playStore: play('heta') },
  },
  {
    slug: 'hosny',
    name: 'مسار الأعمال',
    color: '#070205',
    glow: '#f4c21f',
    links: { appStore: apple('id6804236342'), playStore: play('mohamedhosny') },
  },
  {
    slug: 'hossary',
    name: 'قانون الحصري',
    color: '#352214',
    glow: '#f2b43a',
    links: { appStore: apple('id6809176222'), playStore: play('hossary') },
  },
  {
    slug: 'shabaykawy',
    name: 'شبيكاوي',
    color: '#110f0b',
    glow: '#b9a577',
    links: { appStore: apple('id6804942961'), playStore: play('shabaykawy') },
  },
];

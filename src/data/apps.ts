import type { StoreLinks } from './projects';

export interface BrandedApp {
  slug: string; // file name in public/apps/ (<slug>.mp4 + <slug>.webp)
  name: string;
  color: string; // splash background colour, shown behind the video while it loads
  glow: string; // highlight colour: accents, borders, progress
  primary: string; // section background; from the app's theme file, otherwise its splash colour
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
    glow: '#f4e5b3',
    primary: '#0b1b3d',
    links: { appStore: apple('id6789908891'), playStore: play('golden') },
  },
  {
    slug: 'abaza',
    name: 'ABAZA',
    color: '#087243',
    glow: '#22b573',
    primary: '#075c36',
    links: { appStore: apple('abaza/id6800786121'), playStore: play('abaza') },
  },
  {
    slug: 'sms-academy',
    name: 'SMS Academy',
    color: '#ccdff6',
    glow: '#ff8201',
    primary: '#003161',
    links: { appStore: apple('id6807188189'), playStore: play('smsacademy') },
  },
  {
    slug: 'cash-chat',
    name: 'Cash Chat',
    color: '#c6521a',
    glow: '#ff7a2f',
    primary: '#a6420f',
    links: { appStore: apple('id6806787743'), playStore: play('cashchat') },
  },
  {
    slug: 'dr-safwat',
    name: 'Dr Safwat',
    color: '#e8eef8',
    glow: '#f5b800',
    primary: '#0b2c5e',
    links: { playStore: play('safwat') },
  },
  {
    slug: 'heta',
    name: 'Mr.Heta',
    color: '#851522',
    glow: '#e0405a',
    primary: '#6e1220',
    links: { appStore: apple('mr-heta/id6756027547'), playStore: play('heta') },
  },
  {
    slug: 'hosny',
    name: 'مسار الأعمال',
    color: '#070205',
    glow: '#f4c21f',
    primary: '#7a5c00',
    links: { appStore: apple('id6804236342'), playStore: play('mohamedhosny') },
  },
  {
    slug: 'hossary',
    name: 'قانون الحصري',
    color: '#352214',
    glow: '#f2b43a',
    primary: '#5c3d0c',
    links: { appStore: apple('id6809176222'), playStore: play('hossary') },
  },
  {
    slug: 'shabaykawy',
    name: 'شبيكاوي',
    color: '#110f0b',
    glow: '#f5b82e',
    primary: '#1b5e3a',
    links: { appStore: apple('id6804942961'), playStore: play('shabaykawy') },
  },
];

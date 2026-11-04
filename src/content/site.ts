// Company facts for the site. Every value comes from the company profile
// (MANIFEST/README.md). Anything not confirmed is written in [brackets].

export const company = {
  name: 'Bellis Australia',
  phone: '1300 740 564',
  phoneHref: 'tel:1300740564',
  email: 'sales@bellis.com.au',
  email_href: 'mailto:sales@bellis.com.au',
  hq: '171 Musgrave Rd, Coopers Plains, QLD 4108',
  mission:
    'To expand through technical innovation and reliable, on-time service to clients, both in Australia and overseas.',
  values: [
    'Customer focus',
    'Honesty',
    'Availability',
    'Quality, safety and the environment',
    'Research and development',
    'Competitiveness',
  ],
};

export const nav = [
  { to: '/products', label: 'Products' },
  { to: '/services', label: 'Services' },
  { to: '/fabrication', label: 'Fabrication' },
  { to: '/references', label: 'References' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export type Branch = {
  city: string;
  state: string;
  address: string;
  role: string;
  workshop: boolean;
};

export const branches: Branch[] = [
  {
    city: 'Brisbane',
    state: 'QLD',
    address: '171 Musgrave Rd, Coopers Plains, QLD 4108',
    role: 'Head office and workshop',
    workshop: true,
  },
  {
    city: 'Gladstone',
    state: 'QLD',
    address: '1 Boowan Crt, Callemondah, QLD 4680',
    role: 'Workshop',
    workshop: true,
  },
  {
    city: 'Melbourne',
    state: 'VIC',
    address: 'Epping, VIC 3076 [street address to confirm]',
    role: 'Branch (Epping)',
    workshop: false,
  },
  {
    city: 'Darwin',
    state: 'NT',
    address: 'Unit 1/2 Damaso Pl, Woolner, NT 0820',
    role: 'Branch',
    workshop: false,
  },
  {
    city: 'Perth',
    state: 'WA',
    address: 'Unit 2/36 Sparks Rd, Henderson, WA 6166',
    role: 'Branch',
    workshop: false,
  },
];

// The six jobs a plant asks insulation to do. The home page starts here.
export const problems = [
  {
    n: '01',
    key: 'temperature',
    label: 'Temperature',
    title: 'Hold the process temperature',
    body: 'Cut heat loss and gain on cold, cryogenic and hot lines and vessels.',
    linkLabel: 'See temperature products',
    to: '/products?problem=temperature',
  },
  {
    n: '02',
    key: 'corrosion',
    label: 'Corrosion',
    title: 'Stop corrosion under insulation',
    body: 'Remove, inspect and reinstate. Vapour barriers and closed-cell systems where needed.',
    linkLabel: 'See the corrosion service',
    to: '/services/corrosion-control',
  },
  {
    n: '03',
    key: 'fire',
    label: 'Fire',
    title: 'Protect structures and pipework in a fire',
    body: 'Passive fire protection with non-combustible boards and aerogel blankets.',
    linkLabel: 'See fire products',
    to: '/products?problem=fire',
  },
  {
    n: '04',
    key: 'noise',
    label: 'Noise',
    title: 'Bring plant noise down',
    body: 'Acoustic foams, blankets and barrier products for plant and commercial buildings.',
    linkLabel: 'See acoustic products',
    to: '/products?problem=noise',
  },
  {
    n: '05',
    key: 'access',
    label: 'Access',
    title: 'Open it up for inspection',
    body: 'Removable covers, mats and fabric expansion joints that come off and go back on.',
    linkLabel: 'See covers and mats',
    to: '/products?problem=access',
  },
  {
    n: '06',
    key: 'people',
    label: 'People',
    title: 'Keep people off hot surfaces',
    body: 'Personnel protection on hot pipework, vessels and exhausts, with covers and cladding.',
    linkLabel: 'See fabrication',
    to: '/fabrication',
  },
];

export const pipeline = [
  {
    n: '01',
    title: 'Estimate',
    body: 'Feasibility and actual cost estimates, so the budget is known before the work starts.',
  },
  {
    n: '02',
    title: 'Supply',
    body: 'Insulation, cladding, banding, tapes and mastics, sourced through our supplier network.',
  },
  {
    n: '03',
    title: 'Fabricate',
    body: 'CNC sheet-metal and plasma cutting in Brisbane and Gladstone: jackets, covers and expansion joints.',
  },
  {
    n: '04',
    title: 'Install and maintain',
    body: 'Turnkey installation, shutdown and maintenance programmes, with crew and skilled labour hire.',
  },
];

export const commitments = [
  {
    title: 'Health and safety',
    body: 'Safe workplaces, written procedures, legal compliance and worker consultation.',
  },
  {
    title: 'Quality',
    body: 'Products that meet specification and are competitively priced, under a documented quality management system.',
  },
  {
    title: 'Environment',
    body: 'Responsible environmental management, and products designed to protect the environment.',
  },
];

export const references = [
  {
    sector: 'Power stations',
    names: ['Gladstone', 'Tarong', 'Swanbank', 'Stanwell', 'Channel Island', 'Mica Creek'],
  },
  {
    sector: 'Petrochemicals and refining',
    names: ['Incitec Pivot', 'Caltex Lytton Refinery', 'QER Shale Oil', 'QLD Nitrates', 'BP Refinery', 'Puma Bitumen'],
  },
  {
    sector: 'LNG and energy',
    names: ['APLNG', 'Gladstone LNG', 'Shell', 'Woodside', 'Wheatstone', 'Darwin'],
  },
  {
    sector: 'Mining and resources',
    names: ['Yarwun Refinery', 'Queensland Alumina Limited', 'Boyne Smelter', 'BHP Olympic Dam', 'MIM ISASMELT', 'Ranger Uranium Mine'],
  },
];

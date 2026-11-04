// Nine service families, as framed on the company site (profile section 6).

export type Service = {
  slug: string;
  name: string;
  short: string;
  lead: string;
  offers: string[];
  image?: string;
  alt?: string;
};

export const services: Service[] = [
  {
    slug: 'oil-gas-energy',
    name: 'Oil, gas and energy',
    short: 'LNG and power generation work, from hot systems to cryogenic lines.',
    lead: 'Hot and cryogenic insulation, acoustic work, fireproofing and shutdown programmes for LNG and power generation.',
    offers: [
      'Hot and cryogenic insulation',
      'Acoustic insulation',
      'Fireproofing',
      'Corrosion control',
      'Access systems and removable covers',
      'Expansion joints',
      'Electrical heat tracing',
      'Material procurement',
      'Full shutdown and maintenance systems',
    ],
    image: 'oil-gas-energy.webp',
    alt: 'Worker in hi-vis beside insulated pipework and a process pump',
  },
  {
    slug: 'mining-resources',
    name: 'Mining and resources',
    short: 'Alumina, smelting, poly-metal and uranium operations.',
    lead: 'Hot and cold insulation, acoustic work, fireproofing and corrosion control for alumina, smelting and mineral processing plant.',
    offers: [
      'Hot and cold insulation',
      'Acoustic insulation',
      'Fireproofing',
      'Corrosion control',
      'Crew hire',
      'Material procurement',
      'Removable covers',
    ],
    image: 'mining.webp',
    alt: 'Plant under construction with tall vessels, a crane and a truck',
  },
  {
    slug: 'marine-defence',
    name: 'Marine and defence',
    short: 'Thermal, acoustic and fireproofing systems with skilled labour.',
    lead: 'Thermal, acoustic and fireproofing systems, with anticorrosion coatings and skilled labour for marine and defence work.',
    offers: [
      'Thermal, acoustic and fireproofing systems',
      'Anticorrosion coatings',
      'Skilled labour hire',
      'Marine product supply',
    ],
    image: 'marine-insulated-pipe.webp',
    alt: 'Insulated pipework on a marine installation',
  },
  {
    slug: 'commercial',
    name: 'Commercial',
    short: 'Thermal, cold, acoustic and fireproofing for commercial buildings.',
    lead: 'Thermal, cold, acoustic and sprayed insulation for commercial buildings, plus oven and exhaust products that save energy.',
    offers: [
      'Thermal, cold, acoustic and sprayed insulation',
      'Oven insulation',
      'Removable exhaust mats',
      'Electrical heat tracing',
      'Firemaster 550 board for fire-rated linings',
    ],
    image: 'ainsul-80.jpg',
    alt: 'Acoustic foam wedges',
  },
  {
    slug: 'corrosion-control',
    name: 'Corrosion control (CUI)',
    short: 'Corrosion under insulation, handled as one turnkey job.',
    lead: 'Corrosion under insulation handled as one turnkey job: remove, inspect, paint and reinstate.',
    offers: [
      'Turnkey CUI remediation',
      'Insulation removal and inspection',
      'Painting of pipework',
      'Reinstatement of insulation',
      'Vapour barriers and closed-cell systems where needed',
    ],
    image: 'corrosion-control-pipe.jpg',
    alt: 'Corrosion on a steel pipe surface',
  },
  {
    slug: 'sheet-metal-fabrication',
    name: 'Sheet-metal fabrication',
    short: 'Cladding, jackets, valve boxes and guards, made in our workshops.',
    lead: 'Large or small, Bellis can do it: cladding, jackets, valve boxes and guards, cut and formed in our Brisbane and Gladstone workshops.',
    offers: [
      'Cladding and jackets',
      'Valve and flange boxes',
      'Custom guards in expanded steel or mesh',
      'Cutting, rolling, punching, welding and bending',
    ],
    image: 'sheet-metal-fabrication.webp',
    alt: 'Metal sheet being rolled on a forming machine',
  },
  {
    slug: 'manufactured-products',
    name: 'Manufactured products',
    short: 'Custom removable covers, expansion joints and exhaust covers.',
    lead: 'Custom insulation products made to fit the plant: removable covers, fabric expansion joints and exhaust thermal covers.',
    offers: [
      'Removable covers and mats',
      'Fabric expansion joints and bellows',
      'Exhaust thermal covers',
      'Turbo and valve covers',
    ],
    image: 'removable-mats.webp',
    alt: 'Removable insulation mats fitted to plant equipment',
  },
  {
    slug: 'estimating-procurement',
    name: 'Estimating and procurement',
    short: 'Cost estimates from feasibility to actual, and buying on the merits.',
    lead: 'Cost estimates from feasibility to actual, and procurement that weighs price, quality, availability and service.',
    offers: [
      'Feasibility cost estimates',
      'Actual cost estimates',
      'Procurement on price, quality, availability and service',
      'Supplier network across the USA, Europe, Asia and the Middle East',
    ],
  },
  {
    slug: 'contracting-maintenance',
    name: 'Contracting and maintenance',
    short: 'Turnkey installation, shutdowns and maintenance programmes.',
    lead: 'Turnkey installation, shutdown and maintenance programmes, with crew hire and skilled labour hire.',
    offers: [
      'Turnkey insulation installation',
      'Shutdown and maintenance programmes',
      'Crew hire and skilled labour hire',
      'Anticorrosion coatings',
    ],
    image: 'technical-support.webp',
    alt: 'Bellis team in hi-vis standing outside a building',
  },
];

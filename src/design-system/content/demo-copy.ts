// The shared copy deck for every demo (lead-owned; demo builders import it and never edit it).
// Every fact comes from the dossier (bellis-new/MANIFEST/README.md) and the client's own site. Nothing is invented.
// `[placeholder]` marks a gap the client must fill; a builder shows it as written, at that length. Proof is never sampled.
// Voice: plain, technical, confident, safety-first. Second person. Short sentences. No "solutions", "seamless", "unlock".

export const site = {
  name: 'Bellis Australia',
  tagline: 'Engineering and Supply Solutions', // the client's own page title
  since: 1981, // stated on the client's site and in the SPI release; other listings differ, so show it only as "since 1981"
  phone: '1300 740 564',
  phoneHref: 'tel:1300740564',
  email: 'sales@bellis.com.au',
  emailHref: 'mailto:sales@bellis.com.au',
  cta: 'Talk to an expert', // the client's own primary call to action
  ctaSecondary: 'Enquire now', // the client's product-page action
  skip: 'Skip to content',
  lang: 'en-AU',
} as const;

/** The pages every demo builds, with the same keys. `built` pages exist in each demo; the others are shown in the menu as "coming" only if the demo wants. */
export const pages = [
  { key: 'home', label: 'Home', path: '/' },
  { key: 'products', label: 'Products', path: '/products' },
  { key: 'corrosion', label: 'Corrosion control', path: '/corrosion-control' },
  { key: 'contact', label: 'Contact', path: '/contact' },
] as const;
export type PageKey = (typeof pages)[number]['key'];

/** Pages of the real site that no demo builds. A demo may list them in its menu as plain, unlinked text only if it needs the density. */
export const laterPages = ['About', 'Oil, gas and energy', 'Mining and resources', 'Marine and defence', 'Commercial', 'Sheet-metal fabrication', 'Estimating and procurement', 'Blog'] as const;

export const branches = [
  { id: 'brisbane', city: 'Brisbane', note: 'Head office', address: '171 Musgrave Rd, Coopers Plains', state: 'QLD', postcode: '4108', workshop: true },
  { id: 'gladstone', city: 'Gladstone', note: 'Workshop', address: '1 Boowan Crt, Callemondah', state: 'QLD', postcode: '4680', workshop: true },
  { id: 'melbourne', city: 'Melbourne', note: 'Epping', address: '[street address]', state: 'VIC', postcode: '3076', workshop: false },
  { id: 'darwin', city: 'Darwin', note: 'Woolner', address: 'Unit 1/2 Damaso Pl, Woolner', state: 'NT', postcode: '0820', workshop: false },
  { id: 'perth', city: 'Perth', note: 'Henderson', address: 'Unit 2/36 Sparks Rd, Henderson', state: 'WA', postcode: '6166', workshop: false },
] as const;
/** Each branch has its own phone number on the client's site; the dossier gives only the main line. Show the main line, and `[branch phone]` where a branch number would sit. */
export const branchPhonePlaceholder = '[branch phone]';

// ---------------------------------------------------------------------------------------------------------------------
// HOME
// ---------------------------------------------------------------------------------------------------------------------
export const home = {
  title: 'Bellis Australia: insulation supply, fabrication and installation',
  description: 'Bellis supplies industrial mechanical insulation, makes the cladding and removable covers in its own workshops, and fits the lot, from five branches across Australia.',

  hero: {
    h1: 'Insulation for heavy industry.', // 30 characters
    lead: 'Bellis supplies the materials, makes the cladding and covers in its own workshops, and fits the lot. Five branches, one main line.',
    clientLine: 'Supply and manufacture insulation systems to reduce energy cost for Industry.', // the client's own homepage headline: for a standfirst or caption, not the h1
    cta: site.cta,
    ctaNote: `or call ${site.phone}`,
  },

  /** The story opener: the first chapter, held to one screen at most. The h1 and the primary action are visible at p = 0.
   *  The five statements are the five jobs insulation does (dossier section 3), said bluntly. They appear one after another as p runs. */
  opener: {
    statements: ['Too hot to touch.', 'Too cold to hold.', 'Too loud to work beside.', 'Too close to fire.', 'Too wet to last.'],
    payoff: 'Bellis insulates against all five.',
    scrollHint: 'Scroll',
  },

  jobs: {
    heading: 'Five jobs for a layer of insulation.',
    lead: 'Start from the problem on your plant. Each job has its own materials, and Bellis supplies all of them.',
    items: [
      { key: 'temperature', title: 'Hold the temperature', body: 'Hot lines lose energy and cold lines gain heat. Insulation keeps the process where it should be and cuts the energy bill.', materials: 'Pyrogel, Rockwool, Foamglas, Cryogel Z, Armaflex' },
      { key: 'people', title: 'Protect people', body: 'A hot surface burns. Insulation and guards keep it out of reach of the crew working beside it.', materials: 'Rockwool pipe sections, cladding, removable covers' },
      { key: 'noise', title: 'Quieten the plant', body: 'Pumps, fans and pipework are loud. Acoustic foams, barriers and lagging bring the noise down.', materials: 'DeciDamp, Soberfoam, Subdue, Soundlag, Rockwool sound insulation' },
      { key: 'fire', title: 'Hold the fire', body: 'Fire-rated board and blanket keep structures and pipework safe in a fire event.', materials: 'Firemaster 550, Pyrogel XTF, Rockwool' },
      { key: 'corrosion', title: 'Stop corrosion under insulation', body: 'Moisture trapped against steel rusts it from the inside. Vapour barriers and closed-cell systems keep it out.', materials: 'Vapour barriers, anticorrosion wrap, mastics, Foamglas' },
    ],
  },

  steps: {
    heading: 'One supplier, start to finish.',
    lead: 'Most plants buy the material from one firm, the metalwork from another and the labour from a third. Bellis does all four.',
    items: [
      { n: 1, title: 'Estimate', body: 'Cost estimates from feasibility to actual, so the budget is known before the shutdown starts.' },
      { n: 2, title: 'Procure', body: 'Materials sourced through a supplier network across the USA, Europe, Asia and the Middle East, on price, quality, availability and service.' },
      { n: 3, title: 'Fabricate', body: 'Cladding, jackets, valve and flange boxes, removable covers and expansion joints, cut and formed in Bellis workshops.' },
      { n: 4, title: 'Install and maintain', body: 'Turnkey insulation, shutdown and maintenance programmes, corrosion remediation and crew hire.' },
    ],
  },

  workshop: {
    heading: 'Made in our own workshops.',
    lead: 'Brisbane and Gladstone run CNC sheet-metal and CNC plasma cutting. If it wraps a pipe, a valve or a vessel, Bellis can make it.',
    items: [
      { key: 'cladding', title: 'Cladding and jackets', body: 'Aluminium, galvanised and stainless. Lobster-back bends, T-joints, valve and flange boxes, guards in expanded steel or mesh.', pic: 'stainlessTanker' },
      { key: 'covers', title: 'Removable covers', body: 'Custom insulation mats and covers for valves, turbos and flanges, so a crew can open the line and close it again.', pic: 'removableCovers' },
      { key: 'joints', title: 'Fabric expansion joints', body: 'Fabric expansion joints and bellows, and exhaust thermal covers, made to the drawing.', pic: 'expansionJoint' },
    ],
    capabilities: ['CNC sheet-metal', 'CNC plasma cutting', 'Cutting, rolling, punching, welding and bending', 'Pre-insulated pipe supports'],
  },

  sites: {
    heading: 'Plants we have worked on.',
    lead: 'Named on the Bellis website as past work.', // each site needs the client's confirmation before launch
    groups: [
      { sector: 'Power stations', names: ['Gladstone', 'Tarong', 'Swanbank', 'Stanwell', 'Channel Island', 'Mica Creek'] },
      { sector: 'LNG and energy', names: ['APLNG', 'Gladstone LNG', 'Shell', 'Woodside', 'Wheatstone', 'Darwin'] },
      { sector: 'Refining and petrochemicals', names: ['Incitec Pivot', 'Caltex Lytton Refinery', 'QER Shale Oil', 'QLD Nitrates', 'BP Refinery', 'Puma Bitumen'] },
      { sector: 'Mining and minerals', names: ['Yarwun Refinery', 'Queensland Alumina Limited', 'Boyne Smelter', 'BHP Olympic Dam', 'MIM ISASMELT', 'Ranger Uranium Mine'] },
    ],
    certsPlaceholder: '[current certifications: client to confirm standards and dates]',
  },

  figures: {
    items: [
      { value: '5', label: 'branches', detail: 'Brisbane, Gladstone, Melbourne, Darwin and Perth' },
      { value: '1981', label: 'since', detail: 'Corrosion-under-insulation work and the supplier network date from then' },
      { value: '2', label: 'workshops', detail: 'Brisbane and Gladstone' },
      { value: '90', label: 'product lines, about', detail: 'In the Quick Look index' },
    ],
  },

  closing: {
    heading: 'Talk to an expert.',
    body: 'Tell us the line, the temperature and the shutdown window. We will tell you what goes on it.',
    cta: site.cta,
  },
} as const;

// ---------------------------------------------------------------------------------------------------------------------
// PRODUCTS (the catalogue; derived from the client's Quick Look index and the dossier table, de-duplicated)
// ---------------------------------------------------------------------------------------------------------------------
export type JobKey = 'hot' | 'cold' | 'acoustic' | 'fire' | 'corrosion' | 'access';
export const jobLabels: Record<JobKey, string> = { hot: 'Hot', cold: 'Cold', acoustic: 'Acoustic', fire: 'Fire', corrosion: 'Corrosion', access: 'Access and fixing' };

export const products = {
  title: 'Products: insulation, cladding and fixings | Bellis Australia',
  h1: 'About 90 product lines.',
  lead: 'Eleven families, filed by the job they do. Pick a problem to filter, or read down the list. Bellis sells by quote, so every family ends in an enquiry.',
  filterLabel: 'Filter by job',
  all: 'All',
  empty: 'Nothing in that job yet. Try another, or call 1300 740 564.',
  enquire: 'Enquire now',
  families: [
    { key: 'cold', name: 'Cold and cryogenic', jobs: ['cold', 'corrosion'], use: 'LNG, cryogenic lines, chilled water, and corrosion-under-insulation prevention.', lines: ['Foamglas blocks and pipe sections', 'Cryogel Z (aerogel-type, reusable, hydrophobic)', 'PIR and PUR', 'Armaflex elastomeric foam', 'Polystyrene', 'Versi-Foam portable spray polyurethane'], pic: 'foamglasCryo' },
    { key: 'hot', name: 'Hot and high temperature', jobs: ['hot', 'fire'], use: 'Power generation, refining and steam systems.', lines: ['Pyrogel XTE, XTF and HPS (aerogel blankets)', 'Rockwool slabs, blankets and pipe sections', 'Ceramic insulation', 'Perlite', 'Thermobreak, with and without cladding', 'Interam endothermic mat'], pic: 'pyrogelXte' },
    { key: 'acoustic', name: 'Acoustic', jobs: ['acoustic'], use: 'Noise control in plant and in commercial buildings.', lines: ['Acoustic foams', 'DeciDamp', 'Polyester blanket and Mylar tape', 'Soberfoam', 'Rockwool sound insulation', 'Subdue, Wavebar, Quadzero, Echohush, Soundlag, Silentstep and Soundmat barriers'], pic: 'acousticFoam' },
    { key: 'fire', name: 'Fireproofing', jobs: ['fire'], use: 'Passive fire protection, and commercial kitchen splashbacks.', lines: ['Pyrogel XTF', 'Firemaster 550 board (non-combustible, approved by Energy Safe Victoria for gas installations)', 'Rockwool'], pic: 'rockwool' },
    { key: 'cladding', name: 'Cladding and jacketing', jobs: ['hot', 'cold', 'access'], use: 'Weatherproof jackets over insulation.', lines: ['Aluminium, galvanised, stainless steel and Colorbond coil and sheet', 'Stucco-embossed and zinc-alum sheet', 'Coated stainless (Tedlar, PTFE)'], pic: 'stainlessTanker' },
    { key: 'banding', name: 'Banding and fixings', jobs: ['access'], use: 'Securing jackets and insulation.', lines: ['Stainless steel banding and clips (304 and 316)', 'Capstan clips and washers', 'Speed clips', 'Tie wire', 'Anchor pins, screws and rivets', 'Hangers'], pic: 'banding' },
    { key: 'tapes', name: 'Accessories and tapes', jobs: ['corrosion', 'cold'], use: 'Sealing and finishing.', lines: ['Butyl rubber sheet and tape', 'Aluminium tape', 'Fibreglass tape and rope', 'Filament tape', 'Vapour barriers', 'Sealants', 'Drain and inspection plugs'], pic: 'interam' },
    { key: 'mastics', name: 'Mastics and adhesives', jobs: ['corrosion'], use: 'Sealing and bonding.', lines: ['Foster mastic and adhesive range'], pic: null },
    { key: 'fabrics', name: 'Fabrics and removable covers', jobs: ['access', 'hot'], use: 'Access for inspection and maintenance.', lines: ['PTFE-coated cloth', 'Silicone-coated fibreglass cloth', 'Stainless stocking mesh', 'Removable blankets, mats, turbo covers and valve covers', 'Fabric expansion joints'], pic: 'removableCovers' },
    { key: 'supports', name: 'Pipe supports', jobs: ['cold', 'hot'], use: 'Insulated pipe support in cryogenic and hot lines.', lines: ['Polyurethane pre-insulated supports', 'Foamglas pre-insulated supports', 'Cryogel Z pre-insulated supports'], pic: 'foamglas' },
    { key: 'specialty', name: 'Specialty', jobs: ['hot', 'corrosion'], use: 'Niche applications.', lines: ['Electrical heat tracing', 'Grill bricks', 'Radome covers', 'Anticorrosion wrap'], pic: null },
  ],
  closing: { heading: 'Not sure which family?', body: 'Describe the line and the temperature. An expert will pick the material.', cta: site.cta },
} as const;

// ---------------------------------------------------------------------------------------------------------------------
// CORROSION CONTROL (service page)
// ---------------------------------------------------------------------------------------------------------------------
export const corrosion = {
  title: 'Corrosion under insulation: remediation and prevention | Bellis Australia',
  h1: 'Corrosion under insulation.', // 27 characters
  lead: 'Moisture trapped against steel rusts it from the inside, out of sight, until a shutdown finds it. Bellis has dealt with it since 1981.',
  cost: 'The client calls it a major maintenance and shutdown cost.', // dossier section 3; use as a caption or not at all
  stepsHeading: 'Strip it, treat it, put it back.',
  steps: [
    { n: 1, title: 'Remove and inspect', body: 'Take the insulation off and look at the steel. Corrosion shows up here, not from the outside.' },
    { n: 2, title: 'Paint', body: 'Treat the pipework and paint it with an anticorrosion coating before anything goes back on.' },
    { n: 3, title: 'Reinstate', body: 'Fit insulation back with a vapour barrier, or a closed-cell system where the line needs one.' },
  ],
  preventionHeading: 'What keeps the water out.',
  prevention: [
    { name: 'Vapour barriers', body: 'A sealed layer between the insulation and the weather.' },
    { name: 'Closed-cell systems', body: 'Insulation that does not soak up water, such as Foamglas.' },
    { name: 'Anticorrosion wrap', body: 'Wrap applied to the steel before insulation.' },
    { name: 'Mastics and adhesives', body: 'Foster mastics to seal joints and edges.' },
    { name: 'Drain and inspection plugs', body: 'Let water out and let a crew look in without stripping the line.' },
  ],
  note: 'Corrosion control is one of the services Bellis runs alongside maintenance and shutdown programmes.',
  closing: { heading: 'Found rust? Talk to an expert.', body: 'Tell us the line and what you can see. We will tell you what to strip and what to put back.', cta: site.cta },
} as const;

// ---------------------------------------------------------------------------------------------------------------------
// CONTACT (the form)
// ---------------------------------------------------------------------------------------------------------------------
export const contact = {
  title: 'Contact Bellis Australia: five branches, one main line',
  h1: 'Talk to an expert.',
  lead: 'Ring the main line, or send the details once and Bellis will reply.',
  phoneLabel: 'Main line',
  emailLabel: 'Sales email',
  branchesHeading: 'Five branches',
  branchesNote: 'Each branch has its own number. [branch phones to come from the client]',
  form: {
    heading: 'Send an enquiry',
    fields: {
      name: { label: 'Your name', error: 'Enter your name.' },
      company: { label: 'Company', error: 'Enter the company you are asking for.' },
      email: { label: 'Email', error: 'Enter an email address we can reply to.', errorFormat: 'That email address does not look right.' },
      phone: { label: 'Phone (optional)', hint: 'Handy if the job is urgent.' },
      branch: { label: 'Nearest branch', placeholder: 'Choose a branch', error: 'Choose the nearest branch.' },
      job: { label: 'What is the job?', placeholder: 'Choose a job', options: ['Hot lines', 'Cold or cryogenic lines', 'Noise', 'Fire protection', 'Corrosion under insulation', 'Cladding or covers made to order', 'Something else'], error: 'Choose the closest job.' },
      message: { label: 'The details', hint: 'The line, the temperature and the shutdown window, if you know them.', error: 'Add a line about what you need.' },
    },
    submit: 'Send enquiry',
    sending: 'Sending',
    successTitle: 'Enquiry sent.',
    successBody: 'A person at Bellis will reply to the email you gave. For anything urgent, ring 1300 740 564.',
    errorSummary: 'Check the fields marked below.',
  },
} as const;

/** Footer, every page. */
export const footer = {
  blurb: 'Industrial mechanical insulation: supply, fabrication, installation and maintenance.',
  columns: [
    { heading: 'Products', links: ['Cold and cryogenic', 'Hot and high temperature', 'Acoustic', 'Fireproofing', 'Cladding and jacketing'] },
    { heading: 'Services', links: ['Corrosion control', 'Maintenance and shutdowns', 'Sheet-metal fabrication', 'Estimating and procurement'] },
  ],
  small: '[legal line: company name, ABN, licence numbers: client to supply]',
} as const;

// Shared copy deck: the one set of words and pictures every demo shows (demo-proposals.md § 3).
// Lead-owned. Builders import from here and never edit it; ask the lead for a missing value.
//
// Sources: the company dossier (bellis-new/MANIFEST/README.md) and bellis.com.au (crawled 4 Nov 2026).
// Rules: no invented facts, numbers, claims or testimonials. [placeholder] marks copy that is missing.
// Client and project names are as published on the site; the owner confirms they may be shown.
// Dev-only: nothing outside src/design-system/ imports this file.

import bannerLng from '../assets/own/hero/banner-1.jpg';
import crewRoof from '../assets/own/hero/bellis-hard-hat.jpg';
import ainsul80 from '../assets/own/commercial/ainsul-80.jpg';
import corrosionPipe from '../assets/own/services/corrosion-control-pipe.jpg';
import svcOilGas from '../assets/own/services/oil-gas-energy.webp';
import svcMining from '../assets/own/services/mining.webp';
import svcMarinePipe from '../assets/own/services/marine-insulated-pipe.webp';
import svcMarineBulkhead from '../assets/own/services/marine-bulkhead-insulation.webp';
import svcSheetMetal from '../assets/own/services/sheet-metal-fabrication.webp';
import svcCustomMetal from '../assets/own/services/custom-metal-jobs.webp';
import svcExpansion from '../assets/own/services/expansion-joint.webp';
import svcRemovableMats from '../assets/own/services/removable-mats.webp';
import svcProcurement from '../assets/own/services/procurement-materials.webp';
import svcTechnical from '../assets/own/services/technical-support.webp';
import svcContract from '../assets/own/services/contract-services.webp';
import svcEnvironment from '../assets/own/services/environmental-management.webp';
import prodFoamglas from '../assets/own/products/foamglas.webp';
import prodFoamglasCryo from '../assets/own/products/foamglas-cryogenic.webp';
import prodPyrogelXte from '../assets/own/products/pyrogel-xte-xtf.webp';
import prodPyrogelCut from '../assets/own/products/pyrogel-cut.webp';
import prodAerogelHps from '../assets/own/products/aspen-aerogel-pyrogel-hps.webp';
import prodRockwool from '../assets/own/products/rockwool-slabs.webp';
import prodNeedleFelt from '../assets/own/products/needle-felt.webp';
import prodPerlite from '../assets/own/products/perlite.webp';
import prodVersiFoam from '../assets/own/products/versi-foam-low-gwp.webp';
import prodThermobreak from '../assets/own/products/thermobreak-tube.webp';
import prodInteram from '../assets/own/products/interam-endothermic-mat.webp';
import prodSteelBanding from '../assets/own/products/steel-banding.webp';
import prodRubber from '../assets/own/products/rubber-insulation.webp';
import logoHorizontal from '../assets/own/brand/bellis-logo-horizontal.webp';

// Pictures: the client's own (provenance "own"). Dimensions are the file's own pixels.
// Alt text describes what the file shows or, where the file is named only, the product it is named for.
export const pictures = {
  heroLng: { src: bannerLng, w: 1920, h: 625, alt: 'LNG carrier moored at a terminal, with storage spheres behind it' },
  heroCrew: { src: crewRoof, w: 1633, h: 1224, alt: 'Two crew in hi-vis and harnesses fixing metal cladding on a plant roof' },
  ainsul: { src: ainsul80, w: 1024, h: 768, alt: 'Ainsul insulation product' },
  corrosionPipe: { src: corrosionPipe, w: 1024, h: 298, alt: 'Pipework prepared for corrosion-under-insulation control' },
  logo: { src: logoHorizontal, w: 331, h: 150, alt: 'Bellis' },
  svc: {
    oilGas: { src: svcOilGas, w: 980, h: 735, alt: 'Oil and gas and energy plant work' },
    mining: { src: svcMining, w: 980, h: 735, alt: 'Mining and resources plant' },
    marinePipe: { src: svcMarinePipe, w: 500, h: 371, alt: 'Insulated pipe for marine work' },
    marineBulkhead: { src: svcMarineBulkhead, w: 240, h: 360, alt: 'Bulkhead insulation for marine work' },
    sheetMetal: { src: svcSheetMetal, w: 980, h: 655, alt: 'Sheet-metal fabrication' },
    customMetal: { src: svcCustomMetal, w: 980, h: 735, alt: 'Custom metal jobs' },
    expansion: { src: svcExpansion, w: 684, h: 372, alt: 'Fabric expansion joint' },
    removableMats: { src: svcRemovableMats, w: 980, h: 735, alt: 'Removable insulation mats' },
    procurement: { src: svcProcurement, w: 734, h: 340, alt: 'Materials procurement' },
    technical: { src: svcTechnical, w: 980, h: 735, alt: 'Technical support' },
    contract: { src: svcContract, w: 980, h: 656, alt: 'Contract services' },
    environment: { src: svcEnvironment, w: 600, h: 396, alt: 'Environmental management' },
  },
  prod: {
    foamglas: { src: prodFoamglas, w: 600, h: 450, alt: 'Foamglas cellular glass insulation' },
    foamglasCryo: { src: prodFoamglasCryo, w: 980, h: 601, alt: 'Foamglas cellular glass for cryogenic lines' },
    pyrogelXte: { src: prodPyrogelXte, w: 642, h: 500, alt: 'Pyrogel XTE and XTF aerogel blanket' },
    pyrogelCut: { src: prodPyrogelCut, w: 1000, h: 735, alt: 'Cut Pyrogel aerogel insulation' },
    aerogelHps: { src: prodAerogelHps, w: 400, h: 267, alt: 'Pyrogel HPS aerogel blanket' },
    rockwool: { src: prodRockwool, w: 510, h: 380, alt: 'Rockwool insulation slabs' },
    needleFelt: { src: prodNeedleFelt, w: 743, h: 538, alt: 'Needle felt insulation' },
    perlite: { src: prodPerlite, w: 320, h: 214, alt: 'Perlite insulation' },
    versiFoam: { src: prodVersiFoam, w: 602, h: 338, alt: 'Versi-Foam low-GWP spray polyurethane' },
    thermobreak: { src: prodThermobreak, w: 1000, h: 667, alt: 'Thermobreak insulation tube' },
    interam: { src: prodInteram, w: 700, h: 500, alt: 'Interam endothermic mat' },
    steelBanding: { src: prodSteelBanding, w: 450, h: 450, alt: 'Stainless steel banding' },
    rubber: { src: prodRubber, w: 743, h: 542, alt: 'Rubber insulation sheet' },
  },
} as const;

export const copy = {
  brand: {
    name: 'Bellis Australia',
    wordmark: 'Bellis',
    tagline: 'Engineering and Supply Solutions',
    descriptor: 'Leading industrial mechanical insulation distributor and fabricator',
    // Site and SPI release say 1981. The site also says "35 years" and "30 years" on other pages: owner to confirm.
    since: 'Since 1981',
  },
  contact: {
    phone: '1300 740 564',
    phoneHref: 'tel:+611300740564',
    email: 'sales@bellis.com.au',
    emailHref: 'mailto:sales@bellis.com.au',
    branchPhone: '[branch phone]',
  },
  nav: {
    products: 'Products',
    services: 'Services',
    industries: 'Industries',
    about: 'About',
    contact: 'Contact',
  },
  actions: {
    talk: 'Talk to an expert',
    enquire: 'Enquire now',
    browse: 'Browse the product range',
    call: 'Call 1300 740 564',
    send: 'Send enquiry',
    menu: 'Menu',
    close: 'Close',
  },
  home: {
    eyebrow: 'Mechanical insulation for heavy industry',
    headline: 'Supply and manufacture insulation systems to reduce energy cost for industry.',
    lede: 'Materials, custom sheet-metal fabrication, installation and shutdown maintenance, from branches in Queensland, Victoria, the Northern Territory and Western Australia.',
    jobsTitle: 'Insulation does five jobs in a plant',
    jobs: [
      { title: 'Energy and process control', body: 'Limits heat loss or gain, which cuts energy cost and holds process temperatures.' },
      { title: 'Personnel protection', body: 'Keeps hot surfaces away from workers.' },
      { title: 'Acoustic control', body: 'Reduces noise from plant and pipework.' },
      { title: 'Passive fire protection', body: 'Keeps structures and pipework safe in fire events.' },
      { title: 'Corrosion under insulation', body: 'Moisture trapped against steel is a major maintenance and shutdown cost. We remove, inspect and reinstate.' },
    ],
    productsTitle: 'Our product range',
    productsLede: 'Around 90 product lines for cold, hot, acoustic and fire work, with cladding, banding and accessories.',
    servicesTitle: 'Our services',
    servicesLede: 'The materials, the metalwork and the labour on the same plant, from one supplier.',
    proofTitle: 'Named projects',
    proofLede: 'Projects as listed on bellis.com.au. [owner to confirm names and scope before publication]',
    proofGroups: [
      { label: 'Power stations', items: ['Gladstone', 'Tarong', 'Swanbank', 'Stanwell', 'Channel Island', 'Mica Creek'] },
      { label: 'Petrochemicals and refining', items: ['Caltex Lytton Refinery', 'BP Refinery', 'Incitec Pivot', 'QER Shale Oil', 'QLD Nitrates', 'Puma Bitumen'] },
      { label: 'LNG and energy', items: ['Gladstone LNG', 'APLNG', 'Woodside', 'Shell', 'Wheatstone', 'Darwin'] },
      { label: 'Mining and resources', items: ['BHP Olympic Dam', 'Queensland Alumina Limited', 'Ranger Uranium Mine', 'Boyne Smelter', 'MIM ISASMELT', 'Yarwun Refinery'] },
    ],
    certTitle: 'Quality and safety',
    certBody: 'ISO 9001:2015 quality management. [placeholder: confirm the current certificate and the health and safety standard]',
    closingTitle: 'Talk to an expert about your line.',
    closingBody: 'Tell us the temperature, the material and the site. We will talk it through with you.',
  },
  services: [
    { key: 'oilGas', title: 'Oil & gas and energy', body: 'Hot and cryogenic insulation, acoustic and fireproofing, corrosion control, removable covers, expansion joints, and full shutdown and maintenance.' },
    { key: 'mining', title: 'Mining and resources', body: 'Hot and cold insulation, acoustic and fireproofing, corrosion control, crew hire, procurement and removable covers.' },
    { key: 'marine', title: 'Marine and defence', body: 'Thermal, acoustic and fireproofing systems, anticorrosion coatings, skilled labour hire and marine product supply.' },
    { key: 'commercial', title: 'Commercial', body: 'Thermal, cold, acoustic and sprayed insulation, oven insulation, removable exhaust mats, heat tracing and Firemaster 550 board.' },
    { key: 'cui', title: 'Corrosion control (CUI)', body: 'Turnkey corrosion-under-insulation remediation: remove and inspect, vapour barriers, closed-cell systems, painting and reinstatement.' },
    { key: 'sheetMetal', title: 'Sheet-metal fabrication', body: 'Cladding and jackets, valve and flange boxes, custom guards, and cutting, rolling, punching, welding and bending. Workshops in Brisbane and Gladstone.' },
    { key: 'manufactured', title: 'Manufactured products', body: 'Removable covers and mats, fabric expansion joints and bellows, exhaust thermal covers, turbo and valve covers.' },
    { key: 'estimating', title: 'Estimating and procurement', body: 'Feasibility and actual cost estimates, and procurement on price, quality, availability and service.' },
    { key: 'maintenance', title: 'Contracting and maintenance', body: 'Maintenance and shutdown programmes, planned and breakdown.' },
  ],
  productRanges: [
    { key: 'cold', title: 'Cold and cryogenic', lines: 'Foamglas, Cryogel Z, PIR and PUR, Armaflex elastomeric foam', use: 'LNG, cryogenic lines, chilled water, corrosion-under-insulation prevention' },
    { key: 'hot', title: 'Hot and high-temperature', lines: 'Pyrogel aerogel blankets, rockwool, ceramic insulation, perlite, Thermobreak', use: 'Power generation, refining, steam systems' },
    { key: 'acoustic', title: 'Acoustic', lines: 'Acoustic foams, DeciDamp, polyester blanket and Mylar tape, barrier products', use: 'Noise control in plant and commercial buildings' },
    { key: 'fire', title: 'Fireproofing', lines: 'Pyrogel XTF, Firemaster 550 board, rockwool', use: 'Passive fire protection; commercial kitchen splashbacks' },
    { key: 'cladding', title: 'Cladding and jacketing', lines: 'Aluminium, galvanised steel, stainless and Colorbond coil and sheet', use: 'Weatherproof jackets over insulation' },
    { key: 'banding', title: 'Banding and fixings', lines: 'Stainless banding and clips in 304 and 316, capstan clips, tie wire, screws, rivets', use: 'Securing jackets and insulation' },
    { key: 'accessories', title: 'Accessories and tapes', lines: 'Butyl rubber sheet and tape, aluminium tape, fibreglass tape, vapour barriers, sealants', use: 'Sealing and finishing' },
    { key: 'mastics', title: 'Mastics and adhesives', lines: 'Mastic and adhesive range', use: 'Sealing and bonding' },
    { key: 'fabrics', title: 'Fabrics and removable covers', lines: 'PTFE-coated and silicone-coated cloth, removable blankets, mats, turbo and valve covers, fabric expansion joints', use: 'Access for inspection and maintenance' },
    { key: 'supports', title: 'Pipe supports', lines: 'Polyurethane, Foamglas and Cryogel Z pre-insulated supports', use: 'Insulated pipe support in cryogenic and hot lines' },
    { key: 'specialty', title: 'Specialty', lines: 'Electrical heat tracing, grill bricks, radome covers, anticorrosion wrap', use: 'Niche applications' },
  ],
  about: {
    title: 'About Bellis',
    mission: 'To expand through technical innovation and reliable, on-time service to clients, both in Australia and overseas.',
    values: ['Customer focus', 'Competitiveness', 'Profitability', 'Honesty', 'Availability', 'Uncompromising on quality, safety and the environment', 'Research and development'],
    history: 'Dealing with corrosion under insulation since 1981.',
  },
  products: {
    title: 'Product range',
    lede: 'Insulation materials, accessories, cladding and banding. Find a line by the problem it solves or by category.',
    problems: ['Temperature', 'Corrosion', 'Fire', 'Noise', 'Access'],
    stockNote: '[placeholder: which lines are stocked and which are made to order]',
  },
  contactPage: {
    title: 'Talk to an expert',
    lede: 'Tell us the job. A technical contact will reply to the details you give.',
    fields: { name: 'Name', company: 'Company', email: 'Email', phone: 'Phone', branch: 'Nearest branch', need: 'What do you need?', message: 'Describe the job' },
    needs: ['Materials supply', 'Fabrication', 'Installation or maintenance', 'Estimate'],
    branchesTitle: 'Branches',
    branches: [
      { city: 'Brisbane (head office)', address: '171 Musgrave Rd, Coopers Plains, QLD 4108' },
      { city: 'Gladstone', address: '1 Boowan Crt, Callemondah, QLD 4680' },
      { city: 'Melbourne (Epping)', address: 'Epping, VIC 3076' },
      { city: 'Darwin', address: 'Unit 1/2 Damaso Pl, Woolner, NT 0820' },
      { city: 'Perth', address: 'Unit 2/36 Sparks Rd, Henderson, WA 6166' },
    ],
  },
  footer: {
    legal: '© Bellis Australia [placeholder: legal entity name and ABN]',
    tagline: 'Engineering and Supply Solutions',
  },
  // Demo pages use these four page keys. Each page root carries data-demo="<letter>" and data-ds="demo <letter> <key>".
  pageTitles: {
    home: 'Bellis Australia: Engineering and Supply Solutions',
    products: 'Product range | Bellis Australia',
    contact: 'Talk to an expert | Bellis Australia',
  },
} as const;

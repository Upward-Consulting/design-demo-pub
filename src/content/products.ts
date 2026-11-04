// Working sample of the Quick Look index, built from profile section 5.
// The full index (about 90 lines) replaces this list before launch.
// Duplicates on the live site are merged here (for example Thermobreak).

export type Cat =
  | 'cold'
  | 'hot'
  | 'acoustic'
  | 'fire'
  | 'cladding'
  | 'fixings'
  | 'accessories'
  | 'mastics'
  | 'fabrics'
  | 'supports'
  | 'specialty';

export type Problem = 'temperature' | 'corrosion' | 'fire' | 'noise' | 'access' | 'assembly';

export type Product = {
  name: string;
  cats: Cat[];
  problems: Problem[];
  note?: string;
  img?: string;
  alt?: string;
  featured?: boolean;
};

export const categoryLabels: Record<Cat, string> = {
  cold: 'Cold and cryogenic',
  hot: 'Hot and high-temperature',
  acoustic: 'Acoustic',
  fire: 'Fireproofing',
  cladding: 'Cladding and jacketing',
  fixings: 'Banding and fixings',
  accessories: 'Accessories and tapes',
  mastics: 'Mastics and adhesives',
  fabrics: 'Fabrics and removable covers',
  supports: 'Pipe supports',
  specialty: 'Specialty',
};

export const problemLabels: Record<Problem, string> = {
  temperature: 'Temperature',
  corrosion: 'Corrosion',
  fire: 'Fire',
  noise: 'Noise',
  access: 'Access',
  assembly: 'Fixing and assembly',
};

export const problemOrder: Problem[] = ['temperature', 'corrosion', 'fire', 'noise', 'access', 'assembly'];

export const products: Product[] = [
  // Cold and cryogenic
  { name: 'Foamglas blocks and pipe sections', cats: ['cold'], problems: ['temperature', 'corrosion'], img: 'foamglas-cryogenic.webp', alt: 'Cellular glass blocks, pipe sections and fittings', featured: true },
  { name: 'Cryogel Z', cats: ['cold'], problems: ['temperature'], note: 'Aerogel type, reusable and hydrophobic' },
  { name: 'PIR and PUR insulation', cats: ['cold'], problems: ['temperature', 'corrosion'] },
  { name: 'Armaflex elastomeric foam', cats: ['cold'], problems: ['temperature', 'corrosion'] },
  { name: 'Polystyrene', cats: ['cold'], problems: ['temperature'] },
  { name: 'Versi-Foam portable spray polyurethane', cats: ['cold'], problems: ['temperature', 'corrosion'], note: 'Low-GWP system', img: 'versi-foam-low-gwp.webp', alt: 'Versi-Foam two-part polyurethane system packs' },

  // Hot and high-temperature
  { name: 'Pyrogel XTE and XTF aerogel blankets', cats: ['hot', 'fire'], problems: ['temperature', 'fire'], img: 'pyrogel-xte-xtf.webp', alt: 'Aerogel blanket being fitted to a pipe', featured: true },
  { name: 'Pyrogel HPS', cats: ['hot'], problems: ['temperature'], img: 'aspen-aerogel-pyrogel-hps.webp', alt: 'Pyrogel HPS aerogel blanket' },
  { name: 'Pyrogel, cut to shape', cats: ['hot'], problems: ['temperature'], img: 'pyrogel-cut.webp', alt: 'Cut aerogel insulation sections' },
  { name: 'Rockwool slabs, blankets and pipe sections', cats: ['hot', 'fire'], problems: ['temperature', 'fire', 'noise'], img: 'rockwool-slabs.webp', alt: 'Rockwool insulation slabs', featured: true },
  { name: 'Ceramic insulation', cats: ['hot'], problems: ['temperature'] },
  { name: 'Perlite', cats: ['hot'], problems: ['temperature'] },
  { name: 'Thermobreak, with and without cladding', cats: ['hot'], problems: ['temperature'], img: 'thermobreak-tube.webp', alt: 'Thermobreak insulated tubes with foil cladding', featured: true },
  { name: 'Interam endothermic mat', cats: ['hot', 'fire'], problems: ['temperature', 'fire'], img: 'interam-endothermic-mat.webp', alt: 'Endothermic mat wrapped on ducting' },
  { name: 'Oven insulation', cats: ['hot'], problems: ['temperature'] },

  // Acoustic
  { name: 'Acoustic foams', cats: ['acoustic'], problems: ['noise'], img: 'ainsul-80.jpg', alt: 'Acoustic foam wedges' },
  { name: 'DeciDamp', cats: ['acoustic'], problems: ['noise'] },
  { name: 'Polyester blanket and Mylar tape', cats: ['acoustic'], problems: ['noise'] },
  { name: 'Soberfoam', cats: ['acoustic'], problems: ['noise'] },
  { name: 'Rockwool sound insulation', cats: ['acoustic'], problems: ['noise'] },
  { name: 'Subdue', cats: ['acoustic'], problems: ['noise'], note: 'Barrier product' },
  { name: 'Wavebar', cats: ['acoustic'], problems: ['noise'], note: 'Barrier product' },
  { name: 'Quadzero', cats: ['acoustic'], problems: ['noise'], note: 'Barrier product' },
  { name: 'Echohush', cats: ['acoustic'], problems: ['noise'], note: 'Barrier product' },
  { name: 'Soundlag', cats: ['acoustic'], problems: ['noise'], note: 'Barrier product' },
  { name: 'Silentstep', cats: ['acoustic'], problems: ['noise'], note: 'Barrier product' },
  { name: 'Soundmat', cats: ['acoustic'], problems: ['noise'], note: 'Barrier product' },

  // Fireproofing
  { name: 'Firemaster 550 board', cats: ['fire'], problems: ['fire'], note: 'Non-combustible. Approved by Energy Safe Victoria for gas installations' },

  // Cladding and jacketing
  { name: 'Aluminium, galvanised and stainless coil and sheet', cats: ['cladding'], problems: ['corrosion'] },
  { name: 'Colorbond coil and sheet', cats: ['cladding'], problems: ['corrosion'] },
  { name: 'Stucco-embossed, zinc-alum and coated stainless', cats: ['cladding'], problems: ['corrosion'], note: 'Coated stainless includes Tedlar and PTFE finishes' },

  // Banding and fixings
  { name: 'Stainless steel banding and clips, 304 and 316', cats: ['fixings'], problems: ['assembly'] },
  { name: 'Capstan clips and washers', cats: ['fixings'], problems: ['assembly'] },
  { name: 'Speed clips', cats: ['fixings'], problems: ['assembly'] },
  { name: 'Tie wire', cats: ['fixings'], problems: ['assembly'] },
  { name: 'Anchor pins', cats: ['fixings'], problems: ['assembly'] },
  { name: 'Screws and rivets', cats: ['fixings'], problems: ['assembly'] },
  { name: 'Hangers', cats: ['fixings'], problems: ['assembly'] },

  // Accessories and tapes
  { name: 'Butyl rubber sheet and tape', cats: ['accessories'], problems: ['corrosion', 'assembly'] },
  { name: 'Aluminium tape', cats: ['accessories'], problems: ['assembly'] },
  { name: 'Fibreglass tape and rope', cats: ['accessories'], problems: ['assembly'] },
  { name: 'Filament tape', cats: ['accessories'], problems: ['assembly'] },
  { name: 'Vapour barriers', cats: ['accessories'], problems: ['corrosion'] },
  { name: 'Sealants', cats: ['accessories'], problems: ['assembly'] },
  { name: 'Drain and inspection plugs', cats: ['accessories'], problems: ['access'] },
  { name: 'Rubber end caps', cats: ['accessories'], problems: ['temperature'] },

  // Mastics and adhesives
  { name: 'Mastic and adhesive range (Foster)', cats: ['mastics'], problems: ['assembly', 'corrosion'] },

  // Fabrics and removable covers
  { name: 'PTFE-coated cloth', cats: ['fabrics'], problems: ['access'] },
  { name: 'Silicone-coated fibreglass cloth', cats: ['fabrics'], problems: ['temperature', 'access'] },
  { name: 'Stainless stocking mesh', cats: ['fabrics'], problems: ['access'] },
  { name: 'Removable blankets and mats', cats: ['fabrics'], problems: ['access', 'temperature'], img: 'removable-mats.webp', alt: 'Removable insulation mats on plant equipment' },
  { name: 'Turbo covers and valve covers', cats: ['fabrics'], problems: ['access', 'temperature'] },
  { name: 'Removable exhaust mats', cats: ['fabrics'], problems: ['access', 'temperature'] },
  { name: 'Fabric expansion joints and bellows', cats: ['fabrics'], problems: ['temperature'], img: 'expansion-joint.webp', alt: 'Fabric expansion joint with Bellis branding' },

  // Pipe supports
  { name: 'Polyurethane pre-insulated pipe supports', cats: ['supports'], problems: ['temperature'] },
  { name: 'Foamglas pre-insulated pipe supports', cats: ['supports'], problems: ['temperature'] },
  { name: 'Cryogel Z pre-insulated pipe supports', cats: ['supports'], problems: ['temperature'] },

  // Specialty
  { name: 'Electrical heat tracing', cats: ['specialty'], problems: ['temperature'] },
  { name: 'Grill bricks', cats: ['specialty'], problems: [] },
  { name: 'Radome covers', cats: ['specialty'], problems: [] },
  { name: 'Anticorrosion wrap', cats: ['specialty'], problems: ['corrosion'] },
];

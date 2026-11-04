// Which picture shows which range, service and need. Every entry is a picture from the shared deck, chosen because
// its alt text names the thing (a range line, a service, a product). Two ranges have no deck picture: home shows the
// client's own range tiles for them (at 76px, inside the 120px limit); the products page shows a labelled placeholder.
import { pictures } from '../../content/demo-copy';
import tileMastics from '../../assets/own/tiles/mastics-adhesives.png';
import tileHeatTrace from '../../assets/own/tiles/electrical-heat-tracing.png';
import type { Picture } from './parts';

export type RangePic = { p: Picture; pos?: string; crop?: boolean };

export const RANGE_PIC: Record<string, RangePic | undefined> = {
  cold: { p: pictures.prod.foamglasCryo, pos: '30% 60%' },
  hot: { p: pictures.prod.rockwool },
  acoustic: { p: pictures.ainsul },
  fire: { p: pictures.prod.pyrogelXte, pos: '60% 40%' },
  cladding: { p: pictures.svc.customMetal, pos: '45% 50%' },
  banding: { p: pictures.prod.steelBanding, crop: true },
  accessories: { p: pictures.prod.rubber, pos: '70% 50%' },
  mastics: undefined,
  fabrics: { p: pictures.svc.expansion },
  supports: { p: pictures.prod.foamglas },
  specialty: undefined,
};

// The client's own range tiles (300 x 300, circle-cropped). Used only at 76px on home.
export const RANGE_TILE: Record<string, Picture> = {
  mastics: { src: tileMastics, w: 300, h: 300, alt: 'Sealant cartridges and tapes from the mastics range' },
  specialty: { src: tileHeatTrace, w: 300, h: 300, alt: 'Electrical heat tracing on a pipe valve' },
};

export const SERVICE_PIC: Record<string, RangePic> = {
  oilGas: { p: pictures.heroLng, pos: '40% 60%' },
  mining: { p: pictures.svc.mining },
  marine: { p: pictures.svc.marinePipe },
  commercial: { p: pictures.prod.versiFoam },
  cui: { p: pictures.corrosionPipe, pos: '4% 50%' },
  sheetMetal: { p: pictures.svc.sheetMetal, pos: '60% 50%' },
  manufactured: { p: pictures.svc.removableMats },
  estimating: { p: pictures.svc.technical, pos: '50% 35%' },
  maintenance: { p: pictures.svc.contract, pos: '50% 40%' },
};

// "Find by problem": each range is listed under a problem only where the deck's own words for that range name it
// (its title, lines or use, or the CUI service's list of remedies). The owner should confirm the mapping.
export const PROBLEM_RANGES: Record<string, string[]> = {
  Temperature: ['cold', 'hot', 'supports', 'specialty'],
  Corrosion: ['cold', 'cladding', 'accessories', 'specialty'],
  Fire: ['fire'],
  Noise: ['acoustic'],
  Access: ['fabrics'],
};

export const NEED_PIC: Record<string, RangePic> = {
  'Materials supply': { p: pictures.prod.pyrogelCut },
  Fabrication: { p: pictures.svc.sheetMetal, pos: '60% 50%' },
  'Installation or maintenance': { p: pictures.heroCrew, pos: '60% 30%' },
  Estimate: { p: pictures.svc.procurement },
};

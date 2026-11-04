// The shared picture pool for every demo: the client's own pictures only (owner ruling 2026-11-04: no generated pictures).
// Lead-owned. A demo imports from here and never copies files. Every picture is provenance "own" (data-provenance="own").
// `maxW` is the widest the file looks sharp on a 1440 px screen at 1x: do not scale a picture past it without a plan (crop, tint or a smaller frame).
import lngCarrier from './hero/banner-1.jpg';
import crewRoof from './hero/bellis-hard-hat.jpg';
import crewRoofSmall from './hero/bellis-hard-hat-1100.webp';
import crewRoofPhone from './hero/bellis-hard-hat-640.webp';
import acousticFoamSmall from './commercial/ainsul-80-640.webp';
import pyrogelCutSmall from './products/pyrogel-cut-640.webp';
import branchBuilding from './hero/site-photo-2016.jpg';
import acousticFoam from './commercial/ainsul-80.jpg';
import valvePipework from './services/contract-services.webp';
import rustedFlange from './services/corrosion-control-pipe.jpg';
import stainlessTanker from './services/custom-metal-jobs.webp';
import expansionJoint from './services/expansion-joint.webp';
import marinePipe from './services/marine-insulated-pipe.webp';
import miningPlant from './services/mining.webp';
import operator from './services/oil-gas-energy.webp';
import removableCovers from './services/removable-mats.webp';
import sheetMetalRolling from './services/sheet-metal-fabrication.webp';
import crewSign from './services/technical-support.webp';
import pyrogelHps from './products/aspen-aerogel-pyrogel-hps.webp';
import foamglasCryo from './products/foamglas-cryogenic.webp';
import foamglas from './products/foamglas.webp';
import interam from './products/interam-endothermic-mat.webp';
import needleFelt from './products/needle-felt.webp';
import perlite from './products/perlite.webp';
import pyrogelCut from './products/pyrogel-cut.webp';
import pyrogelXte from './products/pyrogel-xte-xtf.webp';
import rockwool from './products/rockwool-slabs.webp';
import rubber from './products/rubber-insulation.webp';
import banding from './products/steel-banding.webp';
import thermobreak from './products/thermobreak-tube.webp';
import versiFoam from './products/versi-foam-low-gwp.webp';
import logo from './brand/bellis-logo-horizontal.webp';
import favicon from './brand/bellis-favicon.png';
import cutRockwool from './cutouts/rockwool-slabs.webp';
import cutRubber from './cutouts/rubber-insulation.webp';
import cutFoamglas from './cutouts/foamglas-cryogenic.webp';

export type Pic = {
  id: string;
  src: string;
  w: number;
  h: number;
  alt: string;
  /** Widest on-screen width (CSS px, 1x) at which the file still looks sharp. Larger needs a crop or a tint. */
  maxW: number;
  kind: 'photo' | 'product' | 'cutout' | 'brand';
  /** How good it is as a hero or large picture. */
  grade: 'strong' | 'ok' | 'small-only';
};

const p = (id: string, src: string, w: number, h: number, alt: string, kind: Pic['kind'], grade: Pic['grade'], maxW = w): Pic => ({ id, src, w, h, alt, kind, grade, maxW });

export const pictures = {
  lngCarrier: p('lngCarrier', lngCarrier, 1920, 625, 'An LNG carrier with domed tanks alongside a coastal terminal', 'photo', 'strong'),
  crewRoof: p('crewRoof', crewRoof, 1633, 1224, 'Two workers in hi-vis and hard hats fitting metal cladding on a plant roof', 'photo', 'strong'),
  // The same photograph resized to 1100 px wide (about 60 KB) for first-screen use where it shows at 700 px or less.
  crewRoofSmall: p('crewRoofSmall', crewRoofSmall, 1100, 824, 'Two workers in hi-vis and hard hats fitting metal cladding on a plant roof', 'photo', 'strong', 1100),
  // Display-size copies for first-screen and phone use (the originals above stay for large display).
  crewRoofPhone: p('crewRoofPhone', crewRoofPhone, 640, 480, 'Two workers in hi-vis and hard hats fitting metal cladding on a plant roof', 'photo', 'strong', 640),
  acousticFoamSmall: p('acousticFoamSmall', acousticFoamSmall, 640, 480, 'Charcoal acoustic foam in a wedge pattern', 'photo', 'ok', 640),
  pyrogelCutSmall: p('pyrogelCutSmall', pyrogelCutSmall, 640, 470, 'Pyrogel aerogel blanket cut into tapering strips', 'product', 'ok', 640),
  branchBuilding: p('branchBuilding', branchBuilding, 1920, 1080, 'A Bellis branch building with the Bellis sign at the gate (photographed 2016)', 'photo', 'ok'),
  acousticFoam: p('acousticFoam', acousticFoam, 1024, 768, 'Charcoal acoustic foam in a wedge pattern', 'photo', 'ok'),
  valvePipework: p('valvePipework', valvePipework, 980, 656, 'Insulated pipework and a valve wheel against a blue sky', 'photo', 'strong'),
  rustedFlange: p('rustedFlange', rustedFlange, 1024, 298, 'A corroded flange with rust flaking off the steel', 'photo', 'strong'),
  stainlessTanker: p('stainlessTanker', stainlessTanker, 980, 735, 'A road tanker clad in polished stainless steel outside a workshop', 'photo', 'strong'),
  expansionJoint: p('expansionJoint', expansionJoint, 684, 372, 'A fabric expansion joint with red edging, stencilled BELLIS AUSTRALIA', 'photo', 'ok'),
  marinePipe: p('marinePipe', marinePipe, 500, 371, 'A removable insulation cover fitted over pipework and a flange in an engine room', 'photo', 'small-only'),
  miningPlant: p('miningPlant', miningPlant, 980, 735, 'A mineral processing plant under scaffold with a crane beside it', 'photo', 'ok'),
  operator: p('operator', operator, 980, 735, 'A worker in orange hi-vis beside process pipework and a pump', 'photo', 'ok'),
  removableCovers: p('removableCovers', removableCovers, 980, 735, 'Red removable insulation covers laid out in a row', 'photo', 'strong'),
  sheetMetalRolling: p('sheetMetalRolling', sheetMetalRolling, 980, 655, 'A rolling machine forming a stainless steel sheet in the workshop', 'photo', 'strong'),
  crewSign: p('crewSign', crewSign, 980, 735, 'Six workers in yellow hi-vis holding a Bellis sign beside insulated pipework', 'photo', 'ok'),
  pyrogelHps: p('pyrogelHps', pyrogelHps, 400, 267, 'Pyrogel HPS aerogel blanket wrapped on a pipe', 'product', 'small-only'),
  foamglasCryo: p('foamglasCryo', foamglasCryo, 980, 601, 'Foamglas cellular glass blocks, pipe sections and fittings on white', 'product', 'ok'),
  foamglas: p('foamglas', foamglas, 600, 450, 'Foamglas cellular glass blocks, elbows and tees on white', 'product', 'ok'),
  interam: p('interam', interam, 700, 500, 'Interam endothermic mat wrapped round ducts and taped with metal tape', 'product', 'ok'),
  needleFelt: p('needleFelt', needleFelt, 743, 538, 'A roll of white needle felt on a blue ground', 'product', 'ok'),
  perlite: p('perlite', perlite, 320, 214, 'Perlite insulation: a pipe section and two slabs', 'product', 'small-only'),
  pyrogelCut: p('pyrogelCut', pyrogelCut, 1000, 735, 'Pyrogel aerogel blanket cut into tapering strips', 'product', 'ok'),
  pyrogelXte: p('pyrogelXte', pyrogelXte, 642, 500, 'A worker in hi-vis wrapping a pipe elbow with insulation', 'product', 'ok'),
  rockwool: p('rockwool', rockwool, 510, 380, 'Three Rockwool slabs stacked on white', 'product', 'ok'),
  rubber: p('rubber', rubber, 743, 542, 'Black elastomeric rubber insulation: tubes and a rolled sheet', 'product', 'ok'),
  banding: p('banding', banding, 450, 450, 'A coil of steel banding', 'product', 'small-only'),
  thermobreak: p('thermobreak', thermobreak, 1000, 667, 'Thermobreak insulated tubes with foil facing around copper and steel pipe', 'product', 'strong'),
  versiFoam: p('versiFoam', versiFoam, 602, 338, 'Two Versi-Foam spray polyurethane drums, System 50, A and B', 'product', 'ok'),
  // Cut-outs of white-background product shots (derived from the client's images by the lead: flood-filled from the edges).
  // Use them on a flat colour; the soft shadow under a shape is part of the picture.
  cutRockwool: p('cutRockwool', cutRockwool, 510, 380, 'Three Rockwool slabs, cut out', 'cutout', 'ok'),
  cutRubber: p('cutRubber', cutRubber, 600, 441, 'Black rubber insulation tubes and rolled sheet, cut out', 'cutout', 'ok'),
  cutFoamglas: p('cutFoamglas', cutFoamglas, 720, 404, 'Foamglas blocks, pipe sections and fittings, cut out', 'cutout', 'ok'),
  // Brand. The logo is a 331 x 150 raster: black "b" and wordmark, blue (#0065A3) quarter-arc, transparent ground.
  // Show it at 165 px wide or less (2x). On a dark ground use a one-colour white knockout: filter: brightness(0) invert(1).
  logo: p('logo', logo, 331, 150, 'Bellis', 'brand', 'ok', 165),
  favicon: p('favicon', favicon, 32, 32, 'Bellis', 'brand', 'small-only', 32),
} as const satisfies Record<string, Pic>;

export type PicId = keyof typeof pictures;

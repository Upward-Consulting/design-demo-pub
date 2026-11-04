# Brief: Bellis Australia website, design v5

Source: `bellis-new/MANIFEST/README.md` (company dossier, 4 Nov 2026) and `bellis-new/assets/` (55 client images). Starting point: **Compose** (empty folder, no app to harvest).

1. **Business.** Brisbane-headquartered industrial mechanical insulation distributor, metal fabricator and installer. Five branches (Brisbane, Gladstone, Melbourne, Darwin, Perth), workshops in Brisbane and Gladstone. Sells to oil and gas, LNG, power, mining and minerals, marine and defence, and commercial kitchens and plant.
2. **Audience.** Engineers and specifiers, shutdown and maintenance planners, procurement managers and site supervisors. They arrive with a problem (heat loss, cold lines, noise, fire, corrosion under insulation), often on a deadline. Secondary: commercial building and kitchen contractors, marine and defence buyers.
3. **The one action.** "Talk to an expert": phone the nearest branch (1300 740 564 is the main line) or send an enquiry.
4. **Personality (proposed from the dossier's voice, §8.6).** Plain, technical, confident, safety-first, practical. **Never:** glossy start-up, vague "solutions" talk, green-wash, stock-photo corporate.
5. **Fixed by the brand.** The logo (black "b" with a blue quarter-arc and a heavy black "Bellis" wordmark; the blue sampled from the logo file is `#0065A3`). Real job-site photography. Nothing else is fixed: Open Sans and `#2EA3F2` are Divi theme defaults, not a brand decision.

## What really exists (the `--have` list)

- Photography: the client's own, of mixed quality. Strong: LNG carrier (1920×625), hi-vis crew on a plant roof (1633×1224), the Coopers Plains depot (1920×1080), tanker-sized stainless cladding, red removable covers, a "BELLIS AUSTRALIA" fabric expansion joint, insulated pipework, a rusted flange (1024×298), the sheet-metal rolling machine. Catalogue-style product shots on white (Foamglas, Rockwool, rubber, Thermobreak, Pyrogel, banding, needle felt, perlite) are usable as specimens.
- Weak, not to be used large: the 300×300 circle-cropped tiles, the calculator, the globe-and-boxes picture, the seedling picture, 240×360 marine bulkhead.
- No vector logo (331×150 WebP only). The logo is used at its native size or smaller, and a vector is an open request to the client.
- No video, no product UI, no illustration.

## Constraints

- WCAG 2.2 AA. The old site disables pinch-zoom; this one must not.
- English (Australia). No dark-mode requirement. Evergreen browsers (Chrome 105+ for `:has()` in demos).
- React 19 + Vite + TypeScript, no new dependencies beyond the scaffold (no router library, no animation library): CSS motion only.
- No invented business facts: copy comes from the dossier, gaps are `[placeholder]`. Proof is never sampled. The SPI ownership change is **not shown** until the client confirms it (open question in the dossier).

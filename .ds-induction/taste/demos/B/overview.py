import sys
from PIL import Image
src, out, cols, scale = sys.argv[1], sys.argv[2], int(sys.argv[3]), float(sys.argv[4])
im = Image.open(src).convert('RGB')
W, H = im.size
colH = (H + cols - 1) // cols
tiles = []
for c in range(cols):
    crop = im.crop((0, c * colH, W, min(H, (c + 1) * colH)))
    tiles.append(crop.resize((int(W * scale), int(crop.height * scale))))
cw = max(t.width for t in tiles) + 12
sheet = Image.new('RGB', (cw * cols, max(t.height for t in tiles)), (120, 120, 120))
for i, t in enumerate(tiles):
    sheet.paste(t, (i * cw, 0))
sheet.save(out)
print(sheet.size)

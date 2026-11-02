"""Encode genuine browser screenshot frames; no synthetic component artwork."""
import sys
from pathlib import Path
from PIL import Image

source, destination = Path(sys.argv[1]), Path(sys.argv[2])
frames = [Image.open(path).convert("RGB") for path in sorted(source.glob("*.png"))]
if not frames:
    raise SystemExit("No captured frames")
# One palette keeps the striped background stable between frames.
palette = frames[0].quantize(colors=128)
encoded = [frame.quantize(palette=palette, dither=Image.Dither.NONE) for frame in frames]
encoded[0].save(destination, save_all=True, append_images=encoded[1:], duration=100,
                loop=0, optimize=False, disposal=1)
print(f"Encoded {len(frames)} browser frames: {destination.name} ({destination.stat().st_size:,} bytes)")

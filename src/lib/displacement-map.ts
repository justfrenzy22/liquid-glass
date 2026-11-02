import { bevelSlope, roundedDistance } from "./surface-equations.js";
import { refractedOffset } from "./refraction.js";
import { rimLight } from "./specular.js";

export type GlassMaps = {
  displacement: string;
  highlight: string;
  width: number;
  height: number;
};
const cache = new Map<string, GlassMaps>();

/** Browser-only, lazily called after mount. At most 256×256 samples, 32 cached pairs. */
export function createGlassMaps(
  width: number,
  height: number,
  radius: number,
): GlassMaps | null {
  if (typeof document === "undefined" || width <= 0 || height <= 0) return null;
  const key = `${Math.round(width)}:${Math.round(height)}:${radius}`;
  const cached = cache.get(key);
  if (cached) {
    cache.delete(key);
    cache.set(key, cached);
    return cached;
  }
  const ratio = Math.min(1, 256 / Math.max(width, height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(2, Math.round(width * ratio));
  canvas.height = Math.max(2, Math.round(height * ratio));
  const context = canvas.getContext("2d");
  if (!context) return null;
  const vectors = context.createImageData(canvas.width, canvas.height);
  const lights = context.createImageData(canvas.width, canvas.height);
  const r = Math.min(radius, width / 2, height / 2);
  const bevel = Math.max(1, Math.min(20, Math.min(width, height) / 3));
  for (let row = 0; row < canvas.height; row++) {
    for (let col = 0; col < canvas.width; col++) {
      const x = ((col + 0.5) * width) / canvas.width;
      const y = ((row + 0.5) * height) / canvas.height;
      const distance = roundedDistance(x, y, width, height, r);
      const gx =
        roundedDistance(x + 0.5, y, width, height, r) -
        roundedDistance(x - 0.5, y, width, height, r);
      const gy =
        roundedDistance(x, y + 0.5, width, height, r) -
        roundedDistance(x, y - 0.5, width, height, r);
      const length = Math.hypot(gx, gy) || 1;
      const nx = gx / length;
      const ny = gy / length;
      const inset = Math.max(0, -distance);
      // Normalize against the bounded maximum slope of our superellipse bevel.
      const bend =
        distance <= 0
          ? refractedOffset(bevelSlope(inset / bevel), 1) /
            refractedOffset(32, 1)
          : 0;
      const offset = (row * canvas.width + col) * 4;
      vectors.data[offset] = Math.round(127.5 - nx * bend * 127.5);
      vectors.data[offset + 1] = Math.round(127.5 - ny * bend * 127.5);
      vectors.data[offset + 2] = 128;
      vectors.data[offset + 3] = 255;
      lights.data[offset] =
        lights.data[offset + 1] =
        lights.data[offset + 2] =
          255;
      lights.data[offset + 3] =
        distance <= 0 ? Math.round(255 * rimLight(nx, ny, inset)) : 0;
    }
  }
  context.putImageData(vectors, 0, 0);
  const displacement = canvas.toDataURL("image/png");
  context.putImageData(lights, 0, 0);
  const result = {
    displacement,
    highlight: canvas.toDataURL("image/png"),
    width,
    height,
  };
  cache.set(key, result);
  if (cache.size > 32) cache.delete(cache.keys().next().value!);
  return result;
}

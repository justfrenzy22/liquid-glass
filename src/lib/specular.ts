/** A fixed upper-left light and a narrow rim; no animated light loop. */
export function rimLight(nx: number, ny: number, edgeDistance: number) {
  const facingLight = Math.max(0, (-nx - ny) / Math.SQRT2);
  return (
    Math.exp(-Math.max(0, edgeDistance) / 1.8) *
    (0.12 + 0.88 * facingLight ** 4)
  );
}

/** Analytic slope of a fourth-power superellipse bevel, flat at the interior. */
export function bevelSlope(progress: number) {
  const remaining = 1 - Math.max(0.002, Math.min(1, progress));
  return Math.min(32, remaining ** 3 / (1 - remaining ** 4) ** 0.75);
}

/** Signed distance to a rounded rectangle, negative inside. */
export function roundedDistance(
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  const qx = Math.abs(x - width / 2) - width / 2 + radius;
  const qy = Math.abs(y - height / 2) - height / 2 + radius;
  return (
    Math.hypot(Math.max(qx, 0), Math.max(qy, 0)) +
    Math.min(Math.max(qx, qy), 0) -
    radius
  );
}

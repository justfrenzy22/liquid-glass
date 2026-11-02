/** Snell's law expressed as angles for a vertical incident ray. */
export function refractedOffset(slope: number, thickness: number, index = 1.5) {
  const incidence = Math.atan(slope);
  const transmission = Math.asin(Math.sin(incidence) / index);
  return Math.tan(incidence - transmission) * thickness;
}

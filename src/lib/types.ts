export type GlassConfig = {
  /** CSS pixels, clamped to 0–30. */
  blur?: number;
  /** White tint alpha, 0–1. */
  opacity?: number;
  radius?: number;
  /** Optical travel distance in CSS pixels, 0–120. */
  thickness?: number;
  /** Optical strength, 0–1; zero disables displacement. */
  refraction?: number;
  specularIntensity?: number;
  /** Saturation multiplier, 0–2. */
  saturation?: number;
  /** Additional displacement multiplier, 0–2. */
  displacementStrength?: number;
  /** Auto selects desktop Chromium refraction or compatible CSS glass.
   * Compatible forces the Safari/mobile finish; fallback keeps basic blur. */
  mode?: "auto" | "compatible" | "fallback";
};

export const glassDefaults: Required<GlassConfig> = {
  blur: 3,
  opacity: 0.64,
  radius: 24,
  thickness: 60,
  refraction: 0.7,
  specularIntensity: 0.4,
  saturation: 1,
  displacementStrength: 1,
  mode: "auto",
};

export function clamp(
  value: number | undefined,
  fallback: number,
  min: number,
  max: number,
) {
  return Number.isFinite(value)
    ? Math.min(max, Math.max(min, value!))
    : fallback;
}

export function resolveGlassConfig(config: GlassConfig): Required<GlassConfig> {
  return {
    blur: clamp(config.blur, glassDefaults.blur, 0, 30),
    opacity: clamp(config.opacity, glassDefaults.opacity, 0, 1),
    radius: clamp(config.radius, glassDefaults.radius, 0, 160),
    thickness: clamp(config.thickness, glassDefaults.thickness, 0, 120),
    refraction: clamp(config.refraction, glassDefaults.refraction, 0, 1),
    specularIntensity: clamp(
      config.specularIntensity,
      glassDefaults.specularIntensity,
      0,
      1,
    ),
    saturation: clamp(config.saturation, glassDefaults.saturation, 0, 2),
    displacementStrength: clamp(
      config.displacementStrength,
      glassDefaults.displacementStrength,
      0,
      2,
    ),
    mode: config.mode ?? glassDefaults.mode,
  };
}

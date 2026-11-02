import type { GlassMaps } from "../lib/displacement-map.js";
import type { GlassConfig } from "../lib/types.js";
import { refractedOffset } from "../lib/refraction.js";
import styles from "./liquid-glass.module.css";

export function GlassFilter({
  id,
  maps,
  config,
}: {
  id: string;
  maps: GlassMaps;
  config: Required<GlassConfig>;
}) {
  const scale =
    refractedOffset(32, config.thickness) *
    config.refraction *
    config.displacementStrength;
  return (
    <svg className={styles.definitions} aria-hidden="true" focusable="false">
      <defs>
        <filter
          id={id}
          filterUnits="objectBoundingBox"
          primitiveUnits="userSpaceOnUse"
          x="-30%"
          y="-30%"
          width="160%"
          height="160%"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur
            in="SourceGraphic"
            stdDeviation={config.blur}
            result="soft"
          />
          <feImage
            href={maps.displacement}
            x={0}
            y={0}
            width={maps.width}
            height={maps.height}
            preserveAspectRatio="none"
            result="vectors"
          />
          <feDisplacementMap
            in="soft"
            in2="vectors"
            scale={scale}
            xChannelSelector="R"
            yChannelSelector="G"
            result="bent"
          />
          <feColorMatrix
            in="bent"
            type="saturate"
            values={String(config.saturation)}
            result="tinted"
          />
          <feImage
            href={maps.highlight}
            x={0}
            y={0}
            width={maps.width}
            height={maps.height}
            preserveAspectRatio="none"
            result="rim"
          />
          <feComponentTransfer in="rim" result="light">
            <feFuncA type="linear" slope={config.specularIntensity} />
          </feComponentTransfer>
          <feBlend in="tinted" in2="light" mode="screen" />
        </filter>
      </defs>
    </svg>
  );
}

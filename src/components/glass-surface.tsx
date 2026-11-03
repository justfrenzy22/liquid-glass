"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type ComponentPropsWithRef,
} from "react";
import {
  createGlassMaps,
  type GlassMaps,
} from "../lib/displacement-map.js";
import { resolveGlassConfig, type GlassConfig } from "../lib/types.js";
import { GlassFilter } from "./glass-filter.js";
import { useGlassEnvironment, useGlassRenderMode } from "./glass-rendering.js";
import { selectGlassRenderer } from "../lib/environment.js";
import styles from "./liquid-glass.module.css";

export type GlassSurfaceProps = ComponentPropsWithRef<"div"> & GlassConfig;
type GlassStyle = CSSProperties & Record<`--glass-${string}`, string | number>;

export function GlassSurface({
  blur,
  opacity,
  radius,
  thickness,
  refraction,
  specularIntensity,
  saturation,
  displacementStrength,
  mode,
  children,
  className = "",
  style,
  ref,
  onPointerMove,
  onPointerLeave,
  ...props
}: GlassSurfaceProps) {
  const inheritedMode = useGlassRenderMode();
  const environment = useGlassEnvironment();
  const config = resolveGlassConfig({
    blur,
    opacity,
    radius,
    thickness,
    refraction,
    specularIntensity,
    saturation,
    displacementStrength,
    mode: mode ?? inheritedMode,
  });
  const layerRef = useRef<HTMLDivElement>(null);
  const id = `glass-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const [maps, setMaps] = useState<GlassMaps | null>(null);
  const [mapFailed, setMapFailed] = useState(false);
  const preferredRenderer = selectGlassRenderer(config.mode, environment);
  const renderer =
    mapFailed && preferredRenderer === "refraction"
      ? "compatible"
      : preferredRenderer;
  const enhanced = renderer === "refraction" && maps !== null;
  const activeRenderer =
    renderer === "refraction" && !enhanced ? "compatible" : renderer;
  useEffect(() => {
    const layer = layerRef.current;
    if (!layer || renderer !== "refraction") return;
    let timer: ReturnType<typeof setTimeout>;
    const update = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        // Maps use local CSS coordinates, unaffected by an animated scale transform.
        const width = layer.offsetWidth;
        const height = layer.offsetHeight;
        try {
          setMaps(createGlassMaps(width, height, config.radius));
        } catch {
          setMaps(null);
          setMapFailed(true);
        } // Canvas unavailable: use compatible CSS glass.
      }, 80);
    };
    update();
    const observer =
      typeof ResizeObserver !== "undefined" ? new ResizeObserver(update) : null;
    observer?.observe(layer);
    return () => {
      clearTimeout(timer);
      observer?.disconnect();
    };
  }, [renderer, config.radius]);
  const variables: GlassStyle = {
    "--glass-radius": `${config.radius}px`,
    "--glass-blur": `${config.blur}px`,
    "--glass-opacity": config.opacity,
    "--glass-specular": config.specularIntensity,
    "--glass-saturation": config.saturation,
    "--glass-compatible-blur": `${Math.max(config.blur, environment?.device === "desktop" ? 2.5 : 1.5)}px`,
    "--glass-compatible-saturation": Math.max(config.saturation, 1.25),
    ...style,
  };
  return (
    <div
      {...props}
      data-liquid-glass=""
      ref={ref}
      className={`${styles.surface} ${className}`}
      style={variables}
      data-glass-mode={activeRenderer}
      data-glass-device={environment?.device ?? "unknown"}
      data-glass-browser={environment?.browser ?? "unknown"}
      onPointerMove={(event) => {
        onPointerMove?.(event);
        if (activeRenderer !== "compatible" || event.defaultPrevented) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        if (!bounds.width || !bounds.height) return;
        const x = Math.max(
          0,
          Math.min(100, ((event.clientX - bounds.left) / bounds.width) * 100),
        );
        const y = Math.max(
          0,
          Math.min(100, ((event.clientY - bounds.top) / bounds.height) * 100),
        );
        event.currentTarget.style.setProperty("--glass-light-x", `${x}%`);
        event.currentTarget.style.setProperty("--glass-light-y", `${y}%`);
      }}
      onPointerLeave={(event) => {
        onPointerLeave?.(event);
        event.currentTarget.style.removeProperty("--glass-light-x");
        event.currentTarget.style.removeProperty("--glass-light-y");
      }}
    >
      {enhanced && <GlassFilter id={id} maps={maps} config={config} />}
      <div
        ref={layerRef}
        className={styles.backdrop}
        aria-hidden="true"
        style={enhanced ? { backdropFilter: `url("#${id}")` } : undefined}
      />
      {activeRenderer === "compatible" && (
        <div className={styles.reflections} aria-hidden="true">
          <span className={styles.reflectionTop} />
          <span className={styles.reflectionBottom} />
        </div>
      )}
      <div className={styles.content} data-slot="glass-content">{children}</div>
    </div>
  );
}

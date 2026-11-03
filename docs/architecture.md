# Architecture and browser behavior

`src/lib/` contains geometry, refraction, map generation, defaults and environment selection. `src/components/` contains native primitives, the rendering provider, CSS modules and HeroUI wrappers. The main entry `src/index.ts` exposes the Liquid collection. Matching Glass names are aliases of the enhanced components. `src/heroui.ts` remains a compatibility entry; `src/native.ts` explicitly preserves the previous native API. Browser export conditions select generated wrappers that import `styles.css`; Node selects CSS-free entries for direct server rendering.

GlassSurface renders an absolutely positioned decoration layer and separate sharp content. Supported desktop Chromium uses local SVG backdrop filters and canvas-generated displacement/specular maps. A rounded-rectangle signed-distance field supplies normals; an analytic superellipse bevel and an angle-based Snell-law calculation approximate displacement. This is not a full physical renderer: it omits exit refraction, chromatic aberration, perspective and real environment reflections.

Maps are generated after mount, capped at 256 pixels on the longest dimension, cached with a bounded LRU and debounced after resizing. SSR uses basic CSS. Canvas failure returns to compatible rendering. No network textures or page capture are involved.

Compatible rendering uses native backdrop blur, controlled tint, a beveled rim, corner glints and curved highlight bands. Pointer movement updates decorative CSS variables; reduced motion freezes the reflection movement. This simulates reflected light without distorting arbitrary live background content. It creates no SVG backdrop filters or displacement canvases. Safari's filter limitations are tracked in [WebKit issue 297770](https://bugs.webkit.org/show_bug.cgi?id=297770).

Browser/device selection is conservative. URL syntax support alone does not prove SVG backdrop rendering works. Phones/tablets use compatible rendering. Macintosh UAs with multiple touch points identify likely iPadOS; optional client hints are used if available. CSS handles responsive layout independently.

Explicit per-surface modes override the provider. React context crosses portals, so overlays use the same selected renderer. Browsers without native blur get an opaque fallback. Forced colors suppress decorations.

HeroUI supplies state, semantics and accessible interactions. Custom pointer capture keeps switch/tab lenses moving continuously; semantic selection is committed on release. Keyboard selection remains available.

The build emits ESM, shared chunks, compiled CSS and TypeScript declarations with relative `.js` references. Every generated JS chunk preserves `"use client"` for Next.js. Dependencies are external imports, resolved by npm. Styles are scoped to library surfaces; no host Tailwind pipeline is required.

HeroUI 3.2.6 and its verified React Aria versions are pinned. Fresh newer React Aria peers exposed incompatible APIs during extraction. Upgrade these together and run types, SSR/archive checks and browser tests before changing the pins.

Text inherits the host application color. Neutral fills follow system or explicit light/dark theme markers. Applications should review contrast on their own backgrounds. Navigation uses ordinary links; router integration, uploads, storage, authentication and data loading belong to the application.

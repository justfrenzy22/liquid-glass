# Research notes: liquid glass interfaces in React

This document explains the questions, references and engineering decisions behind Liquid Glass. It is an implementation study, not a peer-reviewed paper, a controlled usability study or a claim of equivalence to Apple's materials.

Scope: the `0.1.1` implementation. External references were reviewed on 3 November 2026. Browser behavior can change after this review.

## Research questions

1. How can a web control suggest curved, refractive glass while keeping its label readable?
2. What visual treatment remains practical when SVG backdrop filtering is unavailable?
3. How can direct manipulation coexist with ordinary keyboard and semantic control behavior?
4. What costs and limitations should applications evaluate before adopting the effect?

## Method and evidence

The work combined reference reading, iterative implementation, visual inspection of the browser consumer fixture, automated interaction tests and clean package-consumer checks. These methods answer different questions: source inspection explains the mechanism, screenshots show particular scenes, and interaction tests check selected behaviors. None establishes universal browser compatibility or improved usability.

The earlier CodeDrive research log recorded inspection of Kube's article implementation at commit [`bd091c537fd502f2d1d4d60817e6f05626508e6b`](https://github.com/kube/kube.io/tree/bd091c537fd502f2d1d4d60817e6f05626508e6b/app/data/articles/2025_10_04_liquid_glass_css_svg). That is a historical reference point, not a dependency or a claim about the current upstream tree. This revised note replaces the file-by-file inventory with questions and decisions relevant to users of the standalone library.

## Reference findings

| Reference | Contribution | Boundary |
| --- | --- | --- |
| [Kube: Liquid Glass in the Browser](https://kube.io/blog/liquid-glass-css-svg/) | Demonstrates surface-dependent refraction, SVG displacement and highlights in interactive web experiments. | A visual and conceptual reference, not a general component library or a browser-support guarantee. |
| [W3C Filter Effects: displacement maps](https://www.w3.org/TR/filter-effects-1/#feDisplacementMapElement) | Defines how channel values determine displacement. | Defines filter semantics; does not establish support for every backdrop-filter composition. |
| [WebKit issue 297770](https://bugs.webkit.org/show_bug.cgi?id=297770) | Records an SVG-filter/backdrop-filter interaction problem and implementation discussion. | A specific issue, not proof that every SVG filter or all Safari versions behave identically. |
| [Library architecture](architecture.md) and the source linked below | Describe what this implementation actually does. | Local evidence about the library, not independent validation of its quality. |

Kube is credited as an influence. This research note does not reproduce upstream code or imagery or grant a license to it. For this repository's attribution and dependency notices, see [THIRD_PARTY_NOTICES.md](../THIRD_PARTY_NOTICES.md).

## Decisions and rationale

### Separate optical decoration from content

[`GlassSurface`](../src/components/glass-surface.tsx) puts the backdrop and highlights beneath a separate content layer. This lets the background bend while text stays sharp. It also lets controls share a visual material without sharing every interaction implementation.

The core entry supplies native React controls. The `/heroui` entry combines the material with HeroUI components and custom interaction styling. HeroUI supplies component behavior and semantics; it is not the source of the refraction renderer. Using it does not by itself establish that every resulting composition is accessible.

### Approximate refraction on supported desktop Chromium

The geometry uses a rounded-rectangle signed-distance function and a fourth-power superellipse bevel. [`refraction.ts`](../src/lib/refraction.ts) calculates an offset from the bevel slope using an angle-based Snell-law approximation. [`displacement-map.ts`](../src/lib/displacement-map.ts) encodes the horizontal and vertical offsets into red and green channels. [`GlassFilter`](../src/components/glass-filter.tsx) combines blur, displacement, saturation and a rim highlight.

This is a screen-space approximation. It does not model a complete glass volume, exit refraction, perspective, dispersion, scene lighting or reflections of the surrounding physical environment. Parameters such as thickness are artistic controls, not calibrated measurements of a real material.

### Offer a distinct compatible renderer

The library's [`environment selection`](../src/lib/environment.ts) conservatively chooses refraction for eligible desktop Chromium environments. Phones, tablets and other browsers use a compatible finish when native backdrop blur is available. Before client detection, or without blur support, it selects the basic fallback.

The compatible finish combines blur, tint, a beveled rim, curved highlight bands and pointer-responsive light placement. Those highlights are simulated reflections. They do not refract arbitrary live content behind the control. This distinction matters when comparing screenshots across browsers.

User-agent and capability checks are heuristics. Accepting a CSS URL syntax does not prove that the filter renders correctly. Applications can force `mode="compatible"` or `mode="fallback"` rather than depending entirely on detection.

### Preserve direct manipulation and calmer alternatives

The native slider retains a range input while its decorative thumb expands during interaction. HeroUI switch and tab lenses use [`pointer capture`](../src/components/use-glass-drag.ts) to track a draft position and commit semantic selection on release. Keyboard behavior remains part of the underlying control implementation.

Normal buttons, solid cards and alternating-row Finder-style tables offer alternatives for dense interfaces. Their inclusion follows design feedback during development. It is not evidence that they reduce overstimulation or improve task performance; that would require user research.

### Bound map generation rather than claim a performance target

Maps are generated after mount, capped at 256 pixels along the longest dimension and stored in a 32-entry LRU cache. Geometry updates use an 80 ms resize debounce. Compatible rendering avoids displacement canvases. Reduced-motion and forced-colors CSS alter decorative behavior.

These are implementation safeguards. No published frame-time, battery, memory or device-scale benchmark currently establishes how many simultaneous glass surfaces an application can afford.

## Reproduce the current checks

From a checkout of the library:

```sh
npm ci
npm run check
npx playwright install chromium webkit
npm run test:browser
npm run pack:local
npm run verify:package
```

`check` builds the package, checks types, runs four package/SSR/environment tests and builds the browser consumer fixture. Browser tests run one consumer scenario in each of Chromium, desktop WebKit and iPhone-emulated WebKit. They check selected interactions, overlay dismissal, styling, rendering-mode overrides and horizontal overflow. The archive check installs the packed library into a separate consumer and verifies exports, server rendering, CSS and shared React/Aria resolution.

See [`tests/`](../tests/) for the actual assertions. Passing them does not establish coverage of every exported component, every drag gesture or every accessibility requirement. WebKit emulation is not a physical iPhone or the Safari application.

For visual comparison, run `npm run build` followed by `npm run test:serve` and use the rendering selector. Keep viewport, background, control dimensions and parameter values constant when switching modes. A striped background reveals displacement; gradients reveal tint and highlights; text behind a surface helps expose excessive distortion. Compare static, hover, pressed and drag states separately.

Actual captured examples are in the [README](../README.md#see-it-move). The original capture tooling was removed in `0.1.1`; the retained images document earlier captures. Captures illustrate particular scenes; there is no automated perceptual-similarity score.

## Limitations and follow-up research

- Test physical iPhones, iPads and Macs, recording OS/browser versions, hardware and rendering mode.
- Measure frame-time percentiles, map rebuild cost and memory for increasing surface counts and sizes; compare against ordinary controls.
- Audit keyboard, focus, screen-reader output, zoom, reduced motion and forced colors across representative components.
- Evaluate text contrast on light, dark, patterned and moving backgrounds. The current theme is light; blur does not guarantee sufficient contrast.
- Run task-based user studies before claiming improved clarity, preference or reduced distraction. Record the task, participants, baseline and measures.
- Revisit browser-selection heuristics as implementations change, while retaining explicit rendering overrides.

For now, the supported conclusion is narrow: the library implements two different glass treatments and passes the documented checks. Broad accessibility, usability and performance claims remain open questions.

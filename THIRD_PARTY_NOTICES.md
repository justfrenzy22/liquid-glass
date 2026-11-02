# Third-party notices

The MIT license here covers this repository's independently authored source. It does not replace dependency licenses.

| Dependency/reference | Role | License/attribution |
| --- | --- | --- |
| React and React DOM | Rendering, hooks, hydration | MIT; Meta Platforms, Inc. and affiliates |
| HeroUI React and styles | Components and control behavior | MIT; HeroUI contributors |
| React Aria, React Aria Components, React Stately | Accessible interactions and state | Apache-2.0; Adobe |
| `@internationalized/date` | Calendar-aware dates | Apache-2.0; Adobe |
| `input-otp` | OTP behavior through HeroUI | MIT; upstream contributors |
| esbuild, TypeScript, Vite, Playwright | Development/build/test tooling | Upstream licenses apply; tooling is not bundled into the consumer library |

Dependencies are installed by npm and retain their license files and notices. JavaScript builds externalize them rather than copying their implementations into the library bundle.

Kube's [Liquid Glass article](https://kube.io/blog/liquid-glass-css-svg/) and accompanying research informed the visual and optical approach. No Kube source, images, fonts or other assets are included. This repository is not affiliated with Kube, HeroUI or Adobe.

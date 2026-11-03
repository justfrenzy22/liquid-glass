# Changelog

## 0.2.0

- Expose the full Liquid component collection from the main package entry.
- Make matching Glass Button, Switch, Slider, Input, Search, Card, Toolbar, Navbar and Sidebar names aliases of the same enhanced designs and props.
- Preserve previous native APIs under `/native`. Existing `/heroui` imports remain supported.
- Update overlapping guides and add migration/native API documentation.

Breaking change: root Glass aliases now use the corresponding Liquid props. Use `/native` to retain the previous native event and value APIs.

## 0.1.4

- Add a Markdown guide for every public component, with examples and prop references, plus React/Next.js setup, theme and troubleshooting instructions.

- Load library styles automatically from browser component imports while preserving CSS-free Node server rendering.
- Inherit host text colors for controls, inputs and glass surfaces instead of forcing dark text.
- Add system light/dark neutral fills and explicit ancestor theme overrides, with configurable foreground, muted and accent-label tokens.
- Verify automatic styles and light/dark theme changes in Chromium and desktop/mobile WebKit.

## 0.1.3

- Add `GlassEmptyState` and its `LiquidEmptyState` alias for empty folders, no search results and first-use screens, with a title, description, decorative icon and custom action slots.
- Restore the useful README navigation links with plain ASCII separators.
- Keep the obsolete local-demo link removed. Existing component APIs are unchanged.

## 0.1.2

- Remove the README navigation strip and obsolete local-demo link.
- Repair corrupted punctuation in the README. Component APIs and runtime behavior are unchanged.

## 0.1.1

- Release the components as a consumer-only package with compiled ESM, CSS and TypeScript declarations.
- Exclude repository scripts, development dependency metadata, test fixtures and demo tooling from the release archive.
- Remove the public demo application and `dev` command. Retain an internal consumer fixture for browser regression checks.
- Keep the existing core and `/heroui` imports, friendly component names and compatibility aliases.
- Rewrite installation documentation for use in an existing React application; retain screenshots and research on GitHub.

Requires React 19. This patch changes packaging and documentation; it does not claim new browser capabilities or a completed accessibility audit.

## 0.1.0

- Initial public release of native glass primitives, HeroUI wrappers and browser-specific rendering modes.

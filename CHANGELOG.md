# Changelog

## 0.3.2

- Remove the fixed 160px minimum width from text buttons; labels determine width with consistent padding.
- Support `type="icon"` and `isIconOnly` for square, centered icon actions across normal, glass and colored finishes. Preserve submit/reset semantics with `isIconOnly`.

## 0.3.1

- Remove the mandatory Done action from LiquidModal. No footer is rendered unless supplied.
- Add custom footer and body render functions receiving `close()`, controlled open state, `onClose`, dismissal options and per-part classes.
- Keep the accessible header close button by default, with an option to hide it.

## 0.3.0

- Author layout, spacing and typography in all 14 component style modules with Tailwind CSS 4, while retaining custom optical CSS.
- Require Tailwind CSS 4 as a peer dependency. Continue shipping automatic, precompiled styles without Preflight.
- Place defaults in cascade layers so application Tailwind utilities can override them. Namespace internal Tailwind tokens.
- Add Button, Navbar and Sidebar `classNames` slots and export `cn()` for composing custom components.
- Export optional `tailwind.css` theme utilities and `tokens.css`; document installation, customization and dependency checks.

## 0.2.3

- Add Sidebar `header`, `actions` and custom `children` slots alongside the existing footer.
- Make navigation `items` optional for fully custom or loading sidebars.
- Add root `style` support and a bounded, scrollable body so fixed-height sidebars keep top actions and footer in place.
- Document skeleton-above-action composition and update the New Folder recipe.

## 0.2.2

- Add `brandIcon` and `brandHref` to the navbar for an automatically aligned icon/text brand and optional brand link.
- Preserve custom JSX, SVG, images and styled text through the existing `brand` prop.
- Document all brand options for LiquidNavbar and its GlassNavbar alias, including accessible icon-only brands and custom links.

## 0.2.1

- Hide the sidebar heading by default. Set `heading` explicitly to show one.
- Omit empty title rows, preserve the collapse control, and keep an accessible navigation label without visible text.
- Update both Sidebar guides and examples to show the heading as opt-in.

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

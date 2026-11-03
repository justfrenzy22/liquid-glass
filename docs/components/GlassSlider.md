# GlassSlider

The same component as LiquidSlider, with identical props and liquid design. This name is an alias, not a simpler visual variant.

## Example

```tsx
"use client";

import { GlassSlider } from "@justfrenzy/liquid-glass";

export function GlassSliderExample() {
  return (
    <GlassSlider label="Volume" defaultValue={40} onChange={(value) => console.log(value)} />
  );
}
```

Browser imports load styling automatically. For Next.js, keep interactive state and handlers inside a client component. See [getting started](../getting-started.md).

## Props

The table includes the component-specific props and common control props. Required means the TypeScript prop must be supplied; accessibility may also require a visible label or `aria-label`. Additional inherited DOM/HeroUI props are available through the shipped declarations.

| Prop | Required | Type | Notes |
| --- | --- | --- | --- |
| `style` | No | `StyleOrFunction<SliderRenderProps>` | The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element. A function may be provided to compute the style based on component state. |
| `step` | No | `number` | The slider's step value. |
| `defaultValue` | No | `number \| number[]` | The default value (uncontrolled). |
| `className` | No | `ClassNameOrFunction<SliderRenderProps>` | The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element. A function may be provided to compute the class based on component state. |
| `aria-label` | No | `string` | Defines a string value that labels the current element. |
| `onChange` | No | `(value: number \| number[]) => void` | Handler that is called when the value changes. |
| `onClick` | No | `MouseEventHandler<HTMLDivElement>` |  |
| `isDisabled` | No | `boolean` | Whether the whole Slider is disabled. |
| `value` | No | `number \| number[]` | The current value (controlled). |
| `minValue` | No | `number` | The slider's minimum value. |
| `maxValue` | No | `number` | The slider's maximum value. |
| `label` | Yes | `string` |  |
| `glass` | No | `GlassConfig` |  |
| `forceActive` | No | `boolean` |  |


## Shared design

See [LiquidSlider](LiquidSlider.md) for the main usage guide. Import either name from the package root; they render exactly the same component. Choose normal, glass or colored appearance through props where supported, not by switching prefixes. For the previous native API, explicitly import from `@justfrenzy/liquid-glass/native`.

## TypeScript

```tsx
import type { ComponentProps } from "react";
import { GlassSlider } from "@justfrenzy/liquid-glass";
type Props = ComponentProps<typeof GlassSlider>;
```

Text follows the host application color. Theme markers and foreground overrides are documented in [getting started](../getting-started.md#themes). Glass controls accept either a `glass` configuration or direct surface props as listed above; these are not interchangeable.

[All component guides](README.md)

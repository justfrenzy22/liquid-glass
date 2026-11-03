# LiquidForm

A form container with HeroUI validation support. You supply fields and submission behavior.

## Example

```tsx
"use client";

import { LiquidForm } from "@justfrenzy/liquid-glass/heroui";

export function LiquidFormExample() {
  return (
    <LiquidForm onSubmit={(event) => { event.preventDefault(); console.log(new FormData(event.currentTarget)); }}><label>Name <input name="name" required /></label><button type="submit">Save</button></LiquidForm>
  );
}
```

Browser imports load styling automatically. For Next.js, keep interactive state and handlers inside a client component. See [getting started](../getting-started.md).

## Props

The table includes the component-specific props and common control props. Required means the TypeScript prop must be supplied; accessibility may also require a visible label or `aria-label`. Additional inherited DOM/HeroUI props are available through the shipped declarations.

| Prop | Required | Type | Notes |
| --- | --- | --- | --- |
| `className` | No | `string` | The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element. |
| `onSubmit` | No | `(event: FormEvent<HTMLFormElement>) => void` | Triggered when a user submits the form. |
| `onReset` | No | `(event: FormEvent<HTMLFormElement>) => void` | Triggered when a user resets the form. |
| `aria-label` | No | `string` | Defines a string value that labels the current element. |
| `children` | No | `ReactNode` | The children of the component. |
| `style` | No | `CSSProperties` | The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element. |
| `onClick` | No | `MouseEventHandler<HTMLFormElement>` |  |


## Submission

Use `event.preventDefault()` for client-side submission and read `new FormData(event.currentTarget)`. Replace the logging with your own validation and API call. Fields need `name` values to appear in FormData. A library form does not create folders or persist data.

## TypeScript

```tsx
import type { ComponentProps } from "react";
import { LiquidForm } from "@justfrenzy/liquid-glass/heroui";
type Props = ComponentProps<typeof LiquidForm>;
```

Text follows the host application color. Theme markers and foreground overrides are documented in [getting started](../getting-started.md#themes). Glass controls accept either a `glass` configuration or direct surface props as listed above; these are not interchangeable.

[All component guides](README.md)

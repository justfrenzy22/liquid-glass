"use client";

import { useRef, useState, type MouseEvent, type PointerEvent } from "react";

/** Keep the decorative lens under the pointer; commit semantic state on release. */
export function useGlassDrag({
  value,
  min = 0,
  max,
  disabled,
  pixelsPerUnit,
  onCommit,
  onTap,
}: {
  value: number;
  min?: number;
  max: number;
  disabled?: boolean;
  pixelsPerUnit: (width: number) => number;
  onCommit: (value: number) => void;
  onTap: (clientX: number, bounds: DOMRect) => void;
}) {
  const [draft, setDraft] = useState<number | null>(null);
  const gesture = useRef<{
    id: number;
    x: number;
    value: number;
    unit: number;
    moved: boolean;
    bounds: DOMRect;
  } | null>(null);
  const position = (clientX: number) => {
    const current = gesture.current!;
    return Math.max(
      min,
      Math.min(max, current.value + (clientX - current.x) / current.unit),
    );
  };
  const cancel = () => {
    gesture.current = null;
    setDraft(null);
  };
  return {
    draft,
    handlers: {
      onPointerDown(event: PointerEvent<HTMLElement>) {
        if (
          disabled ||
          event.button !== 0 ||
          !event.isPrimary ||
          gesture.current
        )
          return;
        event.preventDefault();
        event.stopPropagation();
        const bounds = event.currentTarget.getBoundingClientRect();
        gesture.current = {
          id: event.pointerId,
          x: event.clientX,
          value,
          unit: Math.max(1, pixelsPerUnit(bounds.width)),
          moved: false,
          bounds,
        };
        event.currentTarget.setPointerCapture(event.pointerId);
        setDraft(value);
      },
      onPointerMove(event: PointerEvent<HTMLElement>) {
        if (gesture.current?.id !== event.pointerId) return;
        event.preventDefault();
        event.stopPropagation();
        if (disabled) {
          cancel();
          return;
        }
        gesture.current.moved ||=
          Math.abs(event.clientX - gesture.current.x) > 3;
        setDraft(position(event.clientX));
      },
      onPointerUp(event: PointerEvent<HTMLElement>) {
        if (gesture.current?.id !== event.pointerId) return;
        event.preventDefault();
        event.stopPropagation();
        const current = gesture.current;
        const next = position(event.clientX);
        cancel();
        if (!disabled) {
          if (current.moved) onCommit(next);
          else onTap(event.clientX, current.bounds);
        }
        if (event.currentTarget.hasPointerCapture(event.pointerId))
          event.currentTarget.releasePointerCapture(event.pointerId);
      },
      onPointerCancel: cancel,
      onLostPointerCapture: cancel,
      onClickCapture(event: MouseEvent<HTMLElement>) {
        // Native pointer clicks are handled above; keyboard activation stays with HeroUI.
        if (event.detail > 0) {
          event.preventDefault();
          event.stopPropagation();
        }
      },
    },
  };
}

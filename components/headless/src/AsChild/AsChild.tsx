import { isValidElement, useEffect, useMemo } from "react";

import { mergeRef } from "@/utils";

type AnyProps = Record<string, unknown>;

function mergeProps(props: AnyProps, childProps: AnyProps): AnyProps {
  const merged: AnyProps = { ...props };

  for (const key in childProps) {
    // ref is handled separately by AsChild: the slot's and child's refs are merged.
    if (key === "ref") continue;

    const slotVal = props[key];
    const childVal = childProps[key];

    if (key.startsWith("on") && typeof childVal === "function") {
      // Chain handlers: child fires first, then slot
      merged[key] = (...args: unknown[]) => {
        (childVal as (...a: unknown[]) => void)(...args);
        if (typeof slotVal === "function") {
          (slotVal as (...a: unknown[]) => void)(...args);
        }
      };
    } else if (key === "className") {
      merged[key] = [slotVal as string, childVal as string]
        .filter(Boolean)
        .join(" ");
    } else if (key === "style") {
      merged[key] = { ...(slotVal as object), ...(childVal as object) };
    } else if (!(key in props)) {
      // only ones not set by the parent
      merged[key] = childVal;
    }
  }

  return merged;
}

type AsChildProps = {
  children: React.ReactNode;
  ref?: React.Ref<unknown>;
} & AnyProps;

export function AsChild({
  children,
  ref,
  ...props
}: AsChildProps): React.ReactElement | null {
  const isValidChild = isValidElement(children);
  const childRef = isValidChild
    ? ((children.props as AnyProps).ref as React.Ref<unknown>)
    : undefined;
  const mergedRef = useMemo(() => mergeRef(ref, childRef), [ref, childRef]);

  useEffect(() => {
    if (!isValidChild && process.env.NODE_ENV !== "production") {
      console.warn(
        "[WonDesign Headless] asChild requires a single valid React element as child.",
      );
    }
  }, [isValidChild]);

  if (!isValidElement(children)) {
    return null;
  }

  const Child = children.type as React.ElementType;

  return (
    <Child
      key={children.key}
      {...mergeProps(props, children.props as AnyProps)}
      ref={mergedRef}
    />
  );
}

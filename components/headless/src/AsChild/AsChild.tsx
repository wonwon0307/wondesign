import { cloneElement, isValidElement, useEffect } from "react";

type AnyProps = Record<string, unknown>;

function mergeProps(props: AnyProps, childProps: AnyProps): AnyProps {
  const merged: AnyProps = { ...props };

  for (const key in childProps) {
    // ref is handled separately by AsChild: the slot's ref always wins.
    if (key === "ref") continue;

    const slotVal = props[key];
    const childVal = childProps[key];

    if (
      key.startsWith("on") &&
      typeof slotVal === "function" &&
      typeof childVal === "function"
    ) {
      // Chain handlers: child fires first, then slot
      merged[key] = (...args: unknown[]) => {
        (childVal as (...a: unknown[]) => void)(...args);
        (slotVal as (...a: unknown[]) => void)(...args);
      };
    } else if (key === "className") {
      merged[key] = [slotVal as string, childVal as string]
        .filter(Boolean)
        .join(" ");
    } else if (key === "style") {
      merged[key] = { ...(slotVal as object), ...(childVal as object) };
    } else {
      // Child props override slot props for everything else
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
  ...props
}: AsChildProps): React.ReactElement | null {
  const isValidChild = isValidElement(children);

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

  // props still holds the slot's ref; mergeProps skips the child's, so the slot's wins.
  return cloneElement(children, mergeProps(props, children.props as AnyProps));
}

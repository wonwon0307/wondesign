export function mergeRef<T>(
  ...refs: Array<React.Ref<T> | undefined>
): React.RefCallback<T> {
  return (node: T) => {
    const cleanups = refs.map((ref) => {
      if (typeof ref === "function") {
        const cleanup = ref(node);
        return typeof cleanup === "function" ? cleanup : () => ref(null);
      }
      if (ref != null) {
        (ref as React.RefObject<T | null>).current = node;
        return () => {
          (ref as React.RefObject<T | null>).current = null;
        };
      }
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup?.());
    };
  };
}

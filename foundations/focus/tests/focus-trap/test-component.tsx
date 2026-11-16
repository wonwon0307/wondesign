import { useRef } from "react";

import { useFocusTrap } from "@/trap/useFocusTrap";

export function TestComponent({
  children,
  enabled = false,
}: Readonly<{
  children: React.ReactNode;
  enabled?: boolean;
}>) {
  const ref = useRef<HTMLDivElement | null>(null);

  useFocusTrap(ref, { enabled });

  return (
    <div ref={ref} data-testid="target" tabIndex={-1}>
      {children}
    </div>
  );
}

import { useRef, useState } from "react";

import { useAutoFocus } from "@/auto-focus/useAutoFocus";

export function TestComponent({
  children,
  initialRef,
  returnRef,
}: Readonly<{
  children: React.ReactNode;
  initialRef?: React.RefObject<HTMLElement | null>;
  returnRef?: React.RefObject<HTMLElement | null>;
}>) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useAutoFocus(contentRef, {
    enabled: isOpen,
    initialRef,
    returnRef,
  });

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <button data-testid="trigger" onClick={toggle} />
      {isOpen && (
        <div ref={contentRef} data-testid="content" tabIndex={-1}>
          {children}
        </div>
      )}
    </div>
  );
}

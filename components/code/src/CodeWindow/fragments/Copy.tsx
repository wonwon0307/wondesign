import { useState } from "react";
import { IconButton } from "@wondesign/buttons/Icon";
import { Pressable, type PressableProps } from "@wondesign/buttons/Pressable";
import { clsx } from "clsx";

import { useCodeWindow } from "../contexts";
import { styles } from "./styles.css";

export interface CodeWindowCopyButtonProps extends PressableProps {
  onCopy?: () => void;
  timeout?: number;
}

export function CodeWindowCopyButton({
  children,
  onCopy,
  timeout = 2000,
  className,
  style,
}: Readonly<CodeWindowCopyButtonProps>) {
  const [copied, setCopied] = useState<boolean>(false);
  const { code } = useCodeWindow();

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    onCopy?.();
    setCopied(true);
    setTimeout(() => setCopied(false), timeout);
  };

  if (children) {
    return (
      <Pressable
        isDisabled={copied}
        onClick={handleCopy}
        aria-label={copied ? "Copied" : "Copy code"}
        className={className}
        style={style}
      >
        {children}
      </Pressable>
    );
  }

  return (
    <IconButton
      icon={copied ? "check" : "copy-code"}
      size="medium"
      isDisabled={copied}
      onClick={handleCopy}
      aria-label={copied ? "Copied" : "Copy code"}
      className={clsx(styles.defaultButton({ copied }), className)}
      style={style}
    />
  );
}

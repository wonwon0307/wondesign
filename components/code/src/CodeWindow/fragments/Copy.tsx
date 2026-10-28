import { useState } from "react";
import { IconButton } from "@wondesign/buttons/Icon";
import { Pressable, type PressableProps } from "@wondesign/buttons/Pressable";
import { clsx } from "clsx";

import { useCodeWindow } from "../contexts";
import { styles } from "./styles.css";

export interface CodeWindowCopyButtonProps extends Omit<
  PressableProps,
  "onClick" | "aria-label" | "isDisabled"
> {
  onCopy?: () => void;
  onCopyFail?: () => void;
  timeout?: number;
}

export function CodeWindowCopyButton({
  children,
  onCopy,
  onCopyFail,
  timeout = 2000,
  className,
  style,
  ...rest
}: Readonly<CodeWindowCopyButtonProps>) {
  const [copied, setCopied] = useState<boolean>(false);
  const { code } = useCodeWindow();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch (err) {
      console.error("[WonDesign Code] CodeWindowCopyButton: copy failed", err);
      onCopyFail?.();
      return;
    }

    onCopy?.();
    setCopied(true);
    setTimeout(() => setCopied(false), timeout);
  };

  if (children) {
    return (
      <Pressable
        {...rest}
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
      {...rest}
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

import { useState } from "react";
import { IconButton } from "@wondesign/buttons/IconButton";
import { Pressable, type PressableProps } from "@wondesign/buttons/Pressable";

export interface CopyCodeButtonProps extends Omit<
  PressableProps,
  "onClick" | "aria-label"
> {
  code: string;
  onCopy?: () => void;
  onCopyFail?: () => void;
  timeout?: number;
}

export function CopyCodeButton({
  children,
  code,
  onCopy,
  onCopyFail,
  timeout = 2000,
  isDisabled,
  ...rest
}: Readonly<CopyCodeButtonProps>) {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch (err) {
      console.error("[WonDesign Code] CopyCodeButton: copy failed", err);
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
        isDisabled={isDisabled || copied}
        onClick={handleCopy}
        aria-label={copied ? "Copied" : "Copy code"}
        data-state={copied ? "copied" : "idle"}
      >
        {children}
      </Pressable>
    );
  }

  return (
    <IconButton
      {...rest}
      icon={copied ? "check" : "copy-code"}
      isDisabled={isDisabled || copied}
      onClick={handleCopy}
      aria-label={copied ? "Copied" : "Copy code"}
    />
  );
}

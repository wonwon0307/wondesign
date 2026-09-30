import { clsx } from "clsx";

import { CodeBlock } from "@/CodeBlock/CodeBlock";
import { useCodeWindow } from "../contexts";
import { styles } from "./styles.css";

export interface CodeWindowBodyProps
  extends
    Omit<React.HTMLAttributes<HTMLPreElement>, "children">,
    React.RefAttributes<HTMLPreElement> {
  size?: "small" | "large";
  maxNumLines?: number;
  showLineNumbers?: boolean;
}

export function CodeWindowBody({
  size = "small",
  maxNumLines = 10,
  showLineNumbers = false,
  className,
  style,
  ...rest
}: Readonly<CodeWindowBodyProps>) {
  const { code, lang } = useCodeWindow();

  const vertical = maxNumLines ? "scroll" : "auto";

  return (
    <CodeBlock
      {...rest}
      code={code}
      lang={lang}
      showLineNumbers={showLineNumbers}
      className={clsx(styles.pre({ size, vertical }), className)}
      style={{
        ...style,
        maxHeight: vertical === "scroll" ? `${maxNumLines}lh` : "auto",
      }}
    />
  );
}

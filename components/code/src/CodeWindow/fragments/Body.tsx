import { clsx } from "clsx";

import { CodeBlock } from "@/CodeBlock/CodeBlock";
import { useCodeWindow } from "../contexts";
import { styles } from "./styles.css";

export type CodeWindowBodyProps = Omit<
  React.HTMLAttributes<HTMLPreElement>,
  "children"
> &
  React.RefAttributes<HTMLPreElement>;

export function CodeWindowBody({
  className,
  style,
  ...rest
}: Readonly<CodeWindowBodyProps>) {
  const { code, lang, size, maxNumLines, showLineNumbers } = useCodeWindow();

  const vertical = maxNumLines ? "scroll" : "auto";
  const finalStyle =
    vertical === "scroll" ? { ...style, maxHeight: `${maxNumLines}lh` } : style;

  return (
    <CodeBlock
      {...rest}
      code={code}
      lang={lang}
      showLineNumbers={showLineNumbers}
      className={clsx(styles.pre({ size, vertical }), className)}
      style={finalStyle}
    />
  );
}

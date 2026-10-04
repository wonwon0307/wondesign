import { clsx } from "clsx";

import { CodeWindowWrapper } from "./fragments/Wrapper";
import { CodeWindowBody } from "./fragments/Body";
import { CodeWindowCopyButton } from "./fragments/Copy";
import { styles } from "./styles.css";

export interface CodeWindowProps {
  children?: React.ReactNode; // header
  code: string;
  lang?: string;
  size?: "small" | "medium" | "large";
  maxNumLines?: number;
  showLineNumbers?: boolean;
  disableCopy?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function CodeWindow({
  children,
  code,
  lang = "plaintext",
  size = "medium",
  maxNumLines,
  showLineNumbers,
  disableCopy = false,
  className,
  style,
}: Readonly<CodeWindowProps>) {
  const hasChildren = Boolean(children);

  return (
    <CodeWindowWrapper
      code={code}
      lang={lang}
      className={clsx(styles.wrapper, className)}
      style={style}
    >
      {children}
      {!disableCopy && <CodeWindowCopyButton className={styles.codeCopy} />}
      <CodeWindowBody
        size={size}
        maxNumLines={maxNumLines}
        showLineNumbers={showLineNumbers}
        className={styles.pre({ hasChildren })}
      />
    </CodeWindowWrapper>
  );
}

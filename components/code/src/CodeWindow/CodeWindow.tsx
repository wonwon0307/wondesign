import { useMemo } from "react";
import { clsx } from "clsx";

import { CodeWindowContext } from "./contexts";
import { CodeWindowBody } from "./fragments/Body";
import { CodeWindowCopyButton } from "./fragments/Copy";
import { styles } from "./styles.css";

export type CodeWindowProps = (
  | {
      children: React.ReactNode;
      size?: never;
      maxNumLines?: never;
      showLineNumbers?: never;
      disableCopy?: never;
      className?: never;
      style?: never;
    }
  | {
      children?: never;
      size?: "small" | "medium" | "large";
      maxNumLines?: number;
      showLineNumbers?: boolean;
      disableCopy?: boolean;
      className?: string;
      style?: React.CSSProperties;
    }
) & {
  code: string;
  lang?: string;
};

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
  const contextValue = useMemo(
    () => ({ code: code.replace(/\n$/, ""), lang }),
    [code, lang],
  );

  return (
    <CodeWindowContext.Provider value={contextValue}>
      {children || (
        <div className={clsx(styles.wrapper, className)} style={style}>
          {!disableCopy && <CodeWindowCopyButton className={styles.codeCopy} />}
          <CodeWindowBody
            size={size}
            maxNumLines={maxNumLines}
            showLineNumbers={showLineNumbers}
            className={styles.pre({ hasHeader: false })}
          />
        </div>
      )}
    </CodeWindowContext.Provider>
  );
}

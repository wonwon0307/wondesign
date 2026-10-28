import { useMemo } from "react";
import { clsx } from "clsx";

import { CodeWindowContext } from "./contexts";
import { CodeWindowBody } from "./fragments/Body";
import { CodeWindowCopyButton } from "./fragments/Copy";
import { styles } from "./styles.css";

export type CodeWindowProps = (
  | {
      children: React.ReactNode;
      disableCopy?: never;
    }
  | {
      children?: never;
      disableCopy?: boolean;
    }
) & {
  code: string;
  lang?: string;
  size?: "small" | "medium" | "large";
  maxNumLines?: number;
  showLineNumbers?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

export function CodeWindow({
  children,
  code,
  lang = "plaintext",
  size = "medium",
  maxNumLines = 0,
  showLineNumbers = false,
  disableCopy = false,
  className,
  style,
}: Readonly<CodeWindowProps>) {
  const contextValue = useMemo(
    () => ({
      code: code.replace(/\n$/, ""),
      lang,
      size,
      maxNumLines,
      showLineNumbers,
    }),
    [code, lang, size, maxNumLines, showLineNumbers],
  );

  return (
    <CodeWindowContext.Provider value={contextValue}>
      <div className={clsx(styles.wrapper, className)} style={style}>
        {children ?? (
          <>
            <CodeWindowBody className={styles.pre} />
            {!disableCopy && (
              <CodeWindowCopyButton className={styles.codeCopy} />
            )}
          </>
        )}
      </div>
    </CodeWindowContext.Provider>
  );
}

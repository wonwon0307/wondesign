import { CodeWindowWrapper } from "./fragments/Wrapper";
import { CodeWindowBody } from "./fragments/Body";
import { CodeWindowCopyButton } from "./fragments/Copy";
import { styles } from "./styles.css";

export interface CodeWindowProps {
  children?: React.ReactNode; // header
  code: string;
  lang?: string;
  size?: "small" | "large";
  maxNumLines?: number;
  showLineNumbers?: boolean;
  disableCopy?: boolean;
}

export function CodeWindow({
  children,
  code,
  lang = "plaintext",
  size = "small",
  maxNumLines,
  showLineNumbers,
  disableCopy = false,
}: Readonly<CodeWindowProps>) {
  const hasChildren = Boolean(children);

  return (
    <CodeWindowWrapper code={code} lang={lang} className={styles.wrapper}>
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

import { useEffect, useState } from "react";
import {
  bundledLanguages,
  bundledLanguagesAlias,
  codeToTokens,
  type BundledLanguage,
  type ThemedToken,
} from "shiki/bundle/web";
import { clsx } from "clsx";

import { styles } from "./styles.css";

export interface CodeBlockProps
  extends
    Omit<React.HTMLAttributes<HTMLPreElement>, "children">,
    React.RefAttributes<HTMLPreElement> {
  code: string;
  lang?: string;
  showLineNumbers?: boolean;
}

function resolveLang(lang: string): BundledLanguage | "plaintext" {
  if (lang in bundledLanguages || lang in bundledLanguagesAlias) {
    return lang as BundledLanguage;
  }

  return "plaintext";
}

export function CodeBlock({
  code,
  lang = "plaintext",
  showLineNumbers = false,
  className,
  ...rest
}: Readonly<CodeBlockProps>) {
  const [tokens, setTokens] = useState<ThemedToken[][]>();
  const resolvedLang = resolveLang(lang);

  useEffect(() => {
    let cancelled = false;

    async function highlight() {
      const result = await codeToTokens(code, {
        lang: resolvedLang,
        themes: {
          light: "github-light-default",
          dark: "github-dark-default",
        },
        defaultColor: "light-dark()",
      });

      if (!cancelled) setTokens(result.tokens);
    }

    highlight();

    return () => {
      cancelled = true;
    };
  }, [code, resolvedLang]);

  if (!tokens) return null;

  return (
    <pre {...rest} className={clsx(styles.pre, className)}>
      <code className={styles.code({ showLineNumbers })}>
        {tokens.map((line, i) => (
          <span
            key={`${i}:${line}`}
            className={styles.line({ showLineNumbers })}
            data-line={i + 1}
          >
            {line.length === 0
              ? " "
              : line.map((token) => (
                  <span key={`${i}:${token.offset}`} style={token.htmlStyle}>
                    {token.content}
                  </span>
                ))}
          </span>
        ))}
      </code>
    </pre>
  );
}

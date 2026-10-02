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
  const [failed, setFailed] = useState<boolean>(false);
  const resolvedLang = resolveLang(lang);
  const trimmedCode = code.replace(/\n$/, "");

  useEffect(() => {
    let cancelled = false;

    async function highlight() {
      try {
        const result = await codeToTokens(trimmedCode, {
          lang: resolvedLang,
          themes: {
            light: "github-light-default",
            dark: "github-dark-default",
          },
          defaultColor: "light-dark()",
        });

        if (cancelled) return;
        setTokens(result.tokens);
        setFailed(false);
      } catch (err) {
        if (cancelled) return;
        console.error(
          "[WonDesign Code] CodeBlock syntax highlighting failed",
          err,
        );
        setFailed(true);
      }
    }

    void highlight();

    return () => {
      cancelled = true;
    };
  }, [trimmedCode, resolvedLang]);

  if (failed) {
    const lines = trimmedCode.split("\n");

    return (
      <pre {...rest} className={clsx(styles.pre, className)}>
        <code className={styles.code({ showLineNumbers })}>
          {lines.map((line, index) => (
            <span
              key={`${index}:${line}`}
              className={styles.line({ showLineNumbers })}
              data-line={index + 1}
            >
              {line || " "}
            </span>
          ))}
        </code>
      </pre>
    );
  }

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

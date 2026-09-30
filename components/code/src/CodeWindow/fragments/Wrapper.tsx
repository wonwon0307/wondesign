import { useMemo } from "react";

import { CodeWindowContext } from "../contexts";

export interface CodeWindowWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  code: string;
  lang?: string;
}

export function CodeWindowWrapper({
  code,
  children,
  lang = "plaintext",
  ...rest
}: Readonly<CodeWindowWrapperProps>) {
  const contextValue = useMemo(() => ({ code, lang }), [code, lang]);

  return (
    <CodeWindowContext.Provider value={contextValue}>
      <div {...rest}>{children}</div>
    </CodeWindowContext.Provider>
  );
}

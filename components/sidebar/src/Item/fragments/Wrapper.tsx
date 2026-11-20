import { createContext, useContext } from "react";

import { useSidebarNav } from "@/contexts/body";

const SidebarItemContext = createContext<boolean>(false);

interface Props extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export function SidebarItemWrapper({ children, ...rest }: Readonly<Props>) {
  useSidebarNav();
  const isNested = useContext(SidebarItemContext);
  const Component = isNested ? "li" : "div";

  return (
    <SidebarItemContext.Provider value={true}>
      <Component {...rest}>{children}</Component>
    </SidebarItemContext.Provider>
  );
}

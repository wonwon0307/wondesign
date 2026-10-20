import {
  Google_Sans,
  JetBrains_Mono,
  Kalam,
  Roboto_Slab,
} from "next/font/google";
import { LightDarkProvider } from "@wondesign/ui/theme";
import { LightDarkScript } from "@wondesign/ui/server";
import { wondesignTokenVariables } from "@wondesign/ui/tokens";
import { clsx } from "clsx";

import { RootHeader } from "@/widgets/header";
import { styles } from "./styles.css";
import "@wondesign/ui/styles.css";

const googleSans = Google_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  fallback: ["system-ui"],
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const kalam = Kalam({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

interface Props {
  children: React.ReactNode;
}

export function RootLayout({ children }: Readonly<Props>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style dangerouslySetInnerHTML={{ __html: wondesignTokenVariables }} />
        <LightDarkScript nonce="wondesign-home" />
      </head>
      <LightDarkProvider defaultMode="system">
        <body
          className={clsx(
            googleSans.className,
            jetBrainsMono.className,
            kalam.className,
            robotoSlab.className,
            styles.body,
          )}
        >
          <RootHeader />
          <main className={styles.main} role="main">
            {children}
          </main>
          <footer role="contentinfo">Footer</footer>
        </body>
      </LightDarkProvider>
    </html>
  );
}

import {
  Google_Sans,
  JetBrains_Mono,
  Kalam,
  Roboto_Slab,
} from "next/font/google";
import { ThemeProvider } from "@wondesign/ui/theme";
import { wondesignDefault } from "@wondesign/ui/tokens";
import { clsx } from "clsx";

import { RootHeader } from "@/widgets/header";
import { styles } from "./styles.css";
import "@wondesign/ui/styles.css";

const googleSans = Google_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  fallback: ["system-ui"],
  preload: true,
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  preload: true,
});

const kalam = Kalam({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  preload: true,
});

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  preload: true,
});

interface Props {
  children: React.ReactNode;
}

export function RootLayout({ children }: Readonly<Props>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style dangerouslySetInnerHTML={{ __html: wondesignDefault }} />
      </head>
      <ThemeProvider withSystem defaultMode="system">
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
      </ThemeProvider>
    </html>
  );
}

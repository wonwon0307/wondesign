import {
  Google_Sans,
  JetBrains_Mono,
  Kalam,
  Roboto_Slab,
} from "next/font/google";
import { ThemeProvider, wondesignDefault } from "@wondesign/ui";
import clsx from "clsx";

import { Header } from "@/widgets/root";
import { styles } from "./styles.css";
import "@wondesign/ui/styles.css";

const googleSans = Google_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-family-normal",
  fallback: ["system-ui"],
  display: "swap",
  preload: true,
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-family-code",
  fallback: ["monospace"],
  display: "swap",
  preload: true,
});

const kalam = Kalam({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-family-brand",
  display: "swap",
  preload: true,
});

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-family-quote",
  fallback: ["serif"],
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
            googleSans.variable,
            jetBrainsMono.variable,
            kalam.variable,
            robotoSlab.variable,
            styles.body,
          )}
        >
          <Header />
          <main className={styles.main} role="main">
            {children}
          </main>
          <footer role="contentinfo">Footer</footer>
        </body>
      </ThemeProvider>
    </html>
  );
}

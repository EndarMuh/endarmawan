import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Muhammad Endar Darmawan — Software Engineer",
  description:
    "Portfolio of Muhammad Endar Darmawan — Software Engineer & Data Enthusiast. Laravel, web development, UI/UX, and data.",
};

// Apply the saved theme before paint to avoid a flash of the wrong theme.
const themeInit = `(function(){try{var t=localStorage.getItem('port-theme');if(t==='dark'||t==='light'){document.documentElement.setAttribute('data-theme',t);}}catch(e){}})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>{children}</body>
    </html>
  );
}

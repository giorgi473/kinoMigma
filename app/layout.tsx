// import type React from "react";
// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
// import { Sidebar } from "@/components/Sidebar";
// import { Header } from "@/components/Header";

// const _geist = Geist({ subsets: ["latin"] });
// const _geistMono = Geist_Mono({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "KINOMIGMA - ფილმების სტრიმინგი",
//   description: "ფილმების და სერიალების უყურეთ ონლაინ",
//   generator: "v0.app",
//   icons: {
//     icon: [
//       {
//         url: "/icon-light-32x32.png",
//         media: "(prefers-color-scheme: light)",
//       },
//       {
//         url: "/icon-dark-32x32.png",
//         media: "(prefers-color-scheme: dark)",
//       },
//       {
//         url: "/icon.svg",
//         type: "image/svg+xml",
//       },
//     ],
//     apple: "/apple-icon.png",
//   },
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="ka">
//       <body className={`font-sans antialiased`}>
//         <div className="flex h-screen overflow-hidden bg-background">
//           <Sidebar />
//           <div className="flex-1 overflow-y-auto">
//             <Header />
//             <main>{children}</main>
//           </div>
//         </div>
//       </body>
//     </html>
//   );
// }

import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { MobileNav } from "@/components/MobileNav"; // new import

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KINOMIGMA - ფილმების სტრიმინგი",
  description: "ფილმების და სერიალების უყურეთ ონლაინ",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ka">
      <body className="font-sans antialiased">
        <div className="flex h-screen overflow-hidden bg-background">
          <Sidebar />
          <div className="flex-1 overflow-y-auto">
            <Header />
            <MobileNav />
            <main className="flex-1 overflow-y-auto">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}

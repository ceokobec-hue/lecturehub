import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "김지백 EDU",
  description: "김지백 강사의 교육 자료와 문의 사이트",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="min-h-screen flex flex-col">
        <Nav />
        <main className="container-md flex-1 py-6 space-y-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}


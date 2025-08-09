"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function Nav() {
  const pathname = usePathname();
  const links = [
    { href: "/instructor", label: "김지백 강사" },
    { href: "/materials", label: "강의 자료" },
    { href: "/contact", label: "문의" },
  ];
  return (
    <header className="border-b">
      <div className="container-md flex h-14 items-center justify-between">
        <Link href="/" className="font-semibold">김지백 EDU</Link>
        <nav className="flex gap-4 text-sm">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "px-1 py-2 border-b-2 border-transparent hover:border-foreground",
                pathname === l.href && "border-foreground"
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}


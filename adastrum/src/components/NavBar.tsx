import Link from "next/link";
import { useRouter } from "next/router";
import type { ReactElement } from "react";

function getLinkClass(isActive: boolean): string {
  return [
    "px-3 py-2 rounded-md text-sm font-medium transition-colors",
    isActive
      ? "bg-foreground text-background"
      : "text-foreground/80 hover:bg-foreground/10",
  ].join(" ");
}

export function NavBar(): ReactElement {
  const { pathname } = useRouter();

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="border-b border-foreground/10 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <Link href="/" className="text-base font-semibold tracking-tight">
          Adastrum
        </Link>
        <div className="flex items-center gap-1">
          {links.map(({ href, label }) => (
            <Link key={href} href={href} className={getLinkClass(pathname === href)}>
              {label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}

export default NavBar;



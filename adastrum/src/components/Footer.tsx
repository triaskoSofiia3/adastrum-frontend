import Link from "next/link";
import type { ReactElement } from "react";

export function Footer(): ReactElement {
  return (
    <footer className="border-t border-foreground/10 mt-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-6 text-sm text-foreground/70 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p>
          © {new Date().getFullYear()} Adastrum. All rights reserved.
        </p>
        <p>
          Built with <Link className="underline hover:opacity-80" href="https://nextjs.org" target="_blank" rel="noreferrer">Next.js</Link>.
        </p>
      </div>
    </footer>
  );
}

export default Footer;



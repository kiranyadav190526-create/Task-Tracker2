"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Dashboard" },
  { href: "/tasks", label: "Tasks" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="navbar">
      <div className="nav-inner">
        <Link className="brand" href="/">
          <span className="brand-mark">TT</span>
          <span>Task Tracker</span>
        </Link>

        <nav className="nav-links" aria-label="Primary navigation">
          {links.map((link) => {
            const active =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                className={`nav-link ${active ? "active" : ""}`}
                href={link.href}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

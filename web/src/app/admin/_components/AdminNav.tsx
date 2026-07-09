"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export type NavItem = { href: string; label: string; count?: number; external?: boolean };

export function AdminNav({ items }: { items: NavItem[] }) {
  const path = usePathname();
  return (
    <nav className="adm-nav">
      {items.map((n) => {
        const active = !n.external && (n.href === "/admin" ? path === "/admin" : path.startsWith(n.href));
        return (
          <Link
            key={n.href}
            href={n.href}
            className={active ? "active" : ""}
            {...(n.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            <span>{n.label}</span>
            {typeof n.count === "number" && <span className="count">{n.count}</span>}
          </Link>
        );
      })}
    </nav>
  );
}

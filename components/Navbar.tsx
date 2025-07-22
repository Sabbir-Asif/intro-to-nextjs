'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Posts', href: '/posts' },
  { label: 'Users', href: '/users' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 shadow-md">
      <ul className="flex gap-6">
        {navItems.map(({ label, href }) => (
          <li key={href}>
            <Link
              href={href}
              className={clsx(
                'hover:text-blue-400 transition-colors',
                pathname === href && 'text-blue-400 font-semibold'
              )}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

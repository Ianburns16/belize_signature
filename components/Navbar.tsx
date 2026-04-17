"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Tours", href: "/tours" },
  { name: "Services", href: "/services" },
  { name: "Journal", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Don't show navbar on admin pages
  if (pathname?.startsWith("/admin")) return null;

  // Handle scroll effect
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      setScrolled(window.scrollY > 20);
    });
  }

  return (
    <>
      <header
        className={`fixed w-full top-0 z-50 transition-all duration-300 border-b ${scrolled
            ? "bg-white/95 backdrop-blur-md border-brand-grey/20 py-2 shadow-sm"
            : "bg-transparent border-transparent py-4"
          }`}
      >
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between p-4 px-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2 group">
              <span className="sr-only">Belize Signature Experience</span>
              <div className="relative h-16 w-48 transition-transform group-hover:scale-105">
                <Image
                  src="/favicon.ico"
                  alt="Belize Signature Experience"
                  fill
                  sizes="(max-width: 768px) 150px, 192px"
                  className={`object-contain transition-all ${!scrolled ? 'drop-shadow-[0_0_10px_rgba(255,255,255,0.7)]' : ''}`}
                  priority
                />
              </div>
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className={`-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 ${!scrolled ? 'text-white' : 'text-brand-dark'}`}
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-8">
            {navigation.map((item) => {
              const isActive = pathname === item.href || (item.href === '/blog' && pathname.startsWith('/blog'));
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-semibold leading-6 transition-all ${isActive
                      ? "text-brand-orange border-b-2 border-brand-orange"
                      : !scrolled
                        ? "text-white/90 hover:text-white"
                        : "text-brand-dark hover:text-brand-green"
                    }`}
                >
                  {item.name}
                </Link>
              )
            })}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link
              href="/tours"
              className={`text-sm font-semibold leading-6 px-6 py-2.5 rounded-full transition-all shadow-sm ${!scrolled
                  ? "bg-white text-brand-dark hover:bg-brand-orange hover:text-white"
                  : "text-white bg-brand-green hover:bg-brand-green/90"
                }`}
            >
              Book Now <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden" role="dialog" aria-modal="true">
          <div className="fixed inset-0 z-50 bg-brand-dark/40 backdrop-blur-sm transition-opacity" onClick={() => setMobileMenuOpen(false)}></div>
          <div className="fixed inset-y-0 right-0 z-50 w-5/6 overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 shadow-2xl">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
                <span className="sr-only">Belize Signature Experience</span>
                <div className="relative h-12 w-36">
                  <Image
                    src="/favicon.ico"
                    alt="Belize Signature Experience"
                    fill
                    sizes="150px"
                    className="object-contain"
                    priority
                  />
                </div>
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-brand-dark hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="py-6">
                  <Link
                    href="/tours"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white bg-brand-orange hover:bg-brand-orange/90 text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

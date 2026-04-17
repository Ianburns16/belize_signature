"use client";

import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) return null;
  return (
    <footer className="bg-brand-dark text-gray-300">
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <div className="bg-white p-4 inline-block rounded-xl">
              <Image
                src="/images/LOGO.png"
                alt="Belize Signature Experience"
                width={200}
                height={60}
                className="object-contain"
                priority
              />
            </div>
            <p className="text-sm leading-6 text-gray-400">
              Where every adventure is uniquely yours. Experience the magic of Belize with our signature guided tours.
            </p>
            <div className="flex space-x-6">
              <Link href="#" className="text-gray-400 hover:text-brand-orange">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-6 w-6" aria-hidden="true" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-brand-orange">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" aria-hidden="true" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-brand-orange">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-6 w-6" aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white uppercase tracking-wider">Tours</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <Link href="/tours" className="text-sm leading-6 hover:text-brand-green">All Tours</Link>
                  </li>
                  <li>
                    <Link href="/tours?category=cave-tubing" className="text-sm leading-6 hover:text-brand-green">Cave Tubing</Link>
                  </li>
                  <li>
                    <Link href="/tours?category=ruins" className="text-sm leading-6 hover:text-brand-green">Maya Ruins</Link>
                  </li>
                  <li>
                    <Link href="/services" className="text-sm leading-6 hover:text-brand-green">Custom Packages</Link>
                  </li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white uppercase tracking-wider">Company</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <Link href="/about" className="text-sm leading-6 hover:text-brand-green">About Us</Link>
                  </li>
                  <li>
                    <Link href="/blog" className="text-sm leading-6 hover:text-brand-green">Journal</Link>
                  </li>

                  <li>
                    <Link href="/contact" className="text-sm leading-6 hover:text-brand-green">Contact</Link>
                  </li>
                  <li>
                    <Link href="/terms" className="text-sm leading-6 hover:text-brand-green">Terms & Conditions</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:mt-0">
              <h3 className="text-sm font-semibold leading-6 text-white uppercase tracking-wider">Contact Us</h3>
              <ul role="list" className="mt-6 space-y-4">
                <li className="flex gap-3 text-sm leading-6 text-gray-400">
                  <MapPin className="h-5 w-5 text-brand-green shrink-0" />
                  eve Street, Santa Elena, Cayo District, Belize
                </li>
                <li className="flex gap-3 text-sm leading-6 text-gray-400">
                  <Phone className="h-5 w-5 text-brand-green shrink-0" />
                  +501 609-1944
                </li>
                <li className="flex gap-3 text-sm leading-6 text-gray-400">
                  <Mail className="h-5 w-5 text-brand-green shrink-0" />
                  reservations@belizesignature.com
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
          <p className="text-xs leading-5 text-gray-400">&copy; 2026 Belize Signature Experience. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

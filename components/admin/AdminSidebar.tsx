"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  MessageSquare,
  Compass,
  FileText,
  ExternalLink,
  LogOut,
  Menu,
  X,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

interface AdminSidebarProps {
  userEmail?: string;
  unreadCount?: number;
}

export function AdminSidebar({ userEmail, unreadCount = 0 }: AdminSidebarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth/login");
  };

  const navItems = [
    {
      label: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
      exact: true,
    },
    {
      label: "Tours",
      href: "/admin/tours",
      icon: Compass,
      exact: false,
    },
    {
      label: "Blog Posts",
      href: "/admin/blogs",
      icon: FileText,
      exact: false,
    },
    {
      label: "Inquiries",
      href: "/admin/messages",
      icon: MessageSquare,
      exact: false,
      badge: unreadCount > 0 ? unreadCount : undefined,
    },
  ];

  const isActive = (itemHref: string, exact: boolean) => {
    if (exact) {
      return pathname === itemHref;
    }
    return pathname.startsWith(itemHref);
  };

  const NavContent = () => (
    <div className="flex flex-col h-full bg-brand-dark text-white select-none">
      {/* Brand Header */}
      <div className="p-6 border-b border-white/10 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-orange block">
            Management Portal
          </span>
          <h2 className="text-xl font-heading uppercase text-white tracking-wider flex items-center gap-2">
            <span className="text-brand-orange">Belize</span> Signature
          </h2>
        </div>
        <button
          onClick={() => setMobileOpen(false)}
          className="md:hidden text-white/70 hover:text-white p-1"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-white/40">
          Navigation
        </div>
        {navItems.map((item) => {
          const active = isActive(item.href, item.exact);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center justify-between px-3.5 py-3 rounded-xl transition-all font-medium text-sm ${
                active
                  ? "bg-brand-orange text-white shadow-md font-semibold"
                  : "text-white/75 hover:bg-white/10 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${active ? "text-white" : "text-brand-orange"}`} />
                <span>{item.label}</span>
              </div>
              {item.badge !== undefined && (
                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    active ? "bg-white text-brand-orange" : "bg-brand-orange text-white"
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}

        <div className="pt-6 px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-white/40">
          Quick Links
        </div>
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-white/75 hover:bg-white/10 hover:text-white transition-all text-xs font-medium"
        >
          <div className="flex items-center gap-2.5">
            <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
            <span>View Public Site</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-gray-500" />
        </Link>
      </nav>

      {/* User Footer Profile & Logout */}
      <div className="p-4 border-t border-white/10 bg-black/20">
        <div className="flex items-center gap-3 mb-3 px-1">
          <div className="w-8 h-8 rounded-full bg-brand-orange/20 border border-brand-orange/40 text-brand-orange flex items-center justify-center text-xs font-bold shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-white truncate">
              {userEmail || "Admin"}
            </p>
            <p className="text-[10px] text-brand-orange font-medium">Administrator</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-white/10 hover:bg-red-500/20 hover:text-red-400 text-white/80 rounded-xl text-xs font-semibold transition-colors border border-white/5"
        >
          <LogOut className="w-3.5 h-3.5" /> Log Out
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-brand-dark hidden md:block shrink-0 h-screen sticky top-0 shadow-xl z-20">
        <NavContent />
      </aside>

      {/* Mobile Top Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex justify-between items-center md:hidden sticky top-0 z-30 shadow-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Open navigation menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-orange block">
              Admin
            </span>
            <span className="text-base font-heading uppercase text-brand-dark">
              Belize Signature
            </span>
          </div>
        </div>

        {unreadCount > 0 && (
          <Link
            href="/admin/messages"
            className="flex items-center gap-1.5 px-2.5 py-1 bg-brand-orange/10 text-brand-orange rounded-full text-xs font-bold"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{unreadCount}</span>
          </Link>
        )}
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative w-72 max-w-[80vw] h-full z-10 shadow-2xl animate-in slide-in-from-left duration-200">
            <NavContent />
          </div>
        </div>
      )}
    </>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { navItems } from "@/lib/data";
import { Button } from "@/components/ui/Button";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out-expo",
        isScrolled
          ? "bg-noir/95 backdrop-blur-xl py-3 border-b border-or/10"
          : "bg-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 border border-or flex items-center justify-center transition-colors group-hover:bg-or/10">
              <span className="font-serif text-lg font-medium text-or">JS</span>
            </div>
            <span className="hidden sm:block font-serif text-sm tracking-[0.3em] uppercase text-ivoire">
              Property
            </span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center gap-10">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "relative font-sans text-xs font-medium uppercase tracking-[0.15em] py-2 transition-colors",
                    pathname === item.href ? "text-or" : "text-ivoire hover:text-or"
                  )}
                >
                  {item.label}
                  {pathname === item.href && (
                    <span className="absolute -bottom-1 left-0 w-full h-px bg-or" />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link href="/contact">
              <Button variant="primary" size="sm">
                Contactez-nous
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-ivoire hover:text-or transition-colors"
            aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "lg:hidden fixed inset-0 top-[72px] bg-noir/98 backdrop-blur-xl transition-all duration-500 ease-out-expo",
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        <nav className="flex flex-col items-center justify-center h-full gap-8">
          {navItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "font-serif text-3xl text-ivoire hover:text-or transition-all duration-300",
                isMobileMenuOpen && "animate-fade-in-up",
                pathname === item.href && "text-or"
              )}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className={cn(
              "mt-4",
              isMobileMenuOpen && "animate-fade-in-up"
            )}
            style={{ animationDelay: "0.4s" }}
          >
            <Button variant="primary" size="lg">
              Contactez-nous
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}

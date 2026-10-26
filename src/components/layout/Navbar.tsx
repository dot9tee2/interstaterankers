"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Menu, Phone, Headphones, MapPin, TrendingUp, ChevronDown, Code, Palette, Smartphone, Share2, PenLine, MousePointerClick, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedBorder } from "@/components/ui/animated-border";
import { primaryCta } from "@/data/cta";

const iconButtonClass = "flex items-center justify-center w-10 h-10 rounded-full border border-border bg-muted text-foreground hover:bg-accent-cyan/10 hover:text-accent-cyan hover:border-accent-cyan/50 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showServicesMenu, setShowServicesMenu] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [focusedServiceIndex, setFocusedServiceIndex] = useState(-1);
  const pathname = usePathname();
  const menuContainerRef = useRef<HTMLDivElement | null>(null);
  const serviceLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const enterTimeoutRef = useRef<number | null>(null);
  const leaveTimeoutRef = useRef<number | null>(null);



  const openWithDelay = () => {
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
    enterTimeoutRef.current = window.setTimeout(() => setShowServicesMenu(true), 80);
  };

  const closeWithDelay = () => {
    if (enterTimeoutRef.current) {
      clearTimeout(enterTimeoutRef.current);
      enterTimeoutRef.current = null;
    }
    leaveTimeoutRef.current = window.setTimeout(() => setShowServicesMenu(false), 120);
  };

  useEffect(() => {
    return () => {
      if (enterTimeoutRef.current) clearTimeout(enterTimeoutRef.current);
      if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!menuContainerRef.current) return;
      if (!menuContainerRef.current.contains(e.target as Node)) {
        setShowServicesMenu(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  // Scroll handler for navbar shrink
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard navigation for services dropdown
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!showServicesMenu) return;

    const totalServices = 6; // We show 6 services in dropdown

    switch (e.key) {
      case "Escape":
        setShowServicesMenu(false);
        setFocusedServiceIndex(-1);
        break;
      case "ArrowDown":
        e.preventDefault();
        setFocusedServiceIndex((prev) => {
          const next = prev < totalServices - 1 ? prev + 1 : 0;
          serviceLinksRef.current[next]?.focus();
          return next;
        });
        break;
      case "ArrowUp":
        e.preventDefault();
        setFocusedServiceIndex((prev) => {
          const next = prev > 0 ? prev - 1 : totalServices - 1;
          serviceLinksRef.current[next]?.focus();
          return next;
        });
        break;
      case "ArrowRight":
        e.preventDefault();
        setFocusedServiceIndex((prev) => {
          const next = prev < 3 ? prev + 3 : prev; // Move to right column
          serviceLinksRef.current[next]?.focus();
          return next;
        });
        break;
      case "ArrowLeft":
        e.preventDefault();
        setFocusedServiceIndex((prev) => {
          const next = prev >= 3 ? prev - 3 : prev; // Move to left column
          serviceLinksRef.current[next]?.focus();
          return next;
        });
        break;
    }
  }, [showServicesMenu]);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services", hasDropdown: true },
    { name: "Insights", href: "/insights" },
    { name: "Pricing", href: "/pricing" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  // One distinct icon per service
  const services = [
    { name: "Search Engine Optimization", href: "/services/seo", icon: TrendingUp, description: "Search optimization & ranking" },
    { name: "Google My Business Optimization", href: "/services/gmb", icon: MapPin, description: "Own your local map pack" },
    { name: "Web Development", href: "/services/web-development", icon: Code, description: "Fast, modern, conversion-focused sites" },
    { name: "Answering Services", href: "/services/answering", icon: Headphones, description: "Human-led answering with AI backup" },
    { name: "Calling Services", href: "/services/calling", icon: Phone, description: "Outbound calling & follow-ups" },
    { name: "Content Marketing", href: "/services/content-marketing", icon: PenLine, description: "Content that attracts and converts" },
    { name: "Social Media Marketing", href: "/services/social-media", icon: Share2, description: "Grow reach across social platforms" },
    { name: "PPC Management", href: "/services/ppc", icon: MousePointerClick, description: "Paid traffic that delivers ROI" },
    { name: "Graphic Designing", href: "/services/graphic-design", icon: Palette, description: "Brand-first creative that stands out" },
    { name: "App Development", href: "/services/app-development", icon: Smartphone, description: "iOS & Android apps that scale" },
  ];

  return (
    <AnimatedBorder
      borderWidth={1}
      borderRadius="rounded-full"
      className="fixed top-4 left-0 right-0 z-50 mx-auto w-[calc(100%-2rem)] md:w-[95%] max-w-7xl shadow-2xl"
      innerClassName="bg-background/95 backdrop-blur-lg"
    >
      <nav className="w-full h-full">
        <div className={cn(
          "w-full h-full rounded-full px-6 flex items-center justify-between transition-all duration-300 py-2"
        )}>
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/InterStateRankerLogo.png"
              alt="Interstate Rankers logo"
              width={160}
              height={32}
              priority
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          {/* space-x-6 below xl leaves room for the labeled CTA at 1024px */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={item.hasDropdown ? openWithDelay : undefined}
                onMouseLeave={item.hasDropdown ? closeWithDelay : undefined}
                onKeyDown={item.hasDropdown ? handleKeyDown : undefined}
              >
                {item.hasDropdown ? (
                  <button
                    className={cn(
                      "relative flex items-center space-x-1 text-sm font-medium tracking-wide transition-transform duration-200 hover:scale-105 hover-accent-cyan-dark",
                      pathname && pathname.startsWith("/services")
                        ? "active-accent-cyan"
                        : "text-foreground/80"
                    )}
                    aria-haspopup="menu"
                    aria-expanded={showServicesMenu}
                    onClick={() => setShowServicesMenu((v) => !v)}
                  >
                    <span>{item.name}</span>
                    <ChevronDown className="h-4 w-4" />
                    {pathname && pathname.startsWith("/services") && (
                      <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent-cyan rounded-full" />
                    )}
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "relative text-sm font-medium tracking-wide transition-transform duration-200 hover:scale-105 hover-accent-cyan-dark",
                      pathname === item.href
                        ? "active-accent-cyan"
                        : "text-foreground/80"
                    )}
                  >
                    {item.name}
                    {pathname === item.href && (
                      <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent-cyan rounded-full" />
                    )}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Centered Desktop Services Dropdown */}
          {showServicesMenu && (
            <div
              role="menu"
              className="hidden lg:block absolute top-[calc(100%+0.75rem)] left-1/2 -translate-x-1/2 w-[900px] rounded-3xl border border-border bg-background p-6 shadow-2xl z-50"
              onMouseEnter={openWithDelay}
              onMouseLeave={closeWithDelay}
            >
              <div className="grid grid-cols-3 gap-8">
                {/* Column 1: Core Services */}
                <div className="flex flex-col gap-3">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 pl-1">Core Services</p>
                  {services.slice(0, 3).map((service, index) => (
                    <Link
                      key={service.name}
                      href={service.href}
                      role="menuitem"
                      ref={(el) => { serviceLinksRef.current[index] = el; }}
                      className="group flex items-start space-x-4 rounded-2xl p-4 transition-all duration-200 hover:bg-muted border border-transparent hover:border-border"
                    >
                      <div className="p-2 rounded-xl bg-accent-cyan/10 text-accent-cyan group-hover:bg-accent-cyan/20 transition-colors">
                        <service.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-foreground/90 group-hover:text-accent-cyan transition-colors">{service.name}</div>
                        <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{service.description}</div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Column 2: Growth Services */}
                <div className="flex flex-col gap-3">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 pl-1">Growth Services</p>
                  {services.slice(3, 6).map((service, index) => (
                    <Link
                      key={service.name}
                      href={service.href}
                      role="menuitem"
                      ref={(el) => { serviceLinksRef.current[index + 3] = el; }}
                      className="group flex items-start space-x-4 rounded-2xl p-4 transition-all duration-200 hover:bg-muted border border-transparent hover:border-border"
                    >
                      <div className="p-2 rounded-xl bg-accent-cyan/10 text-accent-cyan group-hover:bg-accent-cyan/20 transition-colors">
                        <service.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-foreground/90 group-hover:text-accent-cyan transition-colors">{service.name}</div>
                        <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{service.description}</div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Column 3: Need Help Section */}
                <div className="rounded-2xl border border-border bg-card p-6">
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">Need Guidance?</p>

                    <p className="text-sm text-muted-foreground/90 mb-6 leading-relaxed">
                      Unsure which strategy fits your goals? Our experts are ready to build a custom roadmap for you.
                    </p>

                    {/* Phone contact */}
                    <a href="tel:+12816195295" className="flex items-center gap-3 text-sm font-semibold mb-6 hover:text-accent-cyan transition-colors p-3 rounded-xl border border-border bg-background hover:bg-muted">
                      <Phone className="h-4 w-4 text-accent-cyan" />
                      <span>(281) 619-5295</span>
                    </a>

                    <div className="space-y-3">
                      <Button asChild size="sm" variant="outline" className="w-full rounded-xl border-border bg-transparent font-semibold text-foreground hover:bg-muted hover:text-foreground">
                        <Link href="/services">Explore All Services</Link>
                      </Button>
                      <Link href={primaryCta.href} className="flex items-center justify-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors py-1">
                        {primaryCta.label}
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Right side: WhatsApp from lg, the labeled main CTA from md (phones get MobileCTABar on the homepage instead), menu below lg */}
          <div className="flex items-center gap-3">
            {/* WhatsApp Button */}
            <a
              href="https://wa.me/12392919024"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(iconButtonClass, "hidden lg:flex")}
              aria-label="Contact on WhatsApp"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
            </a>

            {/* Main CTA, always in view while scrolling */}
            <Link
              href={primaryCta.href}
              className="hidden md:inline-flex h-10 items-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {primaryCta.label}
            </Link>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-4 mt-8">
                  {navigation.map((item) => (
                    <div key={item.name}>
                      {item.hasDropdown ? (
                        <Collapsible open={isMobileServicesOpen} onOpenChange={setIsMobileServicesOpen}>
                          <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-lg font-medium hover:text-foreground">
                            <span>{item.name}</span>
                            <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", isMobileServicesOpen && "rotate-180")} />
                          </CollapsibleTrigger>
                          <CollapsibleContent className="ml-4 mt-2 space-y-2">
                            {services.map((service) => (
                              <Link
                                key={service.name}
                                href={service.href}
                                className="flex items-center gap-2 py-1 text-sm text-muted-foreground hover:text-foreground"
                                onClick={() => setIsOpen(false)}
                              >
                                <service.icon className="h-4 w-4 text-accent-cyan" />
                                <span>{service.name}</span>
                              </Link>
                            ))}
                          </CollapsibleContent>
                        </Collapsible>
                      ) : (
                        <Link
                          href={item.href}
                          className="block py-2 text-lg font-medium"
                          onClick={() => setIsOpen(false)}
                        >
                          {item.name}
                        </Link>
                      )}
                    </div>
                  ))}
                  <div className="pt-4 space-y-2">
                    <Button asChild variant="outline" className="w-full">
                      <a href="tel:+12816195295">Talk to an Expert</a>
                    </Button>
                    <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                      <Link href={primaryCta.href} onClick={() => setIsOpen(false)}>
                        {primaryCta.label}
                      </Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </AnimatedBorder>
  );
};

export default Navbar;

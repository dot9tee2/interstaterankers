"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Menu, Phone, Headphones, Globe, Search, TrendingUp, ChevronDown, Code, Palette, Smartphone, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";

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
    { name: "Projects", href: "/projects" },
    // { name: "Pricing", href: "/pricing" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const services = [
    { name: "Search Engine Optimization", href: "/services/seo", icon: TrendingUp, description: "Search optimization & ranking" },
    { name: "Google My Business Optimization", href: "/services/gmb", icon: Globe, description: "Own your local map pack" },
    { name: "Web Development", href: "/services/web-development", icon: Code, description: "Fast, modern, conversion-focused sites" },
    { name: "Answering Services", href: "/services/answering", icon: Headphones, description: "24/7 professional call answering" },
    { name: "Calling Services", href: "/services/calling", icon: Phone, description: "Outbound calling & follow-ups" },
    { name: "Content Marketing", href: "/services/content-marketing", icon: Share2, description: "Content that attracts and converts" },
    { name: "Social Media Marketing", href: "/services/social-media", icon: Globe, description: "Grow reach across social platforms" },
    { name: "PPC Management", href: "/services/ppc", icon: Globe, description: "Paid traffic that delivers ROI" },
    { name: "Graphic Designing", href: "/services/graphic-design", icon: Palette, description: "Brand-first creative that stands out" },
    { name: "App Development", href: "/services/app-development", icon: Smartphone, description: "iOS & Android apps that scale" },
  ];

  return (
    <nav className={cn(
      "sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md transition-all duration-300",
      isScrolled ? "py-1" : "py-0"
    )}>
      <div className="container mx-auto px-4">
        <div className={cn(
          "flex items-center justify-between transition-all duration-300",
          isScrolled ? "h-14" : "h-16"
        )}>
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/InterStateRankerLogo.png"
              alt="InterStateRankers logo"
              width={160}
              height={32}
              priority
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <div key={item.name} className="relative">
                {item.hasDropdown ? (
                  <div
                    className="relative"
                    ref={menuContainerRef}
                    onMouseEnter={openWithDelay}
                    onMouseLeave={closeWithDelay}
                    onKeyDown={handleKeyDown}
                  >
                    <button
                      className={cn(
                        "relative flex items-center space-x-1 text-sm font-medium transition-transform duration-200 hover:scale-105 hover-accent-cyan-dark",
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

                    {showServicesMenu && (
                      <div
                        role="menu"
                        className="absolute top-full left-1/2 mt-2 w-[884px] rounded-xl border bg-popover p-5 shadow-xl"
                        style={{ marginLeft: '-442px' }}
                      >
                        <div className="grid grid-cols-3 gap-6">
                          {/* Column 1: First 3 services */}
                          <div className="flex flex-col gap-2">
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">Core Services</p>
                            {services.slice(0, 3).map((service, index) => (
                              <Link
                                key={service.name}
                                href={service.href}
                                role="menuitem"
                                ref={(el) => { serviceLinksRef.current[index] = el; }}
                                className="flex items-start space-x-3 rounded-md p-3 border border-border/40 hover:border-primary/70 hover:bg-primary/5 focus:outline-none focus:border-primary/70 focus:bg-primary/5"
                              >
                                <service.icon className="h-5 w-5 text-accent-cyan mt-0.5 shrink-0" />
                                <div>
                                  <div className="font-medium text-sm">{service.name}</div>
                                  <div className="text-xs text-muted-foreground">{service.description}</div>
                                </div>
                              </Link>
                            ))}
                          </div>

                          {/* Column 2: Next 3 services */}
                          <div className="flex flex-col gap-2">
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">Growth Services</p>
                            {services.slice(3, 6).map((service, index) => (
                              <Link
                                key={service.name}
                                href={service.href}
                                role="menuitem"
                                ref={(el) => { serviceLinksRef.current[index + 3] = el; }}
                                className="flex items-start space-x-3 rounded-md p-3 border border-border/40 hover:border-primary/70 hover:bg-primary/5 focus:outline-none focus:border-primary/70 focus:bg-primary/5"
                              >
                                <service.icon className="h-5 w-5 text-accent-cyan mt-0.5 shrink-0" />
                                <div>
                                  <div className="font-medium text-sm">{service.name}</div>
                                  <div className="text-xs text-muted-foreground">{service.description}</div>
                                </div>
                              </Link>
                            ))}
                          </div>

                          {/* Column 3: Need Help Section */}
                          <div className="border-l border-border pl-5 flex flex-col">
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">Need Help?</p>

                            <p className="text-sm text-muted-foreground mb-4">
                              Not sure which service is right for you? Our team can help you find the perfect solution.
                            </p>

                            {/* Phone contact */}
                            <a href="tel:+12816195295" className="flex items-center gap-2 text-sm font-medium mb-4 hover:text-accent-cyan transition-colors">
                              <Phone className="h-4 w-4 text-accent-cyan" />
                              <span>(281) 619-5295</span>
                            </a>

                            <div className="mt-auto space-y-2">
                              <Link href="/services">
                                <Button size="sm" className="w-full hero-gradient hover-lift text-white">
                                  View All Services
                                </Button>
                              </Link>
                              <Link href="/contact" className="flex items-center justify-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors py-2">
                                Get a Proposal
                                <ChevronDown className="h-4 w-4 rotate-[-90deg]" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "relative text-sm font-medium transition-transform duration-200 hover:scale-105 hover-accent-cyan-dark",
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

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <a href="tel:+12816195295">
              <Button variant="outline" size="sm" className="animate-underline">
                Talk to an Expert
              </Button>
            </a>
            <Link href="/contact">
              <Button size="sm" className="hero-gradient hover-lift text-white">
                Get a Proposal
              </Button>
            </Link>
          </div>

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
                  <a href="tel:+12816195295" className="w-full">
                    <Button variant="outline" className="w-full">
                      Talk to an Expert
                    </Button>
                  </a>
                  <Link href="/contact" className="w-full" onClick={() => setIsOpen(false)}>
                    <Button className="w-full hero-gradient text-white">
                      Get a Proposal
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
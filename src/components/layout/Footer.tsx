import Link from "next/link";
import Image from "next/image";
import { Search, Phone, Mail, MapPin, Instagram, Facebook, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center">
              <Image
                src="/InterStateRankerLogo.png"
                alt="InterStateRankers logo"
                width={128}
                height={32}
                className="h-8 w-auto"
                priority
              />
            </Link>
            <p className="text-sm text-muted-foreground">
              Powering business growth with AI-driven answering services and SEO solutions.
            </p>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Phone className="h-4 w-4" />
              <a href="tel:+12816195295" className="hover:text-foreground transition-colors">(281) 619-5295</a>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Mail className="h-4 w-4" />
              <a href="mailto:info@interstaterankers.com" className="hover:text-foreground transition-colors">info@interstaterankers.com</a>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <Link href="https://instagram.com/interstaterankers" target="_blank" className="p-2 rounded-md border border-border/60 hover:border-primary/40 hover:text-foreground transition-colors" aria-label="Instagram">
                <Instagram className="h-4 w-4" />
              </Link>
              <Link href="https://facebook.com/" target="_blank" className="p-2 rounded-md border border-border/60 hover:border-primary/40 hover:text-foreground transition-colors" aria-label="Facebook">
                <Facebook className="h-4 w-4" />
              </Link>
              <Link href="https://twitter.com/interstaternkrs" target="_blank" className="p-2 rounded-md border border-border/60 hover:border-primary/40 hover:text-foreground transition-colors" aria-label="Twitter">
                <Twitter className="h-4 w-4" />
              </Link>
              <Link href="https://linkedin.com/" target="_blank" className="p-2 rounded-md border border-border/60 hover:border-primary/40 hover:text-foreground transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-body font-semibold">Services</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/services" className="hover:text-foreground transition-colors">Search Engine Optimization</Link></li>
              <li><Link href="/services" className="hover:text-foreground transition-colors">Google My Business Optimization</Link></li>
              <li><Link href="/services" className="hover:text-foreground transition-colors">Web Development</Link></li>
              <li><Link href="/services" className="hover:text-foreground transition-colors">24/7 Answering</Link></li>
              <li><Link href="/services" className="hover:text-foreground transition-colors">Outbound Calling</Link></li>
              <li><Link href="/services" className="hover:text-foreground transition-colors">Content Marketing</Link></li>
              <li><Link href="/services" className="hover:text-foreground transition-colors">Social Media Marketing</Link></li>
              <li><Link href="/services" className="hover:text-foreground transition-colors">PPC Management</Link></li>
              <li><Link href="/services" className="hover:text-foreground transition-colors">Graphic Designing</Link></li>
              <li><Link href="/services" className="hover:text-foreground transition-colors">App Development</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="font-body font-semibold">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-foreground transition-colors">About Us</Link></li>
              <li><Link href="/projects" className="hover:text-foreground transition-colors">Projects</Link></li>
              {/* <li><Link href="/pricing" className="hover:text-foreground transition-colors">Pricing</Link></li> */}
              <li><Link href="/insights" className="hover:text-foreground transition-colors">Insights</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-body font-semibold">Get Started</h3>
            <p className="text-sm text-muted-foreground">
              Ready to grow your business? Contact us today.
            </p>
            <div className="space-y-2">
              <Link
                href="/contact"
                className="block w-full text-center py-2 px-4 bg-primary text-primary-foreground rounded-lg hover-lift text-sm font-medium"
              >
                Get a Proposal
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>&copy; 2024 InterStateRankers. All rights reserved.</p>
            <div className="flex items-center space-x-4 mt-2 md:mt-0">
              <Link href="/sitemap.xml" className="hover:text-foreground transition-colors" rel="sitemap">
                XML Sitemap
              </Link>
              <Link href="/robots.txt" className="hover:text-foreground transition-colors">
                Robots.txt
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
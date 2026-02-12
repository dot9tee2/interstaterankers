"use client";
import { Headphones, TrendingUp, Zap, Radio, Globe, BarChart4, ChevronRight, Smartphone } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";
import { AnimatedBorder } from "@/components/ui/animated-border";

// --- Components ---

const PillarCard = ({
  title,
  description,
  features,
  index,
  icon: Icon
}: {
  title: string;
  description: string;
  features: { text: string; icon: React.ComponentType<{ className?: string }> }[];
  index: number;
  icon: React.ComponentType<{ className?: string }>
}) => {
  return (
    <AnimatedBorder
      borderRadius="rounded-[2rem]"
      borderWidth={2}
      speed={4}
      className="w-full h-full group bg-slate-950 relative z-10"
      innerClassName="h-full relative overflow-hidden p-6 md:p-12 flex flex-col"
    >
      {/* Background Watermark Number */}
      <div className="absolute -right-6 -top-10 text-[12rem] font-bold text-slate-900/50 select-none z-0 leading-none group-hover:transform group-hover:translate-x-2 transition-transform duration-700">
        0{index + 1}
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center gap-4 md:gap-6 mb-8">
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br from-primary to-accent-cyan flex items-center justify-center shadow-lg shadow-primary/25 group-hover:scale-110 transition-transform duration-500">
            <Icon className="w-6 h-6 md:w-8 md:h-8 text-white relative z-10" />
          </div>
          <h3 className="text-xl md:text-3xl font-heading font-bold text-white leading-tight uppercase tracking-tight">
            {title}
          </h3>
        </div>

        <p className="text-lg text-slate-300 leading-relaxed mb-10 border-l-2 border-accent-cyan/30 pl-6">
          {description}
        </p>

        {/* Features List */}
        <ul className="space-y-4 mt-auto">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-4 group/item">
              <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-slate-900/50 border border-slate-700 flex items-center justify-center transition-colors">
                <feature.icon className="w-3.5 h-3.5 text-accent-cyan transition-colors" />
              </div>
              <span className="text-base font-medium text-slate-300 transition-colors">
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </AnimatedBorder>
  );
};

const KeyDifferentiators = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Dark Tech Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.15] -z-20" />

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-20">
          {/* Badge: Cyan */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan text-sm font-bold uppercase tracking-wider mb-6">
            <Zap className="w-4 h-4" />
            Dominating The Market
          </div>
          {/* H2: Solid Primary Color for 'Dominance' */}
          <h2 className="text-3xl md:text-6xl font-heading font-black gradient-text mb-6 uppercase tracking-tight">
            The Two Pillars of Dominance
          </h2>
          <p className="text-xl text-slate-100 max-w-2xl mx-auto leading-relaxed">
            We don't just "do marketing". We build infrastructure that forces growth.
          </p>
        </div>

        {/* Pillars Grid - 3 Column Layout */}
        <div className="hidden lg:grid grid-cols-[0.5fr_auto_0.5fr] gap-0 max-w-7xl mx-auto items-center">

          {/* Left Card */}
          <PillarCard
            index={0}
            icon={Headphones}
            title="B2B/B2C Lead Generation"
            description="Stop chasing leads. Our AI infrastructure captures, qualifies, and books appointments for you—24/7."
            features={[
              { text: "Instant Response AI Voice Agents", icon: Smartphone },
              { text: "Multi-Channel Outreach (SMS, Email, Voice)", icon: Radio },
              { text: "Live CRM Dashboard to Track Every Dollar", icon: BarChart4 },
              { text: "Automated Appointment Booking", icon: ChevronRight },
            ]}
          />

          {/* Center Hub */}
          <div className="flex items-center justify-center px-4 relative h-full">
            {/* Logo Hub */}
            <div className="relative z-10 shrink-0">
              <div className="relative w-24 h-24 bg-slate-950 rounded-full border-2 border-accent-cyan/50 shadow-[0_0_40px_rgba(var(--accent-cyan),0.4)] flex items-center justify-center p-3">
                <img
                  src="/logo-preloader.png"
                  alt="Interstate Rankers Hub"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>

          {/* Right Card */}
          <PillarCard
            index={1}
            icon={Globe}
            title="Google My Business Optimization"
            description="Own your backyard. We deploy aggressive SEO strategies that push competitors off the map."
            features={[
              { text: "Google Map Pack Dominance", icon: Globe },
              { text: "Competitor Displacement Strategy", icon: Zap },
              { text: "Review Generation System", icon: Smartphone },
              { text: "Hyper-Local SEO Ranking", icon: TrendingUp },
            ]}
          />
        </div>

        {/* Mobile Layout - Cards stacked */}
        <div className="lg:hidden space-y-8">
          <PillarCard
            index={0}
            icon={Headphones}
            title="B2B/B2C Lead Generation"
            description="Stop chasing leads. Our AI infrastructure captures, qualifies, and books appointments for you—24/7."
            features={[
              { text: "Instant Response AI Voice Agents", icon: Smartphone },
              { text: "Multi-Channel Outreach (SMS, Email, Voice)", icon: Radio },
              { text: "Live CRM Dashboard to Track Every Dollar", icon: BarChart4 },
              { text: "Automated Appointment Booking", icon: ChevronRight },
            ]}
          />
          <PillarCard
            index={1}
            icon={Globe}
            title="Google My Business Optimization"
            description="Own your backyard. We deploy aggressive SEO strategies that push competitors off the map."
            features={[
              { text: "Google Map Pack Dominance", icon: Globe },
              { text: "Competitor Displacement Strategy", icon: Zap },
              { text: "Review Generation System", icon: Smartphone },
              { text: "Hyper-Local SEO Ranking", icon: TrendingUp },
            ]}
          />
        </div>
      </div>
    </section>
  );
};

export default KeyDifferentiators;
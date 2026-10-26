"use client";
import { useEffect, useState } from "react";
// Same figures as the homepage Results section
import { stats } from "@/data/proof";
import { SectionHeader } from "@/components/ui/section-header";

const StatsResults = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('stats-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const AnimatedCounter = ({ value, prefix = "", suffix = "", duration = 2000 }) => {
    const [displayValue, setDisplayValue] = useState(prefix + (typeof value === 'string' ? value : '0') + suffix);

    useEffect(() => {
      if (!isVisible) return;

      // If value is a string (like "95 - 98"), just display it directly
      if (typeof value === 'string') {
        setDisplayValue(prefix + value + suffix);
        return;
      }

      // For numeric values, animate from 0 to the target
      let startTime = 0;
      const startValue = 0;
      const endValue = value;

      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = (timestamp - startTime) / duration;

        if (progress < 1) {
          const current = startValue + (endValue - startValue) * easeOutCubic(progress);
          setDisplayValue(prefix + Math.floor(current).toLocaleString() + suffix);
          requestAnimationFrame(animate);
        } else {
          setDisplayValue(prefix + endValue.toLocaleString() + suffix);
        }
      };

      requestAnimationFrame(animate);
    }, [value, duration, prefix, suffix]);

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    return (
      <span className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground tabular-nums" aria-hidden="true">
        {displayValue}
        <span className="sr-only">{prefix}{value}{suffix}</span>
      </span>
    );
  };

  return (
    // No borders of its own: the About page's divide-y draws the separators
    <section id="stats-section" className="py-20 sm:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader
          className="mb-12 md:mb-16"
          eyebrow="Results"
          title="Results that speak"
          description="Numbers don't lie. See the measurable impact we've delivered for growing businesses."
        />

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center animate-slide-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Number */}
              <div className="mb-4">
                <AnimatedCounter
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  duration={2000 + index * 200}
                />
              </div>

              {/* Label */}
              <h3 className="text-lg font-semibold mb-2">{stat.label}</h3>

              {/* Description */}
              <p className="text-sm text-muted-foreground">{stat.description}</p>

              {/* Accent Line */}
              <div className="mt-4 mx-auto w-12 h-1 bg-accent-cyan rounded-full" />
            </div>
          ))}
        </div>

        {/* Bottom Message */}
        <div className="text-center mt-12 md:mt-16">
          <div className="inline-flex items-center gap-2 bg-card border border-border rounded-full px-6 py-3">
            <div className="w-2 h-2 bg-accent-cyan rounded-full" />
            <span className="text-sm font-medium">
              Your business could be next • Join the growth revolution
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsResults;
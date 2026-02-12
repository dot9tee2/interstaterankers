import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Phone, TrendingUp } from "lucide-react";
import { getFeaturedProjects } from "@/lib/projects";


const FeaturedProjects = async () => {
  const projects = await getFeaturedProjects(3);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-body font-bold mb-6 gradient-text">
            Success Stories
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real businesses achieving extraordinary growth with our proven strategies.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-12">
          {projects.map((project, index) => (
            <Link
              href={`/projects/${project.slug.current}`}
              key={project._id}
              className="group relative animate-slide-up"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Card */}
              <div className="relative h-full p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-500 card-tilt glow-card flex flex-col">
                {/* Image */}


                {/* Header */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-body font-bold">{project.title}</h3>
                    {project.industry ? (
                      <Badge variant="secondary" className="text-xs">
                        {project.industry}
                      </Badge>
                    ) : null}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">

                  </div>
                </div>

                {/* Results */}
                {project.summary ? (
                  <div className="mb-4">
                    <div className="inline-flex items-center space-x-2 bg-accent-amber/10 border border-accent-amber/20 rounded-lg px-3 py-2 mb-3">
                      <TrendingUp className="w-4 h-4 text-accent-amber" />
                      <span className="text-sm font-semibold text-accent-amber">Featured case study</span>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {project.summary}
                    </p>
                  </div>
                ) : null}

                {/* Stats */}
                {/* If you add stats to featured previews, render them here */}

                {/* Hover Icon */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ExternalLink className="w-4 h-4 text-muted-foreground" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button asChild size="lg" className="hero-gradient hover-lift text-white font-semibold">
            <a href="tel:+12816195295">
              <Phone className="mr-2 h-5 w-5" />
              Call (281) 619-5295
            </a>
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            Free consultation • No commitment required
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
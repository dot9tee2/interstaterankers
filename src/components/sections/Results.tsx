import { SectionHeader } from "@/components/ui/section-header";
import { stats, testimonials } from "@/data/proof";

// The proof step of the homepage: a raised band right before pricing. No button of its own, since the pricing
// cards directly below are the next action.
export default function Results() {
  return (
    <section aria-labelledby="results-heading" className="bg-card py-20 sm:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader
          id="results-heading"
          className="mb-12 md:mb-16"
          eyebrow="Results"
          title="Numbers, not promises."
          description="The measurable impact of our work for the growing businesses we partner with."
        />

        {/* gap-px over a border-colored background draws one hairline between cells in both the 2x2 and 1x4 layouts */}
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border lg:grid-cols-4">
          {stats.map((stat) => (
            // Smaller number and padding below sm, so "<90 days" stays on one line in a phone-width 2x2 cell
            <div key={stat.label} className="flex flex-col bg-background p-4 text-center sm:p-6 md:p-8">
              <dt className="text-base font-semibold text-foreground">{stat.label}</dt>
              <dd className="order-first mb-4 whitespace-nowrap text-3xl font-semibold tracking-tight text-foreground tabular-nums sm:text-4xl md:text-5xl">
                {stat.prefix}{stat.value}{stat.suffix}
              </dd>
              <dd className="mt-1 text-sm text-muted-foreground">{stat.description}</dd>
            </div>
          ))}
        </dl>

        {/* Shown side by side rather than in a carousel, so every quote is seen */}
        {testimonials.length > 0 && (
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {testimonials.map((testimonial) => (
              <figure key={testimonial.author} className="flex flex-col rounded-2xl border border-border bg-background p-6">
                <blockquote className="flex-1 text-lg leading-relaxed text-foreground">“{testimonial.quote}”</blockquote>
                <p className="mt-6 text-sm font-semibold text-brand">{testimonial.result}</p>
                <figcaption className="mt-6 border-t border-border pt-6">
                  <p className="font-semibold text-foreground">{testimonial.author}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {testimonial.role}, {testimonial.company} · {testimonial.industry}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

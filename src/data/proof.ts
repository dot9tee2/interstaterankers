// Every proof claim the site makes lives here, so the homepage and the About page can't contradict each other.
// Only add numbers and quotes you can back up.

export const clientCount = 50;

export const guarantee = {
  title: "180-day growth guarantee",
  text: "If you don't see significant growth within 180 days, we'll keep working with you at no additional cost until you do.",
};

export type Stat = {
  value: number;
  prefix?: string;
  suffix: string;
  label: string;
  description: string;
};

export const stats: Stat[] = [
  { value: 95, suffix: "%", label: "Calls answered", description: "Never miss another lead" },
  { value: 60, prefix: "+", suffix: "%", label: "Lead conversion", description: "From Google My Business" },
  { value: 90, prefix: "<", suffix: " days", label: "SEO wins", description: "Time to first page rankings" },
  { value: clientCount, suffix: "+", label: "Growing businesses", description: "Trust Interstate Rankers" },
];

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  company: string;
  industry: string;
  result: string;
};

// Real client quotes only: invented testimonials are deceptive under the FTC's rule on reviews and testimonials.
// The homepage Results section shows these in a grid, and leaves the grid out while the list is empty.
export const testimonials: Testimonial[] = [];

export const videoTestimonials: {
  src: string;
  name: string;
  company: string;
  captions: string;
}[] = [];

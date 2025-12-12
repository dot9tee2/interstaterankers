"use client";

import dynamic from "next/dynamic";

const TestimonialsComponent = dynamic(() => import("./Testimonials"), { 
  ssr: false,
  loading: () => <div className="animate-pulse bg-muted/20 h-48 rounded-lg" />
});

interface TestimonialsProps {
  compact?: boolean;
  className?: string;
}

const Testimonials = (props: TestimonialsProps) => {
  return <TestimonialsComponent {...props} />;
};

export default Testimonials;


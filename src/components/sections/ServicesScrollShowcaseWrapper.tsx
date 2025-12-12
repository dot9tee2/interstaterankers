"use client";

import dynamic from "next/dynamic";

const ServicesScrollShowcase = dynamic(() => import("./ServicesScrollShowcase"), { 
  ssr: false 
});

export default ServicesScrollShowcase;


"use client";

import dynamic from "next/dynamic";

const HomeScrollNarrative = dynamic(() => import("./HomeScrollNarrative"), { 
  ssr: false 
});

export default HomeScrollNarrative;


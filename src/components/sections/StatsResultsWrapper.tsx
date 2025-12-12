"use client";

import dynamic from "next/dynamic";

const StatsResults = dynamic(() => import("./StatsResults"), { 
  ssr: false,
  loading: () => <div className="animate-pulse bg-muted/20 h-32 rounded-lg" />
});

export default StatsResults;


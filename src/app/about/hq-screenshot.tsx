"use client";

import Image from "next/image";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const screenshot = "/showcase/isr-hq-overview.webp";
const description = "Interstate HQ client workspace showing service metrics, dated work updates, and website management";

export default function HQScreenshot() {
  return (
    <Dialog>
      <DialogTrigger className="block w-full overflow-hidden rounded-2xl border border-border bg-card text-left hover:border-accent-cyan/60 focus-visible:ring-2 focus-visible:ring-accent-cyan">
        <span className="flex flex-wrap justify-between gap-2 border-b border-border px-4 py-3 text-sm">
          <span className="font-semibold">Interstate HQ</span>
          <span className="text-muted-foreground">Demo workspace · Enlarge</span>
        </span>
        <Image src={screenshot} alt={description} width={1440} height={1000} sizes="(min-width: 1024px) 50vw, 100vw" className="h-auto w-full" />
      </DialogTrigger>
      <DialogContent className="w-[calc(100%-2rem)] max-w-6xl rounded-xl p-4">
        <DialogTitle className="pr-8">Interstate HQ demo workspace</DialogTitle>
        <DialogDescription className="sr-only">Actual Interstate HQ interface with fictional data.</DialogDescription>
        <Image src={screenshot} alt={description} width={1440} height={1000} sizes="(min-width: 1200px) 1120px, 95vw" className="max-h-[75dvh] w-full object-contain" />
      </DialogContent>
    </Dialog>
  );
}

"use client";

import { useState } from "react";
import { Monitor, Smartphone, Tablet, ExternalLink, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LivePreviewProps {
    url: string;
}

type Device = "desktop" | "tablet" | "mobile";

export default function LivePreview({ url }: LivePreviewProps) {
    const [device, setDevice] = useState<Device>("desktop");
    const [isLoading, setIsLoading] = useState(true);
    const [key, setKey] = useState(0); // Force iframe reload

    const deviceStyles = {
        desktop: "w-full max-w-full h-[800px]",
        tablet: "w-[768px] h-[1024px]",
        mobile: "w-[375px] h-[667px]",
    };

    const handleReload = () => {
        setIsLoading(true);
        setKey((prev) => prev + 1);
    };

    return (
        <section className="py-12 bg-muted/20 border-y border-border/40">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center gap-6">
                    <div className="text-center space-y-2">
                        <h2 className="text-2xl font-bold font-body">Live Preview</h2>
                        <p className="text-muted-foreground text-sm">
                            Interact with the live site. Note: Some sites may block embedding.
                        </p>
                    </div>

                    {/* Toolbar */}
                    <div className="flex items-center gap-2 p-1.5 bg-card border border-border rounded-full shadow-sm">
                        <Button
                            variant={device === "desktop" ? "default" : "ghost"}
                            size="sm"
                            onClick={() => setDevice("desktop")}
                            className="rounded-full"
                            title="Desktop View"
                        >
                            <Monitor className="w-4 h-4 mr-2" />
                            Desktop
                        </Button>
                        <Button
                            variant={device === "tablet" ? "default" : "ghost"}
                            size="sm"
                            onClick={() => setDevice("tablet")}
                            className="rounded-full"
                            title="Tablet View"
                        >
                            <Tablet className="w-4 h-4 mr-2" />
                            Tablet
                        </Button>
                        <Button
                            variant={device === "mobile" ? "default" : "ghost"}
                            size="sm"
                            onClick={() => setDevice("mobile")}
                            className="rounded-full"
                            title="Mobile View"
                        >
                            <Smartphone className="w-4 h-4 mr-2" />
                            Mobile
                        </Button>
                        <div className="w-px h-6 bg-border mx-1" />
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleReload}
                            className="rounded-full"
                            title="Reload Preview"
                        >
                            <RefreshCw className="w-4 h-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            asChild
                            className="rounded-full"
                            title="Open in New Tab"
                        >
                            <a href={url} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="w-4 h-4" />
                            </a>
                        </Button>
                    </div>

                    {/* Iframe Container */}
                    <div className="w-full overflow-x-auto flex justify-center py-8 bg-dot-pattern rounded-3xl border border-border/40 min-h-[500px]">
                        <div
                            className={cn(
                                "transition-all duration-500 ease-in-out bg-background shadow-2xl overflow-hidden relative border border-border/20",
                                deviceStyles[device],
                                device === "mobile" || device === "tablet" ? "rounded-[2rem] border-8 border-gray-800" : "rounded-lg"
                            )}
                        >
                            {isLoading && (
                                <div className="absolute inset-0 flex items-center justify-center bg-background z-10">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                                </div>
                            )}
                            <iframe
                                key={key}
                                src={url}
                                className="w-full h-full border-0 bg-white"
                                onLoad={() => setIsLoading(false)}
                                title="Live Preview"
                                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

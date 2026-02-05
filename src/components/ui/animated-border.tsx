import React from "react";
import { cn } from "@/lib/utils";

export interface AnimatedBorderProps {
    children: React.ReactNode;
    /** Border width in pixels (default: 3) */
    borderWidth?: number;
    /** Animation speed preset or custom duration in seconds */
    speed?: "slow" | "normal" | "fast" | number;
    /** Preset theme or custom background gradient */
    backgroundGradient?: "default" | "purple" | "blue" | "emerald" | string;
    /** Preset theme or custom conic gradient colors for the animated border */
    borderGradient?: "default" | "purple" | "blue" | "emerald" | "rainbow" | string;
    /** Border radius class (default: rounded-2xl) */
    borderRadius?: string;
    /** Pause the animation */
    disabled?: boolean;
    /** Additional classes for the outer container */
    className?: string;
    /** Additional classes for the inner container */
    innerClassName?: string;
}

// Preset themes
const BACKGROUND_GRADIENTS = {
    default: "linear-gradient(45deg, #172033, #1e293b 50%, #172033)",
    purple: "linear-gradient(45deg, #1a0d2e, #581c87 50%, #1a0d2e)",
    blue: "linear-gradient(45deg, #0a1628, #1e3a8a 50%, #0a1628)",
    emerald: "linear-gradient(45deg, #022c22, #064e3b 50%, #022c22)",
};

const BORDER_GRADIENTS = {
    default: "conic-gradient(from var(--border-angle), #4755697a 80%, #6366f1 86%, #a5b4fc 90%, #6366f1 94%, #4755697a)",
    purple: "conic-gradient(from var(--border-angle), #9333ea7a 80%, #a855f7 86%, #f0abfc 90%, #a855f7 94%, #9333ea7a)",
    blue: "conic-gradient(from var(--border-angle), #2563eb7a 80%, #3b82f6 86%, #67e8f9 90%, #3b82f6 94%, #2563eb7a)",
    emerald: "conic-gradient(from var(--border-angle), #0596697a 80%, #10b981 86%, #86efac 90%, #10b981 94%, #0596697a)",
    rainbow: "conic-gradient(from var(--border-angle), #ef4444, #f97316, #eab308, #22c55e, #3b82f6, #6366f1, #a855f7, #ef4444)",
};

const SPEED_PRESETS = {
    slow: 5,
    normal: 3.5,
    fast: 2,
};

export const AnimatedBorder: React.FC<AnimatedBorderProps> = ({
    children,
    borderWidth = 3,
    speed = "normal",
    backgroundGradient = "default",
    borderGradient = "default",
    borderRadius = "rounded-2xl",
    disabled = false,
    className = "",
    innerClassName = "",
}) => {
    // Resolve speed to a number
    const animationDuration = typeof speed === "number"
        ? speed
        : SPEED_PRESETS[speed];

    // Resolve gradients (use preset if it exists, otherwise treat as custom)
    const resolvedBgGradient =
        backgroundGradient in BACKGROUND_GRADIENTS
            ? BACKGROUND_GRADIENTS[backgroundGradient as keyof typeof BACKGROUND_GRADIENTS]
            : backgroundGradient;

    const resolvedBorderGradient =
        borderGradient in BORDER_GRADIENTS
            ? BORDER_GRADIENTS[borderGradient as keyof typeof BORDER_GRADIENTS]
            : borderGradient;

    return (
        <div
            className={cn(
                borderRadius,
                "border-transparent border-solid",
                disabled && "opacity-70",
                className
            )}
            style={{
                borderWidth: `${borderWidth}px`,
                background: `${resolvedBgGradient} padding-box, ${resolvedBorderGradient} border-box`,
                animation: disabled ? "none" : `border-spin ${animationDuration}s linear infinite`,
            }}
        >
            <div className={cn("w-full h-full", borderRadius, innerClassName)}>
                {children}
            </div>
        </div>
    );
};
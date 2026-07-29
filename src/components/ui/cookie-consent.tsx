"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export const COOKIE_CONSENT_EVENT = "cookie-consent-changed"

export function getCookieConsent(): "accepted" | "rejected" | null {
    if (typeof document === "undefined") return null
    const row = document.cookie.split('; ').find(row => row.startsWith('cookie-consent='))
    const value = row?.split('=')[1]
    return value === "accepted" || value === "rejected" ? value : null
}

export function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        setIsVisible(getCookieConsent() === null)
    }, [])

    const setConsent = (value: "accepted" | "rejected") => {
        document.cookie = `cookie-consent=${value}; path=/; max-age=31536000` // 1 year
        setIsVisible(false)
        window.dispatchEvent(new Event(COOKIE_CONSENT_EVENT))
    }

    if (!isVisible) return null

    return (
        <div
            className={cn(
                "fixed bottom-4 left-4 right-4 z-50 w-auto md:left-4 md:right-auto md:w-full md:max-w-sm rounded-lg border bg-background p-4 shadow-lg transition-all duration-300 ease-in-out",
                "animate-in slide-in-from-bottom-5 fade-in-0"
            )}
        >
            <div className="flex flex-col gap-4">
                <div className="space-y-2">
                    <h3 className="text-lg font-semibold leading-none tracking-tight">
                        Cookie Consent
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        We use cookies for analytics and advertising to enhance your experience. You can accept or reject non-essential cookies. See our{" "}
                        <Link href="/privacy-policy" className="underline hover:text-foreground">
                            Privacy Policy
                        </Link>{" "}
                        for details.
                    </p>
                </div>
                <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setConsent("rejected")} className="w-full sm:w-auto">
                        Reject
                    </Button>
                    <Button onClick={() => setConsent("accepted")} className="w-full sm:w-auto">
                        Accept
                    </Button>
                </div>
            </div>
        </div>
    )
}

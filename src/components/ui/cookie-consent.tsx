"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const consent = document.cookie.split('; ').find(row => row.startsWith('cookie-consent='))
        if (!consent) {
            setIsVisible(true)
        }
    }, [])

    const acceptCookies = () => {
        document.cookie = "cookie-consent=true; path=/; max-age=31536000" // 1 year
        setIsVisible(false)
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
                        We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.
                    </p>
                </div>
                <div className="flex justify-end gap-2">
                    <Button onClick={acceptCookies} className="w-full sm:w-auto">
                        Accept
                    </Button>
                </div>
            </div>
        </div>
    )
}

"use client"

import { Button } from "@/components/ui/button"
import { Share2, Linkedin, Twitter, Facebook, Check, Link as LinkIcon } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

interface SocialShareProps {
    url: string
    title: string
}

export function SocialShare({ url, title }: SocialShareProps) {
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(url)
            setCopied(true)
            toast.success("Link copied to clipboard")
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            toast.error("Failed to copy link")
        }
    }

    const shareLinks = {
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    }

    return (
        <div className="flex gap-4">
            {/* LinkedIn */}
            <Button
                variant="outline"
                size="icon"
                className="rounded-full hover:bg-[#0077b5] hover:text-white hover:border-[#0077b5] transition-colors duration-300"
                onClick={() => window.open(shareLinks.linkedin, '_blank', 'width=600,height=600')}
                title="Share on LinkedIn"
            >
                <Linkedin className="w-4 h-4" />
            </Button>

            {/* Twitter / X */}
            <Button
                variant="outline"
                size="icon"
                className="rounded-full hover:bg-black hover:text-white hover:border-black transition-colors duration-300"
                onClick={() => window.open(shareLinks.twitter, '_blank', 'width=600,height=600')}
                title="Share on X (Twitter)"
            >
                <Twitter className="w-4 h-4" />
            </Button>

            {/* Facebook */}
            <Button
                variant="outline"
                size="icon"
                className="rounded-full hover:bg-[#1877f2] hover:text-white hover:border-[#1877f2] transition-colors duration-300"
                onClick={() => window.open(shareLinks.facebook, '_blank', 'width=600,height=600')}
                title="Share on Facebook"
            >
                <Facebook className="w-4 h-4" />
            </Button>

            {/* Copy Link */}
            <Button
                variant="outline"
                size="icon"
                className="rounded-full hover:bg-accent-cyan hover:text-black hover:border-accent-cyan transition-colors duration-300"
                onClick={handleCopy}
                title="Copy Link"
            >
                {copied ? (
                    <Check className="w-4 h-4" />
                ) : (
                    <LinkIcon className="w-4 h-4" />
                )}
            </Button>
        </div>
    )
}

"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import TeamAvatar from "./team-avatar";
import styles from "./about.module.css";
import { team } from "@/data/team";



function TeamMember({ member }: { member: typeof team[number] }) {
    const [hovered, setHovered] = useState(false);
    const [focused, setFocused] = useState(false);
    const [open, setOpen] = useState(false);
    const greeting = (hovered || focused) && !open;
    return (
        <li id={member.slug} className="min-w-0 scroll-mt-28">
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <button type="button" className={styles.teamMember} aria-label={`Meet ${member.name}, ${member.role}`}
                        onPointerEnter={(event) => { if (event.pointerType === "mouse") setHovered(true); }}
                        onPointerLeave={() => setHovered(false)}
                        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}>
                        <span className={styles.portrait}>
                            <TeamAvatar color={member.color} portrait={member.portrait} greeting={greeting} />
                            <span className={styles.greeting} data-visible={greeting} aria-hidden="true">{member.greeting}</span>
                        </span>
                        <span className={styles.memberCopy}>
                            <span className="block text-base font-semibold text-foreground">{member.name}</span>
                            <span className="mt-1 block text-sm text-muted-foreground">{member.role}</span>
                            <span className={styles.meetLink}>Meet {member.name.split(" ")[0]} <span aria-hidden="true">↗</span></span>
                        </span>
                    </button>
                </DialogTrigger>
                <DialogContent className="max-h-[85dvh] w-[calc(100%-2rem)] overflow-y-auto rounded-2xl border-border bg-card p-7 sm:p-8" data-lenis-prevent>
                    <div className="mx-auto h-40 w-52"><TeamAvatar color={member.color} portrait={member.portrait} /></div>
                    <div className="text-center">
                        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent-cyan">Meet the team</p>
                        <DialogTitle className="text-2xl leading-tight">{member.name}</DialogTitle>
                        <p className="mt-2 text-sm text-brand">{member.role}</p>
                    </div>
                    <p className="text-center text-sm font-medium text-brand">{member.greeting}</p>
                    <DialogDescription className="text-base leading-relaxed">{member.detail}</DialogDescription>
                    <div className="border-t border-border pt-4">
                        <h3 className="text-sm font-semibold">Focus</h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{member.focus}</p>
                    </div>
                    <a href="/contact" className="mt-2 rounded-lg bg-primary px-4 py-3 text-center text-sm font-semibold text-primary-foreground hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">Talk to our team <span aria-hidden="true">↗</span></a>
                </DialogContent>
            </Dialog>
        </li>
    );
}

export default function TeamMembers() {
    return <ul className={styles.teamGrid}>{team.map(member => <TeamMember key={member.name} member={member} />)}</ul>;
}

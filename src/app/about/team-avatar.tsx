"use client";

import { useEffect, useRef } from "react";
import styles from "./team-avatars.module.css";

const avatarHair = [
    "M58 57V42q0-22 22-22t22 22v14l-8-18q-12 13-31 9z",
    "M58 55V40q0-21 22-21 17 0 23 19l-7 15-4-13-28 2z",
    "M57 55V43q-4-8 3-13 0-10 11-9 8-7 16-1 11-2 13 9 8 5 3 14v12l-8-14H65z",
    "M58 56V41q2-18 23-20 16 1 21 17v17l-8-15-17 5-12-3z",
    "M58 56V39q2-13 17-17l7-7 3 7 10-3-1 7q9 6 8 17v13l-8-16-14 4-15-3z",
    "M58 56V39q0-17 22-17 19 0 22 17v17l-7-16q-15 8-30 0z",
];

export default function TeamAvatar({ color, portrait, greeting = false }: { color: string; portrait: number; greeting?: boolean }) {
    const ref = useRef<SVGSVGElement>(null);

    useEffect(() => {
        const avatar = ref.current;
        if (!avatar || !("IntersectionObserver" in window)) return;
        let visible = false;
        const update = () => { avatar.dataset.active = String(visible && !document.hidden); };
        const observer = new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
            update();
        }, { threshold: 0 });
        observer.observe(avatar);
        document.addEventListener("visibilitychange", update);
        return () => {
            observer.disconnect();
            document.removeEventListener("visibilitychange", update);
        };
    }, []);

    return (
        <svg ref={ref} aria-hidden="true" viewBox="0 0 160 120" className={`h-full w-full max-w-56 ${styles.avatar}`} data-portrait={portrait} data-greeting={greeting}>
            <circle cx="80" cy="61" r="48" fill={color} opacity=".12" />
            <circle cx="80" cy="61" r="43" fill="none" stroke={color} strokeDasharray="3 5" opacity=".65" />
            <g className={styles.character}>
            <path d="M46 104q2-20 23-25h22q21 5 23 25z" fill={color} />
            <path d="m67 81 13 18 13-18" fill="#1e1b4b" />
            <rect x="73" y="68" width="14" height="17" rx="6" fill="#a78bfa" />
            <rect x="59" y="30" width="42" height="48" rx="20" fill="#e0d8ff" />
            <path d={avatarHair[portrait]} fill="#211c49" />
            {(portrait === 1 || portrait === 4) && (
                <>
                    <path d="M57 54v-8a23 23 0 0 1 46 0v8M102 60v5l-12 5" fill="none" stroke="#22d3ee" strokeWidth="2.5" strokeLinecap="round" />
                    <rect x="54" y="51" width="7" height="12" rx="3" fill="#4338ca" />
                    <rect x="99" y="51" width="7" height="12" rx="3" fill="#4338ca" />
                    {portrait === 4 && <path d="m57 93-4 3 4 3m6-6 4 3-4 3" fill="none" stroke="#211c49" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />}
                </>
            )}
            <path d="M70 55h3m14 0h3m-14 11q4 3 8 0" fill="none" stroke="#211c49" strokeLinecap="round" strokeWidth="2" />
            {portrait === 1 || portrait === 4 ? (
                <path d="M65 51h13v9H65zm17 0h13v9H82zm-4 3h4" fill="none" stroke="#4338ca" strokeWidth="1.5" />
            ) : null}
            <g className={styles.hand} fill="#e0d8ff" stroke="#211c49" strokeWidth="1.5">
                <path d="M105 95q-2-3-4-1l-3 5q-2 5 3 7l5-1q3-2 1-5Z" />
            </g>
            </g>
            <g fill="#151925" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                {portrait === 0 && <g className={styles.bubble}>
                    <path d="M111 18h30q4 0 4 4v18q0 4-4 4h-18l-9 7 2-7h-5q-4 0-4-4V22q0-4 4-4Z" />
                    <path className={styles.words} d="M115 27h21m-21 8h14" />
                </g>}
                {portrait === 1 && <g>
                    <circle className={styles.signal} cx="111" cy="47" r="3" fill={color} stroke="none" />
                    <path className={styles.wave} d="M120 39q7 8 0 16m6-21q12 13 0 26" fill="none" />
                </g>}
                {portrait === 2 && <g className={styles.sheet}>
                    <rect x="108" y="56" width="34" height="46" rx="3" />
                    <path d="M117 65h16m-8 12h9m-9 13h9" />
                    <path className={styles.check} d="m113 76 3 3 5-6m-8 16 3 3 5-6" fill="none" />
                </g>}
                {portrait === 3 && <g>
                    <rect x="110" y="55" width="38" height="40" rx="3" />
                    <path d="M115 88h28" />
                    <path className={styles.barOne} d="M119 84V77" strokeWidth="4" />
                    <path className={styles.barTwo} d="M128 84V69" strokeWidth="4" />
                    <path className={styles.barThree} d="M137 84V62" strokeWidth="4" />
                </g>}
                {(portrait === 4 || portrait === 5) && <g>
                    <path d="M48 96h48l5 17H43Z" />
                    <path className={styles.keys} d="M54 102h5m5 0h5m5 0h5m5 0h5m-33 5h30" />
                </g>}
                {portrait === 4 && <g className={styles.code}>
                    <rect x="112" y="20" width="36" height="29" rx="4" />
                    <path d="m122 29-5 5 5 5m16-10 5 5-5 5m-10 3 4-16" fill="none" />
                </g>}
                {portrait === 5 && <g>
                    <rect x="112" y="26" width="32" height="23" rx="4" />
                    <path className={styles.words} d="M117 33h21m-21 8h13" />
                    <path className={styles.send} d="m119 27 20-8-6 20-4-9Z m10-11-10 11" fill={color} />
                </g>}
            </g>
        </svg>
    );
}


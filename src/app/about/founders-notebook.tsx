import styles from "./founders-notebook.module.css";

function Sketch({ kind }: { kind: "work" | "connection" | "progress" }) {
    return (
        <svg viewBox="0 0 180 76" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={styles.sketch}>
            {kind === "work" && <>
                <path d="m28 15 82-3 3 49-83 2Zm7 8 66-2M40 33l5 5 9-11m-14 20 5 5 9-11m11-9 30-1m-30 17 23-1M124 57l18-37 6 3-18 37-8 6Z" />
                <path d="m16 68 133-2" />
            </>}
            {kind === "connection" && <>
                <path d="M33 25a10 10 0 1 0 1 0m-19 38q1-20 19-19t18 19m83-38a10 10 0 1 0 1 0m-19 38q1-20 19-19t18 19M60 39q26-8 48 0m-7-8 8 8-9 6" />
            </>}
            {kind === "progress" && <>
                <path d="m22 15 129-2-2 53-128 1Zm0 12 127-2M31 21h1m7 0h1m7 0h1M33 41l4 4 7-9m8 4 32-1m-51 15 4 4 7-9m8 4 22-1m28-17 34-1-1 23-33 1Z" />
            </>}
        </svg>
    );
}

export default function FoundersNotebook() {
    return (
        <section aria-labelledby="founding-story" className="py-20 sm:py-24">
            <div className="container mx-auto max-w-6xl px-4 md:px-6">
                <div className={styles.heading}>
                    <p>Our story / A founders’ notebook</p>
                    <span aria-hidden="true">A note from us to you</span>
                </div>
                <article className={styles.paper}>
                    <header className={styles.header}>
                        <p className={styles.kicker}>Interstate Rankers · From the founders</p>
                        <h2 id="founding-story">Good work starts<br />with being closer.</h2>
                    </header>
                    <p className={styles.salutation}>To the people building a business,</p>
                    <div className={styles.entry}>
                        <p>Before Interstate Rankers, each of us spent years working at other marketing agencies. That’s where we learned the work, from building websites to helping businesses get found. It’s also where we learned what clients needed from the people doing it: <strong>care, clarity, and someone who takes responsibility.</strong></p>
                        <aside className={styles.note} aria-label="Margin note">
                            <Sketch kind="work" />
                            <p>Know the work.<br />Care who it’s for.</p>
                        </aside>
                    </div>
                    <div className={styles.entry}>
                        <p>Over time, we grew frustrated with the quality clients were getting and the layers between them and the people doing the work. Too often, those layers made it harder to see what they were paying for. <strong>We wanted to close that distance.</strong></p>
                        <aside className={styles.note} aria-label="Margin note">
                            <Sketch kind="connection" />
                            <p>Less distance.<br />More conversation.</p>
                        </aside>
                    </div>
                    <div className={styles.entry}>
                        <p>So we started Interstate Rankers to work closer to our clients and stand behind what we deliver. That idea still shapes how we share progress, explain decisions, and build tools like Interstate HQ. You should be able to see <strong>what’s done, what’s in progress, and what comes next.</strong></p>
                        <aside className={styles.note} aria-label="Margin note">
                            <Sketch kind="progress" />
                            <p>Make the work visible.<br />Keep the door open.</p>
                        </aside>
                    </div>
                    <footer className={styles.signature}>
                        <p>That’s the kind of team we’re building.</p>
                        <p className={styles.signed}>The Interstate Rankers founders</p>
                        <span>Websites, software, and search. With people behind them.</span>
                    </footer>
                    <div className={styles.postscript}>
                        <span>P.S.</span>
                        <p>That idea has a home now. <a href="#interstate-hq">Take a look inside Interstate HQ <span aria-hidden="true">↗</span></a></p>
                    </div>
                </article>
            </div>
        </section>
    );
}

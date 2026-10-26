import { Search, Settings2, CalendarDays } from "lucide-react";
import styles from "./GbpVisuals.module.css";

const icons = [Search, Settings2, CalendarDays];

export default function ServiceMilestones({ items }: { items: { label: string; title: string; text: string }[] }) {
  return <ol className={styles.milestones}>{items.map((item, i) => { const Icon = icons[i] ?? CalendarDays; return <li key={item.title}><span className={styles.milestoneIcon}><Icon size={22} aria-hidden="true" /></span><p className={styles.eyebrow}>{item.label}</p><h3>{item.title}</h3><p>{item.text}</p></li>; })}</ol>;
}

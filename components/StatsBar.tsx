import StatCounter from "./StatCounter";
import { stats } from "@/lib/site";

export default function StatsBar() {
  return (
    <section className="bg-brand-black">
      <div className="container-x py-14 md:py-20 grid grid-cols-2 lg:grid-cols-4 gap-10">
        {stats.map((s) => (
          <StatCounter key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
        ))}
      </div>
    </section>
  );
}

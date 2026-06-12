'use client';
import { useEffect, useRef, useState } from 'react';

const stats = [
  { end: 2400, suffix: '+', label: 'Happy Guests' },
  { end: 350,  suffix: '+', label: 'Menu Items'   },
  { end: 12,   suffix: '',  label: 'Years Open'   },
  { end: 24,   suffix: '',  label: 'Awards Won'   },
];

function Counter({ end, suffix }: { end: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const dur = 1800;
        const start = performance.now();
        const step = (t: number) => {
          const p = Math.min((t - start) / dur, 1);
          setCount(Math.floor(p * end));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.5 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [end]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export default function StatsSection() {
  return (
    <section style={{ position: 'relative', padding: '120px 0', overflow: 'hidden' }}>
      {/* Parallax bg */}
      <div className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('/images/dish-croquettes.webp')" }} />
      <div className="absolute inset-0" style={{ background: 'rgba(15,22,32,0.88)' }} />

      {/* Green top accent */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: 'linear-gradient(90deg, transparent, var(--green), transparent)',
        opacity: 0.5,
      }} />

      <div className="container-w relative z-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4" style={{ gap: 0 }}>
          {stats.map((s, i) => (
            <div key={s.label} style={{
              textAlign: 'center', padding: '24px 20px',
              borderRight: i < 3 ? '1px solid rgba(255,255,255,0.07)' : 'none',
              borderLeft: i === 0 ? '1px solid rgba(255,255,255,0.07)' : 'none',
            }}>
              <span className="stat-num">
                <Counter end={s.end} suffix={s.suffix} />
              </span>
              <p style={{
                fontFamily: 'var(--sans)', fontSize: 10, fontWeight: 600,
                letterSpacing: '4px', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.40)', marginTop: 12,
              }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

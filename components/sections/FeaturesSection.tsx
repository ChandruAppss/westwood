'use client';
import { useEffect, useRef } from 'react';

const features = [
  {
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
      </svg>
    ),
    title: 'Daily Fresh Menus',
    desc: 'Our chefs create new seasonal menus every day using the freshest ingredients sourced from trusted local farms.',
  },
  {
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: 'Premium Ingredients',
    desc: 'Every dish is crafted from carefully selected premium ingredients — no shortcuts, no compromises.',
  },
  {
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path d="M9 12l2 2 4-4"/><path d="M21 12c-1 0-3-1-3-3V5a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v4c0 2-2 3-3 3v2c1 0 3 1 3 3v4a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-4c0-2 2-3 3-3v-2z"/>
      </svg>
    ),
    title: 'Craft Cocktails',
    desc: 'Our award-winning bartenders shake and stir exceptional cocktails that complement every course perfectly.',
  },
  {
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: 'Warm Hospitality',
    desc: 'Our team is trained to anticipate every need, ensuring every visit feels personal, relaxed, and memorable.',
  },
  {
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6M9 12h6M9 15h4"/>
      </svg>
    ),
    title: 'Private Dining',
    desc: 'Host intimate celebrations, corporate dinners, and special occasions in our elegant private dining rooms.',
  },
  {
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path d="M8 22H6a2 2 0 0 1-2-2V7l2-5h8l2 5v13a2 2 0 0 1-2 2h-2"/><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
      </svg>
    ),
    title: 'Wine Selection',
    desc: 'Explore our curated cellar of 200+ wines — old world classics and new world discoveries for every palate.',
  },
];

export default function FeaturesSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll('.fade-up').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="features" ref={ref} className="sec" style={{ background: 'var(--bg-2)' }}>
      <div className="container-w">

        {/* Heading */}
        <div className="text-center fade-up" style={{ marginBottom: 64 }}>
          <span className="label">What We Offer</span>
          <h2 style={{ fontSize: 'clamp(28px,3.5vw,46px)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '3px', marginBottom: 16 }}>
            What We Can Do For You
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginTop: 20 }}>
            <div style={{ width: 50, height: 1, background: 'rgba(113,184,95,0.25)' }} />
            <div style={{ width: 6, height: 6, background: 'var(--green)', borderRadius: '50%' }} />
            <div style={{ width: 50, height: 1, background: 'rgba(113,184,95,0.25)' }} />
          </div>
        </div>

        {/* 3-column grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div key={f.title} className={`fcard fade-up delay-${(i % 3) + 1}`}>
              <span className="fcard-num">0{i + 1}</span>
              <div className="fcard-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

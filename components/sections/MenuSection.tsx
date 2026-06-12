'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import menuData from '@/data/menu.json';

export default function MenuSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.08 }
    );
    ref.current?.querySelectorAll('.fade-up').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  const active = menuData.categories[activeIdx];

  return (
    <section id="menu" className="menu-section" ref={ref}>
      <div className="menu-bg-layer" style={{ backgroundImage: `url('${active.bgImage}')`, transition: 'background-image 0.6s' }} />
      <div className="menu-overlay" />

      <div className="container-w relative z-10">

        {/* Heading */}
        <div className="text-center fade-up" style={{ marginBottom: 52 }}>
          <span className="label">Special Menu Offers</span>
          <h2 style={{ fontSize: 'clamp(28px,3.5vw,46px)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '3px', color: '#fff' }}>
            Try Our Specialities
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginTop: 20 }}>
            <div style={{ width: 50, height: 1, background: 'rgba(113,184,95,0.25)' }} />
            <div style={{ width: 6, height: 6, background: 'var(--green)', borderRadius: '50%' }} />
            <div style={{ width: 50, height: 1, background: 'rgba(113,184,95,0.25)' }} />
          </div>
        </div>

        {/* Horizontal tabs */}
        <div className="menu-tabs fade-up delay-1">
          {menuData.categories.map((cat, i) => (
            <button
              key={cat.id}
              className={`menu-tab-btn${activeIdx === i ? ' active' : ''}`}
              onClick={() => setActiveIdx(i)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Image card grid — 4 columns */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 fade-up delay-2">
          {active.items.map((item, i) => (
            <div key={i} className="mc">
              {/* Food image */}
              <div className="mc-img">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={300} height={225}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="mc-img-overlay" />
              </div>

              {/* Card body */}
              <div className="mc-body">
                <div className="mc-name">{item.name}</div>
                <div className="mc-desc">{item.description}</div>
                <div className="mc-footer">
                  <span className="mc-price">{item.price}</span>
                  <span className="mc-cal" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z"/><path d="M12 6v6l4 2"/>
                    </svg>
                    35 min
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 52, justifyContent: 'center' }} className="fade-up delay-3">
          <a href="#reservation" className="btn-primary">
            Reserve a Table
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
          <a href="#" className="btn-secondary">
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Download PDF Menu
          </a>
        </div>
      </div>
    </section>
  );
}

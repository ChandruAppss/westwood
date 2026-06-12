'use client';
import { useEffect, useRef } from 'react';
import socials from '@/data/socials.json';

interface HeroProps { onReservation: () => void; }

export default function HeroSection({ onReservation }: HeroProps) {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (bgRef.current) bgRef.current.style.transform = `translateY(${window.scrollY * 0.22}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const socList = [
    { key: 'facebook',  label: 'Facebook',  fill: true,
      d: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' },
    { key: 'instagram', label: 'Instagram', fill: false, d: '' },
    { key: 'tiktok',    label: 'TikTok',    fill: true,
      d: 'M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.8a8.18 8.18 0 0 0 4.77 1.52V6.87a4.85 4.85 0 0 1-1-.18z' },
  ];

  return (
    <section id="home" className="hero-wrap">
      {/* Parallax bg */}
      <div ref={bgRef} className="hero-bg"
        style={{ backgroundImage: "url('/images/dish-lamb-chops.webp')" }} />
      <div className="hero-overlay" />
      <div className="hero-deco hero-deco-top" />
      <div className="hero-deco hero-deco-bottom" />

      {/* Social sidebar */}
      <div className="hero-socials">
        {socList.map(s =>
          s.key === 'instagram' ? (
            <a key="instagram" href={socials.instagram} target="_blank" rel="noopener noreferrer"
              aria-label="Instagram" className="hero-soc">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <rect x="2" y="2" width="20" height="20" rx="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
          ) : (
            <a key={s.key} href={socials[s.key as keyof typeof socials]}
              target="_blank" rel="noopener noreferrer" aria-label={s.label} className="hero-soc">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d={s.d}/>
              </svg>
            </a>
          )
        )}
      </div>

      {/* Centre content */}
      <div className="container-w relative z-10 w-full">
        <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center' }}>

          {/* Green tag */}
          <div style={{ marginBottom: 24 }}>
            <span className="tag-badge">Premium Dining · Bangkok</span>
          </div>

          {/* Main title */}
          <h1 style={{
            fontFamily: 'var(--sans)',
            fontSize: 'clamp(36px, 5.5vw, 70px)',
            fontWeight: 700, lineHeight: 1.0,
            letterSpacing: '4px', textTransform: 'uppercase',
            color: '#fff', marginBottom: 12,
          }}>
            Best Dishes &amp;
          </h1>
          <h1 style={{
            fontFamily: 'var(--sans)',
            fontSize: 'clamp(36px, 5.5vw, 70px)',
            fontWeight: 300, lineHeight: 1.0,
            letterSpacing: '4px', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.55)', marginBottom: 32,
          }}>
            Ingredients
          </h1>

          {/* Green line ornament */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 28 }}>
            <div style={{ width: 60, height: 1, background: 'rgba(113,184,95,0.35)' }} />
            <div style={{ width: 6, height: 6, background: 'var(--green)', borderRadius: '50%' }} />
            <div style={{ width: 60, height: 1, background: 'rgba(113,184,95,0.35)' }} />
          </div>

          {/* Subtext */}
          <p style={{
            color: 'rgba(255,255,255,0.55)',
            fontSize: 14, lineHeight: 1.9, letterSpacing: '0.5px',
            maxWidth: 480, margin: '0 auto 44px',
          }}>
            Always delivering an amazing dining experience — where European craft meets the warmth of Bangkok.
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#menu" className="btn-primary">
              Explore Menu
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <button onClick={onReservation} className="btn-secondary">
              Book a Table
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, zIndex: 10,
      }}>
        <div className="scroll-mouse"><div className="scroll-wheel" /></div>
        <span style={{
          fontFamily: 'var(--sans)', fontSize: 9,
          letterSpacing: '4px', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.30)',
        }}>Scroll</span>
      </div>
    </section>
  );
}

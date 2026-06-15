'use client';
import { useEffect, useRef, useState } from 'react';
import socials from '@/data/socials.json';

interface HeroProps { onReservation: () => void; }

/* Ken Burns fallback slides — shown while video loads or on browsers that block autoplay */
const slides = [
  { src: '/images/dish-lamb-chops.webp',      pos: 'center 40%' },
  { src: '/images/dish-shrimp-pasta.webp',    pos: 'center 50%' },
  { src: '/images/drinks-cocktails.webp',     pos: 'center 30%' },
  { src: '/images/dish-chicken-wings-1.webp', pos: 'center 45%' },
  { src: '/images/dish-croquettes.webp',      pos: 'center 35%' },
  { src: '/images/dish-chicken-rolls.webp',   pos: 'center 40%' },
  { src: '/images/dish-chicken-wings-2.webp', pos: 'center 50%' },
  { src: '/images/dish-club-sandwich.webp',   pos: 'center 45%' },
  { src: '/images/dish-onion-rings.webp',     pos: 'center 35%' },
  { src: '/images/drinks-cocktails-2.webp',   pos: 'center 30%' },
];

const DURATION = 5000;

export default function HeroSection({ onReservation }: HeroProps) {
  const videoRef  = useRef<HTMLVideoElement>(null);
  const [videoOk, setVideoOk]  = useState(false);
  const [current, setCurrent]  = useState(0);
  const [prev,    setPrev]     = useState<number | null>(null);

  /* Try to play the video; if it fails, Ken Burns takes over */
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.play()
      .then(() => setVideoOk(true))
      .catch(() => setVideoOk(false));
  }, []);

  /* Ken Burns timer — only runs when video isn't playing */
  useEffect(() => {
    if (videoOk) return;
    const t = setInterval(() => {
      setCurrent(c => { setPrev(c); return (c + 1) % slides.length; });
    }, DURATION);
    return () => clearInterval(t);
  }, [videoOk]);

  const socList = [
    { key: 'facebook',  label: 'Facebook',  fill: true,
      d: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' },
    { key: 'instagram', label: 'Instagram', fill: false, d: '' },
    { key: 'tiktok',    label: 'TikTok',    fill: true,
      d: 'M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.8a8.18 8.18 0 0 0 4.77 1.52V6.87a4.85 4.85 0 0 1-1-.18z' },
  ];

  return (
    <section id="home" className="hero-wrap">

      <style>{`
        @keyframes kb-zoom-in  { 0%{transform:scale(1.00) translate(0,0)}    100%{transform:scale(1.12) translate(-1%,-1%)} }
        @keyframes kb-zoom-out { 0%{transform:scale(1.12) translate(1%,1%)}  100%{transform:scale(1.00) translate(0,0)}    }
        @keyframes kb-pan-left { 0%{transform:scale(1.10) translate(2%,0)}   100%{transform:scale(1.10) translate(-2%,0)}  }
        @keyframes kb-pan-right{ 0%{transform:scale(1.10) translate(-2%,0)}  100%{transform:scale(1.10) translate(2%,0)}   }
        @keyframes kb-fade-in  { 0%{opacity:0} 100%{opacity:1} }
        @keyframes kb-fade-out { 0%{opacity:1} 100%{opacity:0} }
        .kb-slide { position:absolute; inset:0; overflow:hidden; }
        .kb-slide-img { position:absolute; inset:-8%; background-size:cover; will-change:transform; }
        .kb-slide.active  { z-index:2; animation:kb-fade-in  1.2s ease forwards; }
        .kb-slide.leaving { z-index:1; animation:kb-fade-out 1.2s ease forwards; }
        .kb-slide.hidden  { z-index:0; opacity:0; }
        .kb-slide:nth-child(odd)  .kb-slide-img { animation:kb-zoom-in   ${DURATION+1200}ms ease-in-out forwards; }
        .kb-slide:nth-child(even) .kb-slide-img { animation:kb-pan-left  ${DURATION+1200}ms ease-in-out forwards; }
      `}</style>

      {/* ── Video background (primary) ── */}
      <video
        ref={videoRef}
        autoPlay muted loop playsInline
        poster="/images/dish-lamb-chops.webp"
        style={{
          position: 'absolute', inset: 0, zIndex: videoOk ? 2 : -1,
          width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center',
          opacity: videoOk ? 1 : 0,
          transition: 'opacity 0.8s ease',
        }}
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* ── Ken Burns fallback (shows while video loads) ── */}
      {!videoOk && slides.map((slide, i) => {
        const state = i === current ? 'active' : i === prev ? 'leaving' : 'hidden';
        return (
          <div key={i} className={`kb-slide ${state}`}>
            <div className="kb-slide-img" style={{ backgroundImage: `url('${slide.src}')`, backgroundPosition: slide.pos }} />
          </div>
        );
      })}

      {/* Overlay + decorations */}
      <div className="hero-overlay" style={{ zIndex: 3 }} />
      <div className="hero-deco hero-deco-top"    style={{ zIndex: 4 }} />
      <div className="hero-deco hero-deco-bottom" style={{ zIndex: 4 }} />

      {/* Social sidebar */}
      <div className="hero-socials" style={{ zIndex: 10 }}>
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
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d={s.d}/></svg>
            </a>
          )
        )}
      </div>

      {/* Centre content */}
      <div className="container-w w-full" style={{ position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center' }}>

          <div style={{ marginBottom: 24 }}>
            <span className="tag-badge">Premium Dining · Bangkok</span>
          </div>

          <h1 style={{
            fontFamily: 'var(--sans)', fontSize: 'clamp(36px,5.5vw,70px)',
            fontWeight: 700, lineHeight: 1.0, letterSpacing: '4px',
            textTransform: 'uppercase', color: '#fff', marginBottom: 12,
          }}>
            Best Dishes &amp;
          </h1>
          <h1 style={{
            fontFamily: 'var(--sans)', fontSize: 'clamp(36px,5.5vw,70px)',
            fontWeight: 300, lineHeight: 1.0, letterSpacing: '4px',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.50)', marginBottom: 32,
          }}>
            Ingredients
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 28 }}>
            <div style={{ width: 60, height: 1, background: 'rgba(113,184,95,0.35)' }} />
            <div style={{ width: 6, height: 6, background: 'var(--green)', borderRadius: '50%' }} />
            <div style={{ width: 60, height: 1, background: 'rgba(113,184,95,0.35)' }} />
          </div>

          <p style={{
            color: 'rgba(255,255,255,0.52)', fontSize: 14, lineHeight: 1.9,
            letterSpacing: '0.5px', maxWidth: 480, margin: '0 auto 44px',
          }}>
            Always delivering an amazing dining experience — where European craft meets the warmth of Bangkok.
          </p>

          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#menu" className="btn-primary">
              Explore Menu
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <button onClick={onReservation} className="btn-secondary">Book a Table</button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, zIndex: 10,
      }}>
        <div className="scroll-mouse"><div className="scroll-wheel" /></div>
        <span style={{ fontFamily: 'var(--sans)', fontSize: 9, letterSpacing: '4px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)' }}>Scroll</span>
      </div>
    </section>
  );
}

'use client';
import { useEffect, useRef, useState } from 'react';

const testimonials = [
  {
    name: 'Sophia M.',
    role: 'Food Critic, Bangkok Post',
    stars: 5,
    quote: "Westwood is simply exceptional. The braised lamb shank was the finest I've had in Bangkok — tender, rich, beautifully presented. Warm and refined without being stuffy.",
  },
  {
    name: 'James T.',
    role: 'Regular Guest',
    stars: 5,
    quote: "We celebrated our anniversary at Westwood and it exceeded every expectation. The cocktails were inventive, the food extraordinary, and the staff made us feel like royalty.",
  },
  {
    name: 'Nadia P.',
    role: 'Travel Blogger',
    stars: 5,
    quote: "Of all the restaurants I visited in Bangkok, Westwood stood out completely. The shrimp pasta and chicken wings are must-orders. An absolute gem in the city.",
  },
];

export default function TestimonialsSection() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.12 }
    );
    ref.current?.querySelectorAll('.fade-up').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="testimonials" ref={ref}
      style={{ position: 'relative', overflow: 'hidden', padding: '120px 0' }}>
      <div className="absolute inset-0 bg-cover bg-fixed bg-center"
        style={{ backgroundImage: "url('/images/drinks-cocktails-2.webp')" }} />
      <div className="absolute inset-0" style={{ background: 'rgba(15,22,32,0.92)' }} />

      <div className="container-w relative z-10">

        {/* Heading */}
        <div className="text-center fade-up" style={{ marginBottom: 60 }}>
          <span className="label">Guest Reviews</span>
          <h2 style={{ fontSize: 'clamp(28px,3.5vw,46px)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '3px', color: '#fff' }}>
            What Our Guests Say
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginTop: 20 }}>
            <div style={{ width: 50, height: 1, background: 'rgba(113,184,95,0.25)' }} />
            <div style={{ width: 6, height: 6, background: 'var(--green)', borderRadius: '50%' }} />
            <div style={{ width: 50, height: 1, background: 'rgba(113,184,95,0.25)' }} />
          </div>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i}
              className={`tcard fade-up delay-${i + 1}${active === i ? ' active' : ''}`}
              onClick={() => setActive(i)} role="button" tabIndex={0}>
              <div className="tcard-stars">{'★'.repeat(t.stars)}</div>
              <blockquote>&ldquo;{t.quote}&rdquo;</blockquote>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 42, height: 42, borderRadius: '50%', flexShrink: 0,
                  background: 'rgba(113,184,95,0.15)',
                  border: '1px solid rgba(113,184,95,0.30)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--sans)', fontSize: 16, color: 'var(--green)', fontWeight: 700,
                }}>
                  {t.name[0]}
                </div>
                <div>
                  <p style={{ color: '#fff', fontSize: 13, fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 3 }}>{t.name}</p>
                  <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 11, letterSpacing: '1px' }}>{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dot nav */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 44 }}>
          {testimonials.map((_, i) => (
            <button key={i} onClick={() => setActive(i)} aria-label={`Slide ${i + 1}`}
              style={{
                width: active === i ? 24 : 8, height: 8, borderRadius: 4, padding: 0,
                background: active === i ? 'var(--green)' : 'rgba(255,255,255,0.18)',
                border: 'none', cursor: 'pointer', transition: 'all 0.3s',
              }} />
          ))}
        </div>
      </div>
    </section>
  );
}

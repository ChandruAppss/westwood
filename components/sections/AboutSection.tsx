'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import contact from '@/data/contact.json';

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll('.fade-up').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div id="about" ref={ref} style={{ background: 'var(--bg)' }}>

      {/* ── Story row ── */}
      <section style={{ padding: '120px 0', background: 'var(--bg)' }}>
        <div className="container-w">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Image */}
            <div className="about-img-wrapper fade-up" style={{ position: 'relative' }}>
              <Image
                src="/images/dish-chicken-wings-1.webp"
                alt="Westwood dining"
                width={620} height={580}
                className="w-full h-full object-cover"
              />
              <div className="about-img-border" />
              <div style={{
                position: 'absolute', bottom: 32, left: -16,
                background: 'var(--bg-dark)',
                border: '1px solid rgba(113,184,95,0.25)',
                padding: '18px 28px',
              }}>
                <div style={{ fontSize: 32, fontWeight: 700, color: 'var(--green)', letterSpacing: '1px', lineHeight: 1 }}>12+</div>
                <div style={{ fontSize: 10, letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.40)', marginTop: 4 }}>Years of Excellence</div>
              </div>
            </div>

            {/* Text */}
            <div className="fade-up delay-2">
              <span className="label">About Us</span>
              <h2 style={{ fontSize: 'clamp(28px,3.5vw,46px)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '3px', marginBottom: 8 }}>
                Westwood
              </h2>
              <h2 style={{ fontSize: 'clamp(28px,3.5vw,46px)', fontWeight: 300, textTransform: 'uppercase', letterSpacing: '3px', color: 'rgba(255,255,255,0.30)', marginBottom: 32 }}>
                Restaurant
              </h2>

              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 32 }}>
                <div style={{ width: 40, height: 2, background: 'var(--green)' }} />
                <div style={{ width: 8, height: 8, background: 'var(--green)', borderRadius: '50%' }} />
              </div>

              <p style={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.9, marginBottom: 20, fontSize: 14 }}>
                Westwood blends contemporary elegance with genuine comfort — a place where every detail, from the handpicked ingredients to the warmly lit ambiance, is crafted to deliver an unforgettable experience.
              </p>
              <p style={{ color: 'rgba(255,255,255,0.40)', lineHeight: 1.9, marginBottom: 36, fontSize: 14 }}>
                Rooted in European culinary tradition and elevated by the richness of Bangkok's finest produce, our kitchen is led by chefs who believe that great food is an act of love.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginBottom: 40, padding: '24px 0', borderTop: '1px solid rgba(255,255,255,0.07)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                {[['2.4k+','Happy Guests'],['350+','Menu Items'],['12+','Awards Won']].map(([n,l]) => (
                  <div key={l} style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--green)', letterSpacing: '1px' }}>{n}</div>
                    <div style={{ fontSize: 10, letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginTop: 4 }}>{l}</div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <a href="#menu" className="btn-primary">Explore Menu</a>
                <a href="#reservation" className="btn-secondary">Book a Table</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Quote + Hours split ── */}
      <div className="about-split">

        {/* Quote panel */}
        <div className="about-quote">
          <div className="absolute inset-0 bg-cover bg-center bg-fixed"
            style={{ backgroundImage: "url('/images/dish-shrimp-pasta.webp')" }} />
          <div className="absolute inset-0" style={{ background: 'rgba(15,22,32,0.88)' }} />
          <div style={{ position: 'relative', zIndex: 10 }}>
            <div style={{ fontSize: 72, color: 'var(--green)', fontWeight: 700, lineHeight: 0.8, marginBottom: 20, opacity: 0.5 }}>&ldquo;</div>
            <blockquote style={{
              fontFamily: 'var(--sans)', fontSize: 'clamp(16px,1.8vw,22px)',
              color: '#fff', lineHeight: 1.7, fontWeight: 300, letterSpacing: '0.5px', marginBottom: 28,
            }}>
              Great food is the story of where we come from, where we are, and where we want to be.
            </blockquote>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 36, height: 2, background: 'var(--green)' }} />
              <div>
                <div style={{ color: '#fff', fontWeight: 600, fontSize: 13, letterSpacing: '2px', textTransform: 'uppercase' }}>Chef James Westwood</div>
                <div style={{ color: 'rgba(255,255,255,0.40)', fontSize: 10, letterSpacing: '3px', textTransform: 'uppercase', marginTop: 4 }}>Executive Chef &amp; Founder</div>
              </div>
            </div>
          </div>
        </div>

        {/* Hours panel */}
        <div className="about-hours">
          <span className="label">Opening Hours</span>
          <h3 style={{ fontSize: 'clamp(18px,2vw,28px)', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: '#fff', marginBottom: 32 }}>
            Visit Us Anytime
          </h3>

          <div style={{ marginBottom: 32 }}>
            {[
              { day: 'Monday – Thursday', time: '11:00 – 22:00' },
              { day: 'Friday – Saturday',  time: '11:00 – 23:00' },
              { day: 'Sunday',             time: '12:00 – 21:00' },
            ].map(h => (
              <div key={h.day} className="hours-row">
                <span className="hours-day">{h.day}</span>
                <span className="hours-time">{h.time}</span>
              </div>
            ))}
          </div>

          <div style={{ padding: '18px 22px', border: '1px solid rgba(113,184,95,0.18)', background: 'rgba(113,184,95,0.05)', marginBottom: 32 }}>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7 }}>
              Reservations recommended on weekends. Walk-ins welcome based on availability.
            </p>
          </div>

          <div style={{ marginBottom: 8, fontSize: 10, letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>
            Call Us
          </div>
          <a href={`tel:${contact.phoneRaw}`} className="tel-link">{contact.phone}</a>
          <a href="#reservation" className="btn-primary">Reserve a Table</a>
        </div>
      </div>
    </div>
  );
}

'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import galleryData from '@/data/gallery.json';

export default function GallerySection() {
  const ref = useRef<HTMLElement>(null);
  const [open,  setOpen]  = useState(false);
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.06 }
    );
    ref.current?.querySelectorAll('.fade-up').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="gallery" ref={ref} className="sec" style={{ background: 'var(--bg-2)' }}>
      <div className="container-w">

        {/* Heading */}
        <div className="text-center fade-up" style={{ marginBottom: 56 }}>
          <span className="label">Visual Experience</span>
          <h2 style={{
            fontSize: 'clamp(28px,3.5vw,46px)', fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '3px', color: '#fff',
          }}>
            Our Gallery
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginTop: 20 }}>
            <div style={{ width: 50, height: 1, background: 'rgba(113,184,95,0.25)' }} />
            <div style={{ width: 6, height: 6, background: 'var(--green)', borderRadius: '50%' }} />
            <div style={{ width: 50, height: 1, background: 'rgba(113,184,95,0.25)' }} />
          </div>
        </div>

        {/* Uniform 4-column grid with framed cells */}
        <div
          className="fade-up delay-1"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 12,
          }}
        >
          {galleryData.images.map((img, i) => (
            <div
              key={i}
              onClick={() => { setIndex(i); setOpen(true); }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                position: 'relative',
                aspectRatio: '1 / 1',
                overflow: 'hidden',
                cursor: 'pointer',
                background: 'var(--bg-card)',
                /* Frame: border + inset ring on hover */
                border: hovered === i
                  ? '2px solid var(--green)'
                  : '2px solid rgba(255,255,255,0.07)',
                transition: 'border-color 0.35s, box-shadow 0.35s',
                boxShadow: hovered === i
                  ? '0 8px 32px rgba(0,0,0,0.40), inset 0 0 0 1px rgba(113,184,95,0.25)'
                  : '0 2px 8px rgba(0,0,0,0.20)',
              }}
            >
              {/* Image */}
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
                style={{
                  objectFit: 'cover',
                  transition: 'transform 0.55s ease',
                  transform: hovered === i ? 'scale(1.08)' : 'scale(1.00)',
                }}
                loading="lazy"
              />

              {/* Hover overlay */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'rgba(15,22,32,0.58)',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', gap: 10,
                opacity: hovered === i ? 1 : 0,
                transition: 'opacity 0.35s',
              }}>
                {/* Green zoom circle */}
                <div style={{
                  width: 46, height: 46, borderRadius: '50%',
                  background: 'var(--green)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transform: hovered === i ? 'scale(1)' : 'scale(0.7)',
                  transition: 'transform 0.35s',
                }}>
                  <svg width="18" height="18" fill="none" stroke="white" strokeWidth={2.5} viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="M21 21l-4.35-4.35"/>
                    <line x1="11" y1="8" x2="11" y2="14"/>
                    <line x1="8" y1="11" x2="14" y2="11"/>
                  </svg>
                </div>
                {/* Caption */}
                <span style={{
                  color: '#fff', fontSize: 10, fontWeight: 600,
                  letterSpacing: '3px', textTransform: 'uppercase',
                  textAlign: 'center', padding: '0 12px',
                }}>
                  {img.alt}
                </span>
              </div>

              {/* Corner frame accents (top-left + bottom-right) */}
              <div style={{
                position: 'absolute', top: 6, left: 6,
                width: 16, height: 16,
                borderTop: '2px solid var(--green)',
                borderLeft: '2px solid var(--green)',
                opacity: hovered === i ? 1 : 0,
                transition: 'opacity 0.35s',
                pointerEvents: 'none',
              }} />
              <div style={{
                position: 'absolute', bottom: 6, right: 6,
                width: 16, height: 16,
                borderBottom: '2px solid var(--green)',
                borderRight: '2px solid var(--green)',
                opacity: hovered === i ? 1 : 0,
                transition: 'opacity 0.35s',
                pointerEvents: 'none',
              }} />
            </div>
          ))}
        </div>

        {/* Responsive overrides */}
        <style>{`
          @media (max-width: 1024px) {
            #gallery [style*="repeat(4"] { grid-template-columns: repeat(3,1fr) !important; }
          }
          @media (max-width: 640px) {
            #gallery [style*="repeat(4"] { grid-template-columns: repeat(2,1fr) !important; }
          }
        `}</style>

        {/* View all CTA */}
        <div className="text-center fade-up delay-2" style={{ marginTop: 44 }}>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 20 }}>
            Click any image to view full size
          </p>
        </div>

      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={galleryData.images.map(img => ({ src: img.src }))}
        index={index}
        styles={{ container: { backgroundColor: 'rgba(15,22,32,0.97)' } }}
      />
    </section>
  );
}

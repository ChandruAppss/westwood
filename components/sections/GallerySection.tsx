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

        {/* Uniform grid — 4 cols desktop / 3 tablet / 2 mobile */}
        <div
          className="fade-up delay-1"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 8,
          }}
        >
          {galleryData.images.map((img, i) => (
            <div
              key={i}
              onClick={() => { setIndex(i); setOpen(true); }}
              style={{
                position: 'relative',
                aspectRatio: '1 / 1',
                overflow: 'hidden',
                cursor: 'pointer',
                background: 'var(--bg-card)',
              }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
                style={{ objectFit: 'cover', transition: 'transform 0.55s ease' }}
                className="gallery-img"
                loading="lazy"
              />

              {/* Hover overlay */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'rgba(15,22,32,0.55)',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', gap: 10,
                opacity: 0, transition: 'opacity 0.35s',
              }}
                className="gallery-hover-overlay"
              >
                <div style={{
                  width: 44, height: 44, borderRadius: '50%',
                  background: 'var(--green)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="18" height="18" fill="none" stroke="white" strokeWidth={2.5} viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="M21 21l-4.35-4.35"/>
                    <line x1="11" y1="8" x2="11" y2="14"/>
                    <line x1="8" y1="11" x2="14" y2="11"/>
                  </svg>
                </div>
                <span style={{
                  color: '#fff', fontSize: 10, fontWeight: 600,
                  letterSpacing: '3px', textTransform: 'uppercase',
                }}>
                  {img.alt}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Hover CSS injected once */}
        <style>{`
          .gallery-img { transition: transform 0.55s ease; }
          div:hover > .gallery-img { transform: scale(1.08); }
          .gallery-hover-overlay { opacity: 0; transition: opacity 0.35s; }
          div:hover > .gallery-hover-overlay { opacity: 1; }

          @media (max-width: 1024px) {
            #gallery .fade-up[style*="grid"] {
              grid-template-columns: repeat(3, 1fr) !important;
            }
          }
          @media (max-width: 640px) {
            #gallery .fade-up[style*="grid"] {
              grid-template-columns: repeat(2, 1fr) !important;
            }
          }
        `}</style>

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

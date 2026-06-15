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
    <section id="gallery" ref={ref} className="sec" style={{ background: 'var(--bg-2)', paddingBottom: 80 }}>
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
            <div style={{ width: 60, height: 1, background: 'rgba(113,184,95,0.25)' }} />
            <div style={{ width: 6, height: 6, background: 'var(--green)', borderRadius: '50%' }} />
            <div style={{ width: 60, height: 1, background: 'rgba(113,184,95,0.25)' }} />
          </div>
        </div>

        {/* Grid */}
        <div
          className="fade-up delay-1 gallery-grid"
        >
          {galleryData.images.map((img, i) => (
            <div
              key={i}
              className="gallery-cell"
              onClick={() => { setIndex(i); setOpen(true); }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Outer decorative frame */}
              <div className="gallery-frame-outer">
                {/* Inner frame line */}
                <div className="gallery-frame-inner" style={{
                  borderColor: hovered === i ? 'rgba(113,184,95,0.7)' : 'rgba(255,255,255,0.12)',
                }} />

                {/* Corner ornaments */}
                {['tl','tr','bl','br'].map(pos => (
                  <div key={pos} className={`gallery-corner gallery-corner-${pos}`} style={{
                    opacity: hovered === i ? 1 : 0.35,
                    borderColor: hovered === i ? 'var(--green)' : 'rgba(255,255,255,0.5)',
                  }} />
                ))}

                {/* Image */}
                <div className="gallery-img-wrap">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
                    style={{
                      objectFit: 'cover',
                      transition: 'transform 0.6s ease',
                      transform: hovered === i ? 'scale(1.09)' : 'scale(1.00)',
                    }}
                    loading="lazy"
                  />

                  {/* Hover overlay */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(180deg, rgba(15,22,32,0.10) 0%, rgba(15,22,32,0.72) 100%)',
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'flex-end',
                    padding: '0 12px 18px',
                    opacity: hovered === i ? 1 : 0,
                    transition: 'opacity 0.35s',
                  }}>
                    {/* Zoom icon */}
                    <div style={{
                      width: 44, height: 44, borderRadius: '50%',
                      background: 'var(--green)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      marginBottom: 10,
                      transform: hovered === i ? 'scale(1) translateY(0)' : 'scale(0.6) translateY(10px)',
                      transition: 'transform 0.35s',
                    }}>
                      <svg width="17" height="17" fill="none" stroke="white" strokeWidth={2.5} viewBox="0 0 24 24">
                        <circle cx="11" cy="11" r="8"/>
                        <path d="M21 21l-4.35-4.35"/>
                        <line x1="11" y1="8" x2="11" y2="14"/>
                        <line x1="8" y1="11" x2="14" y2="11"/>
                      </svg>
                    </div>
                    <span style={{
                      color: '#fff', fontSize: 10, fontWeight: 600,
                      letterSpacing: '3px', textTransform: 'uppercase', textAlign: 'center',
                    }}>
                      {img.alt}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="fade-up delay-2 text-center" style={{
          color: 'rgba(255,255,255,0.28)', fontSize: 11,
          letterSpacing: '2.5px', textTransform: 'uppercase', marginTop: 36,
        }}>
          Click any image to view full size
        </p>

      </div>

      <style>{`
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
        .gallery-cell {
          cursor: pointer;
        }
        .gallery-frame-outer {
          position: relative;
          background: var(--bg-card);
          padding: 10px;
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow: 0 4px 24px rgba(0,0,0,0.35);
          transition: box-shadow 0.35s, border-color 0.35s;
        }
        .gallery-cell:hover .gallery-frame-outer {
          border-color: rgba(113,184,95,0.30);
          box-shadow: 0 8px 40px rgba(0,0,0,0.55), 0 0 0 1px rgba(113,184,95,0.15);
        }
        .gallery-frame-inner {
          position: absolute;
          inset: 5px;
          border: 1px solid rgba(255,255,255,0.12);
          z-index: 2;
          pointer-events: none;
          transition: border-color 0.35s;
        }
        .gallery-img-wrap {
          position: relative;
          aspect-ratio: 1 / 1;
          overflow: hidden;
        }
        /* Corner ornaments */
        .gallery-corner {
          position: absolute;
          width: 14px; height: 14px;
          border: 2px solid;
          z-index: 3;
          pointer-events: none;
          transition: opacity 0.35s, border-color 0.35s;
        }
        .gallery-corner-tl { top: 3px; left: 3px; border-right: none; border-bottom: none; }
        .gallery-corner-tr { top: 3px; right: 3px; border-left: none; border-bottom: none; }
        .gallery-corner-bl { bottom: 3px; left: 3px; border-right: none; border-top: none; }
        .gallery-corner-br { bottom: 3px; right: 3px; border-left: none; border-top: none; }

        @media (max-width: 1024px) { .gallery-grid { grid-template-columns: repeat(3,1fr); gap:16px; } }
        @media (max-width: 640px)  { .gallery-grid { grid-template-columns: repeat(2,1fr); gap:12px; } }
      `}</style>

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

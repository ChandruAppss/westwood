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
      { threshold: 0.08 }
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
          <h2 style={{ fontSize: 'clamp(28px,3.5vw,46px)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '3px', color: '#fff' }}>
            Our Gallery
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginTop: 20 }}>
            <div style={{ width: 50, height: 1, background: 'rgba(113,184,95,0.25)' }} />
            <div style={{ width: 6, height: 6, background: 'var(--green)', borderRadius: '50%' }} />
            <div style={{ width: 50, height: 1, background: 'rgba(113,184,95,0.25)' }} />
          </div>
        </div>

        {/* Masonry grid */}
        <div className="gallery-grid fade-up delay-1">
          {galleryData.images.map((img, i) => (
            <div key={i} className="gallery-item" onClick={() => { setIndex(i); setOpen(true); }}>
              <Image src={img.src} alt={img.alt} width={img.width} height={img.height} className="w-full" loading="lazy" />
              <div className="gallery-over">
                <div style={{
                  width: 48, height: 48, borderRadius: '50%',
                  background: 'rgba(113,184,95,0.85)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="18" height="18" fill="none" stroke="white" strokeWidth={2} viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
                    <line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
                  </svg>
                </div>
              </div>
            </div>
          ))}
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

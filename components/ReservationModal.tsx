'use client';
import { useEffect, useRef, useState } from 'react';

interface Props { onClose: () => void; }

export default function ReservationModal({ onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div
      ref={overlayRef}
      onClick={e => { if (e.target === overlayRef.current) onClose(); }}
      style={{
        position: 'fixed', inset: 0, zIndex: 2000,
        background: 'rgba(10,16,24,0.88)',
        backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px 16px',
        overflowY: 'auto',
      }}
    >
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid rgba(255,255,255,0.08)',
        width: '100%', maxWidth: 580,
        position: 'relative',
        boxShadow: '0 24px 80px rgba(0,0,0,0.60)',
      }}>
        {/* Green top bar */}
        <div style={{ height: 3, background: 'var(--green)', width: '100%' }} />

        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: 'absolute', top: 18, right: 18,
            width: 32, height: 32, borderRadius: '50%',
            background: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.12)',
            color: 'rgba(255,255,255,0.60)',
            fontSize: 14, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s',
          }}
          onMouseOver={e => { e.currentTarget.style.background = 'var(--green)'; e.currentTarget.style.color = '#fff'; }}
          onMouseOut={e  => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = 'rgba(255,255,255,0.60)'; }}
        >✕</button>

        <div style={{ padding: '36px 36px 40px' }}>
          {submitted ? (
            /* ── Success state ── */
            <div style={{ textAlign: 'center', padding: '20px 0 8px' }}>
              <div style={{
                width: 72, height: 72, borderRadius: '50%',
                background: 'rgba(113,184,95,0.12)',
                border: '2px solid var(--green)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 24px',
              }}>
                <svg width="32" height="32" fill="none" stroke="var(--green)" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path d="M20 6 9 17l-5-5"/>
                </svg>
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 800, letterSpacing: '3px', textTransform: 'uppercase', color: '#fff', marginBottom: 12 }}>
                Booking Received!
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.70)', fontSize: 14, lineHeight: 1.8, marginBottom: 32 }}>
                Thank you! We will confirm your reservation by phone or email within 24 hours.
              </p>
              <button onClick={onClose} className="btn-primary" style={{ justifyContent: 'center', width: '100%' }}>
                Close
              </button>
            </div>
          ) : (
            /* ── Form ── */
            <>
              {/* Heading */}
              <div style={{ marginBottom: 32 }}>
                <span className="label">Reserve Your Spot</span>
                <h2 style={{ fontSize: 'clamp(22px,3vw,30px)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '3px', color: '#fff', marginTop: 4 }}>
                  Book a Table
                </h2>
              </div>

              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px 20px' }}>
                  {/* Name */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <label style={labelStyle}>Full Name *</label>
                    <input type="text" className="form-control" placeholder="Your full name" required />
                  </div>
                  {/* Phone */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <label style={labelStyle}>Phone *</label>
                    <input type="tel" className="form-control" placeholder="+66 xx xxx xxxx" required />
                  </div>
                  {/* Email */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <label style={labelStyle}>Email</label>
                    <input type="email" className="form-control" placeholder="your@email.com" />
                  </div>
                  {/* Guests */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <label style={labelStyle}>Guests *</label>
                    <select className="form-control" required defaultValue="">
                      <option value="" disabled>Select</option>
                      {[1,2,3,4,5,6,7,8,10,12].map(n => (
                        <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                      ))}
                      <option value="large">12+ (group)</option>
                    </select>
                  </div>
                  {/* Date */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <label style={labelStyle}>Date *</label>
                    <input type="date" className="form-control" min={today} required />
                  </div>
                  {/* Time */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <label style={labelStyle}>Time *</label>
                    <select className="form-control" required defaultValue="">
                      <option value="" disabled>Select</option>
                      {['11:00','12:00','13:00','14:00','15:00','17:00','18:00','19:00','20:00','21:00'].map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Special requests */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 16 }}>
                  <label style={labelStyle}>Special Requests</label>
                  <textarea
                    className="form-control"
                    rows={3}
                    placeholder="Allergies, dietary requirements, special occasions, seating preferences…"
                    style={{ resize: 'none' }}
                  />
                </div>

                <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 24, padding: '16px 36px' }}>
                  Confirm Reservation
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>

                <p style={{ textAlign: 'center', marginTop: 14, fontSize: 11, color: 'rgba(255,255,255,0.42)', letterSpacing: '0.5px' }}>
                  We confirm by phone or email within 24 hours · Free cancellation up to 24h before
                </p>
              </form>
            </>
          )}
        </div>

        {/* Mobile: single column form */}
        <style>{`
          @media (max-width: 480px) {
            .rmodal-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  fontSize: 10, fontWeight: 700,
  letterSpacing: '3px', textTransform: 'uppercase',
  color: 'var(--green)',
};

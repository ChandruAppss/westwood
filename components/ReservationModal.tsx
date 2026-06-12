'use client';
import DotsSep from '@/components/DotsSep';
import { useEffect, useRef } from 'react';

interface Props { onClose: () => void; }

export default function ReservationModal({ onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you! Your reservation request has been received. We will confirm within 24 hours.');
    onClose();
  };

  return (
    <div
      ref={overlayRef}
      className="reserv-overlay"
      onClick={e => { if (e.target === overlayRef.current) onClose(); }}
    >
      <div className="reserv-modal">
        <button className="reserv-close" onClick={onClose} aria-label="Close">✕</button>

        {/* Gold accent bar */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-[var(--color-gold)]" />

        <div className="section-title mb-8">
          <h4>Make a Reservation</h4>
          <h2>Book Your Table</h2>
          <DotsSep />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-x-6">
            <div className="form-group">
              <label htmlFor="r-name">Full Name *</label>
              <input id="r-name" type="text" className="form-control" placeholder="Your full name" required />
            </div>
            <div className="form-group">
              <label htmlFor="r-phone">Phone Number *</label>
              <input id="r-phone" type="tel" className="form-control" placeholder="+66 62 242 0044" required />
            </div>
            <div className="form-group">
              <label htmlFor="r-email">Email Address *</label>
              <input id="r-email" type="email" className="form-control" placeholder="your@email.com" required />
            </div>
            <div className="form-group">
              <label htmlFor="r-guests">Number of Guests *</label>
              <select id="r-guests" className="form-control" required defaultValue="">
                <option value="" disabled>Select guests</option>
                {[1,2,3,4,5,6,7,8,10,12].map(n => (
                  <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                ))}
                <option value="large">Large group (12+)</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="r-date">Preferred Date *</label>
              <input
                id="r-date"
                type="date"
                className="form-control"
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="r-time">Preferred Time *</label>
              <select id="r-time" className="form-control" required defaultValue="">
                <option value="" disabled>Select time</option>
                {['11:00','12:00','13:00','14:00','15:00','17:00','18:00','19:00','20:00','21:00'].map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="r-notes">Special Requests</label>
            <textarea
              id="r-notes"
              className="form-control"
              rows={3}
              placeholder="Allergies, dietary requirements, special occasions, seating preferences…"
            />
          </div>

          <button type="submit" className="btn-gold w-full justify-center mt-2 py-4">
            Confirm Reservation
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
          <p className="text-[var(--color-text)] text-[12px] text-center mt-4">
            We will confirm your reservation by phone or email within 24 hours.
          </p>
        </form>
      </div>
    </div>
  );
}

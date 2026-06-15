'use client';
import { useState } from 'react';

export default function ReservationSection() {
  const [submitted, setSubmitted] = useState(false);
  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="reservation" className="reservation-section">
      <div className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/dish-chicken-wings-2.webp')" }} />
      <div className="absolute inset-0" style={{ background: 'rgba(15,22,32,0.93)' }} />
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 3,
        background: 'linear-gradient(90deg, transparent, var(--green), transparent)',
      }} />

      <div className="container-w relative z-10">

        {/* Heading */}
        <div className="text-center" style={{ marginBottom: 52 }}>
          <span className="label">Reserve Your Spot</span>
          <h2 style={{ fontSize: 'clamp(26px,3.5vw,44px)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '3px', color: '#fff' }}>
            Book a Table
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginTop: 18 }}>
            <div style={{ width: 50, height: 1, background: 'rgba(113,184,95,0.30)' }} />
            <div style={{ width: 6, height: 6, background: 'var(--green)', borderRadius: '50%' }} />
            <div style={{ width: 50, height: 1, background: 'rgba(113,184,95,0.30)' }} />
          </div>
        </div>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <div style={{
              width: 72, height: 72, borderRadius: '50%',
              background: 'rgba(113,184,95,0.15)',
              border: '2px solid var(--green)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 24px',
            }}>
              <svg width="30" height="30" fill="none" stroke="var(--green)" strokeWidth={2.5} viewBox="0 0 24 24">
                <path d="M20 6 9 17l-5-5"/>
              </svg>
            </div>
            <p style={{ fontFamily: 'var(--sans)', fontSize: 20, fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', color: '#fff', marginBottom: 10 }}>
              Thank You!
            </p>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 14, fontWeight: 500 }}>
              We will confirm your reservation within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>

            {/* Form grid */}
            <div className="reserv-form-grid">
              <div className="reserv-field">
                <label className="reserv-label">Full Name</label>
                <input type="text" className="form-control" placeholder="Your name" required />
              </div>
              <div className="reserv-field">
                <label className="reserv-label">Phone</label>
                <input type="tel" className="form-control" placeholder="+66 xx xxx xxxx" required />
              </div>
              <div className="reserv-field">
                <label className="reserv-label">Guests</label>
                <select className="form-control" required defaultValue="">
                  <option value="" disabled>Select</option>
                  {[1,2,3,4,5,6,7,8,10,12].map(n => (
                    <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                  ))}
                  <option value="large">12+</option>
                </select>
              </div>
              <div className="reserv-field">
                <label className="reserv-label">Date</label>
                <input type="date" className="form-control" min={today} required />
              </div>
              <div className="reserv-field">
                <label className="reserv-label">Time</label>
                <select className="form-control" required defaultValue="">
                  <option value="" disabled>Select</option>
                  {['11:00','12:00','13:00','14:00','18:00','19:00','20:00','21:00'].map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div className="reserv-field reserv-btn-col">
                <label className="reserv-label" style={{ opacity: 0, userSelect: 'none' }}>Book</label>
                <button type="submit" className="btn-primary" style={{ justifyContent: 'center', width: '100%', padding: '15px 20px' }}>
                  Book Now
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Reassurance */}
            <div style={{ display: 'flex', gap: 24, justifyContent: 'center', marginTop: 32, flexWrap: 'wrap' }}>
              {['Free cancellation up to 24h', 'Instant confirmation', 'No credit card required'].map(t => (
                <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{
                    width: 18, height: 18, borderRadius: '50%',
                    background: 'rgba(113,184,95,0.15)',
                    border: '1px solid var(--green)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <svg width="10" height="10" fill="none" stroke="var(--green)" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path d="M20 6 9 17l-5-5"/>
                    </svg>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.75)', letterSpacing: '0.5px' }}>{t}</span>
                </div>
              ))}
            </div>
          </form>
        )}
      </div>

      <style>{`
        .reserv-form-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr) auto;
          gap: 16px;
          align-items: end;
        }
        .reserv-field {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .reserv-label {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--green);
        }
        .reserv-btn-col { min-width: 130px; }
        @media (max-width: 1024px) {
          .reserv-form-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .reserv-btn-col { grid-column: 1 / -1; }
          .reserv-btn-col label { display: none; }
        }
        @media (max-width: 640px) {
          .reserv-form-grid {
            grid-template-columns: 1fr;
          }
          .reserv-btn-col { grid-column: 1; }
        }
      `}</style>
    </section>
  );
}

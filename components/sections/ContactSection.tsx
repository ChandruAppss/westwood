'use client';
import { useEffect, useRef } from 'react';
import contact from '@/data/contact.json';

export default function ContactSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll('.fade-up').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="contacts" ref={ref} style={{ padding: 0, background: 'var(--bg)' }}>

      {/* Full-width map */}
      <div className="contact-map" style={{ width: '100%', height: 380, position: 'relative' }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3874.3455512246167!2d100.50967407507756!3d13.71035528701447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e2996f4bd78c5d%3A0x3d2b1bdbe609490d!2sWestwood%20Restaurant!5e0!3m2!1sen!2sth!4v1718000000000!5m2!1sen!2sth"
          style={{ width: '100%', height: '100%', filter: 'invert(90%) hue-rotate(180deg) contrast(0.85)', border: 'none', display: 'block' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Westwood Restaurant location"
        />
      </div>

      {/* Contact info */}
      <div className="sec" style={{ paddingTop: 80, paddingBottom: 80 }}>
        <div className="container-w">

          {/* Heading */}
          <div className="text-center fade-up" style={{ marginBottom: 60 }}>
            <span className="label">Get In Touch</span>
            <h2 style={{ fontSize: 'clamp(28px,3.5vw,46px)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '3px', color: '#fff' }}>
              Visit Us in Bangkok
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginTop: 20 }}>
              <div style={{ width: 50, height: 1, background: 'rgba(113,184,95,0.25)' }} />
              <div style={{ width: 6, height: 6, background: 'var(--green)', borderRadius: '50%' }} />
              <div style={{ width: 50, height: 1, background: 'rgba(113,184,95,0.25)' }} />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">

            {/* Address */}
            <div className="fade-up">
              <h4 style={{ fontSize: 10, letterSpacing: '4px', textTransform: 'uppercase', marginBottom: 24, color: 'var(--green)', fontWeight: 600 }}>
                Our Address
              </h4>
              <div className="cinfo">
                <div className="cinfo-icon">
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div>
                  <h5>Location</h5>
                  <p>{contact.address}</p>
                </div>
              </div>
              <div className="cinfo">
                <div className="cinfo-icon">
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.23l3-.01a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.08 6.08l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.98 17z"/>
                  </svg>
                </div>
                <div>
                  <h5>Phone</h5>
                  <p><a href={`tel:${contact.phoneRaw}`} style={{ color: 'var(--green)', textDecoration: 'none' }}>{contact.phone}</a></p>
                </div>
              </div>
              <div className="cinfo">
                <div className="cinfo-icon">
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div>
                  <h5>Email</h5>
                  <p><a href={`mailto:${contact.email}`} style={{ color: 'var(--green)', textDecoration: 'none' }}>{contact.email}</a></p>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="fade-up delay-2">
              <h4 style={{ fontSize: 10, letterSpacing: '4px', textTransform: 'uppercase', marginBottom: 24, color: 'var(--green)', fontWeight: 600 }}>
                Opening Hours
              </h4>
              {[
                { day: 'Monday – Thursday', time: '11:00 – 22:00' },
                { day: 'Friday – Saturday',  time: '11:00 – 23:00' },
                { day: 'Sunday',             time: '12:00 – 21:00' },
              ].map(h => (
                <div key={h.day} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                  padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.07)',
                }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.82)', letterSpacing: '1px' }}>{h.day}</span>
                  <span style={{ fontFamily: 'var(--sans)', fontSize: 14, color: 'var(--green)', fontWeight: 700 }}>{h.time}</span>
                </div>
              ))}
              <div style={{ marginTop: 24, padding: '16px 20px', background: 'rgba(113,184,95,0.06)', border: '1px solid rgba(113,184,95,0.18)' }}>
                <p style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.78)', lineHeight: 1.7 }}>
                  Reservations recommended on weekends. Walk-ins welcome.
                </p>
              </div>
            </div>

            {/* Quick reservation */}
            <div className="fade-up delay-3">
              <h4 style={{ fontSize: 10, letterSpacing: '4px', textTransform: 'uppercase', marginBottom: 24, color: 'var(--green)', fontWeight: 600 }}>
                Quick Reservation
              </h4>
              <p style={{ fontSize: 13, fontWeight: 500, lineHeight: 1.85, marginBottom: 28, color: 'rgba(255,255,255,0.80)' }}>
                Ready to dine with us? Call us directly or use our booking form for the best table availability.
              </p>
              <a href={`tel:${contact.phoneRaw}`} className="btn-primary" style={{ display: 'flex', marginBottom: 12, justifyContent: 'center' }}>
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.23l3-.01a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.08 6.08l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.98 17z"/>
                </svg>
                Call Now
              </a>
              <a href="#reservation" className="btn-secondary" style={{ display: 'flex', justifyContent: 'center' }}>
                Online Booking
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

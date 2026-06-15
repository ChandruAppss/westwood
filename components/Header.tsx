'use client';
import { useState, useEffect } from 'react';
import WestwoodLogo from '@/components/WestwoodLogo';
import socials from '@/data/socials.json';
import contact from '@/data/contact.json';

interface HeaderProps { onReservation: () => void; }

const leftNav  = [
  { label: 'Home',    href: '#home'    },
  { label: 'About',   href: '#about'   },
  { label: 'Menu',    href: '#menu'    },
];
const rightNav = [
  { label: 'Gallery', href: '#gallery'  },
  { label: 'Contact', href: '#contacts' },
];

export default function Header({ onReservation }: HeaderProps) {
  const [scrolled,   setScrolled]   = useState(false);
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [activeHref, setActiveHref] = useState('#home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (_e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setMenuOpen(false);
    setActiveHref(href);
  };

  return (
    <header className={`main-header${scrolled ? ' scrolled' : ''}`}>

      {/* ── Top bar ── */}
      <div className="header-top">
        <div className="container-w flex justify-between items-center">
          <div className="flex gap-6" style={{ fontSize: 11 }}>
            <a href={`tel:${contact.phoneRaw}`}
              style={{ color: 'rgba(255,255,255,0.50)', textDecoration: 'none', letterSpacing: '0.5px', transition: 'color 0.3s' }}
              onMouseOver={e => (e.currentTarget.style.color = 'var(--green)')}
              onMouseOut={e  => (e.currentTarget.style.color = 'rgba(255,255,255,0.50)')}>
              <span style={{ color: 'var(--green)', marginRight: 6 }}>✆</span>{contact.phone}
            </a>
            <a href={`mailto:${contact.email}`}
              className="hidden sm:inline"
              style={{ color: 'rgba(255,255,255,0.50)', textDecoration: 'none', letterSpacing: '0.5px', transition: 'color 0.3s' }}
              onMouseOver={e => (e.currentTarget.style.color = 'var(--green)')}
              onMouseOut={e  => (e.currentTarget.style.color = 'rgba(255,255,255,0.50)')}>
              <span style={{ color: 'var(--green)', marginRight: 6 }}>✉</span>{contact.email}
            </a>
          </div>

          <div className="flex items-center gap-1">
            {[
              { href: socials.facebook,  label: 'Facebook',
                svg: <path fill="currentColor" d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/> },
              { href: socials.instagram, label: 'Instagram',
                svg: <><rect x="2" y="2" width="20" height="20" rx="5" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="none" stroke="currentColor" strokeWidth="2"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="currentColor" strokeWidth="2"/></> },
              { href: socials.tiktok,    label: 'TikTok',
                svg: <path fill="currentColor" d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.8a8.18 8.18 0 0 0 4.77 1.52V6.87a4.85 4.85 0 0 1-1-.18z"/> },
            ].map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                aria-label={s.label} className="topbar-social-link">
                <svg className="w-3 h-3" viewBox="0 0 24 24">{s.svg}</svg>
              </a>
            ))}
            <span className="topbar-divider" />
            <button onClick={onReservation}
              style={{
                fontFamily: 'var(--sans)', fontSize: 10, letterSpacing: '3px',
                textTransform: 'uppercase', fontWeight: 600,
                color: 'var(--green)', background: 'none', border: 'none',
                cursor: 'pointer', marginLeft: 8, transition: 'color 0.3s',
              }}
              onMouseOver={e => (e.currentTarget.style.color = '#fff')}
              onMouseOut={e  => (e.currentTarget.style.color = 'var(--green)')}>
              Book a Table
            </button>
          </div>
        </div>
      </div>

      {/* ── Main nav ── */}
      <div style={{ padding: '14px 0' }}>
        <div className="container-w" style={{ display: 'flex', alignItems: 'center' }}>

          {/* ── Desktop: left nav ── */}
          <nav className="hidden lg:flex items-center flex-1">
            {leftNav.map(l => (
              <a key={l.href} href={l.href}
                onClick={e => handleNav(e, l.href)}
                className={`nav-link${activeHref === l.href ? ' nav-link--active' : ''}`}>
                {l.label}
              </a>
            ))}
          </nav>
          <div className="nav-logo-sep hidden lg:block" />

          {/* ── Mobile: left spacer (mirrors hamburger width so logo is truly centered) ── */}
          <div className="hdr-mobile-spacer" />

          {/* ── Logo (center) ── */}
          <a href="#home" onClick={e => handleNav(e, '#home')}
            aria-label="Westwood — home"
            style={{ flex: 1, display: 'flex', justifyContent: 'center', padding: '0 16px' }}>
            <WestwoodLogo className="h-[48px] md:h-[56px] w-auto" />
          </a>

          <div className="nav-logo-sep hidden lg:block" />

          {/* ── Desktop: right nav + CTA ── */}
          <nav className="hidden lg:flex items-center flex-1 justify-end gap-0">
            {rightNav.map(l => (
              <a key={l.href} href={l.href}
                onClick={e => handleNav(e, l.href)}
                className={`nav-link${activeHref === l.href ? ' nav-link--active' : ''}`}>
                {l.label}
              </a>
            ))}
            <button onClick={onReservation} className="hdr-book ml-6">
              Reservation ›
            </button>
          </nav>

          {/* ── Mobile: hamburger (right) ── */}
          <button
            onClick={() => setMenuOpen(o => !o)}
            className="hdr-hamburger"
            aria-label="Toggle menu">
            {[0,1,2].map(i => (
              <span key={i} style={{
                display: 'block', width: 22, height: 2,
                background: '#fff', borderRadius: 1, transition: 'all 0.3s',
                transform: menuOpen && i === 0 ? 'rotate(45deg) translateY(7px)'
                         : menuOpen && i === 2 ? 'rotate(-45deg) translateY(-7px)' : 'none',
                opacity: menuOpen && i === 1 ? 0 : 1,
              }} />
            ))}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div style={{ background: 'var(--bg-dark)', borderTop: '1px solid rgba(113,184,95,0.15)' }}>
          <div className="container-w py-5 flex flex-col">
            {[...leftNav, ...rightNav].map(l => (
              <a key={l.href} href={l.href} onClick={e => handleNav(e, l.href)}
                style={{
                  display: 'block', padding: '13px 0',
                  fontFamily: 'var(--sans)', fontSize: 11, fontWeight: 600,
                  letterSpacing: '3px', textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.55)',
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                  textDecoration: 'none',
                }}>
                {l.label}
              </a>
            ))}
            <a href={`tel:${contact.phoneRaw}`}
              style={{
                display: 'block', padding: '13px 0',
                fontFamily: 'var(--sans)', fontSize: 11, fontWeight: 600,
                letterSpacing: '3px', textTransform: 'uppercase',
                color: 'var(--green)', textDecoration: 'none',
              }}>
              {contact.phone}
            </a>
            <button onClick={() => { setMenuOpen(false); onReservation(); }}
              className="btn-primary mt-5" style={{ justifyContent: 'center' }}>
              Reserve a Table
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

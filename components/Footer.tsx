import WestwoodLogo from '@/components/WestwoodLogo';
import socials from '@/data/socials.json';
import contact from '@/data/contact.json';

const fog = 'rgba(255,255,255,0.45)';
const linkStyle = { color: fog, fontSize: 13, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8, letterSpacing: '0.5px', transition: 'color 0.3s' };

export default function Footer() {
  return (
    <footer className="footer-wrap">
      <div className="container-w">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10"
          style={{ paddingBottom: 48, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>

          {/* Brand */}
          <div>
            <div style={{ marginBottom: 20 }}>
              <WestwoodLogo className="h-[52px] w-auto" />
            </div>
            <p style={{ color: fog, fontSize: 13, lineHeight: 1.85, marginBottom: 24 }}>
              Premium European dining in the heart of Bangkok — where craft meets warmth.
            </p>
            <div className="footer-social">
              {[
                { href: socials.facebook,  label: 'Facebook',
                  icon: <path fill="currentColor" d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/> },
                { href: socials.instagram, label: 'Instagram',
                  icon: <><rect x="2" y="2" width="20" height="20" rx="5" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="none" stroke="currentColor" strokeWidth="2"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="currentColor" strokeWidth="2"/></> },
                { href: socials.tiktok,    label: 'TikTok',
                  icon: <path fill="currentColor" d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.8a8.18 8.18 0 0 0 4.77 1.52V6.87a4.85 4.85 0 0 1-1-.18z"/> },
                { href: socials.whatsapp,  label: 'WhatsApp',
                  icon: <path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/> },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">{s.icon}</svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 style={{ fontFamily: 'var(--sans)', fontSize: 13, color: '#fff', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', marginBottom: 24 }}>
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[['Home','#home'],['About','#about'],['Menu','#menu'],['Gallery','#gallery'],['Contact','#contacts']].map(([l, h]) => (
                <li key={l}>
                  <a href={h} style={linkStyle}
                    onMouseOver={e => (e.currentTarget.style.color = 'var(--green)')}
                    onMouseOut={e  => (e.currentTarget.style.color = fog)}>
                    <span style={{ color: 'var(--green)', fontSize: 12 }}>›</span>{l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: 'var(--sans)', fontSize: 13, color: '#fff', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', marginBottom: 24 }}>
              Get In Touch
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <p style={{ color: fog, fontSize: 13, lineHeight: 1.7 }}>{contact.address}</p>
              <a href={`tel:${contact.phoneRaw}`} style={{ color: 'var(--green)', fontSize: 13, textDecoration: 'none', fontWeight: 600 }}
                onMouseOver={e => (e.currentTarget.style.color = 'var(--green-lt)')}
                onMouseOut={e  => (e.currentTarget.style.color = 'var(--green)')}>
                {contact.phone}
              </a>
              <a href={`mailto:${contact.email}`} style={{ color: fog, fontSize: 13, textDecoration: 'none' }}
                onMouseOver={e => (e.currentTarget.style.color = 'var(--green)')}
                onMouseOut={e  => (e.currentTarget.style.color = fog)}>
                {contact.email}
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 style={{ fontFamily: 'var(--sans)', fontSize: 13, color: '#fff', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', marginBottom: 12 }}>
              Stay Updated
            </h4>
            <p style={{ color: fog, fontSize: 13, marginBottom: 20, lineHeight: 1.7 }}>
              Subscribe for new menus, events and exclusive offers.
            </p>
            <form onSubmit={e => { e.preventDefault(); }}>
              <div style={{ display: 'flex' }}>
                <input
                  type="email"
                  placeholder="Your email address"
                  required
                  style={{
                    flex: 1,
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.10)',
                    borderRight: 'none',
                    color: '#fff', padding: '12px 14px',
                    fontFamily: 'var(--sans)', fontSize: 12,
                    outline: 'none', letterSpacing: '0.5px',
                  }}
                />
                <button type="submit" className="btn-primary" style={{ padding: '12px 18px', flexShrink: 0, letterSpacing: '2px' }}>
                  Join
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom flex flex-col sm:flex-row justify-between items-center gap-3">
          <p style={{ color: 'rgba(255,255,255,0.28)', fontSize: 12, letterSpacing: '0.5px' }}>
            © Westwood Restaurant {new Date().getFullYear()} — All rights reserved.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{
              color: 'rgba(255,255,255,0.35)', fontSize: 10, letterSpacing: '3px', textTransform: 'uppercase',
              display: 'flex', alignItems: 'center', gap: 6,
              background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.3s',
            }}
            onMouseOver={e => (e.currentTarget.style.color = 'var(--green)')}
            onMouseOut={e  => (e.currentTarget.style.color = 'rgba(255,255,255,0.35)')}>
            Back to Top
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <polyline points="18 15 12 9 6 15"/>
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}

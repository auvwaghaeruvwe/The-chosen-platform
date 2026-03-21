import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ background: '#060b18', padding: '60px 32px 32px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* Top */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 48, marginBottom: 48 }}>

          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{
                width: 30, height: 30, border: '1px solid rgba(200,150,42,0.4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transform: 'rotate(45deg)', flexShrink: 0,
              }}>
                <span style={{ transform: 'rotate(-45deg)', color: '#c8962a', fontSize: 11 }}>✦</span>
              </div>
              <span style={{ fontFamily: 'Cinzel, serif', fontSize: '0.85rem', fontWeight: 700, color: '#f0ead6', letterSpacing: '0.12em' }}>
                THE CHOSEN
              </span>
            </div>
            <p style={{ fontFamily: 'Crimson Pro, serif', color: '#8a9ab5', fontSize: '0.92rem', lineHeight: 1.75, maxWidth: 280 }}>
              The official fan engagement platform for The Chosen — connecting fans with the cast and crew worldwide.
            </p>
          </div>

          {/* Platform Links */}
          <div>
            <h4 style={{ fontFamily: 'Cinzel, serif', fontSize: '0.58rem', letterSpacing: '0.25em', color: '#c8962a', marginBottom: 20 }}>
              PLATFORM
            </h4>
            {[
              { label: 'Home',           href: '/'        },
              { label: 'Cast & Crew',    href: '/cast'    },
              { label: 'Submit Request', href: '/request' },
              { label: 'Donate',         href: '/donate'  },
            ].map(item => (
              <div key={item.href} style={{ marginBottom: 10 }}>
                <Link href={item.href} style={{
                  fontFamily: 'Crimson Pro, serif', color: '#8a9ab5',
                  fontSize: '0.9rem', textDecoration: 'none', transition: 'color 0.2s',
                }}
                  onMouseEnter={e => e.target.style.color = '#e8b84b'}
                  onMouseLeave={e => e.target.style.color = '#8a9ab5'}
                >
                  {item.label}
                </Link>
              </div>
            ))}
          </div>

          {/* Request Types */}
          <div>
            <h4 style={{ fontFamily: 'Cinzel, serif', fontSize: '0.58rem', letterSpacing: '0.25em', color: '#c8962a', marginBottom: 20 }}>
              REQUESTS
            </h4>
            {['Meet & Greet', 'Video Shoutouts', 'Event Booking', 'Prayer Requests'].map(item => (
              <div key={item} style={{ marginBottom: 10 }}>
                <Link href="/request" style={{
                  fontFamily: 'Crimson Pro, serif', color: '#8a9ab5',
                  fontSize: '0.9rem', textDecoration: 'none',
                }}>
                  {item}
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(200,150,42,0.25), transparent)', marginBottom: 28 }} />

        {/* Bottom */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontFamily: 'Crimson Pro, serif', color: '#8a9ab5', fontSize: '0.8rem' }}>
            © {new Date().getFullYear()} The Chosen Fan Platform. All rights reserved.
          </span>
          <span style={{ fontFamily: 'Cinzel, serif', fontSize: '0.55rem', letterSpacing: '0.2em', color: 'rgba(200,150,42,0.4)' }}>
            BUILT WITH FAITH ✦
          </span>
        </div>

      </div>
    </footer>
  )
}


import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'Home',    href: '/'         },
    { label: 'Cast',    href: '/cast'      },
    { label: 'Request', href: '/request'   },
    { label: 'Donate',  href: '/donate'    },
  ]

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: scrolled ? '14px 32px' : '22px 32px',
      background: scrolled ? 'rgba(8,14,31,0.97)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(200,150,42,0.12)' : 'none',
      transition: 'all 0.4s ease',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>

      {/* Logo */}
      <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 34, height: 34, border: '1px solid rgba(200,150,42,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transform: 'rotate(45deg)', flexShrink: 0,
        }}>
          <span style={{ transform: 'rotate(-45deg)', color: '#c8962a', fontSize: 13 }}>✦</span>
        </div>
        <div>
          <div style={{ fontFamily: 'Cinzel, serif', fontSize: '0.85rem', fontWeight: 700, color: '#f0ead6', letterSpacing: '0.15em' }}>
            THE CHOSEN
          </div>
          <div style={{ fontFamily: 'Crimson Pro, serif', fontSize: '0.6rem', color: '#8a9ab5', letterSpacing: '0.2em' }}>
            FAN PLATFORM
          </div>
        </div>
      </Link>

      {/* Desktop Links */}
      <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
        {links.map(link => (
          <Link key={link.href} href={link.href} style={{
            fontFamily: 'Cinzel, serif', fontSize: '0.65rem',
            letterSpacing: '0.18em', color: '#8a9ab5',
            textDecoration: 'none', transition: 'color 0.2s',
          }}
            onMouseEnter={e => e.target.style.color = '#e8b84b'}
            onMouseLeave={e => e.target.style.color = '#8a9ab5'}
          >
            {link.label.toUpperCase()}
          </Link>
        ))}
        <Link href="/request" style={{
          fontFamily: 'Cinzel, serif', fontSize: '0.65rem',
          letterSpacing: '0.12em', padding: '10px 22px',
          background: 'linear-gradient(135deg, #c8962a, #e8b84b)',
          color: '#080e1f', textDecoration: 'none', borderRadius: 2,
          fontWeight: 700,
        }}>
          SUBMIT REQUEST
        </Link>
      </div>
    </nav>
  )
}

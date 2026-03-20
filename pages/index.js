import Head from 'next/head'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const stats = [
  { value: '3M+',  label: 'Fans Worldwide'   },
  { value: '7',    label: 'Seasons Planned'  },
  { value: '180+', label: 'Countries Reached'},
  { value: '100%', label: 'Fan Funded'       },
]

const castMembers = [
  { id: 1, initials: 'JR', name: 'Jonathan Roumie',  role: 'Jesus of Nazareth', bio: 'Known for his deeply moving portrayal of Jesus, Jonathan brings warmth and humanity to the role.'  },
  { id: 2, initials: 'SI', name: 'Shahar Isaac',     role: 'Simon Peter',       bio: 'Shahar brings raw energy and vulnerability to the beloved disciple Simon Peter.'                    },
  { id: 3, initials: 'ET', name: 'Elizabeth Tabish', role: 'Mary Magdalene',    bio: "Elizabeth's nuanced performance of Mary Magdalene has captured hearts worldwide."                  },
  { id: 4, initials: 'PP', name: 'Paras Patel',      role: 'Matthew',           bio: 'Paras portrays the tax collector Matthew with precision and quiet transformation.'                  },
]

const categories = [
  { icon: '✦', label: 'Meet & Greet'      },
  { icon: '◈', label: 'Video Shoutouts'   },
  { icon: '⬡', label: 'Event Booking'     },
  { icon: '◉', label: 'Interviews'        },
  { icon: '✧', label: 'Collaborations'    },
  { icon: '◎', label: 'Prayer Requests'   },
  { icon: '⬢', label: 'General Messages'  },
  { icon: '◈', label: 'Business Inquiries'},
]

export default function Home() {
  return (
    <>
      <Head>
        <title>The Chosen – Official Fan Engagement Platform</title>
        <meta name="description" content="Connect with the cast and crew of The Chosen TV series." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Crimson+Pro:wght@300;400&display=swap" rel="stylesheet" />
      </Head>

      <Navbar />

      {/* ── HERO ── */}
      <section style={{
        minHeight: '100vh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '120px 24px 80px',
        background: 'radial-gradient(ellipse at 20% 50%, rgba(200,150,42,0.06) 0%, transparent 60%), linear-gradient(160deg, #080e1f 0%, #0d1a35 40%, #080e1f 100%)',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Decorative background symbols */}
        {[...Array(4)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute', opacity: 0.03,
            fontSize: `${100 + i * 50}px`, color: '#c8962a',
            top: `${10 + i * 20}%`, left: `${5 + i * 25}%`,
            pointerEvents: 'none', userSelect: 'none',
          }}>✦</div>
        ))}

        {/* Eyebrow label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
          <div style={{ height: 1, width: 48, background: 'rgba(200,150,42,0.4)' }} />
          <span style={{ fontFamily: 'Cinzel, serif', fontSize: '0.62rem', letterSpacing: '0.3em', color: '#c8962a' }}>
            OFFICIAL FAN ENGAGEMENT PLATFORM
          </span>
          <div style={{ height: 1, width: 48, background: 'rgba(200,150,42,0.4)' }} />
        </div>

        {/* Headline */}
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.8rem, 8vw, 6.5rem)', fontWeight: 300, lineHeight: 1.05, marginBottom: 16, maxWidth: 900 }}>
          <em>He Calls</em>{' '}
          <span style={{
            fontFamily: 'Cinzel, serif', fontWeight: 700,
            background: 'linear-gradient(90deg, #c8962a, #f5d98a, #c8962a)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            The Chosen
          </span>
        </h1>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.8rem, 5vw, 4rem)', fontWeight: 300, fontStyle: 'italic', color: 'rgba(240,234,214,0.65)', marginBottom: 36 }}>
          Now You Can Connect With Them
        </h2>

        {/* Sub text */}
        <p style={{ fontFamily: 'Crimson Pro, serif', fontSize: '1.15rem', color: '#8a9ab5', maxWidth: 520, lineHeight: 1.8, marginBottom: 52 }}>
          The official gateway to connect with the cast and crew of The Chosen —
          the most-watched Christian series in history.
        </p>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/request" style={{
            fontFamily: 'Cinzel, serif', fontSize: '0.68rem', letterSpacing: '0.12em',
            padding: '16px 40px', borderRadius: 2, textDecoration: 'none',
            background: 'linear-gradient(135deg, #c8962a, #e8b84b)', color: '#080e1f', fontWeight: 700,
          }}>
            SUBMIT A REQUEST
          </Link>
          <Link href="/cast" style={{
            fontFamily: 'Cinzel, serif', fontSize: '0.68rem', letterSpacing: '0.12em',
            padding: '16px 40px', borderRadius: 2, textDecoration: 'none',
            background: 'transparent', color: '#c8962a',
            border: '1px solid rgba(200,150,42,0.4)',
          }}>
            MEET THE CAST
          </Link>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ background: 'rgba(13,23,48,0.95)', borderTop: '1px solid rgba(200,150,42,0.12)', borderBottom: '1px solid rgba(200,150,42,0.12)', padding: '40px 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
          {stats.map((s, i) => (
            <div key={i} style={{ textAlign: 'center', padding: '8px 0' }}>
              <div style={{ fontFamily: 'Cinzel, serif', fontSize: '2.2rem', fontWeight: 700, background: 'linear-gradient(135deg,#c8962a,#f5d98a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                {s.value}
              </div>
              <div style={{ fontFamily: 'Crimson Pro, serif', color: '#8a9ab5', fontSize: '0.88rem', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CAST PREVIEW ── */}
      <section style={{ padding: '90px 24px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 16 }}>
            <div style={{ height: 1, width: 48, background: 'rgba(200,150,42,0.3)' }} />
            <span style={{ fontFamily: 'Cinzel, serif', fontSize: '0.58rem', letterSpacing: '0.35em', color: '#c8962a' }}>THE CAST</span>
            <div style={{ height: 1, width: 48, background: 'rgba(200,150,42,0.3)' }} />
          </div>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem,5vw,3.8rem)', fontWeight: 300, fontStyle: 'italic' }}>
            Meet the <span style={{ color: '#e8b84b' }}>Voices</span> Behind the Story
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px,1fr))', gap: 24 }}>
          {castMembers.map(member => (
            <div key={member.id} style={{
              background: 'linear-gradient(145deg, rgba(13,23,48,0.95), rgba(8,14,31,0.98))',
              border: '1px solid rgba(200,150,42,0.1)', borderRadius: 4, padding: '28px 24px',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 20px 50px rgba(200,150,42,0.15)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}
            >
              <div style={{
                width: 64, height: 64, borderRadius: '50%',
                background: 'rgba(200,150,42,0.1)', border: '1px solid rgba(200,150,42,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16,
              }}>
                <span style={{ fontFamily: 'Cinzel, serif', fontSize: '1rem', color: '#c8962a', fontWeight: 600 }}>{member.initials}</span>
              </div>
              <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: '0.85rem', fontWeight: 600, color: '#f0ead6', letterSpacing: '0.06em', marginBottom: 4 }}>{member.name}</h3>
              <div style={{ fontFamily: 'Crimson Pro, serif', color: '#c8962a', fontSize: '0.85rem', fontStyle: 'italic', marginBottom: 12 }}>{member.role}</div>
              <p style={{ fontFamily: 'Crimson Pro, serif', color: '#8a9ab5', fontSize: '0.9rem', lineHeight: 1.65, marginBottom: 20 }}>{member.bio}</p>
              <Link href="/request" style={{
                display: 'block', textAlign: 'center',
                fontFamily: 'Cinzel, serif', fontSize: '0.58rem', letterSpacing: '0.12em',
                padding: '9px 0', border: '1px solid rgba(200,150,42,0.3)',
                color: '#c8962a', textDecoration: 'none', borderRadius: 2,
                transition: 'background 0.2s',
              }}>
                SEND A REQUEST
              </Link>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 44 }}>
          <Link href="/cast" style={{
            fontFamily: 'Cinzel, serif', fontSize: '0.62rem', letterSpacing: '0.15em',
            padding: '13px 32px', border: '1px solid rgba(200,150,42,0.35)',
            color: '#c8962a', textDecoration: 'none', borderRadius: 2,
          }}>
            VIEW FULL CAST DIRECTORY
          </Link>
        </div>
      </section>

      {/* Divider */}
      <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,rgba(200,150,42,0.25),transparent)', maxWidth: 1100, margin: '0 auto' }} />

      {/* ── REQUEST CATEGORIES ── */}
      <section style={{ padding: '90px 24px', background: 'linear-gradient(180deg,#080e1f 0%,#0d1730 50%,#080e1f 100%)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 16 }}>
              <div style={{ height: 1, width: 48, background: 'rgba(200,150,42,0.3)' }} />
              <span style={{ fontFamily: 'Cinzel, serif', fontSize: '0.58rem', letterSpacing: '0.35em', color: '#c8962a' }}>FAN REQUESTS</span>
              <div style={{ height: 1, width: 48, background: 'rgba(200,150,42,0.3)' }} />
            </div>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem,5vw,3.8rem)', fontWeight: 300, fontStyle: 'italic' }}>
              How Can We <span style={{ color: '#e8b84b' }}>Serve</span> You?
            </h2>
            <p style={{ fontFamily: 'Crimson Pro, serif', color: '#8a9ab5', fontSize: '1.05rem', marginTop: 12, maxWidth: 480, margin: '12px auto 0', lineHeight: 1.7 }}>
              All requests go through management. Cast privacy is fully protected.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 14, marginBottom: 44 }}>
            {categories.map((cat, i) => (
              <Link key={i} href="/request" style={{
                background: 'rgba(13,23,48,0.7)', border: '1px solid rgba(200,150,42,0.12)',
                borderRadius: 4, padding: '22px 18px', textAlign: 'center',
                textDecoration: 'none', display: 'block',
                transition: 'all 0.3s ease',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(200,150,42,0.5)'; e.currentTarget.style.transform = 'translateY(-3px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(200,150,42,0.12)'; e.currentTarget.style.transform = 'none' }}
              >
                <div style={{ fontSize: '1.3rem', marginBottom: 10, color: '#c8962a' }}>{cat.icon}</div>
                <div style={{ fontFamily: 'Cinzel, serif', fontSize: '0.62rem', letterSpacing: '0.1em', color: '#a0b0c8', fontWeight: 600 }}>{cat.label}</div>
              </Link>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link href="/request" style={{
              fontFamily: 'Cinzel, serif', fontSize: '0.68rem', letterSpacing: '0.12em',
              padding: '15px 40px', borderRadius: 2, textDecoration: 'none',
              background: 'linear-gradient(135deg, #c8962a, #e8b84b)', color: '#080e1f', fontWeight: 700,
            }}>
              SUBMIT YOUR REQUEST NOW
            </Link>
          </div>
        </div>
      </section>

      {/* ── QUOTE ── */}
      <section style={{ background: 'rgba(13,23,48,0.98)', borderTop: '1px solid rgba(200,150,42,0.1)', borderBottom: '1px solid rgba(200,150,42,0.1)', padding: '72px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: '1.4rem', color: '#c8962a', marginBottom: 24 }}>✦</div>
        <blockquote style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.5rem,4vw,2.8rem)', fontWeight: 300, fontStyle: 'italic', maxWidth: 740, margin: '0 auto 20px', lineHeight: 1.4, color: 'rgba(240,234,214,0.88)' }}>
          "No one who comes to me will I ever turn away."
        </blockquote>
        <cite style={{ fontFamily: 'Cinzel, serif', fontSize: '0.62rem', letterSpacing: '0.25em', color: '#c8962a', fontStyle: 'normal' }}>
          — JOHN 6:37
        </cite>
      </section>

      <Footer />
    </>
  )
    }
    

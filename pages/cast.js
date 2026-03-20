import Head from 'next/head'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const cast = [
  { initials: 'JR', name: 'Jonathan Roumie',   role: 'Jesus of Nazareth', bio: 'Known worldwide for his deeply moving and human portrayal of Jesus. Jonathan brings warmth, authority, and compassion to every scene.'          },
  { initials: 'SI', name: 'Shahar Isaac',       role: 'Simon Peter',       bio: 'Shahar brings raw energy, humor, and deep vulnerability to Simon Peter — the fisherman who became the rock of the church.'                         },
  { initials: 'ET', name: 'Elizabeth Tabish',   role: 'Mary Magdalene',    bio: "Elizabeth's portrayal of Mary Magdalene's transformation from darkness to redemption has moved audiences to tears around the world."               },
  { initials: 'PP', name: 'Paras Patel',        role: 'Matthew',           bio: 'Paras gives Matthew a quiet brilliance — the detail-obsessed tax collector discovering grace for the first time.'                                   },
  { initials: 'NA', name: 'Noah James',         role: 'Andrew',            bio: 'Noah portrays Andrew with gentle strength and unwavering faithfulness as Simon Peter\'s devoted brother and fellow disciple.'                       },
  { initials: 'GB', name: 'George H. Xanthis',  role: 'John',              bio: 'George brings a youthful earnestness and spiritual depth to John, the beloved disciple closest to Jesus.'                                           },
  { initials: 'KA', name: 'Amber Shana Williams',role: 'Mary (Mother)',    bio: 'Amber portrays the mother of Jesus with quiet dignity and immense strength — a woman who carried the weight of a divine calling.'                   },
  { initials: 'DS', name: 'Dallas Jenkins',     role: 'Director / Creator', bio: 'The visionary behind The Chosen. Dallas created the most-watched Christian media project in history, funded entirely by fans like you.'           },
]

export default function CastPage() {
  return (
    <>
      <Head>
        <title>Cast & Crew – The Chosen Fan Platform</title>
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Crimson+Pro:wght@300;400&display=swap" rel="stylesheet" />
      </Head>

      <Navbar />

      {/* Page Header */}
      <section style={{
        paddingTop: 160, paddingBottom: 72, textAlign: 'center', paddingLeft: 24, paddingRight: 24,
        background: 'radial-gradient(ellipse at center top, rgba(200,150,42,0.07) 0%, transparent 60%), #080e1f',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 20 }}>
          <div style={{ height: 1, width: 48, background: 'rgba(200,150,42,0.35)' }} />
          <span style={{ fontFamily: 'Cinzel, serif', fontSize: '0.6rem', letterSpacing: '0.35em', color: '#c8962a' }}>THE PEOPLE</span>
          <div style={{ height: 1, width: 48, background: 'rgba(200,150,42,0.35)' }} />
        </div>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.4rem,6vw,5rem)', fontWeight: 300, fontStyle: 'italic', marginBottom: 20 }}>
          Cast <span style={{ color: '#e8b84b' }}>&</span> Crew Directory
        </h1>
        <p style={{ fontFamily: 'Crimson Pro, serif', color: '#8a9ab5', fontSize: '1.1rem', maxWidth: 480, margin: '0 auto', lineHeight: 1.75 }}>
          Browse the talented people behind The Chosen and send them your request through our management team.
        </p>
      </section>

      {/* Cast Grid */}
      <section style={{ padding: '24px 24px 100px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 28 }}>
          {cast.map((member, i) => (
            <div key={i} style={{
              background: 'linear-gradient(145deg, rgba(13,23,48,0.95), rgba(8,14,31,0.98))',
              border: '1px solid rgba(200,150,42,0.1)', borderRadius: 4, padding: '32px 28px',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 20px 50px rgba(200,150,42,0.14)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}
            >
              {/* Avatar */}
              <div style={{
                width: 72, height: 72, borderRadius: '50%',
                background: 'rgba(200,150,42,0.08)', border: '1px solid rgba(200,150,42,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18,
              }}>
                <span style={{ fontFamily: 'Cinzel, serif', fontSize: '1.1rem', color: '#c8962a', fontWeight: 600 }}>{member.initials}</span>
              </div>

              <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: '0.88rem', fontWeight: 600, color: '#f0ead6', letterSpacing: '0.06em', marginBottom: 5 }}>{member.name}</h3>
              <div style={{ fontFamily: 'Crimson Pro, serif', color: '#c8962a', fontSize: '0.88rem', fontStyle: 'italic', marginBottom: 14 }}>{member.role}</div>
              <p style={{ fontFamily: 'Crimson Pro, serif', color: '#8a9ab5', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: 24 }}>{member.bio}</p>

              <Link href={`/request?cast=${encodeURIComponent(member.name)}`} style={{
                display: 'block', textAlign: 'center',
                fontFamily: 'Cinzel, serif', fontSize: '0.58rem', letterSpacing: '0.12em',
                padding: '10px 0', border: '1px solid rgba(200,150,42,0.3)',
                color: '#c8962a', textDecoration: 'none', borderRadius: 2,
                transition: 'all 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(200,150,42,0.08)'; e.currentTarget.style.borderColor = '#c8962a' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(200,150,42,0.3)' }}
              >
                SEND A REQUEST
              </Link>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  )
    }
  

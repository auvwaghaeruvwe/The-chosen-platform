import Head from 'next/head'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const CATEGORIES = [
  { icon: '✦', label: 'Meet & Greet',       desc: 'Connect in person'        },
  { icon: '◈', label: 'Video Shoutouts',    desc: 'Personalized messages'    },
  { icon: '⬡', label: 'Event Booking',      desc: 'Live appearances'         },
  { icon: '◉', label: 'Interviews',         desc: 'Media & press'            },
  { icon: '✧', label: 'Collaborations',     desc: 'Creative projects'        },
  { icon: '◎', label: 'Prayer Requests',    desc: 'Spiritual support'        },
  { icon: '⬢', label: 'General Messages',   desc: 'Fan mail & notes'         },
  { icon: '◈', label: 'Business Inquiries', desc: 'Professional partnerships'},
]

export default function RequestPage() {
  const router = useRouter()
  const prefilledCast = router.query.cast || ''

  const [selected, setSelected]   = useState(null)
  const [status, setStatus]       = useState('idle') // idle | loading | success | error
  const [errorMsg, setErrorMsg]   = useState('')
  const [form, setForm]           = useState({
    name: '', email: '', castMember: prefilledCast, message: '', agreed: false,
  })

  const update = field => e => setForm(prev => ({
    ...prev, [field]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
  }))

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.agreed) { setErrorMsg('Please tick the checkbox to continue.'); setStatus('error'); return }

    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/submit-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:       form.name,
          email:      form.email,
          message:    form.message,
          category:   selected !== null ? CATEGORIES[selected].label : 'General Inquiry',
          castMember: form.castMember || undefined,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong.')
      setStatus('success')
    } catch (err) {
      setErrorMsg(err.message)
      setStatus('error')
    }
  }

  const inputStyle = {
    background: 'rgba(21,33,64,0.6)', border: '1px solid rgba(200,150,42,0.2)',
    color: '#f0ead6', padding: '12px 16px', borderRadius: 2, width: '100%',
    fontFamily: 'Crimson Pro, serif', fontSize: '1rem', outline: 'none',
  }
  const labelStyle = {
    fontFamily: 'Cinzel, serif', fontSize: '0.57rem',
    letterSpacing: '0.2em', color: '#8a9ab5', display: 'block', marginBottom: 8,
  }

  return (
    <>
      <Head>
        <title>Submit a Request – The Chosen Fan Platform</title>
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Crimson+Pro:wght@300;400&display=swap" rel="stylesheet" />
      </Head>

      <Navbar />

      {/* Page Header */}
      <section style={{
        paddingTop: 160, paddingBottom: 64, textAlign: 'center', paddingLeft: 24, paddingRight: 24,
        background: 'radial-gradient(ellipse at center top, rgba(200,150,42,0.06) 0%, transparent 60%), #080e1f',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 18 }}>
          <div style={{ height: 1, width: 44, background: 'rgba(200,150,42,0.35)' }} />
          <span style={{ fontFamily: 'Cinzel, serif', fontSize: '0.58rem', letterSpacing: '0.35em', color: '#c8962a' }}>FAN REQUESTS</span>
          <div style={{ height: 1, width: 44, background: 'rgba(200,150,42,0.35)' }} />
        </div>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.2rem,5vw,4.5rem)', fontWeight: 300, fontStyle: 'italic', marginBottom: 18 }}>
          How Can We <span style={{ color: '#e8b84b' }}>Serve</span> You?
        </h1>
        <p style={{ fontFamily: 'Crimson Pro, serif', color: '#8a9ab5', fontSize: '1.05rem', maxWidth: 460, margin: '0 auto', lineHeight: 1.75 }}>
          Pick a category below, fill in your details, and our management team will get back to you within 3–5 business days.
        </p>
      </section>

      <section style={{ padding: '20px 24px 100px', maxWidth: 1100, margin: '0 auto' }}>

        {/* Category Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(190px,1fr))', gap: 12, marginBottom: 52 }}>
          {CATEGORIES.map((cat, i) => (
            <div key={i}
              onClick={() => setSelected(selected === i ? null : i)}
              style={{
                background: selected === i ? 'rgba(21,33,64,0.9)' : 'rgba(13,23,48,0.7)',
                border: selected === i ? '1px solid #c8962a' : '1px solid rgba(200,150,42,0.12)',
                borderRadius: 4, padding: '20px 16px', textAlign: 'center', cursor: 'pointer',
                transform: selected === i ? 'translateY(-3px)' : 'none',
                boxShadow: selected === i ? '0 12px 36px rgba(200,150,42,0.12)' : 'none',
                transition: 'all 0.25s ease',
              }}
            >
              <div style={{ fontSize: '1.25rem', marginBottom: 8, color: selected === i ? '#e8b84b' : '#c8962a' }}>{cat.icon}</div>
              <div style={{ fontFamily: 'Cinzel, serif', fontSize: '0.6rem', letterSpacing: '0.1em', color: selected === i ? '#f0ead6' : '#a0b0c8', marginBottom: 4 }}>{cat.label}</div>
              <div style={{ fontFamily: 'Crimson Pro, serif', fontSize: '0.78rem', color: '#8a9ab5' }}>{cat.desc}</div>
            </div>
          ))}
        </div>

        {/* Form */}
        <div style={{ background: 'rgba(8,14,31,0.7)', border: '1px solid rgba(200,150,42,0.12)', borderRadius: 4, padding: '44px 40px', maxWidth: 720, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.75rem', fontStyle: 'italic', textAlign: 'center', marginBottom: 8, color: '#f0ead6' }}>
            Your Request
          </h2>
          {selected !== null && (
            <p style={{ textAlign: 'center', fontFamily: 'Crimson Pro, serif', color: '#c8962a', fontSize: '0.9rem', fontStyle: 'italic', marginBottom: 28 }}>
              ✦ {CATEGORIES[selected].label}
            </p>
          )}
          {selected === null && (
            <p style={{ textAlign: 'center', fontFamily: 'Crimson Pro, serif', color: '#8a9ab5', fontSize: '0.88rem', marginBottom: 28 }}>
              Select a category above or submit as a general inquiry
            </p>
          )}

          {/* Success */}
          {status === 'success' ? (
            <div style={{ textAlign: 'center', padding: '32px 0' }}>
              <div style={{ fontSize: '2.5rem', color: '#c8962a', marginBottom: 16 }}>✦</div>
              <h3 style={{ fontFamily: 'Cinzel, serif', color: '#e8b84b', fontSize: '0.85rem', letterSpacing: '0.15em', marginBottom: 12 }}>REQUEST RECEIVED</h3>
              <p style={{ fontFamily: 'Crimson Pro, serif', color: '#8a9ab5', fontSize: '1rem', lineHeight: 1.7, marginBottom: 28 }}>
                Thank you! A confirmation has been sent to your email.<br />Our team will respond within 3–5 business days.
              </p>
              <button onClick={() => setStatus('idle')} style={{
                fontFamily: 'Cinzel, serif', fontSize: '0.62rem', letterSpacing: '0.12em',
                padding: '12px 28px', border: '1px solid rgba(200,150,42,0.35)',
                background: 'transparent', color: '#c8962a', cursor: 'pointer', borderRadius: 2,
              }}>
                SUBMIT ANOTHER REQUEST
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

              {/* Name + Email */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={labelStyle}>FULL NAME *</label>
                  <input style={inputStyle} type="text" placeholder="Your full name" value={form.name} onChange={update('name')} required disabled={status === 'loading'} />
                </div>
                <div>
                  <label style={labelStyle}>EMAIL ADDRESS *</label>
                  <input style={inputStyle} type="email" placeholder="your@email.com" value={form.email} onChange={update('email')} required disabled={status === 'loading'} />
                </div>
              </div>

              {/* Cast Member */}
              <div>
                <label style={labelStyle}>CAST MEMBER (OPTIONAL)</label>
                <input style={inputStyle} type="text" placeholder="e.g. Jonathan Roumie" value={form.castMember} onChange={update('castMember')} disabled={status === 'loading'} />
              </div>

              {/* Message */}
              <div>
                <label style={labelStyle}>YOUR MESSAGE *</label>
                <textarea style={{ ...inputStyle, resize: 'vertical' }} placeholder="Describe your request in detail..." value={form.message} onChange={update('message')} required rows={5} disabled={status === 'loading'} />
              </div>

              {/* Error */}
              {status === 'error' && errorMsg && (
                <div style={{ background: 'rgba(180,40,40,0.1)', border: '1px solid rgba(200,60,60,0.3)', borderRadius: 2, padding: '14px 18px', fontFamily: 'Crimson Pro, serif', color: '#f08080', fontSize: '0.95rem' }}>
                  ⚠ {errorMsg}
                </div>
              )}

              {/* Checkbox */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <input type="checkbox" id="agreed" checked={form.agreed} onChange={update('agreed')} style={{ accentColor: '#c8962a', marginTop: 3, flexShrink: 0 }} />
                <label htmlFor="agreed" style={{ fontFamily: 'Crimson Pro, serif', color: '#8a9ab5', fontSize: '0.88rem', cursor: 'pointer', lineHeight: 1.55 }}>
                  I understand all requests go through management and cast privacy is protected.
                </label>
              </div>

              {/* Submit button */}
              <button type="submit" disabled={status === 'loading'} style={{
                fontFamily: 'Cinzel, serif', fontSize: '0.68rem', letterSpacing: '0.12em',
                padding: '15px', borderRadius: 2, border: 'none', cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                background: status === 'loading' ? 'rgba(200,150,42,0.4)' : 'linear-gradient(135deg,#c8962a,#e8b84b)',
                color: '#080e1f', fontWeight: 700, width: '100%',
              }}>
                {status === 'loading' ? 'SENDING…' : 'SUBMIT REQUEST'}
              </button>

            </form>
          )}
        </div>
      </section>

      <Footer />
    </>
  )
}
  

import Head from 'next/head'
import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const AMOUNTS = [10, 25, 50, 100, 250, 500]

const perks = [
  { amount: 10,  perk: 'Supporter badge + thank you email'             },
  { amount: 25,  perk: 'Above + name in our monthly donor list'         },
  { amount: 50,  perk: 'Above + exclusive behind-the-scenes newsletter' },
  { amount: 100, perk: 'Above + priority request processing'            },
  { amount: 250, perk: 'Above + personal thank you from the team'       },
  { amount: 500, perk: 'Above + VIP recognition on the platform'        },
]

export default function DonatePage() {
  const [amount, setAmount]   = useState(25)
  const [custom, setCustom]   = useState('')
  const [name, setName]       = useState('')
  const [email, setEmail]     = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  const finalAmount = custom ? Number(custom) : amount

  const handleDonate = async () => {
    if (!name || !email) { setError('Please enter your name and email.'); return }
    if (finalAmount < 1)  { setError('Please enter a valid amount.');      return }

    setError('')
    setLoading(true)

    try {
      // Call our API route to create a Stripe checkout session
      const res = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: finalAmount, name, email }),
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.error || 'Something went wrong.')

      // Redirect fan to Stripe checkout page
      window.location.href = data.url

    } catch (err) {
      setError(err.message)
      setLoading(false)
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
        <title>Donate – The Chosen Fan Platform</title>
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Crimson+Pro:wght@300;400&display=swap" rel="stylesheet" />
      </Head>

      <Navbar />

      {/* Header */}
      <section style={{
        paddingTop: 160, paddingBottom: 72, textAlign: 'center', paddingLeft: 24, paddingRight: 24,
        background: 'radial-gradient(ellipse at center top, rgba(200,150,42,0.07) 0%, transparent 60%), #080e1f',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 18 }}>
          <div style={{ height: 1, width: 44, background: 'rgba(200,150,42,0.35)' }} />
          <span style={{ fontFamily: 'Cinzel, serif', fontSize: '0.58rem', letterSpacing: '0.35em', color: '#c8962a' }}>SUPPORT THE MISSION</span>
          <div style={{ height: 1, width: 44, background: 'rgba(200,150,42,0.35)' }} />
        </div>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.2rem,5vw,4.5rem)', fontWeight: 300, fontStyle: 'italic', marginBottom: 18 }}>
          Be Part of <span style={{ color: '#e8b84b' }}>Something</span> Eternal
        </h1>
        <p style={{ fontFamily: 'Crimson Pro, serif', color: '#8a9ab5', fontSize: '1.05rem', maxWidth: 500, margin: '0 auto', lineHeight: 1.8 }}>
          The Chosen is 100% crowd-funded. Every dollar you give goes directly
          to production — the next episode, the next season, the next life changed.
        </p>
      </section>

      {/* Main content */}
      <section style={{ padding: '20px 24px 100px', maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>

        {/* LEFT: Perks */}
        <div>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', fontStyle: 'italic', fontWeight: 300, marginBottom: 32, color: '#f0ead6' }}>
            What Your Gift Unlocks
          </h2>
          {perks.map((p, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'flex-start', gap: 20, marginBottom: 20,
              padding: '16px 18px',
              background: finalAmount >= p.amount ? 'rgba(200,150,42,0.06)' : 'transparent',
              border: finalAmount >= p.amount ? '1px solid rgba(200,150,42,0.2)' : '1px solid transparent',
              borderRadius: 4, transition: 'all 0.3s',
            }}>
              <div style={{
                fontFamily: 'Cinzel, serif', fontSize: '0.85rem', fontWeight: 700,
                color: finalAmount >= p.amount ? '#e8b84b' : '#8a9ab5',
                minWidth: 48, transition: 'color 0.3s',
              }}>
                ${p.amount}
              </div>
              <div style={{ fontFamily: 'Crimson Pro, serif', color: finalAmount >= p.amount ? '#c8d0df' : '#8a9ab5', fontSize: '0.95rem', lineHeight: 1.6 }}>
                {p.perk}
              </div>
            </div>
          ))}

          {/* Large donation note */}
          <div style={{ marginTop: 32, padding: '20px', background: 'rgba(13,23,48,0.8)', border: '1px solid rgba(200,150,42,0.12)', borderRadius: 4 }}>
            <div style={{ fontFamily: 'Cinzel, serif', fontSize: '0.6rem', letterSpacing: '0.2em', color: '#c8962a', marginBottom: 8 }}>
              LARGE DONATIONS
            </div>
            <p style={{ fontFamily: 'Crimson Pro, serif', color: '#8a9ab5', fontSize: '0.92rem', lineHeight: 1.7 }}>
              For donations above $500 or bank transfers, please contact our team directly for safe and verified payment details.
            </p>
            <a href="mailto:management@gmail.com" style={{ display: 'inline-block', marginTop: 12, fontFamily: 'Cinzel, serif', fontSize: '0.6rem', letterSpacing: '0.15em', color: '#c8962a', textDecoration: 'none' }}>
              CONTACT MANAGEMENT →
            </a>
          </div>
        </div>

        {/* RIGHT: Donation widget */}
        <div style={{ background: 'rgba(13,23,48,0.8)', border: '1px solid rgba(200,150,42,0.15)', borderRadius: 4, padding: '40px 36px' }}>
          <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: '0.72rem', letterSpacing: '0.2em', color: '#c8962a', textAlign: 'center', marginBottom: 28 }}>
            CHOOSE YOUR GIFT
          </h3>

          {/* Preset amounts */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginBottom: 18 }}>
            {AMOUNTS.map(a => (
              <button key={a} onClick={() => { setAmount(a); setCustom('') }} style={{
                padding: '12px 8px', borderRadius: 2, cursor: 'pointer',
                fontFamily: 'Cinzel, serif', fontSize: '0.82rem',
                border: amount === a && !custom ? '1px solid #c8962a' : '1px solid rgba(200,150,42,0.25)',
                background: amount === a && !custom ? 'rgba(200,150,42,0.1)' : 'transparent',
                color: amount === a && !custom ? '#e8b84b' : '#8a9ab5',
                transition: 'all 0.2s',
              }}>
                ${a}
              </button>
            ))}
          </div>

          {/* Custom amount */}
          <div style={{ marginBottom: 24 }}>
            <label style={labelStyle}>CUSTOM AMOUNT</label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#c8962a', fontFamily: 'Cinzel, serif' }}>$</span>
              <input style={{ ...inputStyle, paddingLeft: 30 }} type="number" placeholder="Enter amount" value={custom} onChange={e => setCustom(e.target.value)} min="1" />
            </div>
          </div>

          {/* Name + Email */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 24 }}>
            <div>
              <label style={labelStyle}>YOUR NAME *</label>
              <input style={inputStyle} type="text" placeholder="Full name" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>EMAIL ADDRESS *</label>
              <input style={inputStyle} type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
          </div>

          {/* Total */}
          <div style={{ background: 'rgba(200,150,42,0.06)', border: '1px solid rgba(200,150,42,0.15)', borderRadius: 2, padding: '14px 18px', marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: 'Crimson Pro, serif', color: '#8a9ab5', fontSize: '0.9rem' }}>Your Contribution</span>
            <span style={{ fontFamily: 'Cinzel, serif', color: '#e8b84b', fontSize: '1.3rem', fontWeight: 700 }}>${finalAmount || 0}</span>
          </div>

          {/* Error */}
          {error && (
            <div style={{ background: 'rgba(180,40,40,0.1)', border: '1px solid rgba(200,60,60,0.3)', borderRadius: 2, padding: '12px 16px', marginBottom: 16, fontFamily: 'Crimson Pro, serif', color: '#f08080', fontSize: '0.9rem' }}>
              ⚠ {error}
            </div>
          )}

          {/* Donate button */}
          <button onClick={handleDonate} disabled={loading} style={{
            width: '100%', padding: '15px', borderRadius: 2, border: 'none',
            cursor: loading ? 'not-allowed' : 'pointer',
            background: loading ? 'rgba(200,150,42,0.4)' : 'linear-gradient(135deg,#c8962a,#e8b84b)',
            color: '#080e1f', fontFamily: 'Cinzel, serif', fontSize: '0.68rem',
            letterSpacing: '0.12em', fontWeight: 700,
          }}>
            {loading ? 'OPENING PAYMENT…' : `DONATE $${finalAmount || 0} SECURELY`}
          </button>

          <p style={{ textAlign: 'center', fontFamily: 'Crimson Pro, serif', color: '#8a9ab5', fontSize: '0.78rem', marginTop: 14, fontStyle: 'italic' }}>
            Secure payment via Stripe · All cards accepted worldwide
          </p>
        </div>

      </section>

      <Footer />
    </>
  )
    }
    

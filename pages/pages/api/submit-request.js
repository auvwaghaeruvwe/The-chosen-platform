// This file runs on the SERVER (not in the browser).
// It receives the form data and sends two emails:
//   1. To your management Gmail
//   2. A confirmation back to the fan

import nodemailer from 'nodemailer'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' })
  }

  const { name, email, message, category, castMember } = req.body

  // Basic checks
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' })
  }

  // Email format check
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' })
  }

  const timestamp = new Date().toLocaleString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })

  // Connect to Gmail
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASS,
    },
  })

  try {
    // ── Email 1: Alert management ──────────────────────────────────────────
    await transporter.sendMail({
      from:    `"The Chosen Fan Platform" <${process.env.GMAIL_USER}>`,
      to:      process.env.MANAGEMENT_EMAIL || process.env.GMAIL_USER,
      replyTo: email,
      subject: `[${category || 'General'}] New request from ${name}`,
      html: `
        <div style="background:#080e1f;padding:32px;font-family:Georgia,serif;color:#f0ead6;max-width:600px;margin:0 auto;">
          <div style="border-bottom:1px solid rgba(200,150,42,0.3);padding-bottom:24px;margin-bottom:24px;text-align:center;">
            <h1 style="color:#c8962a;font-size:1rem;letter-spacing:0.2em;">✦ NEW FAN REQUEST</h1>
            <p style="color:#8a9ab5;font-size:0.85rem;">The Chosen Fan Platform</p>
          </div>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:10px 0;color:#8a9ab5;font-size:0.85rem;width:140px;">Category</td><td style="padding:10px 0;color:#f0ead6;">${category || 'General Inquiry'}</td></tr>
            ${castMember ? `<tr><td style="padding:10px 0;color:#8a9ab5;font-size:0.85rem;">Cast Member</td><td style="padding:10px 0;color:#f0ead6;">${castMember}</td></tr>` : ''}
            <tr><td style="padding:10px 0;color:#8a9ab5;font-size:0.85rem;">Fan Name</td><td style="padding:10px 0;color:#f0ead6;">${name}</td></tr>
            <tr><td style="padding:10px 0;color:#8a9ab5;font-size:0.85rem;">Reply-To Email</td><td style="padding:10px 0;color:#e8b84b;">${email}</td></tr>
            <tr><td style="padding:10px 0;color:#8a9ab5;font-size:0.85rem;">Submitted</td><td style="padding:10px 0;color:#f0ead6;">${timestamp}</td></tr>
          </table>
          <div style="margin-top:24px;padding:20px;background:rgba(21,33,64,0.6);border-left:2px solid #c8962a;">
            <p style="color:#8a9ab5;font-size:0.8rem;margin-bottom:8px;">MESSAGE</p>
            <p style="color:#f0ead6;line-height:1.7;">${message}</p>
          </div>
          <div style="margin-top:24px;text-align:center;">
            <a href="mailto:${email}?subject=Re: Your ${category || 'Fan'} Request" style="display:inline-block;padding:12px 28px;background:linear-gradient(135deg,#c8962a,#e8b84b);color:#080e1f;text-decoration:none;font-size:0.75rem;letter-spacing:0.15em;font-weight:bold;">
              REPLY TO ${name.toUpperCase()}
            </a>
          </div>
        </div>
      `,
    })

    // ── Email 2: Confirmation to the fan ──────────────────────────────────
    await transporter.sendMail({
      from:    `"The Chosen Team" <${process.env.GMAIL_USER}>`,
      to:      email,
      subject: `We received your request, ${name.split(' ')[0]} ✦`,
      html: `
        <div style="background:#080e1f;padding:32px;font-family:Georgia,serif;color:#f0ead6;max-width:600px;margin:0 auto;text-align:center;">
          <div style="margin-bottom:28px;">
            <p style="color:#c8962a;font-size:1.5rem;">✦</p>
            <h1 style="font-style:italic;font-weight:300;font-size:1.8rem;margin:8px 0;">Your request was received</h1>
            <p style="color:#8a9ab5;">The Chosen Fan Platform</p>
          </div>
          <div style="background:rgba(13,23,48,0.8);border:1px solid rgba(200,150,42,0.2);padding:28px;border-radius:4px;margin-bottom:28px;">
            <p style="color:#f0ead6;line-height:1.8;font-size:1rem;">
              Thank you, <strong style="color:#e8b84b;">${name.split(' ')[0]}</strong>! 
              Your <strong>${category || 'general'}</strong> request has been delivered to our management team.
            </p>
            <div style="margin-top:20px;padding:14px;background:rgba(200,150,42,0.07);border:1px solid rgba(200,150,42,0.15);">
              <p style="color:#c8962a;font-size:0.8rem;letter-spacing:0.15em;">EXPECTED RESPONSE TIME</p>
              <p style="color:#f0ead6;font-size:1.1rem;margin-top:4px;">3 – 5 Business Days</p>
            </div>
          </div>
          <p style="color:#8a9ab5;font-style:italic;font-size:1rem;line-height:1.7;max-width:400px;margin:0 auto 20px;">
            "No one who comes to me will I ever turn away."<br/>
            <span style="color:#c8962a;font-size:0.75rem;letter-spacing:0.15em;">— JOHN 6:37</span>
          </p>
          <p style="color:#8a9ab5;font-size:0.78rem;">This is an automated confirmation. Please do not reply to this email.</p>
        </div>
      `,
    })

    return res.status(200).json({ success: true })

  } catch (err) {
    console.error('Email error:', err)
    return res.status(500).json({ error: 'Failed to send. Please try again later.' })
  }
}


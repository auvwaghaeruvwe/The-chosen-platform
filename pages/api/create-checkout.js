// This file creates a Stripe checkout session
// Fan clicks Donate → this runs → Stripe payment page opens

import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' })
  }

  const { amount, name, email } = req.body

  if (!amount || amount < 1) {
    return res.status(400).json({ error: 'Invalid amount.' })
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: email,
      metadata: { donor_name: name },
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Donation – The Chosen Fan Platform',
              description: `Donation from ${name}. Thank you for supporting The Chosen!`,
            },
            unit_amount: Math.round(amount * 100), // Stripe uses cents
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/donate?success=true`,
      cancel_url:  `${process.env.NEXT_PUBLIC_SITE_URL}/donate?cancelled=true`,
    })

    return res.status(200).json({ url: session.url })

  } catch (err) {
    console.error('Stripe error:', err)
    return res.status(500).json({ error: 'Payment setup failed. Please try again.' })
  }
}

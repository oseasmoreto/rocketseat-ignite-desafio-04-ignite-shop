import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../lib/stripe";

export default async function handler(red: NextApiRequest, res: NextApiResponse) {
  const priceId = ''

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: `${process.env.NEXT_URL}/success`,
    cancel_url: `${process.env.NEXT_URL}/`,
    mode: 'payment',
    line_items: [{
      price: priceId,
      quantity: 1
    }],
  })

  return res.status(201).json({
    checkoutUrl: checkoutSession.url
  })
}
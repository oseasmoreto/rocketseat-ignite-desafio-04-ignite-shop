import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../lib/stripe";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { products } = req.body

  if (req.method !== 'POST') {
    return res.status(405).json( { error: 'Method not allowed' } )
  }

  if (!products || products.length === 0) {
    return res.status(400).json( {error: 'Products not found'} )
  }

  const items = products.map((product: string) => {
    return {
      price: product,
      quantity: 1
    }
  })

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_URL}/`,
    mode: 'payment',
    line_items: items,
  })

  return res.status(201).json({
    checkoutUrl: checkoutSession.url
  })
}
import Image from "next/image"
import { GetStaticProps } from "next"

import { ImageContainer, ProductContainer, ProductDetails } from "../../styles/pages/product"

import Stripe from "stripe"
import { stripe } from "../../lib/stripe"
import { priceFormatter } from "../../utils/formatter"

interface ProductProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    description: string;
  }
}

export default function Product({ product } : ProductProps) {
  
  return (
    <ProductContainer>
      <ImageContainer>
        <Image src={product.imageUrl} alt={product.name} />
      </ImageContainer>
      <ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>

        <p>{product.description}</p>
        <button>Comprar agora</button>
      </ProductDetails>
    </ProductContainer>
  )
}

export const getStaticProps: GetStaticProps<any, {id: string}> = async ({ params }) => {
  const productId = params !== undefined ? params.id : ''

  const product = await stripe.products.retrieve(productId,{
    expand: ['default_price']
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: priceFormatter.format(price.unit_amount !== null ? price.unit_amount / 100 : 0),
        description: product.description
      }
    },
    revalidate: 60 * 60 * 1,
  }
}
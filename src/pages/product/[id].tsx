import Image from "next/image"
import { GetStaticPaths, GetStaticProps } from "next"

import { ImageContainer, ProductContainer, ProductDetails } from "../../styles/pages/product"

import Stripe from "stripe"
import { stripe } from "../../lib/stripe"
import { priceFormatter } from "../../utils/formatter"
import { useRouter } from "next/router"
import axios from "axios"
import { useState } from "react"
import Head from "next/head"
import { Skeleton } from "../../components/Skeleton"
import { Product as ProductType } from "../../types/cart"

interface ProductProps {
  product: ProductType
}

export default function Product({ product } : ProductProps) {
  const { isFallback } = useRouter();
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)

  if(isFallback)  return (<Skeleton />)

  async function handleBuyProduct(){
    try {
      setIsCreatingCheckoutSession(true)

      const response = await axios.post('/api/checkout', {
        priceId: product.defaultPriceId,
      })

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl
    } catch (err) {
      setIsCreatingCheckoutSession(false)
      alert('Falha ao redirecionar ao checkout')
    }


  }

  return (
    <>
      <Head><title>{product.name} | Ignite Shop</title></Head>
      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} alt={product.name} width={520} height={480} />
        </ImageContainer>
        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>

          <p>{product.description}</p>
          <button 
            onClick={handleBuyProduct}
            disabled={isCreatingCheckoutSession}
          >Colocar na sacola</button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  //BUSCAR PRODUTOS MAIS VENDIDOS OU ACESSADOS

  return {
    paths: [
      {params: {id: 'prod_N4qiv9WgxKpcw8'}}
    ],
    fallback: true
  }
}

export const getStaticProps: GetStaticProps<any, {id: string}> = async ({ params }) => {
  const productId = params !== undefined ? params.id : ''

  const product = await stripe.products.retrieve(productId,{
    expand: ['default_price']
  })

  const price = product.default_price as Stripe.Price
  const priceInReal = price.unit_amount !== null ? price.unit_amount / 100 : 0

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: priceInReal,
        formattedPrice: priceFormatter.format(priceInReal),
        description: product.description,
        defaultPriceId: price.id
      }
    },
    revalidate: 60 * 60 * 1,
  }
}
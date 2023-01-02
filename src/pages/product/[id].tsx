import Image from "next/image"
import { GetStaticPaths, GetStaticProps } from "next"

import { ImageContainer, ProductContainer, ProductDetails } from "../../styles/pages/product"

import Stripe from "stripe"
import { stripe } from "../../lib/stripe"
import { priceFormatter } from "../../utils/formatter"
import { useRouter } from "next/router"

interface ProductProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    description: string;
    defaultPriceId: string
  }
}

export default function Product({ product } : ProductProps) {
  const { isFallback } = useRouter();

  if(isFallback) return (<h1>Carregando...</h1>)

  function handleBuyProduct(){


    
  }

  return (
    <ProductContainer>
      <ImageContainer>
        <Image src={product.imageUrl} alt={product.name} width={520} height={480} />
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

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: priceFormatter.format(price.unit_amount !== null ? price.unit_amount / 100 : 0),
        description: product.description,
        defaultPriceId: price.id
      }
    },
    revalidate: 60 * 60 * 1,
  }
}
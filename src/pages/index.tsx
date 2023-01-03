import { HomeContainer, Product } from "../styles/pages/home"

import { useKeenSlider } from 'keen-slider/react'

import Image from "next/image"
import Link from "next/link"
import Head from "next/head"

import 'keen-slider/keen-slider.min.css'
import { stripe } from "../lib/stripe"
import { GetStaticProps } from "next"
import Stripe from "stripe"
import { priceFormatter } from "../utils/formatter"
import { Handbag } from "phosphor-react"
import { Skeleton } from "../components/Skeleton"
import { useRouter } from "next/router"
import { Product as TypeProduct } from "../types/cart"
import { useContext } from "react"
import { CartContext } from "../contexts/CartContext"

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface HomeProps {
  products: TypeProduct[]
}

export default function Home({ products } : HomeProps) {
  const { isFallback } = useRouter();
  const { addProductCart } = useContext(CartContext)

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 2,
      spacing: 48,
    }
  })

  if(isFallback)  return (<Skeleton />)

  function handleAddProductToCart(product: TypeProduct) {
    const item = { ...product, quantity: 1 }
    addProductCart(item)
    toast.success('Produto adicionado com sucesso')
  }
  
  return (
    <>
      <Head><title>Home | Ignite Shop</title></Head>
      <HomeContainer ref={sliderRef} className="keen-slider">
        
        {products.map((product) => {
          return (
            
            <Product key={product.id} className="keen-slider__slide">
              <Link
                href={`product/${product.id}`}
                prefetch={false}
              >
                <Image src={product.imageUrl} alt={product.name} width={520} height={480} />
              </Link>
              <footer>
                <div className="description">
                  <strong>{product.name}</strong>
                  <span>{product.formattedPrice}</span>
                </div>
                <div>
                  <button onClick={() => handleAddProductToCart(product)}>
                    <Handbag size={32} weight="bold" />
                  </button>
                </div>
              </footer>
            </Product>
          )
        })}
      </HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })
  
  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price
    const priceInReal = price.unit_amount !== null ? price.unit_amount / 100 : 0

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: priceInReal,
      formattedPrice: priceFormatter.format(priceInReal),
      description: product.description,
      defaultPriceId: price.id

    }
  })
  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 2,
  }
}
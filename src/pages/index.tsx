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

interface HomeProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: string
  }[]
}

export default function Home({ products } : HomeProps) {
  const { isFallback } = useRouter();

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 2,
      spacing: 48,
    }
  })

  if(isFallback)  return (<Skeleton />)
  
  return (
    <>
      <Head><title>Home | Ignite Shop</title></Head>
      <HomeContainer ref={sliderRef} className="keen-slider">
        
        {products.map((product) => {
          return (
            <Link
              href={`product/${product.id}`}
              key={product.id}
              prefetch={false}
            >
            <Product className="keen-slider__slide">
              <Image src={product.imageUrl} alt={product.name} width={520} height={480} />
              <footer>
                <div className="description">
                  <strong>{product.name}</strong>
                  <span>{product.price}</span>
                </div>
                <div>
                  <button>
                    <Handbag size={32} weight="bold" />
                  </button>
                </div>
              </footer>
            </Product>
            </Link>
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

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: priceFormatter.format(price.unit_amount !== null ? price.unit_amount / 100 : 0)

    }
  })
  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 2,
  }
}
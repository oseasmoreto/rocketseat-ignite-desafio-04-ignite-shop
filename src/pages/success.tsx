import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Stripe from "stripe";
import { Skeleton } from "../components/Skeleton";
import { stripe } from "../lib/stripe";
import { ImageContainer, SuccessContainer } from "../styles/pages/success";

interface SuccessProps {
  customerName: string,
  products: {
    name: string
    imageUrl: string
  }[]
}

export default function Success({ customerName, products } : SuccessProps){
  const { isFallback } = useRouter();

  if(isFallback)  return (<Skeleton />)
  
  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>
        <meta name="robots" content="noindex" />
      </Head>
      <SuccessContainer>
        <div className="box-images">
          { products.map((product, key) => {
            return (
              <ImageContainer  key={key}>
                <Image src={product.imageUrl} alt={product.name} width={120} height={110} />
            </ImageContainer>
            )
          }) }
        </div>
        <h1>Compra efetuada!</h1>
        <p>
          Uhuul <strong>{customerName}</strong>, sua compra de {products.length} camiseta(s) já está a caminho de sua casa.
        </p>

        <Link href="/">
          Voltar ao catálogo
        </Link>
      </SuccessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query })  => {

  if(!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  const sessionId = String(query.session_id)

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product']
  })

  if( session === null || 
      session.customer_details === null || 
      session.line_items === null || 
      session.line_items === undefined || 
      session.line_items.data === null || 
      session.line_items.data[0] === null || 
      session.line_items.data[0].price === null
    ) return {
    props: {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  const customerName = session.customer_details.name;
  const products = session.line_items.data.map((item) => {
    if( item.price === null ) return false

    const product = item.price.product as Stripe.Product
    return {
      name: product.name,
      imageUrl: product.images[0]
    }
  })
  return {
    props: {
      customerName,
      products: products

    }
  }
}
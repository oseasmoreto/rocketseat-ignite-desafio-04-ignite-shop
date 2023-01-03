import Head from 'next/head'
import { BoxSkeleton, Container } from './styles'

export function Skeleton() {
  return (
    <>
      <Head><title>Carregando... | Ignite Shop</title></Head>
      <Container>
        <BoxSkeleton>
          <div className="item-lg"></div>
          <div className="item-md"></div>
          <div className="item-sm"></div>
        </BoxSkeleton>
        <BoxSkeleton>
          <div className="item-lg"></div>
          <div className="item-md"></div>
          <div className="item-sm"></div>
        </BoxSkeleton>
      </Container>
    </>
  )
}
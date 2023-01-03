import type { AppProps } from 'next/app'
import { globalStyles } from '../styles/global'

import logoImage from '../assets/logo.svg'
import Image from 'next/image'
import { Container, Header } from '../styles/pages/app'
import { Sidebar } from '../components/Sidebar'
import Link from 'next/link'
import { CartContextProvider } from '../contexts/CartContext'

globalStyles()
export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartContextProvider>
      <Container>
        <Header>
          <Link href="/"><Image src={logoImage} alt="Ignite Shop" /></Link>
          <Sidebar />
        </Header>
        <Component {...pageProps} />
      </Container>
    </CartContextProvider>
  )
}

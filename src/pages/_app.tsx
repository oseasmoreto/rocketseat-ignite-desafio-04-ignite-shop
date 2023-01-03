import type { AppProps } from 'next/app'
import { globalStyles } from '../styles/global'

import logoImage from '../assets/logo.svg'
import Image from 'next/image'
import { Container, Header } from '../styles/pages/app'
import { Handbag } from 'phosphor-react'

globalStyles()
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
      <Image src={logoImage} alt="Ignite Shop" />
      <button>
        <Handbag size={24} weight="bold" />
      </button>
      </Header>
      <Component {...pageProps} />
    </Container>
  )
}

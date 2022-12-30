import { HomeContainer, Product } from "../styles/pages/home"

import { useKeenSlider } from 'keen-slider/react'

import Image from "next/image"

import image01 from '../assets/products/01.png'
import image02 from '../assets/products/02.png'
import image03 from '../assets/products/03.png'

import 'keen-slider/keen-slider.min.css'

export default function Home() {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    }
  })
  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      <Product  className="keen-slider__slide">
        <Image src={image01} alt="Produto 01" width={520} height={480} />
        <footer>
          <strong>Camiseta x</strong>
          <span>R$70,90</span>
        </footer>
      </Product>
      <Product  className="keen-slider__slide">
        <Image src={image02} alt="Produto 02" width={520} height={480} />
        <footer>
          <strong>Camiseta x</strong>
          <span>R$70,90</span>
        </footer>
      </Product>
      <Product  className="keen-slider__slide">
        <Image src={image03} alt="Produto 03" width={520} height={480} />
        <footer>
          <strong>Camiseta x</strong>
          <span>R$70,90</span>
        </footer>
      </Product>
      <Product  className="keen-slider__slide">
        <Image src={image03} alt="Produto 03" width={520} height={480} />
        <footer>
          <strong>Camiseta x</strong>
          <span>R$70,90</span>
        </footer>
      </Product>
    </HomeContainer>
  )
}

export const getServerSideProps = () => {
  return {
    props: {
      list: [1,2,3]
    }
  }
}
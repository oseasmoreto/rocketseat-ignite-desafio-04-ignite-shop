import { HomeContainer, Product } from "../styles/pages/home";

import image01 from '../assets/products/01.png'
import image02 from '../assets/products/02.png'
import image03 from '../assets/products/03.png'
import Image from "next/image";

export default function Home() {
  return (
    <HomeContainer>
      <Product>
        <Image src={image01} alt="Produto 01" width={520} height={480} />
        <footer>
          <strong>Camiseta x</strong>
          <span>R$70,90</span>
        </footer>
      </Product>
      <Product>
        <Image src={image02} alt="Produto 02" width={520} height={480} />
        <footer>
          <strong>Camiseta x</strong>
          <span>R$70,90</span>
        </footer>
      </Product>
    </HomeContainer>
  )
}

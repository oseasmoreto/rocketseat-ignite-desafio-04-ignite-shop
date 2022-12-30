import Image from "next/image"
import { useRouter } from "next/router"
import { ImageContainer, ProductContainer, ProductDetails } from "../../styles/pages/product"

import imgProduct from '../../assets/products/01.png'

export default function Product() {
  const { query } = useRouter()

  return (
    <ProductContainer>
      <ImageContainer>
        <Image src={imgProduct} alt="" />
      </ImageContainer>
      <ProductDetails>
        <h1>Camiseta X</h1>
        <span>R$ 79,90</span>

        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi quo voluptas aliquid eum rem praesentium tempore earum? Omnis voluptatum quos quaerat architecto, reprehenderit, eius doloribus voluptatibus temporibus laborum nemo non.</p>
        <button>Comprar agora</button>
      </ProductDetails>
    </ProductContainer>
  )
}
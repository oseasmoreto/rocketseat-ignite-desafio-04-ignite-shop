import { Container } from './styles'

import { Handbag } from 'phosphor-react'

import { slide as Menu } from 'react-burger-menu'
import { useContext, useState } from 'react'
import { CartContext } from '../../contexts/CartContext'
import { priceFormatter } from '../../utils/formatter'
import Image from 'next/image'
import { Item } from '../../types/cart'
import axios from 'axios'

export function Sidebar() {
  const { quantity: totalItems, price, items, removeProductCart, clearCart } = useContext(CartContext)

  const [ openMenu, setOpenMenu ] = useState<boolean>(false)
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)

  function handleOpenMenu(){
    setOpenMenu(!openMenu)
  }

  function handleRemoveProductToCart(item: Item){
    removeProductCart(item)
  }


  async function handleBuyProducts(){
    try {
      setIsCreatingCheckoutSession(true)

      const products = items.map((item) => {
        return item.defaultPriceId
      })

      const response = await axios.post('/api/checkout', {
        products,
      })

      const { checkoutUrl } = response.data

      clearCart()

      window.location.href = checkoutUrl
    } catch (err) {
      setIsCreatingCheckoutSession(false)
      alert('Falha ao redirecionar ao checkout')
    }


  }
  return (
    <Container>
      <button onClick={handleOpenMenu} className='button-cart'>
        {totalItems > 0 && <span>{totalItems}</span>}
        <Handbag size={24} weight="bold" />
      </button> 
      <Menu 
        isOpen={ openMenu }
        onClose={ handleOpenMenu }
        noOverlay 
        right
      >
        <div id="title" className="menu-item">
          <h2>Sacola de compras</h2>
        </div>
        { totalItems === 0 && 
          <div id="empty" className="menu-item menu-item-cart-empty">
            <div className="box-empty">
              <p>Nenhum item na sacola</p>
            </div>
          </div>
        }
        { totalItems > 0 && 
          <div id="items" className="menu-item menu-item-cart">

            <div className="items-cart">
              {
                items.map((item, key) => {
                  return (
                    <div key={key} className="item-cart">
                      <div className="image-box">
                        <Image src={item.imageUrl} alt={item.name} width={95} height={95} />
                      </div>
                      <div className="info">
                        <h4>{item.name}</h4>
                        <strong>{item.formattedPrice}</strong>
                        <button onClick={() => handleRemoveProductToCart(item)}>Remover</button>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
        }
        <div id="amount" className="menu-item menu-item-amount">
          <div className="quantity">
            <span>Quantidade</span>
            <span>{ totalItems } itens</span>
          </div>
          <div className="amount">
            <span>Valor total</span>
            <span>{ priceFormatter.format(price.amount) }</span>
          </div>
          <button 
            onClick={handleBuyProducts}
            disabled={ (totalItems === 0 || isCreatingCheckoutSession) }
          >
            Finalizar compra
          </button>
        </div>
      </Menu>
    </Container>
  )
}
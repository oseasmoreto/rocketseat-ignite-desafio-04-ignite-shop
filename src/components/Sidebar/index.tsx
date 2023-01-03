import { Container } from './styles'

import { Handbag } from 'phosphor-react'

import {slide as Menu} from 'react-burger-menu'
import { useContext } from 'react'
import { CartContext } from '../../contexts/CartContext'
import { priceFormatter } from '../../utils/formatter'

export function Sidebar() {
  const { quantity: totalItems, price, items } = useContext(CartContext)
  return (
    <Container>
      <Menu 
        noOverlay 
        right
        customBurgerIcon={ 
          <button className='button-cart'>
            {totalItems > 0 && <span>{totalItems}</span>}
            <Handbag size={24} weight="bold" />
          </button> 
        }
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
                items.map((item) => {
                  return (
                    <div key={item.id} className="item-cart">
                      <div className="image-box">

                      </div>
                      <div className="info">
                        <h4>{item.name}</h4>
                        <strong>{item.formattedPrice}</strong>
                        <button>Remover</button>
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
          <button disabled={ totalItems === 0 }>Finalizar compra</button>
        </div>
      </Menu>
    </Container>
  )
}
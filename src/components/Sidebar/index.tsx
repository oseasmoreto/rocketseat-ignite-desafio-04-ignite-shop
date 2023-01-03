import { Container } from './styles'

import { Handbag } from 'phosphor-react'

import {slide as Menu} from 'react-burger-menu'

export function Sidebar() {
  const totalItems = 0
  const amount = 0

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
              <div className="item-cart">
                <div className="image-box">

                </div>
                <div className="info">
                  <h4>Camiseta Beyond the Limits</h4>
                  <strong>R$ 74,90</strong>
                  <button>Remover</button>
                </div>
              </div>
              <div className="item-cart">
                <div className="image-box">

                </div>
                <div className="info">
                  <h4>Camiseta Beyond the Limits</h4>
                  <strong>R$ 74,90</strong>
                  <button>Remover</button>
                </div>
              </div>
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
            <span>R$ { amount }</span>
          </div>
          <button disabled={ totalItems === 0 }>Finalizar compra</button>
        </div>
      </Menu>
    </Container>
  )
}
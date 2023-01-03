import { createContext, ReactNode, useEffect, useReducer } from 'react'
import {
  addProductToCartAction,
  clearCartAction,
  removeProductToCartAction,
  updateAmountCartAction,
} from '../reducers/cart/actions'
import { cartReducer } from '../reducers/cart/reducer'
import { Cart, Item } from '../types/cart'
interface CartContextType extends Cart {
  addProductCart: (item: Item) => void
  removeProductCart: (item: Item) => void
  updateAmountCart: () => void
  clearCart: () => void
}

interface CartContextProps {
  children: ReactNode
}

export const CartContext = createContext({} as CartContextType)

export function CartContextProvider({ children }: CartContextProps) {
  const [cartState, dispatch] = useReducer(
    cartReducer,
    {
      items: [],
      quantity: 0,
      price: {
        amount: 0,
      },
    },
    () => {

      const storedStateAsJSON = typeof window !== 'undefined' ? localStorage.getItem(
        '@ignite-shop:cart-state-1.1.0',
      ) : JSON.stringify({
        items: [],
        quantity: 0,
        price: {
          amount: 0,
        } 
      })

      if (storedStateAsJSON !== null) {
        return JSON.parse(storedStateAsJSON)
      }

      return {
        items: [],
        quantity: 0,
        price: {
          amount: 0,
        },
      }
    },
  )
  const { items, quantity, price } = cartState

  useEffect(() => {
    const stateJSON = JSON.stringify(cartState)

    localStorage.setItem('@ignite-shop:cart-state-1.1.0', stateJSON)
  }, [cartState])

  function addProductCart(item: Item) {
    dispatch(addProductToCartAction(item))
    dispatch(updateAmountCart())
  }

  function removeProductCart(item: Item) {
    dispatch(removeProductToCartAction(item))
    dispatch(updateAmountCart())
  }
  function updateAmountCart() {
    dispatch(updateAmountCartAction())
  }

  function clearCart() {
    dispatch(clearCartAction())
  }

  return (
    <CartContext.Provider
      value={{
        items,
        quantity,
        price,
        addProductCart,
        removeProductCart,
        updateAmountCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
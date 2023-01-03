import { ActionTypes } from './actions'
import { produce } from 'immer'
import { Cart } from '../../types/cart'

interface CartState extends Cart {}

export function cartReducer(state: CartState, action: any) {
  if (action === undefined) return state

  switch (action.type) {
    case ActionTypes.ADD_NEW_PRODUCT: {
      const product = state.items.findIndex((item) => {
        return item.id === action.payload.item
      })

      if (product >= 0) return state

      return produce(state, (draft) => {
        draft.items.push(action.payload.item)
      })
    }
    case ActionTypes.REMOVE_PRODUCT: {
      const products = state.items.filter((item) => {
        return item.id !== action.payload.item.id
      })

      return produce(state, (draft) => {
        draft.items = products
      })
    }
    case ActionTypes.UPDATE_AMOUNT_CART: {
      const initialValue = 0

      const sumAllItens = state.items.reduce(
        (accumulator, currentValue) =>
          accumulator + currentValue.price * currentValue.quantity,
        initialValue,
      )

      return produce(state, (draft) => {
        draft.price.amount = sumAllItens
        draft.quantity = draft.items.length
      })
    }
    case ActionTypes.CLEAR_CART: {
      return produce(state, (draft) => {
        draft.items = []
        draft.price.amount = 0
        draft.quantity = 0
      })
    }
    default:
      return state
  }
}
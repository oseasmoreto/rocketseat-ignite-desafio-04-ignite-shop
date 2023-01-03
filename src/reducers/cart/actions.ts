import { Item } from '../../types/cart'

export enum ActionTypes {
  ADD_NEW_PRODUCT = 'ADD_NEW_PRODUCT',
  REMOVE_PRODUCT = 'REMOVE_PRODUCT',
  UPDATE_AMOUNT_CART = 'UPDATE_AMOUNT_CART',
  CLEAR_CART = 'CLEAR_CART',
}

export function addProductToCartAction(item: Item) {
  return {
    type: ActionTypes.ADD_NEW_PRODUCT,
    payload: {
      item,
    },
  }
}

export function removeProductToCartAction(item: Item) {
  return {
    type: ActionTypes.REMOVE_PRODUCT,
    payload: {
      item,
    },
  }
}

export function updateAmountCartAction() {
  return {
    type: ActionTypes.UPDATE_AMOUNT_CART,
  }
}

export function clearCartAction() {
  return {
    type: ActionTypes.CLEAR_CART,
  }
}
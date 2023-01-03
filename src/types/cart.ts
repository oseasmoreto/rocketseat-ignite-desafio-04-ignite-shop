
export type Product = {
  id: string
  name: string
  imageUrl: string
  price: number
  formattedPrice: string
  description: string
  defaultPriceId: string
}

export type Item = Product & {
  quantity: number
}
export type Items = Item[]

export type Cart = {
  items: Items
  quantity: number
  price: {
    amount: number
  }
}
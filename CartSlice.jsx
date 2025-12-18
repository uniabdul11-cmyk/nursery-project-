import { createSlice } from '@reduxjs/toolkit'

const STORAGE_KEY = 'paradise_nursery_cart_v1'

function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { items: {} }
    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object' || !parsed.items) return { items: {} }
    return parsed
  } catch {
    return { items: {} }
  }
}

function saveCart(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // ignore write errors
  }
}

const initialState = typeof window !== 'undefined' ? loadCart() : { items: {} }

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const p = action.payload
      if (!p?.id) return

      if (!state.items[p.id]) {
        state.items[p.id] = {
          id: p.id,
          name: p.name,
          price: p.price,
          image: p.image,
          quantity: 1,
        }
        saveCart(state)
      }
    },
    removeFromCart: (state, action) => {
      const id = action.payload
      if (!state.items[id]) return
      delete state.items[id]
      saveCart(state)
    },
    increaseQuantity: (state, action) => {
      const id = action.payload
      if (!state.items[id]) return
      state.items[id].quantity += 1
      saveCart(state)
    },
    decreaseQuantity: (state, action) => {
      const id = action.payload
      if (!state.items[id]) return
      state.items[id].quantity = Math.max(1, state.items[id].quantity - 1)
      saveCart(state)
    },
    clearCart: (state) => {
      state.items = {}
      saveCart(state)
    },
  },
})

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions

export const selectCartItemsArray = (state) => Object.values(state.cart.items)
export const selectTotalItems = (state) =>
  Object.values(state.cart.items).reduce((sum, item) => sum + item.quantity, 0)
export const selectTotalAmount = (state) =>
  Object.values(state.cart.items).reduce((sum, item) => sum + item.quantity * item.price, 0)

export default cartSlice.reducer

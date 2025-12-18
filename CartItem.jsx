import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from './components/Navbar.jsx'
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
  selectCartItemsArray,
  selectTotalAmount,
} from './CartSlice.jsx'

function CartRow({ item, onInc, onDec, onRemove }) {
  const lineTotal = item.quantity * item.price

  return (
    <div className="cartRow">
      <img className="cartRow__img" src={item.image} alt={item.name} loading="lazy" />
      <div className="cartRow__info">
        <div className="cartRow__name">{item.name}</div>
        <div className="cartRow__meta">
          <span>Unit: ${item.price.toFixed(2)}</span>
          <span className="dot">•</span>
          <span>Total: ${lineTotal.toFixed(2)}</span>
        </div>

        <div className="cartRow__controls">
          <button className="btn btn--ghost" onClick={onDec} aria-label={`Decrease quantity for ${item.name}`}>
            −
          </button>
          <div className="qty" aria-label={`Quantity for ${item.name}`}>{item.quantity}</div>
          <button className="btn btn--ghost" onClick={onInc} aria-label={`Increase quantity for ${item.name}`}>
            +
          </button>

          <button className="btn btn--danger" onClick={onRemove} aria-label={`Remove ${item.name} from cart`}>
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default function CartItem() {
  const dispatch = useDispatch()
  const items = useSelector(selectCartItemsArray)
  const totalAmount = useSelector(selectTotalAmount)

  const checkout = () => {
    window.alert('Checkout: Coming Soon')
  }

  return (
    <div className="page">
      <Navbar />

      <main className="content">
        <h1 className="page__title">Shopping Cart</h1>

        {items.length === 0 ? (
          <div className="empty">
            <p>Your cart is empty.</p>
            <Link className="btn" to="/plants">Continue Shopping</Link>
          </div>
        ) : (
          <>
            <div className="cartList" aria-label="Cart items">
              {items.map((item) => (
                <CartRow
                  key={item.id}
                  item={item}
                  onInc={() => dispatch(increaseQuantity(item.id))}
                  onDec={() => dispatch(decreaseQuantity(item.id))}
                  onRemove={() => dispatch(removeFromCart(item.id))}
                />
              ))}
            </div>

            <div className="totals">
              <div className="totals__label">Total cart amount</div>
              <div className="totals__value">${totalAmount.toFixed(2)}</div>
            </div>

            <div className="actions">
              <button className="btn" onClick={checkout}>Checkout</button>
              <Link className="btn btn--ghost" to="/plants">Continue Shopping</Link>
            </div>
          </>
        )}
      </main>
    </div>
  )
}

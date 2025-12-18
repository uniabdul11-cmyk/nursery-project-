import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from './components/Navbar.jsx'
import { addToCart } from './CartSlice.jsx'
import { plantsByCategory } from './data/plants.js'

export default function ProductList() {
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart.items)
  const groups = useMemo(() => plantsByCategory, [])

  return (
    <div className="page">
      <Navbar />

      <main className="content">
        <h1 className="page__title">Plants</h1>
        <p className="page__subtitle">Browse our categories and add your favorites to the cart.</p>

        {groups.map(({ category, items }) => (
          <section key={category} className="category" aria-label={`Category: ${category}`}>
            <h2 className="category__title">{category}</h2>

            <div className="grid">
              {items.map((plant) => {
                const isInCart = Boolean(cartItems[plant.id])
                return (
                  <article key={plant.id} className="card">
                    <img className="card__img" src={plant.image} alt={plant.name} loading="lazy" />
                    <div className="card__body">
                      <div className="card__top">
                        <h3 className="card__title">{plant.name}</h3>
                        <div className="card__price">${plant.price.toFixed(2)}</div>
                      </div>

                      <p className="card__desc">{plant.description}</p>

                      <button
                        className="btn"
                        onClick={() => dispatch(addToCart(plant))}
                        disabled={isInCart}
                        aria-disabled={isInCart}
                      >
                        {isInCart ? 'Added' : 'Add to Cart'}
                      </button>
                    </div>
                  </article>
                )
              })}
            </div>
          </section>
        ))}
      </main>
    </div>
  )
}

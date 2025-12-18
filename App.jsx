import { Routes, Route, Link } from 'react-router-dom'
import ProductList from './ProductList.jsx'
import CartItem from './CartItem.jsx'
import AboutUs from './AboutUs.jsx'

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={(
          <div className="landing">
            <div className="landing__overlay">
              <div className="landing__content">
                <h1 className="landing__title">Paradise Nursery</h1>
                <p className="landing__tagline">
                  Browse plants by category, add them to your cart, and manage quantities with live totals.
                </p>

                <div className="landing__cta">
                  <Link className="btn" to="/plants">Get Started</Link>
                  <Link className="btn btn--ghost" to="/cart">Go to Cart</Link>
                </div>

                <AboutUs />
              </div>
            </div>
          </div>
        )}
      />

      <Route path="/plants" element={<ProductList />} />
      <Route path="/cart" element={<CartItem />} />
    </Routes>
  )
}

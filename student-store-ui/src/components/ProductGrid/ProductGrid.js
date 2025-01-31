import ProductCard from "../ProductCard/ProductCard"
import axios from "axios"
import "./ProductGrid.css"


export default function ProductGrid({ addToCart, removeFromCart, getQuantityOfItemInCart, products = [axios.get("http://localhost:3001/store")] }) {
  return (
    <div id="Buy" className="ProductGrid">
      <div className="content">
        <h3>Best Selling Products</h3>
        <div className="grid">
          {products?.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              quantity={getQuantityOfItemInCart(product)}
              addToCart={() => addToCart(product)}
              removeFromCart={() => removeFromCart(product)}
            />
          ))}
          {!products?.length ? (
            <div className="card">
              <p>No products available</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

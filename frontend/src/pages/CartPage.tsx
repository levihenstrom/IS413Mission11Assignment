import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import type { ListSnapshot } from '../types/ListSnapshot';

function CartPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  const listSnapshot = (
    location.state as { listSnapshot?: ListSnapshot } | null
  )?.listSnapshot;

  const total = cart.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  );

  const handleContinueShopping = () => {
    navigate('/', { state: { listSnapshot } });
  };

  return (
    <main className="container py-5">
      <h1 className="h3 mb-4">Shopping cart</h1>

      {cart.length === 0 ? (
        <p className="text-muted">Your cart is empty.</p>
      ) : (
        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>
                <th scope="col">Book</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Subtotal</th>
                <th scope="col" />
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => {
                const subtotal = item.quantity * item.unitPrice;
                return (
                  <tr key={item.bookID}>
                    <td>{item.title}</td>
                    <td>${item.unitPrice.toFixed(2)}</td>
                    <td>
                      <div className="btn-group btn-group-sm" role="group">
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={() =>
                            updateQuantity(item.bookID, item.quantity - 1)
                          }
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="btn btn-light disabled">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={() =>
                            updateQuantity(item.bookID, item.quantity + 1)
                          }
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>${subtotal.toFixed(2)}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => removeFromCart(item.bookID)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {cart.length > 0 && (
        <p className="fs-5 fw-semibold mb-4">
          Total: <span className="text-success">${total.toFixed(2)}</span>
        </p>
      )}

      <div className="d-flex flex-wrap gap-2">
        <button
          type="button"
          className="btn btn-warning"
          onClick={clearCart}
          disabled={cart.length === 0}
        >
          Clear cart
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleContinueShopping}
        >
          Continue shopping
        </button>
      </div>
    </main>
  );
}

export default CartPage;

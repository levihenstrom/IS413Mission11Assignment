import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function CartSummary() {
  const navigate = useNavigate();
  const { cart } = useCart();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  );

  return (
    <div
      className="cart-summary-chip d-flex align-items-center gap-2 px-3 py-2 bg-light border rounded shadow-sm"
      style={{
        position: 'fixed',
        top: '12px',
        right: '16px',
        zIndex: 1040,
        cursor: 'pointer',
        maxWidth: 'min(320px, calc(100vw - 32px))',
      }}
      onClick={() => navigate('/cart')}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          navigate('/cart');
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`Cart: ${totalItems} items, total ${totalPrice.toFixed(2)} dollars`}
    >
      <span aria-hidden="true">🛒</span>
      <span className="small">
        <strong>{totalItems}</strong> items ·{' '}
        <strong className="text-success">${totalPrice.toFixed(2)}</strong>
      </span>
    </div>
  );
}

export default CartSummary;

import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Toast } from 'bootstrap';
import { API_BASE_URL } from '../api';
import { useCart } from '../context/CartContext';
import type { Book } from '../types/Book';
import type { ListSnapshot } from '../types/ListSnapshot';

function BookDetailPage() {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useCart();
  const toastRef = useRef<HTMLDivElement>(null);

  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState<number>(1);
  const [loadError, setLoadError] = useState<string>('');

  const listSnapshot: ListSnapshot | undefined = (
    location.state as { listSnapshot?: ListSnapshot } | null
  )?.listSnapshot;

  const id = Number(bookId);

  useEffect(() => {
    if (!Number.isFinite(id) || id < 1) {
      setLoadError('Invalid book.');
      setLoading(false);
      return;
    }

    const load = async () => {
      setLoading(true);
      setLoadError('');
      try {
        const res = await fetch(`${API_BASE_URL}/api/books/${id}`);
        if (!res.ok) {
          throw new Error('Book not found.');
        }
        const data: Book = await res.json();
        setBook(data);
      } catch {
        setLoadError('Could not load this book.');
        setBook(null);
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, [id]);

  const showAddedToast = () => {
    const el = toastRef.current;
    if (!el) return;
    Toast.getOrCreateInstance(el).show();
  };

  const handleAddToCart = () => {
    if (!book || quantity < 1) return;
    addToCart({
      bookID: book.bookID,
      title: book.title,
      unitPrice: book.price,
      quantity,
    });
    showAddedToast();
    window.setTimeout(() => {
      navigate('/cart', { state: { listSnapshot } });
    }, 500);
  };

  const handleContinueShopping = () => {
    navigate('/', { state: { listSnapshot } });
  };

  if (loading) {
    return (
      <main className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </main>
    );
  }

  if (loadError || !book) {
    return (
      <main className="container py-5">
        <div className="alert alert-warning">{loadError}</div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleContinueShopping}
        >
          Back to books
        </button>
      </main>
    );
  }

  return (
    <main className="container py-5" style={{ maxWidth: '560px' }}>
      <h1 className="h3 mb-3">{book.title}</h1>
      <p className="text-muted mb-2">
        {book.author} · {book.category}
      </p>
      <p className="fs-4 text-success fw-semibold mb-4">
        ${book.price.toFixed(2)} each
      </p>

      <div className="mb-3">
        <label htmlFor="qty" className="form-label">
          Quantity
        </label>
        <input
          id="qty"
          type="number"
          className="form-control"
          min={1}
          step={1}
          value={quantity}
          onChange={(e) =>
            setQuantity(Math.max(1, Number(e.target.value) || 1))
          }
        />
      </div>

      <div className="d-flex flex-wrap gap-2">
        <button
          type="button"
          className="btn btn-success"
          onClick={handleAddToCart}
        >
          Add to cart
        </button>
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={handleContinueShopping}
        >
          Continue shopping
        </button>
      </div>

      <div
        ref={toastRef}
        className="toast position-fixed bottom-0 end-0 m-3"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="toast-header">
          <strong className="me-auto">Bookstore</strong>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="toast"
            aria-label="Close"
          />
        </div>
        <div className="toast-body">Added to your cart.</div>
      </div>
    </main>
  );
}

export default BookDetailPage;

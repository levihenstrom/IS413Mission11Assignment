import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import CartSummary from './components/CartSummary';
import { CartProvider } from './context/CartContext';
import AdminBooksPage from './pages/AdminBooksPage';
import BookDetailPage from './pages/BookDetailPage';
import BooksPage from './pages/BooksPage';
import CartPage from './pages/CartPage';

function NavBar() {
  const location = useLocation();
  const isAdmin = location.pathname === '/adminbooks';

  return (
    <nav className="navbar navbar-light bg-light px-3 mb-3">

      <div className="d-flex align-items-center gap-3">
        <span className="navbar-brand mb-0 h1">Bookstore</span>
        <Link
          to={isAdmin ? '/' : '/adminbooks'}
          className="btn btn-outline-primary btn-sm"
        >
          {isAdmin ? 'Shopping View' : 'Manage Library'}
        </Link>
      </div>
      
    </nav>
  );
}

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <NavBar />
        <CartSummary />
        <Routes>
          <Route path="/" element={<BooksPage />} />
          <Route path="/book/:bookId" element={<BookDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/adminbooks" element={<AdminBooksPage />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;

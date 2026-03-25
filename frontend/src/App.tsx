import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import CartSummary from './components/CartSummary';
import { CartProvider } from './context/CartContext';
import BookDetailPage from './pages/BookDetailPage';
import BooksPage from './pages/BooksPage';
import CartPage from './pages/CartPage';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <CartSummary />
        <Routes>
          <Route path="/" element={<BooksPage />} />
          <Route path="/book/:bookId" element={<BookDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;

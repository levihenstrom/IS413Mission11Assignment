import './App.css';
import BookList from './BookList.tsx';

function App() {
  return (
    <>
      <main className="container py-5">
        <div className="bookstore-hero text-center mb-4 mb-md-5">
          <h1 className="display-5 fw-bold">Online Bookstore</h1>
          <p className="text-muted mb-0 bookstore-subtitle">
            Browse books with pagination and title sorting.
          </p>
        </div>
        <BookList />
      </main>
    </>
  );
}

export default App;

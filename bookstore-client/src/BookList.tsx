import { useEffect, useState } from 'react';
import type { Book } from './types/Book';

type ApiResponse = {
  books: Book[];
  totalNumBooks: number;
};

function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [sortTitle, setSortTitle] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);
      setError('');

      try {
        const response = await fetch(
          `http://localhost:5043/api/books?pageHowMany=${pageSize}&pageNum=${pageNum}&sortByTitle=${sortTitle}`
        );

        if (!response.ok) {
          throw new Error('Failed to load books from the API.');
        }

        const data: ApiResponse = await response.json();
        setBooks(data.books);
        setTotalItems(data.totalNumBooks);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Unknown error occurred.'
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, [pageSize, pageNum, sortTitle]);

  useEffect(() => {
    setTotalPages(Math.ceil(totalItems / pageSize));
  }, [totalItems, pageSize]);

  const pageButtons = [...Array(totalPages)].map((_, i) => i + 1);

  return (
    <>
      <section className="book-list-panel p-3 p-md-4 mb-4">
        <div className="d-flex flex-wrap gap-3 justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-2">
            <label htmlFor="pageSize" className="form-label mb-0">
              Results per page
            </label>
            <select
              id="pageSize"
              className="form-select"
              style={{ width: '120px' }}
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPageNum(1);
              }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
            </select>
          </div>

          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={() => {
              setSortTitle((prev) => !prev);
              setPageNum(1);
            }}
          >
            Sort by Title: {sortTitle ? 'On' : 'Off'}
          </button>
        </div>

        <div className="d-flex justify-content-end mt-3">
          <span className="badge text-bg-light fs-6 fw-semibold">
            Total books: {totalItems}
          </span>
        </div>
      </section>

      {isLoading && (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {!isLoading &&
        !error &&
        books.map((book) => (
          <div className="card shadow-sm border-0 mb-3" key={book.bookID}>
            <div className="card-body">
              <h5 className="card-title fw-bold mb-3">{book.title}</h5>

              <div className="row g-2">
                <div className="col-md-6">
                  <p className="card-text mb-1">
                    <strong>Author:</strong> {book.author}
                  </p>
                  <p className="card-text mb-1">
                    <strong>Publisher:</strong> {book.publisher}
                  </p>
                  <p className="card-text mb-1">
                    <strong>ISBN:</strong> {book.isbn}
                  </p>
                  <p className="card-text mb-1">
                    <strong>Classification:</strong> {book.classification}
                  </p>
                </div>

                <div className="col-md-6">
                  <p className="card-text mb-1">
                    <strong>Category:</strong> {book.category}
                  </p>
                  <p className="card-text mb-1">
                    <strong>Pages:</strong> {book.pageCount}
                  </p>
                  <p className="card-text mb-0">
                    <strong>Price:</strong>{' '}
                    <span className="text-success fw-semibold">
                      ${book.price.toFixed(2)}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}

      <section className="d-flex flex-wrap gap-2 justify-content-center mt-4 pb-2">
        <button
          type="button"
          className="btn btn-secondary"
          disabled={pageNum === 1}
          onClick={() => setPageNum((prev) => Math.max(prev - 1, 1))}
        >
          Previous
        </button>

        {pageButtons.map((p) => (
          <button
            key={p}
            type="button"
            className="btn btn-outline-secondary"
            disabled={p === pageNum}
            onClick={() => setPageNum(p)}
          >
            {p}
          </button>
        ))}

        <button
          type="button"
          className="btn btn-secondary"
          disabled={totalPages === 0 || pageNum === totalPages}
          onClick={() => setPageNum((prev) => Math.min(prev + 1, totalPages))}
        >
          Next
        </button>
      </section>
    </>
  );
}

export default BookList;

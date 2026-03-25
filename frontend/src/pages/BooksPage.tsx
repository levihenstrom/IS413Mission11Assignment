import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import BookList from '../BookList';
import CategoryFilter from '../components/CategoryFilter';
import type { ListSnapshot } from '../types/ListSnapshot';

function BooksPage() {
  const location = useLocation();
  return (
    <BooksPageInner
      key={location.key}
      navState={location.state}
      locationKey={location.key}
    />
  );
}

type InnerProps = {
  navState: unknown;
  locationKey: string;
};

function BooksPageInner({ navState, locationKey }: InnerProps) {
  const snapshot = (navState as { listSnapshot?: ListSnapshot } | null)
    ?.listSnapshot;

  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    () => snapshot?.selectedCategories ?? []
  );

  return (
    <main className="container py-5">
      <div className="bookstore-hero text-center mb-4 mb-md-5">
        <h1 className="display-5 fw-bold">Online Bookstore</h1>
        <p className="text-muted mb-0 bookstore-subtitle">
          Browse books with categories, pagination, and your cart.
        </p>
      </div>

      <div className="d-md-none mb-3">
        <button
          className="btn btn-outline-primary w-100"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#categoryOffcanvas"
          aria-controls="categoryOffcanvas"
        >
          Filter by category
        </button>
      </div>

      <div
        className="offcanvas offcanvas-start d-md-none"
        tabIndex={-1}
        id="categoryOffcanvas"
        aria-labelledby="categoryOffcanvasLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="categoryOffcanvasLabel">
            Categories
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          />
        </div>
        <div className="offcanvas-body">
          <CategoryFilter
            selectedCategories={selectedCategories}
            onCheckboxChange={setSelectedCategories}
          />
        </div>
      </div>

      <div className="row g-4">
        <div className="col-md-4 d-none d-md-block">
          <CategoryFilter
            selectedCategories={selectedCategories}
            onCheckboxChange={setSelectedCategories}
          />
        </div>
        <div className="col-md-8">
          <BookList
            selectedCategories={selectedCategories}
            locationKey={locationKey}
            restoreSnapshot={snapshot ?? null}
          />
        </div>
      </div>
    </main>
  );
}

export default BooksPage;

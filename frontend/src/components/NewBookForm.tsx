import { useState } from 'react';
import type { Book } from '../types/Book';
import { addBook } from '../api/BooksAPI';

interface NewBookFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const NewBookForm = ({ onSuccess, onCancel }: NewBookFormProps) => {
  const [formData, setFormData] = useState<Book>({
    bookID: 0,
    title: '',
    author: '',
    publisher: '',
    isbn: '',
    classification: '',
    category: '',
    pageCount: 0,
    price: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'number' ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addBook(formData);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="card p-3 mb-3">
      <h2>Add New Book</h2>
      <div className="mb-2">
        <label className="form-label">Title</label>
        <input type="text" className="form-control" name="title" value={formData.title} onChange={handleChange} />
      </div>
      <div className="mb-2">
        <label className="form-label">Author</label>
        <input type="text" className="form-control" name="author" value={formData.author} onChange={handleChange} />
      </div>
      <div className="mb-2">
        <label className="form-label">Publisher</label>
        <input type="text" className="form-control" name="publisher" value={formData.publisher} onChange={handleChange} />
      </div>
      <div className="mb-2">
        <label className="form-label">ISBN</label>
        <input type="text" className="form-control" name="isbn" value={formData.isbn} onChange={handleChange} />
      </div>
      <div className="mb-2">
        <label className="form-label">Classification</label>
        <input type="text" className="form-control" name="classification" value={formData.classification} onChange={handleChange} />
      </div>
      <div className="mb-2">
        <label className="form-label">Category</label>
        <input type="text" className="form-control" name="category" value={formData.category} onChange={handleChange} />
      </div>
      <div className="mb-2">
        <label className="form-label">Page Count</label>
        <input type="number" className="form-control" name="pageCount" value={formData.pageCount} onChange={handleChange} />
      </div>
      <div className="mb-2">
        <label className="form-label">Price</label>
        <input type="number" className="form-control" name="price" step="0.01" value={formData.price} onChange={handleChange} />
      </div>
      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-success">Add Book</button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default NewBookForm;

import type { Book } from '../types/Book';

interface FetchBooksResponse {
  books: Book[];
  totalNumBooks: number;
}

const API_URL = 'https://bookstore-henstrom-backend-d3hacbewh7b7hwak.centralus-01.azurewebsites.net/api';

export const fetchBooks = async (
  pageSize: number,
  pageNum: number,
  selectedCategories: string[]
): Promise<FetchBooksResponse> => {
  const categoryParams = selectedCategories
    .map((cat) => `categories=${encodeURIComponent(cat)}`)
    .join('&');

  const response = await fetch(
    `${API_URL}?pageHowMany=${pageSize}&pageNum=${pageNum}${selectedCategories.length ? `&${categoryParams}` : ''}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch books');
  }

  return await response.json();
};

export const addBook = async (newBook: Book): Promise<Book> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newBook),
  });

  if (!response.ok) {
    throw new Error('Failed to add book');
  }

  return await response.json();
};

export const updateBook = async (
  bookId: number,
  updatedBook: Book
): Promise<Book> => {
  const response = await fetch(`${API_URL}/${bookId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedBook),
  });

  if (!response.ok) {
    throw new Error('Failed to update book');
  }

  return await response.json();
};

export const deleteBook = async (bookId: number): Promise<void> => {
  const response = await fetch(`${API_URL}/${bookId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete book');
  }
};

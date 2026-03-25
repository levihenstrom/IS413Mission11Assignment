import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../api';
import './CategoryFilter.css';

type Props = {
  selectedCategories: string[];
  onCheckboxChange: (categories: string[]) => void;
};

function CategoryFilter({ selectedCategories, onCheckboxChange }: Props) {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/books/categories`);
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data: string[] = await response.json();
        setCategories(data);
      } catch (e) {
        console.error(e);
      }
    };
    void fetchCategories();
  }, []);

  function handleCheckboxChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, checked } = e.target;
    if (checked) {
      onCheckboxChange([...selectedCategories, value]);
    } else {
      onCheckboxChange(selectedCategories.filter((c) => c !== value));
    }
  }

  return (
    <div className="category-filter border rounded p-3 bg-light">
      <h5 className="mb-3">Categories</h5>
      <div className="category-list d-flex flex-column gap-2">
        {categories.map((category) => {
          const id = `cat-${category}`;
          return (
            <div key={category} className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value={category}
                id={id}
                checked={selectedCategories.includes(category)}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label" htmlFor={id}>
                {category}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CategoryFilter;

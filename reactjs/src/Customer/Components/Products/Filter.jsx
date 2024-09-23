// src/Customer/Components/Products/Filter.jsx
import React from 'react';

const Filter = ({ categories, selectedCategory, onCategoryChange }) => {
    return (
        <div className="mb-4">
            <label htmlFor="category" className="block text-gray-700">Filter by Category:</label>
            <select
                id="category"
                className="mt-2 block w-full p-2 border rounded"
                value={selectedCategory}
                onChange={e => onCategoryChange(e.target.value)}
            >
                <option value="">All</option>
                {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                ))}
            </select>
        </div>
    );
};

export default Filter;
 
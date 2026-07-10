import React, { useState } from 'react'
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Search } from 'lucide-react';

// Destructure the passed categories prop here
function ProductSearch({ onSearch, categories = ["All Categories"] }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ query, category: category === "All Categories" ? "" : category });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 items-center w-full max-w-3xl mx-auto">
      
      {/* Search Input Box */}
      <div className="relative w-full sm:flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <Input 
          type="text"
          value={query} 
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products by name..."
          className="pl-10 h-10 w-full bg-background border-muted"
        />
      </div>

      {/* Dynamic Dropdown Box */}
      <div className="w-full sm:w-48 shrink-0">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="flex h-10 w-full rounded-md border border-muted bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 capitalize"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <Button type="submit" className="w-full sm:w-auto h-10 px-5 font-medium shrink-0">
        Search
      </Button>
    </form>
  )
}

export default ProductSearch;
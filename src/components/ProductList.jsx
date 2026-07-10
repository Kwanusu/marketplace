import { useState, useEffect, useMemo } from 'react'
import ProductCard from './ProductCard';
import ProductSearch from './ProductSearch';
import Footer from './Footer';
import { Loader2 } from 'lucide-react';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchFilters, setSearchFilters] = useState({ query: '', category: '' });

  useEffect(() => {
    fetch('/products/products.json')
      .then((resp) => resp.json())//promise
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data', error)
        setLoading(false);
      })
  }, []);

  // 1. DYNAMICALLY CAPTURE ANY CATEGORIES PRESENT IN THE DATA
  // This looks at all products, gets their categories, removes duplicates, and filters out any empty ones
  const availableCategories = useMemo(() => {
    return   [
    "All Categories",
    ...new Set(products.map(p => p.category).filter(Boolean))
  ];
  }, [products])


  const handleSearch = (filters) => {
    setSearchFilters(filters);
  }

  // Multi-layered filtering logic
  const filteredProducts =  useMemo(() => { 
    return products.filter((product) => {
    const matchesName = product.name.toLowerCase().includes(searchFilters.query.toLowerCase());
    const matchesCategory = searchFilters.category 
      ? product.category?.toLowerCase() === searchFilters.category.toLowerCase()
      : true;

    return matchesName && matchesCategory;
  });

  },[products, searchFilters])
  
  if (loading) {
    return (
      <div className="flex flex-col min-h-[50vh] items-center justify-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-muted-foreground font-medium text-sm">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-6 min-h-[85vh]">
      <div className="flex flex-col gap-2 border-b pb-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Marketplace Products</h2>
      </div>

      {/* 2. PASS THE DYNAMIC CATEGORIES TO THE SEARCH COMPONENT */}
      <div className="bg-secondary/20 p-4 rounded-xl border border-muted/40">
        <ProductSearch onSearch={handleSearch} categories={availableCategories} />
        <p className="text-xs text-muted-foreground mt-2">
          Showing results for: <span className="font-medium text-foreground italic">
            "{searchFilters.query || "All Items"}"
            {searchFilters.category && ` in ${searchFilters.category}`}
          </span>
        </p>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12 border border-dashed rounded-xl bg-muted/10">
          <p className="text-muted-foreground font-medium">No products match your search criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="transition-all duration-200 hover:-translate-y-1 hover:shadow-md rounded-xl">
              <ProductCard 
                id={product.id}
                name={product.name} 
                price={product.price} 
                category={product.category} 
                description={product.description} 
                image={product.image} 
              />
            </div>
          ))}
        </div>
      )}

      <Footer />
    </div>
  )
}

export default ProductList;
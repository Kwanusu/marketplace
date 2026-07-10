// import ProductCard from '../components/ProductCard';

// const products = [
//   { id: 1, title: "Wireless Headphones", price: 99.99, description: "Noise cancelling over-ear headphones.", image: "https://via.placeholder.com/150" },
//   { id: 2, title: "Smart Watch", price: 199.50, description: "Track your fitness and health stats.", image: "https://via.placeholder.com/150" },
// ];

// const Home = () => {
//   return (
//     <div className="p-8">
//       <h1 className="text-3xl font-bold mb-6">Our Products</h1>
//       {/* Grid Layout for Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {products.map((product) => (
//           <ProductCard 
//             key={product.id} 
//             image={product.image}
//             title={product.title}
//             price={product.price}
//             description={product.description}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Home;

import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
// import productsData from '/products/products.json'; // Importing the JSON file

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // We use a timeout to simulate the network delay 
    // that students will experience with real APIs
    const timer = setTimeout(() => {
      setProducts(productsData);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer); // Cleanup
  }, []);

  if (loading) return <p>Loading Zindua Market products...</p>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6" style={{ color: '#fe3448' }}>Our Products</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            image={product.image}
            title={product.name} // Note: JSON key is 'name'
            price={product.price}
            description={product.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;

// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import ProductCard from '../components/ProductCard';

// const Home = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios.get('https://fakestoreapi.com/products')
//       .then((res) => {
//         setProducts(res.data);
//         setLoading(false);
//       })
//       .catch((err) => console.error("Error fetching data:", err));
//   }, []);

//   if (loading) return <div className="p-8 text-center">Loading products...</div>;

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-8">
//       {products.map((product) => (
//         <ProductCard key={product.id} product={product} />
//       ))}
//     </div>
//   );
// };

// export default Home;
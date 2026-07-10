import { useParams, Link } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react'; 
import { Button } from '@/components/ui/button';
import { CartContext } from '@/context/CartContext'; 
import { ArrowLeft, ShoppingCart } from 'lucide-react'; // Imported Lucide icons

export default function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const { cart, setCart } = useContext(CartContext);

  useEffect(() => {
    fetch('/products/products.json')
      .then(res => res.json())
      .then(data => {
        const found = data.find(p => String(p.id) === String(productId));
        setProduct(found);
      });
  }, [productId]);

  const handleAddToCart = () => {
    if (!product) return;
    
    const productPayload = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1 
    };

    setCart([...cart, productPayload]);
  };

  if (!product) return <p className="p-8 text-center text-muted-foreground animate-pulse">Finding product specifics...</p>;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 space-y-4">
      {/* Dynamic Breadcrumb with Lucide Icon */}
      <Link 
        to="/" 
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group mb-2"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> 
        <span>Back to Marketplace</span>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Product Image Frame */}
        <div className="w-full aspect-square overflow-hidden rounded-xl bg-muted border">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-102" 
          />
        </div>

        {/* Info Grid Sidebar Section */}
        <div className="space-y-5">
          <div className="space-y-2">
            <span className="text-xs font-bold tracking-wider text-muted-foreground uppercase px-2.5 py-1 bg-secondary rounded-full border border-muted/40 inline-block">
              {product.category}
            </span>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">{product.name}</h1>
            <p className="text-2xl font-extrabold text-foreground">
              Ksh. {Number(product.price).toLocaleString()}
            </p>
          </div>

          <hr className="border-muted/60" />

          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-muted-foreground">Description</h3>
            <p className="text-sm text-foreground/90 leading-relaxed font-normal">
              {product.description || "No specific detailed descriptions provided for this entry block item parameters layout placeholder."}
            </p>
          </div>

          {/* Action Call Button Module */}
          <Button size="lg" className="w-full font-medium gap-2 h-11 shadow-sm cursor-pointer" onClick={handleAddToCart}>
            <ShoppingCart className="h-4 w-4 " />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
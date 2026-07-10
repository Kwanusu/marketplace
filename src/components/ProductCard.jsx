import { useContext } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CartContext } from '@/context/CartContext'
import { Link } from 'react-router-dom';

function ProductCard({ id, name, price, category, description, image }) {
  const { cart, setCart } = useContext(CartContext);
  
  const handleAddToCart = () => {
    const productPayload = { id, name, price, image }; 
    setCart([...cart, productPayload]);
  }

  return (
    <>
    
    {/* 1. h-full stretches the card; flex-col enables vertical internal layouts */}
    <Card className="flex flex-col h-full overflow-hidden border-muted bg-card text-card-foreground shadow-sm">
      
      {/* 2. Fixed aspect frame makes sure images are identical dimensions across cards */}
      <Link to={`/product/${id}`} className="w-full aspect-video overflow-hidden bg-muted shrink-0">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-200 hover:scale-105" 
        />
      </Link>

      <CardHeader className="p-4 pb-2">
        {category && (
          <span className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase mb-1 block">
            {category}
          </span>
        )}
        {/* line-clamp-1 prevents super long titles from wrapping onto multiple lines and forcing uneven heights */}
        <CardTitle className="text-base font-bold tracking-tight text-foreground line-clamp-1">
          {name}
        </CardTitle>
      </CardHeader>

      {/* 3. flex-1 dynamically takes up all remaining empty space, allowing mt-auto below to work */}
      <CardContent className="p-4 pt-0 flex flex-col flex-1 gap-2">
        <p className="text-lg font-bold text-primary">
          Ksh. {Number(price).toLocaleString()}
        </p>
        
        {/* line-clamp-2 truncates uneven paragraph descriptions seamlessly */}
        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed flex-1">
          {description || "No description provided for this marketplace item."}
        </p>
        
        {/* 4. mt-auto pins the action button cleanly to the bottom margins boundary line */}
        <Button 
          onClick={handleAddToCart} 
          variant='default' 
          className="w-full mt-3 font-medium text-xs h-9"
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
    </>
  )
}

export default ProductCard;
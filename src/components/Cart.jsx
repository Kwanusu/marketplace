import { useContext } from 'react';
import { CartContext } from '@/context/CartContext';
import { Button } from './ui/button';
import { Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Cart({onCheckout}) {
  const { cart, setCart } = useContext(CartContext);
  const navigate = useNavigate();

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1), 
    0
  );

  const handleRemoveItem = (itemId) => {
    const updatedCart = cart.filter(item => String(item.id) !== String(itemId));    
    setCart(updatedCart);
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // 1. Added a dedicated navigation handler
  const handleCheckout = () => {
    if (onCheckout) onCheckout();
    navigate('/checkout');
  };

  return (
    <div className="flex flex-col h-full justify-between pt-4">
      {/* Scrollable Items Container */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-4">
        {cart.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground text-sm">
            Your cart is currently empty.
          </div>
        ) : (
          <div className="divide-y divide-border">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center py-4 text-sm animate-in fade-in duration-200">
                <div className="space-y-0.5 max-w-[70%]">
                  <p className="font-medium truncate text-foreground">{item.name}</p>
                  <p className="text-xs text-muted-foreground font-mono">
                    ${item.price.toFixed(2)} x {item.quantity || 1}
                  </p>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-muted-foreground hover:text-destructive transition-colors h-8 w-8"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Remove item</span>
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Cart Summary Footer */}
      {cart.length > 0 && (
        <div className="border-t pt-4 bg-background mt-4 space-y-4">
          <div className="flex justify-between items-center font-semibold text-base tracking-tight">
            <span>Total Price:</span>
            <span className="text-lg font-bold">${totalPrice.toFixed(2)}</span>
          </div>
          
          <div className="flex gap-2 w-full">
            <Button variant="outline" className="flex-1" onClick={handleClearCart}>
              Clear All
            </Button>
            {/* 2. Connected the handleCheckout click event */}
            <Button className="flex-1" onClick={handleCheckout}>
              Checkout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
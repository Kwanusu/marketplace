import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '@/context/CartContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './ui/card';
import { CreditCard, Wallet, Truck } from 'lucide-react'; // Added icons for visual polish

export default function Checkout() {
  const { cart, setCart } = useContext(CartContext);
  const navigate = useNavigate();
  
  // State for text inputs
  const [formData, setFormData] = useState({ name: '', email: '', address: '' });
  
  // State tracking the chosen payment mode and explicit method requirements
  const [paymentMethod, setPaymentMethod] = useState('mpesa');
  const [mpesaPhone, setMpesaPhone] = useState('');
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvc: '' });

  const totalPrice = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.address) return alert("Please fill out all shipping fields.");
    
    // Validate conditional payment requirements
    if (paymentMethod === 'mpesa' && !mpesaPhone) return alert("Please enter your M-Pesa phone number.");
    if (paymentMethod === 'card' && (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvc)) {
      return alert("Please fill out all card fields.");
    }
    
    // Assemble final order payload for your backend pipeline
    const orderPayload = {
      shipping: formData,
      payment: {
        method: paymentMethod,
        details: paymentMethod === 'mpesa' ? { mpesaPhone } : paymentMethod === 'card' ? cardDetails : null
      },
      items: cart,
      total: totalPrice
    };

    console.log("Processing Order Data Pipeline:", orderPayload);
    
    setCart([]); // Clear the cart globally upon success
    navigate('/success'); // Redirect to order confirmation
  };

  if (cart.length === 0) {
    return (
      <div className="container max-w-md mx-auto text-center py-12 space-y-4">
        <p className="text-muted-foreground">Your cart is empty. Cannot checkout.</p>
        <Button onClick={() => navigate('/')}>Go to Catalog</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl grid md:grid-cols-2 gap-6">
      {/* Left Column: Shipping & Payment Options Form */}
      <form onSubmit={handlePlaceOrder} className="space-y-6">
        {/* Shipping Card */}
        <Card>
          <CardHeader>
            <CardTitle>Shipping Details</CardTitle>
            <CardDescription>Enter your delivery information below.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-medium">Full Name</label>
              <Input name="name" required value={formData.name} onChange={handleInputChange} placeholder="John Doe" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium">Email Address</label>
              <Input type="email" name="email" required value={formData.email} onChange={handleInputChange} placeholder="john@example.com" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium">Delivery Address</label>
              <Input name="address" required value={formData.address} onChange={handleInputChange} placeholder="123 Market St, Nairobi" />
            </div>
          </CardContent>
        </Card>

        {/* Payment Methods Selection Card */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
            <CardDescription>Select your preferred mode of payment.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Payment Method Selector Grid */}
            <div className="grid grid-cols-3 gap-2">
              <Button
                type="button"
                variant={paymentMethod === 'mpesa' ? 'default' : 'outline'}
                className="flex flex-col h-16 items-center justify-center gap-1 text-xs"
                onClick={() => setPaymentMethod('mpesa')}
              >
                <Wallet className="h-4 w-4" />
                <span>M-Pesa</span>
              </Button>

              <Button
                type="button"
                variant={paymentMethod === 'card' ? 'default' : 'outline'}
                className="flex flex-col h-16 items-center justify-center gap-1 text-xs"
                onClick={() => setPaymentMethod('card')}
              >
                <CreditCard className="h-4 w-4" />
                <span>Card</span>
              </Button>

              <Button
                type="button"
                variant={paymentMethod === 'cod' ? 'default' : 'outline'}
                className="flex flex-col h-16 items-center justify-center gap-1 text-xs"
                onClick={() => setPaymentMethod('cod')}
              >
                <Truck className="h-4 w-4" />
                <span>C.O.D</span>
              </Button>
            </div>

            {/* Conditional Sub-forms depending on the active selection */}
            {paymentMethod === 'mpesa' && (
              <div className="space-y-1 p-3 border rounded-lg bg-muted/30 animate-in fade-in duration-200">
                <label className="text-xs font-medium">M-Pesa Phone Number</label>
                <Input 
                  type="tel" 
                  placeholder="e.g. 0712345678" 
                  value={mpesaPhone}
                  onChange={(e) => setMpesaPhone(e.target.value)}
                />
                <span className="text-[10px] text-muted-foreground">You will receive an STK prompt directly to this phone number.</span>
              </div>
            )}

            {paymentMethod === 'card' && (
              <div className="space-y-3 p-3 border rounded-lg bg-muted/30 animate-in fade-in duration-200">
                <div className="space-y-1">
                  <label className="text-xs font-medium">Card Number</label>
                  <Input 
                    placeholder="1234 5678 1234 5678"
                    value={cardDetails.number}
                    onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-xs font-medium">Expiry</label>
                    <Input 
                      placeholder="MM/YY"
                      value={cardDetails.expiry}
                      onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium">CVC</label>
                    <Input 
                      placeholder="123"
                      value={cardDetails.cvc}
                      onChange={(e) => setCardDetails({...cardDetails, cvc: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'cod' && (
              <div className="p-3 border border-dashed rounded-lg bg-muted/30 text-xs text-muted-foreground">
                Pay with cash or mobile money upon receiving your package at your doorstep.
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Place Order (Ksh. {totalPrice.toFixed(2)})
            </Button>
          </CardFooter>
        </Card>
      </form>

      {/* Right Column: Order Summary */}
      <Card className="h-fit">
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="divide-y divide-border text-sm">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between py-2">
              <span className="text-muted-foreground">{item.name} <strong className="text-foreground">x{item.quantity || 1}</strong></span>
              <span className="font-medium">Ksh. {(item.price * (item.quantity || 1)).toFixed(2)}</span>
            </div>
          ))}
          <div className="flex justify-between font-bold text-base pt-4 mt-2">
            <span>Total:</span>
            <span>Ksh. {totalPrice.toFixed(2)}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
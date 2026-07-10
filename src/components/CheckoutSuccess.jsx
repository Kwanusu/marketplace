import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { CheckCircle } from 'lucide-react';

export default function CheckoutSuccess() {
  const navigate = useNavigate();

  return (
    <div className="container max-w-md mx-auto text-center py-20 space-y-6">
      <div className="flex justify-center">
        <CheckCircle className="h-16 w-16 text-emerald-500 animate-bounce" />
      </div>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Order Confirmed!</h1>
        <p className="text-sm text-muted-foreground">
          Thank you for your purchase. We are processing your order and will send an email update shortly.
        </p>
      </div>
      <div className="pt-4">
        <Button className="w-full" onClick={() => navigate('/')}>
          Continue Shopping
        </Button>
      </div>
    </div>
  );
}
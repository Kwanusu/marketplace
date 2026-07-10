// src/components/Navbar.jsx
import { useContext, useState } from 'react';
import { CartContext } from '@/context/CartContext';
import { ThemeContext } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Cart from './Cart'; 
import { LogOut, ShoppingCart, Sun, Moon, User, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const { cart } = useContext(CartContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  
  const cartItemCount = cart?.length || 0;

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 flex justify-between items-center p-4 text-foreground">
      {/* Clickable Brand Title navigating back home */}
      <Link to="/" className="text-xl font-bold tracking-tight hover:opacity-90 transition-opacity">
        Zindua Market
      </Link>
    
      <div className="flex items-center gap-4">
        {/* Theme Controller */}
        <Button variant="ghost" size="icon" onClick={toggleTheme} className="h-9 w-9">
          {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          <span className="sr-only">Toggle theme</span>
        </Button>

        {/* Cart Modal System (Using Dialog) */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon" className="relative h-9 w-9 border bg-secondary/50">
              <ShoppingCart className="h-4 w-4 text-foreground" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-primary-foreground animate-in fade-in zoom-in-95 duration-200">
                  {cartItemCount}
                </span>
              )}
              <span className="sr-only">Open Cart</span>
            </Button>
          </DialogTrigger>
          
          <DialogContent className="sm:max-w-md max-h-[85vh] flex flex-col p-6 overflow-hidden">
            <DialogHeader className="border-b pb-4">
              <DialogTitle className="flex justify-between items-center text-xl">
                <span>Shopping Cart</span>
                <span className="text-xs font-normal text-muted-foreground px-2 py-0.5 bg-muted rounded-full">
                  {cartItemCount} items
                </span>
              </DialogTitle>
              <DialogDescription>
                Review or manage items added to your marketplace selection.
              </DialogDescription>
            </DialogHeader>
            <div className="flex-1 overflow-y-auto">
              <Cart onCheckout={()=> setIsOpen(false)}/>
            </div>
          </DialogContent>
        </Dialog>
        {isAuthenticated ? (
          <div className="flex items-center gap-3 pl-2 border-l border-muted">
            {isAdmin && (
              <Link 
                to="/admin" 
                className="inline-flex items-center gap-1 text-xs font-semibold bg-primary/10 text-primary border border-primary/20 px-2.5 py-1 rounded-md hover:bg-primary/20 transition-colors"
              >
                <ShieldAlert className="h-3 w-3" />
                <span>Admin Console</span>
              </Link>
            )}

            {/* Profile Badge Wrapper */}
            <div className="flex items-center gap-2 text-sm max-w-37.5">
              <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center text-primary border shrink-0">
                <User className="h-4 w-4" />
              </div>
              <span className="truncate font-medium hidden md:inline">
                {user?.name || user?.email}
              </span>
            </div>
            
            <Button 
              variant="destructive" 
              size="sm" 
              onClick={logout}
              className="h-8 px-2 sm:px-3 flex items-center gap-1.5"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-3 pl-2 border-l border-muted text-sm font-medium">
            <Link to="/login" className="text-muted-foreground hover:text-foreground transition-colors">
              Login
            </Link>
            <Link to="/register" className="bg-primary text-primary-foreground px-3 py-1.5 rounded-md hover:opacity-90 transition-opacity">
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
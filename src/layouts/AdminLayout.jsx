import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, Package, ArrowLeft } from 'lucide-react';

export default function AdminLayout() {
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard Overview', path: '/admin', icon: LayoutDashboard },
    { name: 'Orders Queue', path: '/admin/orders', icon: ShoppingBag },
    { name: 'Inventory Stock', path: '/admin/products', icon: Package },
  ];

  return (
    <div className="flex min-h-[calc(100vh-65px)] bg-background">
      {/* 1. Permanent Side Navbar Frame */}
      <aside className="w-64 border-r bg-card p-4 flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-3">
            Navigation Menu
          </p>
          <nav className="flex flex-col gap-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link 
                  key={item.path} 
                  to={item.path} 
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-primary text-primary-foreground shadow-sm' 
                      : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <Link to="/" className="flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground px-3 py-2 border-t mt-auto">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Storefront
        </Link>
      </aside>

      {/* 2. Content Window Frame */}
      <main className="flex-1 p-8 bg-muted/10">
        {/* 🚀 THE OUTLET WINDOW: React Router injects the sub-pages right here! */}
        <Outlet />
      </main>
    </div>
  );
}
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Package, ShoppingBag, DollarSign, Users, CheckCircle, Clock } from 'lucide-react';

export default function AdminDashboard() {
  // Mock Order Metrics State Data
  const [orders, setOrders] = useState([
    { id: "ZM-9841", customer: "Jane Gaitho", date: "2026-07-02", total: 4500, status: "Pending" },
    { id: "ZM-9840", customer: "David Ndwiga", date: "2026-07-01", total: 12500, status: "Completed" },
    { id: "ZM-9839", customer: "Mary Kamau", date: "2026-06-30", total: 3200, status: "Completed" },
  ]);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Title Header Bar */}
      <div className="flex items-center gap-3 border-b pb-5">
        <div className="p-2 bg-primary/10 text-primary rounded-lg border border-primary/20">
          <Shield className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Console</h1>
          <p className="text-sm text-muted-foreground">Manage orders, stock parameters, and view site metrics</p>
        </div>
      </div>

      {/* Analytics Card Ribbon Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Gross Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Ksh. 20,200</div>
            <p className="text-xs text-muted-foreground">+12.5% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{orders.length}</div>
            <p className="text-xs text-muted-foreground">2 orders require dispatch</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Active Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48 Items</div>
            <p className="text-xs text-muted-foreground">5 categories operational</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">User Base</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,240</div>
            <p className="text-xs text-muted-foreground">+48 registrations today</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Panel Breakout Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Orders Tracking Table Panel */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Real-time processing queue for marketplace customer checkouts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="border-b text-muted-foreground font-medium">
                    <th className="py-3 px-2">Order ID</th>
                    <th className="py-3 px-2">Customer</th>
                    <th className="py-3 px-2">Total</th>
                    <th className="py-3 px-2 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-muted/40 transition-colors">
                      <td className="py-3 px-2 font-mono font-medium text-primary">{order.id}</td>
                      <td className="py-3 px-2">{order.customer}</td>
                      <td className="py-3 px-2 font-semibold">Ksh. {order.total.toLocaleString()}</td>
                      <td className="py-3 px-2 text-center">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                          order.status === 'Completed' 
                            ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' 
                            : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                        }`}>
                          {order.status === 'Completed' ? <CheckCircle className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Administrative Quick Controls Box */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Tasks</CardTitle>
            <CardDescription>Direct database modification tool triggers</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <Button className="w-full justify-start gap-2" variant="outline">
              <Package className="h-4 w-4" /> Add New Product Card
            </Button>
            <Button className="w-full justify-start gap-2" variant="outline">
              <Users className="h-4 w-4" /> Export Customer Directory
            </Button>
            <Button className="w-full justify-start gap-2 text-destructive hover:text-destructive hover:bg-destructive/10" variant="outline">
              <Shield className="h-4 w-4" /> Revoke System Token Sessions
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
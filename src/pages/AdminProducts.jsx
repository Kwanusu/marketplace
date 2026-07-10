import axios from 'axios';
import { Loader2, Pencil,X,Plus, Trash2, Package } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from 'sonner';
import { useState, useEffect } from 'react';

const LOCAL_JSON_API = '/products/products.json'

export default function AdminProducts() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    axios.get(`${LOCAL_JSON_API}`)
    .then(response => {
      setProducts(response.data);
    })
    .catch(err => {
      console.error("Error loading products:", err);
      toast.error("Failed to fetch products")
    })
    .finally(() => setLoading(false))
  }, []);

  const clearForm = () => {
    setName('');
    setPrice('');
    setCategory('');
    setImage('');
    setDescription('');
  }

  const handleCreateProduct = (e) => {
    e.preventDefault();
    if (!name.trim() || !price) return;

    setSubmitting(true);

    setTimeout(() => {
      const newProduct = {
        id: products.length > 0 ? Math.max(...products.map(p => Number(p.id))) + 1 : 1, //20 + 1
        name,
        price: Number(price),
        category,
        image: image || "https://example.photo/200/300",
        description
      };
      setProducts([newProduct, ...products]);
      clearForm();
      setSubmitting(false);
      toast.success("Product added successfully!")
    }, 1000)
  }
  const handleUpdateProduct = (e) => {
    e.preventDefault();
    if (!name.trim() || !price) return;

    setSubmitting(true);

    setTimeout(() => {
      setProducts(products.map(p => p.id === editingProduct.id
        ? {...p, name, price: Number(price), category, image, description }
        : p
      ));
      clearForm();
      setSubmitting(false);
      toast.success("Product details updated successfully!")
    }, 1000)
  };

  const startEdit = (product) => {
    setEditingProduct(product)
    setName(product.name);
    setPrice(product.price);
    setCategory(product.category);
    setImage(product.image);
    setDescription(product.description);
  };
  const handleDeleteProduct = (id) => {
   
    setProducts(products.filter(p => p.id !== id));
    toast.success("Product deleted!")
  }

  if (loading) {
    return (
        <div className='flex h-64 items-center justify-center'>
            <Loader2 className='h-8 w-8 animate-spin text-muted-foreground'/>
        </div>
    )
}
  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-200">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Inventory Control</h2>
        <p className="text-sm text-muted-foreground">Add, change, or remove active store catalog data records.</p>
      </div>

      {/* Inputs Form Frame */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Package className="h-4 w-4 text-primary" />
            {editingProduct ? 'Modify Product Specifications' : 'List New Marketplace Item'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={editingProduct ? handleUpdateProduct : handleCreateProduct} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">Product Name</label>
                <Input type="text" placeholder="e.g. Sony Headphones" value={name} onChange={(e) => setName(e.target.value)} disabled={submitting} />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">Price (Ksh.)</label>
                <Input type="number" placeholder="e.g. 4500" value={price} onChange={(e) => setPrice(e.target.value)} disabled={submitting} />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">Category Group</label>
                <Input type="text" placeholder="e.g. Electronics" value={category} onChange={(e) => setCategory(e.target.value)} disabled={submitting} />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground">Image Resource Link URL</label>
              <Input type="url" placeholder="https://example.com/item.jpg" value={image} onChange={(e) => setImage(e.target.value)} disabled={submitting} />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground">Product Listing Description</label>
              <Input type="text" placeholder="Provide features, dimensions, specifications parameters details..." value={description} onChange={(e) => setDescription(e.target.value)} disabled={submitting} />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              {editingProduct && (
                <Button type="button" variant="outline" onClick={clearForm} disabled={submitting}>
                  <X className="mr-2 h-4 w-4" /> Dismiss
                </Button>
              )}
              <Button type="submit" disabled={submitting}>
                {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : editingProduct ? <Pencil className="mr-2 h-4 w-4" /> : <Plus className="mr-2 h-4 w-4" />}
                {editingProduct ? 'Update Listing Details' : 'Deploy To Catalog'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Database Inventory Records Table Grid Sheet */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/40">
              <TableRow>
                <TableHead>Preview</TableHead>
                <TableHead>Catalog Item</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="text-right pr-6">Controls</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">No catalog listing items found.</TableCell>
                </TableRow>
              ) : (
                products.map((product) => (
                  <TableRow key={product.id} className="hover:bg-muted/30 transition-colors">
                    <TableCell>
                      <img src={product.image} alt={product.name} className="w-10 h-10 object-cover rounded border bg-muted" />
                    </TableCell>
                    <TableCell>
                      <p className="font-semibold text-foreground line-clamp-1">{product.name}</p>
                      <span className="text-[11px] font-normal text-muted-foreground line-clamp-1 max-w-[240px]">{product.description}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-xs bg-secondary border px-2.5 py-0.5 rounded-full capitalize font-medium">{product.category}</span>
                    </TableCell>
                    <TableCell className="font-bold text-foreground">Ksh. {Number(product.price).toLocaleString()}</TableCell>
                    <TableCell className="text-right space-x-1 pr-4">
                      <Button variant="ghost" size="icon" onClick={() => startEdit(product)} disabled={submitting}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10 hover:text-destructive" onClick={() => handleDeleteProduct(product.id)} disabled={submitting}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
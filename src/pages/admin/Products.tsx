import { useState } from "react";
import { useGetAdminProductsQuery } from "@/services/api/productsApi";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Search, Plus, Filter, Edit, Trash2, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

const AdminProducts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const { data, isLoading } = useGetAdminProductsQuery({
    page,
    limit,
    sort: "-createdAt"  
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const filteredProducts = data?.products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (!selectedCategory || product.category.name === selectedCategory)
  ) || [];

  const categories = Array.from(
    new Set(data?.products.map(p => p.category.name) || [])
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Product Management</h1>
            <p className="text-muted-foreground mt-1">Manage and monitor your product catalog</p>
          </div>
          
        </div>

        <Card className="mb-8">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-medium">Product Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <Button variant="outline" className="w-full">
                <Filter className="h-4 w-4 mr-2" /> More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="w-12">Image</TableHead>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Vendor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">Loading products...</TableCell>
                    </TableRow>
                  ) : (
                    filteredProducts.map((product) => (
                      <TableRow key={product.id} className="hover:bg-muted/50">
                        <TableCell>
                          <div className="h-10 w-10 rounded-lg border bg-muted/30 p-1">
                            <img 
                              src={product.images.find(img => img.isDefault)?.url} 
                              alt={product.name} 
                              className="h-full w-full object-cover rounded"
                            />
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{product.category.name}</TableCell>
                        <TableCell>{formatCurrency(product.price.current)}</TableCell>
                        <TableCell>{product.seller.businessName}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={product.inventory.quantity <= product.inventory.lowStockAlert ? "destructive" : "secondary"}
                            className={product.inventory.quantity <= product.inventory.lowStockAlert ? 
                              "bg-red-100 text-red-800" : 
                              "bg-green-100 text-green-800"}
                          >
                            {product.inventory.quantity <= product.inventory.lowStockAlert ? 'Low Stock' : 'In Stock'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {data && data.pagination.pages > 1 && (
          <div className="flex justify-center gap-2 py-4">
            <Button
              variant="outline"
              size="sm"
              disabled={page === 1}
              onClick={() => setPage(p => Math.max(1, p - 1))}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={page === data.pagination.pages}
              onClick={() => setPage(p => Math.min(data.pagination.pages, p + 1))}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AdminProducts;

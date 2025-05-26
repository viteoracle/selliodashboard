import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetAdminOrdersQuery } from "@/services/api/ordersApi";
import { Package } from "lucide-react";

const OrdersPage = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState("-createdAt");

  const { data, isLoading } = useGetAdminOrdersQuery({
    page,
    limit: 10,
    // status: status === 'all' ? undefined : status,
    // sort,
    // search,
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-500 hover:bg-green-600';
      case 'processing':
        return 'bg-blue-500 hover:bg-blue-600';
      case 'cancelled':
        return 'bg-red-500 hover:bg-red-600';
      default:
        return 'bg-amber-500 hover:bg-amber-600';
    }
  };

  return (
    <Layout>
      <div className="p-6">
        <Card>
          <CardHeader className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Orders Management
            </CardTitle>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Search orders..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-[200px]"
                />
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Filter status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sort} onValueChange={setSort}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="-createdAt">Newest First</SelectItem>
                    <SelectItem value="createdAt">Oldest First</SelectItem>
                    <SelectItem value="-totals.final">Highest Amount</SelectItem>
                    <SelectItem value="totals.final">Lowest Amount</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-8">Loading...</div>
            ) : (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Payment</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data?.orders.map((order) => (
                      <TableRow key={order.orderId}>
                        <TableCell className="font-medium">{order.orderId}</TableCell>
                        <TableCell>
                          <div>{order.customer.fullName}</div>
                          <div className="text-sm text-gray-500">{order.customer.email}</div>
                        </TableCell>
                        <TableCell>
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2 mb-1">
                              <img 
                                src={item.product.image} 
                                alt={item.product.name} 
                                className="w-8 h-8 object-cover rounded"
                              />
                              <span className="text-sm">
                                {item.quantity}x {item.product.name}
                              </span>
                            </div>
                          ))}
                        </TableCell>
                        <TableCell>
                          {new Date(order.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(order.status)}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={order.payment.status === "paid" ? "default" : "secondary"}>
                            {order.payment.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(order.totals.final)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {data?.pagination.pages > 1 && (
                  <div className="mt-4 flex justify-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={page === 1}
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                    >
                      Previous
                    </Button>
                    <div className="flex items-center text-sm px-2">
                      Page {page} of {data.pagination.pages}
                    </div>
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
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default OrdersPage;

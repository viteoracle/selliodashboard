import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useGetCategoriesQuery } from "@/services/api/categoriesApi";
import { Badge } from "@/components/ui/badge";
import NewCategoryForm from "@/components/admin/NewCategoryForm";

const AdminCategories = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data, isLoading } = useGetCategoriesQuery({
    sort: 'order'
  });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Categories</h1>
            <p className="text-muted-foreground">Manage your product categories</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" /> Add Category
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Category</DialogTitle>
              </DialogHeader>
              <NewCategoryForm onSuccess={() => setIsDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-6">
          {isLoading ? (
            <Card>
              <CardContent className="p-6">Loading...</CardContent>
            </Card>
          ) : (
            data?.categories.map(category => (
              <Card key={category.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold">{category.name}</h3>
                        {!category.isActive && (
                          <Badge variant="secondary">Inactive</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {category.description}
                      </p>
                      {category.parent && (
                        <p className="text-sm">
                          Parent: <span className="font-medium">{category.parent.name}</span>
                        </p>
                      )}
                    </div>
                    <Badge variant="outline">Order: {category.order}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AdminCategories;

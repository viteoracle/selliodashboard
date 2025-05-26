
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import ProductUploadForm from "@/components/seller/ProductUploadForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const AddProduct = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Link to="/seller/dashboard">
            <Button variant="ghost" size="sm" className="mr-4">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Add New Product</h1>
        </div>
        
        <ProductUploadForm />
      </div>
    </Layout>
  );
};

export default AddProduct;

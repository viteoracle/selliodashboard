
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";

const NotFound = () => {
  return (
    <Layout>
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-md px-4 py-12">
          <h1 className="text-9xl font-bold text-market-600">404</h1>
          <h2 className="text-3xl font-semibold mt-4 mb-6">Page Not Found</h2>
          <p className="text-gray-600 mb-8">
            The page you are looking for doesn't exist or has been moved.
          </p>
          <Link to="/">
            <Button size="lg">Return to Homepage</Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;


import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { HelpCircle, Mail, MessageSquare, Phone } from "lucide-react";

const SupportPage = () => {
  return (
    <Layout>
      <div className="p-6">
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Help Center</CardTitle>
              <CardDescription>
                Browse through our frequently asked questions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-4">
                <h3 className="font-medium">How do I process refunds?</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Learn about our refund policy and processing steps.
                </p>
                <Button variant="link" className="mt-2 px-0">
                  Read More →
                </Button>
              </div>
              <div className="rounded-lg border p-4">
                <h3 className="font-medium">Managing inventory</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Tips for effective inventory management.
                </p>
                <Button variant="link" className="mt-2 px-0">
                  Read More →
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Support</CardTitle>
              <CardDescription>
                Get in touch with our support team
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center p-4 border rounded-lg">
                <Mail className="h-6 w-6 text-blue-500 mr-4" />
                <div>
                  <h4 className="font-medium">Email Support</h4>
                  <p className="text-sm text-gray-600">
                    support@Sellio.com
                  </p>
                </div>
              </div>
              <div className="flex items-center p-4 border rounded-lg">
                <Phone className="h-6 w-6 text-green-500 mr-4" />
                <div>
                  <h4 className="font-medium">Phone Support</h4>
                  <p className="text-sm text-gray-600">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-center p-4 border rounded-lg">
                <MessageSquare className="h-6 w-6 text-purple-500 mr-4" />
                <div>
                  <h4 className="font-medium">Live Chat</h4>
                  <p className="text-sm text-gray-600">
                    Available 24/7
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default SupportPage;


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { FileText, Folder, Upload } from "lucide-react";

const files = [
  { name: "Product Images", type: "folder", items: 24 },
  { name: "Marketing Assets", type: "folder", items: 12 },
  { name: "Invoice_March2025.pdf", type: "file", size: "2.4 MB" },
  { name: "Report_Q1_2025.xlsx", type: "file", size: "1.8 MB" },
];

const FileManagerPage = () => {
  return (
    <Layout>
      <div className="p-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>File Manager</CardTitle>
            <Button>
              <Upload className="mr-2 h-4 w-4" />
              Upload File
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center p-4 border rounded-lg hover:bg-slate-50"
                >
                  {file.type === "folder" ? (
                    <Folder className="h-6 w-6 text-blue-500 mr-4" />
                  ) : (
                    <FileText className="h-6 w-6 text-gray-500 mr-4" />
                  )}
                  <div>
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-gray-500">
                      {file.type === "folder"
                        ? `${file.items} items`
                        : `Size: ${file.size}`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default FileManagerPage;

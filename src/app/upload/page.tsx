"use client";

import { DashboardLayout } from "@/components/shared/dashboard-layout";
import { FileUploadComponent } from "@/components/shared/file-upload-component";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Upload,
  FileArchive,
  CheckCircle,
  AlertCircle,
  FileText,
} from "lucide-react";

export default function UploadPage() {
  return (
    <DashboardLayout title="File Upload">
      <div className="p-6 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">File Upload</h1>
          <p className="text-muted-foreground">
            Upload ZIP files to process location data
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Upload Section */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Upload ZIP File
              </CardTitle>
              <CardDescription>
                Select or drag and drop a ZIP file to upload
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FileUploadComponent />
            </CardContent>
          </Card>

          {/* Instructions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileArchive className="h-5 w-5" />
                File Requirements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm">ZIP files only</p>
                  <p className="text-xs text-muted-foreground">
                    Only .zip file format is supported
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm">Maximum size: 50MB</p>
                  <p className="text-xs text-muted-foreground">
                    Files larger than 50MB will be rejected
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm">Processing time</p>
                  <p className="text-xs text-muted-foreground">
                    Large files may take several minutes to process
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Expected File Format
              </CardTitle>
              <CardDescription>
                Your CSV file should follow this format
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-sm mb-2">CSV Format:</p>
                  <div className="bg-muted p-3 rounded-lg font-mono text-sm">
                    <div className="text-blue-600 font-semibold">
                      Name, Latitude, Longitude
                    </div>
                    <div className="mt-1 space-y-1 text-muted-foreground">
                      <div>Suria KLCC,3.157324409,101.7121981</div>
                      <div>Zoo Negara,3.21054160,101.75920504</div>
                    </div>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>• First row should contain column headers</p>
                  <p>• Each location should be on a separate line</p>
                  <p>• Use comma separation between fields</p>
                  <p>• Coordinates should be in decimal degrees</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

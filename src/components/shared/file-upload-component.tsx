"use client";

import type React from "react";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, File } from "lucide-react";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useStore from "@/lib/store";
import { uploadFile } from "@/api";
import { useRouter } from "next/navigation";

interface FileUploadComponentProps {
  onFileSelect?: (file: File) => void;
}

export function FileUploadComponent({
  onFileSelect,
}: FileUploadComponentProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const token = useStore((state) => state.token);
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: uploadFile,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["locations"] });
      router.push("/map");
      toast.success("File uploaded successfully!");
    },
  });

  const validateFile = (file: File): string | null => {
    // Check file type
    if (
      !file.name.toLowerCase().endsWith(".zip") &&
      file.type !== "application/zip"
    ) {
      return "Only ZIP files are allowed";
    }

    // Check file size (50MB limit)
    const maxSize = 50 * 1024 * 1024; // 50MB in bytes
    if (file.size > maxSize) {
      return "File size must be less than 50MB";
    }

    return null;
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validationError = validateFile(file);
    if (validationError) {
      toast.error(validationError);
      return;
    }

    onFileSelect?.(file);

    console.log("Uploading file:", file);

    mutate({ file, token });
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      {/* Simple File Selection */}
      <div className="border-2 border-dashed rounded-lg p-8 text-center">
        <input
          ref={fileInputRef}
          type="file"
          accept=".zip,application/zip"
          onChange={handleFileSelect}
          className="hidden"
        />
        <div className="flex flex-col items-center gap-4">
          <div className="p-4 bg-muted rounded-full">
            <Upload className="h-8 w-8 text-muted-foreground" />
          </div>
          <div>
            <p className="text-lg font-medium">Select ZIP file to upload</p>
            <p className="text-sm text-muted-foreground mt-1">
              Click the button below to choose a file
            </p>
          </div>
          <Button
            onClick={handleButtonClick}
            className="flex items-center gap-2 cursor-pointer"
          >
            <File className="h-4 w-4" />
            Choose File
          </Button>
        </div>
      </div>
    </div>
  );
}

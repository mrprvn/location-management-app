"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MapPin } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addLocation } from "@/api";
import { toast } from "sonner";
import useStore from "@/lib/store";

export function LocationForm() {
  const token = useStore((state) => state.token);
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    name: "",
    latitude: "",
    longitude: "",
  });

  const { mutate, isPending, error } = useMutation({
    mutationFn: addLocation,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["locations"] });
      toast.success("Location added successfully!");
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.latitude || !formData.longitude) {
      toast.error("All fields are required");
      return;
    }

    mutate({ formData, token });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="name">Location Name</Label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Enter location name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="latitude">Latitude</Label>
        <Input
          id="latitude"
          name="latitude"
          type="number"
          step="any"
          placeholder="e.g., 40.7128"
          value={formData.latitude}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="longitude">Longitude</Label>
        <Input
          id="longitude"
          name="longitude"
          type="number"
          step="any"
          placeholder="e.g., -74.0060"
          value={formData.longitude}
          onChange={handleInputChange}
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Adding Location..." : "Add Location"}
      </Button>
    </form>
  );
}

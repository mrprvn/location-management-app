"use client";

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/shared/dashboard-layout";
import { LocationForm } from "@/components/shared/location-form";
import { MapComponent } from "@/components/shared/map-component";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { getAllLocations } from "@/api";
import useStore from "@/lib/store";

export interface Location {
  id: string;
  name: string;
  latitude: string;
  longitude: string;
  createdAt: Date;
}

export default function MapPage() {
  const token = useStore((state) => state.token);

  const { data, isLoading } = useQuery({
    queryFn: () => getAllLocations(token),
    queryKey: ["locations"],
  });

  return (
    <DashboardLayout title="Map">
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-8rem)] gap-4 p-4">
        {/* Location Form - Top on mobile, Right on desktop */}
        <div className="lg:w-80 lg:order-2 flex-shrink-0">
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="text-lg">Add Location</CardTitle>
            </CardHeader>
            <CardContent>
              <LocationForm />
            </CardContent>
          </Card>

          {/* Recent Locations List */}
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-lg">Recent Locations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {data?.locations?.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No locations added yet
                  </p>
                ) : (
                  data?.locations?.map((location: any) => (
                    <div key={location.id} className="p-2 bg-muted rounded-lg">
                      <p className="font-medium text-sm">{location.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {Number(location.latitude).toFixed(4)},{" "}
                        {Number(location.longitude).toFixed(4)}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex-1 lg:order-1">
          <Card className="h-full">
            <CardContent className="p-0 h-full">
              <MapComponent locations={data?.locations} />
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

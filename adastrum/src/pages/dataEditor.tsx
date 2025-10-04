"use client";

import DataTable from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Save, Sparkles } from "lucide-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const DataEditor = () => {
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    // Try to read dataset from query param (JSON encoded) or localStorage
    if (!router.isReady) return;

    const queryData = router.query.data;
    const encodedData = typeof queryData === "string" ? queryData : null;
    const savedData = typeof window !== "undefined" ? localStorage.getItem("exoplanet_dataset") : null;

    if (encodedData) {
      try {
        const parsed = JSON.parse(decodeURIComponent(encodedData));
        setData(parsed);
        localStorage.setItem("exoplanet_dataset", JSON.stringify(parsed));
      } catch {
        toast.error("Invalid dataset passed.");
      }
    } else if (savedData) {
      setData(JSON.parse(savedData));
    } else {
      toast.error("No dataset found. Please upload a file first.");
      router.push("/");
    }
  }, [router.isReady, router.query.data]);

  const handleSave = () => {
    localStorage.setItem("exoplanet_dataset", JSON.stringify(data));
    toast.success("Dataset saved successfully!");
  };

  const handleDownload = () => {
    if (data.length === 0) return;

    const headers = Object.keys(data[0]);
    const csv = [
      headers.join(","),
      ...data.map((row) => headers.map((h) => row[h]).join(","))
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "exoplanet_dataset.csv";
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success("Dataset downloaded!");
  };

  const handleProceedToClassification = () => {
    localStorage.setItem("exoplanet_dataset", JSON.stringify(data));
    router.push("/classify?from=editor");
  };

  return (
    <div className="min-h-screen bg-gradient-cosmic">
      <div className="absolute inset-0 bg-gradient-nebula pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => router.push("/")}
            className="mb-4 hover:bg-muted/50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Upload
          </Button>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-stellar bg-clip-text text-transparent mb-2">
                Dataset Editor
              </h1>
              <p className="text-muted-foreground">
                Edit your exoplanet dataset • {data.length} records loaded
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handleDownload}
                className="border-border/50 hover:bg-muted/50"
              >
                <Download className="w-4 h-4 mr-2" />
                Download CSV
              </Button>
              <Button
                onClick={handleSave}
                className="bg-gradient-stellar hover:shadow-glow"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <DataTable data={data} setData={setData} />

        {/* Action Footer */}
        <div className="mt-8 flex justify-center">
          <Button
            onClick={handleProceedToClassification}
            size="lg"
            className="bg-gradient-stellar hover:shadow-glow transition-all duration-300 px-8 py-6 text-lg font-semibold"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Proceed to Classification
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DataEditor;

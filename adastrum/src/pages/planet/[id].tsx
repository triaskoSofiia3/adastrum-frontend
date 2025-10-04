"use client";

import { Button } from "@/components/ui/button";
import { DATASET_KEY, RESULTS_KEY, idbGet } from "@/lib/indexedDb";
import { ArrowLeft, Orbit } from "lucide-react";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

export default function PlanetDetailsPage() {
  const router = useRouter();
  const { id } = router.query;

  const [datasetRow, setDatasetRow] = useState<Record<string, any> | null>(null);
  const [item, setItem] = useState<{ id: number; label: string; confidence: number } | null>(null);

  useEffect(() => {
    if (typeof id === "undefined") return;
    const index = Number(id);
    if (Number.isNaN(index)) {
      toast.error("Invalid item id.");
      router.push("/results");
      return;
    }

    (async () => {
      try {
        const [dataset, results] = await Promise.all([
          idbGet<Record<string, any>[]>(DATASET_KEY),
          idbGet<any>(RESULTS_KEY),
        ]);
        if (!dataset || !results || !Array.isArray(results.items)) {
          toast.error("Missing data. Run classification again.");
          router.push("/classify");
          return;
        }
        if (index < 0 || index >= dataset.length) {
          toast.error("Item not found.");
          router.push("/results");
          return;
        }
        setDatasetRow(dataset[index]);
        const found = results.items.find((x: any) => x.id === index) || null;
        setItem(found);
      } catch {
        toast.error("Failed to load item details.");
        router.push("/results");
      }
    })();
  }, [id]);

  const title = useMemo(() => {
    if (!item) return `Planet #${id}`;
    const label = item.label.replace("_", " ");
    return `Planet #${item.id} • ${label} (${(item.confidence * 100).toFixed(1)}%)`;
  }, [item, id]);

  return (
    <div className="min-h-screen bg-gradient-cosmic">
      <div className="absolute inset-0 bg-gradient-nebula pointer-events-none" />
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => router.push("/results")}
            className="mb-4 hover:bg-muted/50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Results
          </Button>

          <div className="flex items-center gap-3 mb-2">
            <Orbit className="w-10 h-10 text-primary animate-spin" style={{ animationDuration: "20s" }} />
            <h1 className="text-4xl font-bold bg-gradient-stellar bg-clip-text text-transparent">{title}</h1>
          </div>
          <p className="text-muted-foreground">Detailed features and classification</p>
        </div>

        {datasetRow ? (
          <div className="overflow-x-auto rounded-lg border border-border/50">
            <table className="w-full text-left">
              <thead className="bg-muted/30">
                <tr>
                  <th className="px-4 py-2">Field</th>
                  <th className="px-4 py-2">Value</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(datasetRow).map(([key, value]) => (
                  <tr key={key} className="border-t border-border/50">
                    <td className="px-4 py-2 font-medium">{key}</td>
                    <td className="px-4 py-2">{String(value ?? "")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-muted-foreground">Loading item...</p>
        )}
      </div>
    </div>
  );
}



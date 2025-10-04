"use client";

import { Button } from "@/components/ui/button";
import { RESULTS_KEY, idbGet } from "@/lib/indexedDb";
import { ArrowLeft, Orbit } from "lucide-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ClassificationResults } from "../components/ClassificationResults";

export default function ResultsPage() {
  const router = useRouter();
  const [results, setResults] = useState<any | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const stored = await idbGet<any>(RESULTS_KEY);
        if (!stored) {
          toast.error("No results found. Run classification first.");
          router.push("/classify");
          return;
        }
        setResults(stored);
      } catch {
        toast.error("Failed to load results.");
        router.push("/classify");
      }
    })();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-cosmic">
      <div className="absolute inset-0 bg-gradient-nebula pointer-events-none" />
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => router.push("/classify")}
            className="mb-4 hover:bg-muted/50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Classification
          </Button>

          <div className="flex items-center gap-3 mb-2">
            <Orbit className="w-10 h-10 text-primary animate-spin" style={{ animationDuration: "20s" }} />
            <h1 className="text-4xl font-bold bg-gradient-stellar bg-clip-text text-transparent">
              Classification Results
            </h1>
          </div>
          <p className="text-muted-foreground">Your latest model performance and predictions</p>
        </div>

        {results && (
          <>
            <ClassificationResults results={results} />
            {Array.isArray(results.items) && results.items.length > 0 && (
              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4 bg-gradient-stellar bg-clip-text text-transparent">
                  Items
                </h2>
                <div className="overflow-x-auto rounded-lg border border-border/50">
                  <table className="w-full text-left">
                    <thead className="bg-muted/30">
                      <tr>
                        <th className="px-4 py-2">ID</th>
                        <th className="px-4 py-2">Label</th>
                        <th className="px-4 py-2">Confidence</th>
                        <th className="px-4 py-2">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.items.map((item: any) => (
                        <tr key={item.id} className="border-t border-border/50 hover:bg-muted/20">
                          <td className="px-4 py-2">{item.id}</td>
                          <td className="px-4 py-2 capitalize">{item.label.replace("_", " ")}</td>
                          <td className="px-4 py-2">{(item.confidence * 100).toFixed(2)}%</td>
                          <td className="px-4 py-2">
                            <Button size="sm" onClick={() => router.push(`/planet/${item.id}`)}>
                              View details
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}



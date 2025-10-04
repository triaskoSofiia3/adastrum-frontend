"use client";

import { HyperparameterPanel, HyperparametersType } from "@/components/HyperparameterPanel";
import { Button } from "@/components/ui/button";
import { DATASET_KEY, RESULTS_KEY, idbGet, idbSet } from "@/lib/indexedDb";
import { ArrowLeft, Orbit, Sparkles } from "lucide-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ClassificationResults } from "../components/ClassificationResults";

const Classify = () => {
  const router = useRouter();

  console.log("classify");

  const [data, setData] = useState<any[]>([]);
  const [hyperparameters, setHyperparameters] = useState<HyperparametersType | null>(null);
  const [results, setResults] = useState<any>(null);
  const [isClassifying, setIsClassifying] = useState(false);

  useEffect(() => {
    // Try to load data from query param or IndexedDB
    if (!router.isReady) return;

    const load = async () => {
      const queryData = router.query.data;
      const encodedData = typeof queryData === "string" ? queryData : null;

      if (encodedData) {
        try {
          const parsed = JSON.parse(decodeURIComponent(encodedData));
          setData(parsed);
          return;
        } catch {
          toast.error("Invalid dataset passed.");
        }
      }

      try {
        const stored = await idbGet<any[]>(DATASET_KEY);
        if (stored && Array.isArray(stored)) {
          setData(stored);
        } else {
          toast.error("No dataset found. Please upload a file first.");
          router.push("/");
        }
      } catch {
        toast.error("Failed to load dataset.");
        router.push("/");
      }
    };

    load();
  }, [router.isReady, router.query.data]);

  const handleClassify = async () => {
    if (data.length === 0) {
      toast.error("No dataset available");
      return;
    }

    setIsClassifying(true);
    toast.info("Training model...", {
      description: "This may take a few moments",
    });

    // Simulated ML classification
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Generate per-item mock predictions
    const items = data.map((row, index) => {
      const r = Math.random();
      const label = r < 0.35 ? "exoplanet" : r < 0.6 ? "candidate" : "false_positive";
      const confidence = 0.7 + Math.random() * 0.29;
      return { id: index, label, confidence };
    });

    const predictions = items.reduce(
      (acc, item) => {
        if (item.label === "exoplanet") acc.exoplanets += 1;
        else if (item.label === "candidate") acc.candidates += 1;
        else acc.falsePositives += 1;
        return acc;
      },
      { exoplanets: 0, candidates: 0, falsePositives: 0 }
    );

    const mockResults = {
      accuracy: 0.92 + Math.random() * 0.05,
      precision: 0.89 + Math.random() * 0.05,
      recall: 0.87 + Math.random() * 0.05,
      f1Score: 0.88 + Math.random() * 0.05,
      predictions,
      items,
    };

    try {
      await idbSet(RESULTS_KEY, mockResults);
    } catch {}

    setResults(mockResults);
    setIsClassifying(false);
    toast.success("Classification complete!", {
      description: `Accuracy: ${(mockResults.accuracy * 100).toFixed(2)}%`,
    });

    router.push("/results");
  };

  return (
    <div className="min-h-screen bg-gradient-cosmic">
      <div className="absolute inset-0 bg-gradient-nebula pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => router.push("/dataEditor")}
            className="mb-4 hover:bg-muted/50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Editor
          </Button>

          <div className="flex items-center gap-3 mb-2">
            <Orbit
              className="w-10 h-10 text-primary animate-spin"
              style={{ animationDuration: "20s" }}
            />
            <h1 className="text-4xl font-bold bg-gradient-stellar bg-clip-text text-transparent">
              Exoplanet Classification
            </h1>
          </div>
          <p className="text-muted-foreground">
            Configure hyperparameters and train your ML model • {data.length} records
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Results */}
          <div className="lg:col-span-2 space-y-6">
            {/* Classification Button */}
            <div className="flex justify-center">
              <Button
                onClick={handleClassify}
                disabled={isClassifying}
                size="lg"
                className="bg-gradient-stellar hover:shadow-glow transition-all duration-300 px-8 py-6 text-lg font-semibold"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                {isClassifying ? "Classifying..." : "Start Classification"}
              </Button>
            </div>

            {/* Results */}
            {results && <ClassificationResults results={results} />}
          </div>

          {/* Right Column - Hyperparameters */}
          <div className="lg:col-span-1">
            <HyperparameterPanel onChange={setHyperparameters} />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center text-muted-foreground">
          <p className="flex items-center justify-center gap-2">
            <Orbit className="w-4 h-4" />
            Powered by NASA Open Data & Advanced ML
          </p>
        </div>
      </div>
    </div>
  );
};

export default Classify;

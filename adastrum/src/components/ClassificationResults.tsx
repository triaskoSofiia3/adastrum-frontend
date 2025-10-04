import { Card } from "@/components/ui/card";
import type { ReactElement } from "react";

type ClassificationMetrics = {
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  predictions: {
    exoplanets: number;
    candidates: number;
    falsePositives: number;
  };
};

interface ClassificationResultsProps {
  results: ClassificationMetrics;
}

export function ClassificationResults({ results }: ClassificationResultsProps): ReactElement {
  const { accuracy, precision, recall, f1Score, predictions } = results;

  const formatPct = (value: number): string => `${(value * 100).toFixed(2)}%`;

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
        <h2 className="text-2xl font-bold mb-4 bg-gradient-stellar bg-clip-text text-transparent">
          Performance Metrics
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Metric label="Accuracy" value={formatPct(accuracy)} />
          <Metric label="Precision" value={formatPct(precision)} />
          <Metric label="Recall" value={formatPct(recall)} />
          <Metric label="F1 Score" value={formatPct(f1Score)} />
        </div>
      </Card>

      <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
        <h2 className="text-2xl font-bold mb-4 bg-gradient-stellar bg-clip-text text-transparent">
          Prediction Breakdown
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Metric label="Exoplanets" value={predictions.exoplanets.toString()} />
          <Metric label="Candidates" value={predictions.candidates.toString()} />
          <Metric label="False Positives" value={predictions.falsePositives.toString()} />
        </div>
      </Card>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }): ReactElement {
  return (
    <div className="rounded-lg border border-border/50 px-4 py-3 bg-muted/30">
      <div className="text-sm text-muted-foreground">{label}</div>
      <div className="text-xl font-semibold">{value}</div>
    </div>
  );
}

export default ClassificationResults;



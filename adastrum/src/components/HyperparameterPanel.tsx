import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

interface HyperparametersProps {
  onChange: (params: HyperparametersType) => void;
}

export type HyperparametersType = {
  model: string;
  maxDepth: number;
  learningRate: number;
  nEstimators: number;
  testSize: number;
};

export const HyperparameterPanel = ({ onChange }: HyperparametersProps) => {
  const [params, setParams] = useState<HyperparametersType>({
    model: "random_forest",
    maxDepth: 10,
    learningRate: 0.1,
    nEstimators: 100,
    testSize: 0.2,
  });

  const updateParam = (key: keyof HyperparametersType, value: any) => {
    const newParams = { ...params, [key]: value };
    setParams(newParams);
    onChange(newParams);
  };

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50 p-6">
      <h2 className="text-2xl font-bold mb-6 bg-gradient-stellar bg-clip-text text-transparent">
        Hyperparameters
      </h2>
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="model" className="text-accent">Model Type</Label>
          <Select value={params.model} onValueChange={(value) => updateParam("model", value)}>
            <SelectTrigger id="model" className="bg-muted border-border/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="random_forest">Random Forest</SelectItem>
              <SelectItem value="xgboost">XGBoost</SelectItem>
              <SelectItem value="neural_network">Neural Network</SelectItem>
              <SelectItem value="svm">Support Vector Machine</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-accent">Max Depth: {params.maxDepth}</Label>
          <Slider
            value={[params.maxDepth]}
            onValueChange={([value]) => updateParam("maxDepth", value)}
            min={1}
            max={50}
            step={1}
            className="[&_[role=slider]]:bg-primary [&_[role=slider]]:border-primary"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="learningRate" className="text-accent">Learning Rate</Label>
          <Input
            id="learningRate"
            type="number"
            step="0.01"
            value={params.learningRate}
            onChange={(e) => updateParam("learningRate", parseFloat(e.target.value))}
            className="bg-muted border-border/50"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-accent">N Estimators: {params.nEstimators}</Label>
          <Slider
            value={[params.nEstimators]}
            onValueChange={([value]) => updateParam("nEstimators", value)}
            min={10}
            max={500}
            step={10}
            className="[&_[role=slider]]:bg-primary [&_[role=slider]]:border-primary"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-accent">Test Size: {(params.testSize * 100).toFixed(0)}%</Label>
          <Slider
            value={[params.testSize * 100]}
            onValueChange={([value]) => updateParam("testSize", value / 100)}
            min={10}
            max={40}
            step={5}
            className="[&_[role=slider]]:bg-primary [&_[role=slider]]:border-primary"
          />
        </div>
      </div>
    </Card>
  );
};

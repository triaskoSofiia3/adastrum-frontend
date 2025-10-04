import { Card } from "@/components/ui/card";
import { Upload } from "lucide-react";
import Papa from "papaparse";
import { useCallback } from "react";

interface FileUploadProps {
  onFileUpload: (data: any[]) => void;
}

export const FileUpload = ({ onFileUpload }: FileUploadProps) => {
  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true,
        complete: (results) => {
          onFileUpload(results.data as any[]);
        },
        error: (err) => {
          console.error("CSV parsing error:", err);
        }
      });
    },
    [onFileUpload]
  );

  return (
    <Card className="relative overflow-hidden border border-white/10 bg-gradient-to-b from-black via-zinc-900 to-black/80 rounded-2xl shadow-xl backdrop-blur-xl transition-all duration-300 hover:shadow-purple-500/20 hover:border-purple-400/40">
      <label className="flex flex-col items-center justify-center p-12 cursor-pointer group">
        {/* glowing gradient orb */}
        <div className="relative mb-6">
          <div className="absolute inset-0 rounded-full bg-purple-500/40 blur-3xl opacity-60 group-hover:opacity-90 transition-opacity duration-500"></div>
          <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-purple-500 via-fuchsia-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-purple-600/40 group-hover:scale-110 transition-transform duration-300">
            <Upload className="w-10 h-10 text-white" />
          </div>
        </div>

        <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent tracking-tight">
          Upload CSV Dataset
        </h3>

        <p className="text-zinc-400 text-center max-w-sm leading-relaxed">
          Drop your exoplanet dataset here or click to browse
        </p>

        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>

      {/* subtle gradient border glow */}
      <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-purple-600 via-fuchsia-500 to-indigo-500 opacity-20 group-hover:opacity-40 blur-md pointer-events-none"></div>
    </Card>
  );
};

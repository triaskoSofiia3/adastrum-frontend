import { FileUpload } from "@/components/CsvUploader";
import { Button } from "@/components/ui/button";
import { DATASET_KEY, idbSet } from "@/lib/indexedDb";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);

  console.log("upload");

  const handleUpload = (parsedData: any[]) => {
    setData(parsedData);
    setIsLoading(true);
    (async () => {
      try {
        await idbSet<any[]>(DATASET_KEY, parsedData);
      } catch {}
      router.push("/dataEditor");
    })();
    //validateData(parsedData);
  };

//   const validateData = (rows: any[]) => {
//     const validationErrors: string[] = [];
//     if (rows.length === 0) {
//       validationErrors.push("CSV is empty.");
//     } else {
//       const requiredColumns = ["name", "age", "email"];
//       requiredColumns.forEach((col) => {
//         if (!(col in rows[0])) {
//           validationErrors.push(`Missing required column: ${col}`);
//         }
//       });

//       rows.forEach((row, idx) => {
//         if (row.age && isNaN(Number(row.age))) {
//           validationErrors.push(`Row ${idx + 1}: Age must be a number`);
//         }
//         if (row.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(row.email)) {
//           validationErrors.push(`Row ${idx + 1}: Invalid email`);
//         }
//       });
//     }
//     setErrors(validationErrors);
//   };

  const handleProceed = () => {
    if (data.length === 0) return;
    (async () => {
      try {
        await idbSet<any[]>(DATASET_KEY, data);
      } catch {}
      router.push("/dataEditor");
    })();
  };

  return (
    <main style={{ padding: "2rem" }}>
      <FileUpload onFileUpload={handleUpload} />
        <>
          <div style={{ marginTop: "1rem" }}>
            <Button onClick={handleProceed} disabled={isLoading || data.length === 0}>
              {isLoading ? "Processing..." : "Proceed to Data Editor"}
            </Button>
          </div>
        </>
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="flex items-center gap-3 text-white">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/20 border-t-white" />
            <span>Uploading and redirecting…</span>
          </div>
        </div>
      )}
    </main>
  );
}

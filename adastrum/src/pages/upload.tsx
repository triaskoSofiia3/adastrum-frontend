import CsvUploader from "@/components/CsvUploader";
import DataTable from "@/components/DataTable";
import Validation from "@/components/Validation";
import { useState } from "react";

export default function Home() {
  const [data, setData] = useState<any[]>([]);
  const [errors, setErrors] = useState<string[]>([]);

  const handleUpload = (parsedData: any[]) => {
    setData(parsedData);
    validateData(parsedData);
  };

  const validateData = (rows: any[]) => {
    const validationErrors: string[] = [];
    if (rows.length === 0) {
      validationErrors.push("CSV is empty.");
    } else {
      const requiredColumns = ["name", "age", "email"];
      requiredColumns.forEach((col) => {
        if (!(col in rows[0])) {
          validationErrors.push(`Missing required column: ${col}`);
        }
      });

      rows.forEach((row, idx) => {
        if (row.age && isNaN(Number(row.age))) {
          validationErrors.push(`Row ${idx + 1}: Age must be a number`);
        }
        if (row.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(row.email)) {
          validationErrors.push(`Row ${idx + 1}: Invalid email`);
        }
      });
    }
    setErrors(validationErrors);
  };

  return (
    <main style={{ padding: "2rem" }}>
      <h1>CSV Uploader & Editor</h1>
      <CsvUploader onUpload={handleUpload} />
      <Validation errors={errors} />
      {data.length > 0 && (
        <DataTable data={data} setData={setData} />
      )}
    </main>
  );
}

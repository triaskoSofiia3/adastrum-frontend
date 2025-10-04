import Papa from "papaparse";

interface CsvUploaderProps {
  onUpload: (data: any[]) => void;
}

export default function CsvUploader({ onUpload }: CsvUploaderProps) {
  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        onUpload(results.data as any[]);
      },
    });
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFile} />
    </div>
  );
}

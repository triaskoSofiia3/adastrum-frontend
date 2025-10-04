
export interface DataTableProps {
  data: Record<string, string | number | null>[];
  setData: (data: Record<string, string | number | null>[]) => void;
}

export default function DataTable({ data, setData }: DataTableProps) {
  const handleChange = (rowIndex: number, key: string, value: string) => {
    const updated = [...data];
    updated[rowIndex] = { ...updated[rowIndex], [key]: value };
    setData(updated);
  };

  if (!data || data.length === 0) return <p>No data available</p>;

  const columns = Object.keys(data[0]);

  return (
    <div style={{ overflowX: "auto", marginTop: "1rem" }}>
      <table border={1} cellPadding={6} cellSpacing={0}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col}>{col.toUpperCase()}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIdx) => (
            <tr key={rowIdx}>
              {columns.map((col) => (
                <td key={col}>
                  <input
                    type="text"
                    value={row[col] !== null ? String(row[col]) : ""}
                    onChange={(e) =>
                      handleChange(rowIdx, col, e.target.value)
                    }
                    style={{ width: "100%" }}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

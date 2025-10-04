interface DataTableProps {
    data: any[];
    setData: (data: any[]) => void;
  }
  
  export default function DataTable({ data, setData }: DataTableProps) {
    const handleChange = (rowIndex: number, key: string, value: string) => {
      const updated = [...data];
      updated[rowIndex][key] = value;
      setData(updated);
    };
  
    if (data.length === 0) return null;
  
    const columns = Object.keys(data[0]);
  
    return (
      <table border={1} cellPadding={6} style={{ marginTop: "1rem" }}>
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
                    value={row[col] || ""}
                    onChange={(e) => handleChange(rowIdx, col, e.target.value)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  
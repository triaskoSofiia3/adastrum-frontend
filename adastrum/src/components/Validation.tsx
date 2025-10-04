interface ValidationProps {
    errors: string[];
  }
  
  export default function Validation({ errors }: ValidationProps) {
    if (errors.length === 0) return null;
  
    return (
      <div style={{ margin: "1rem 0", color: "red" }}>
        <h3>Validation Errors:</h3>
        <ul>
          {errors.map((err, i) => (
            <li key={i}>{err}</li>
          ))}
        </ul>
      </div>
    );
  }
  
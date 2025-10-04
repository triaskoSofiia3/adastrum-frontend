import Link from "next/link";

export default function IndexPage() {
  return (
    <main style={{ padding: "2rem" }}>
      <h1>Welcome to Adastrum</h1>
      <p>Upload a CSV to validate and edit your data.</p>
      <p>
        <Link href="/upload">Go to Upload</Link>
      </p>
    </main>
  );
}



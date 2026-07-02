import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center">
        <h1 className="text-6xl gold-text">404</h1>
        <p>Page not found</p>
        <Link href="/" className="gold-button">Home</Link>
      </div>
    </div>
  );
}

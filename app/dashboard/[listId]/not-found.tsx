export default function NotFoundPage() {
  return (
    <div className="page-container text-center">
      <h1 className="page-title text-red-600">404 – Ikke funnet</h1>
      <p className="page-subtitle">Beklager, vi finner ikke siden du leter etter.</p>
      <a href="/" className="my-button mt-4 inline-block">Gå til forsiden</a>
    </div>
  );
}

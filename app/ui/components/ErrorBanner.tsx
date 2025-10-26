/**
 * @component ErrorBanner
 * 
 * Viser en feilmelding dersom `message` ikke er null.
 * 
 * Props:
 * - `message` (string | null, required): Feilmeldingen som skal vises.  
 *   Hvis `null`, rendres ingenting.
 * 
 * Brukes for å vise validerings- eller serverfeil i skjemaer.
 */
export default function ErrorBanner({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <div className="">
      {message}
    </div>
  );
}

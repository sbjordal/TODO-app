import AppButton from "@/app/ui/components/AppButton";
import { HomeIcon } from "@heroicons/react/24/outline";

export default function NotFoundPage() {
  return (
    <div className="page-container text-center">
      <h1 className="page-title">404: Ikke funnet</h1>
      <p className="page-subtitle">
        Beklager, siden du prøver å nå finnes ikke.
      </p>
      <div className="center-container">
        <AppButton
          path="/dashboard"
          label="Tilbake"
          icon={<HomeIcon className="button-icon" />}
          className="my-button"
        />
      </div>
    </div>
  );
}

'use client';

import AppButton from "@/app/ui/components/AppButton";
import { HomeIcon } from "@heroicons/react/24/outline"; 


export default function Page() {

  // Legge til login / adduser-funksjonalitet senere

  return (
    <main className="page-container">
      <div className="page-title">
        <h1 className="landing-title">TODO</h1>
        <div className="center-container ">
          <p className="page-subtitle"> Her kommer det mer funksjonalitet senere</p>
        <AppButton 
        path="/dashboard"
        label="Til mine lister"
        className="my-button"
        icon={<HomeIcon className="button-icon" />}/>
        
        </div>
      </div>
    </main>
  );
}

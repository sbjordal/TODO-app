# TODO-app
**Stine Bjordal**

En To-do applikasjon bygget med [Next.js](https://nextjs.org/), [TypeScript](https://www.typescriptlang.org/) og [PostgreSQL](https://www.postgresql.org/) via [Supabase](https://supabase.com/).
Appen lar brukere lage lister, legge til oppgaver, merke dem som ferdig, og slette dem. En kan enkelt kjøre det lokalt og bruke min Supabase-database.

## Funksjonalitet
- Opprett nye lister
- Se oversikt over eksisterende lister
- Legg til oppgaver i en liste
- Merk oppgaver som fullført
- Slett oppgaver

## Teknologier brukt
- [Next.js](https://nextjs.org/) (App Router)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Supabase](https://supabase.com/) (database og REST-API)
- [PostgreSQL](https://www.postgresql.org/)
- [Zod](https://zod.dev/) (skjema- og inputvalidering)
- [Tailwind CSS](https://tailwindcss.com/) + egendefinerte klasser
- [Heroicons](https://heroicons.com/) (ikoner)
- UUID for ID-generering

## Komponenter
TODO: fyll ut når ferdig

## Kjøre prosjektet
1. **Klon repoet:**
`git clone https://github.com/sbjordal/TODO-app`
`cd TODO-app`
2. **Installer avhengigheter:**
`npm install` eller `pnpm install`
3. **Konfigurer miljøvariabler:**
Kopier eksempelfilen: `cp .env.example .env`  
Du trenger ikke endre verdiene — de er satt opp for å koble til min database.
4. **Kjør utviklingsserveren**: `npm run dev` eller `pnpm run dev`
Appen kjører nå på `http://localhost:3000`

## Antakelser og avgrensninger
- Prosjektet er utviklet for lokal kjøring med delt Supabase-database
- Det er ikke satt opp autentisering eller tilgangskontroll — alle brukere deler samme data
- API-et er håndtert gjennom Supabase sine auto-genererte REST-endepunkter
- Ingen avansert feil- eller unntakshåndtering er implementert
- Prosjektet er ikke optimalisert for produksjonsskala

Disse avgrensningene er gjort for å holde prosjektet enkelt og fokusert på funksjonaliteten i en TODO-app.

## Videre arbeid / forbedringer
- Forbedre UI og funksjonalitet: oppgaver med tidsfrister, merking av oppgaver som "important" / "favoritt"
- Optimalisere innlasting av data for å redusere treghet
- Legge til tester for bedre kodekvalitet
- Legge til autentisering og tilgangskontroll (f.eks. med Supabase Auth) slik at hver bruker kan logge inn, og får sine egne lister og oppgaver.
- Forbedre datastruktur og tilgangsregler ved å bruke RLS (Row Level Security) i Supabase
- Deploye prosjektet på f. eks. Vercel for å gjøre det tilgjengelig på nett

## Lisens

MIT © 2025 Stine Bjordal
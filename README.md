# TODO-app
**Stine Bjordal**

En To-do applikasjon bygget med [Next.js](https://nextjs.org/), [TypeScript](https://www.typescriptlang.org/) og [Prisma](https://www.prisma.io/) med [SQLite](https://www.sqlite.org/) som database.  
Appen lar brukere lage lister, legge til oppgaver, merke dem som ferdig, redigere og slette dem. Prosjektet er laget for lokal kjøring.

## Funksjonalitet
- Opprett nye lister  
- Se oversikt over eksisterende lister  
- Legg til oppgaver i en liste  
- Rediger oppgaver  
- Merk oppgaver som fullført  
- Slett oppgaver og lister 

## Teknologier brukt
- [Next.js](https://nextjs.org/) (App Router)  
- [React](https://react.dev/)  
- [TypeScript](https://www.typescriptlang.org/)  
- [Prisma](https://www.prisma.io/) (ORM)  
- [SQLite](https://www.sqlite.org/) (database)  
- [Zod](https://zod.dev/) (inputvalidering)  
- [Tailwind CSS](https://tailwindcss.com/) + egendefinerte klasser  
- [Heroicons](https://heroicons.com/) (ikoner)  
- [uuid](https://www.npmjs.com/package/uuid) for ID-generering

## Komponenter
- `ListCard`: viser og lar deg redigere eller slette lister  
- `TaskList`: viser oppgaver med sortering på fullført/ikke fullført
- `TaskItem`:   
- `CreateListForm` / `CreateTaskForm`: oppretting av lister og oppgaver  
- `ErrorBanner`: visning av feilmeldinger  
- `SearchBar`: søk i oppgaver på tvers av lister
- `AppButton`: 

## Kjøre prosjektet
### 1. **Klon repoet:**
`git clone https://github.com/sbjordal/TODO-app`
`cd TODO-app`
### 2. **Installer avhengigheter:**
`npm install` eller `pnpm install`
### 3. **Konfigurer miljøvariabler:**
Kopier eksempelfilen: `cp .env.example .env`  
### 4. **Opprett og migrer databasen**
`npx prisma migrate dev --name init`
Dette vil opprette 'dev.db' og opprette alle tabellene i databasen i henhold til schema.prisma
### 5. **Generer Prisma Client**
`npx prisma generate`eller `pnpx prisma generate`. Gjør at prosjektet kan kommunisere med databasen via Prisma
### 6. **Seed databasen med testdata**
`npx prisma db seed`
### 7. **Kjør utviklingsserveren**: `npm run dev` eller `pnpm run dev`
Appen kjører nå på `http://localhost:3000`

## Antakelser og avgrensninger
- Prosjektet er utviklet for lokal kjøring med delt Supabase-database
- Det er ikke satt opp autentisering eller tilgangskontroll — alle brukere deler samme data
- API-et er håndtert gjennom Supabase sine auto-genererte REST-endepunkter
- Ingen avansert feil- eller unntakshåndtering er implementert
- Prosjektet er ikke optimalisert for produksjonsskala

Disse avgrensningene er gjort for å holde prosjektet enkelt og fokusert på funksjonaliteten i en TODO-app.

## Videre arbeid / forbedringer
- Forbedre UI og funksjonalitet: oppgaver med tidsfrister, tags, merking av oppgaver som "important" / "favoritt"
- Optimalisere innlasting av data for å redusere treghet
- Legge til tester for bedre kodekvalitet
- Legge til autentisering og tilgangskontroll (f.eks. med Supabase Auth) slik at hver bruker kan logge inn, og får sine egne lister og oppgaver.
- Forbedre datastruktur og tilgangsregler ved å bruke RLS (Row Level Security) i Supabase
- Deploye prosjektet på f. eks. Vercel for å gjøre det tilgjengelig på nett

## Lisens

MIT © 2025 Stine Bjordal
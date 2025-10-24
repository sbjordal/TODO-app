# TODO-app
**Stine Bjordal**

En To-do applikasjon bygget med [Next.js](https://nextjs.org/), [TypeScript](https://www.typescriptlang.org/) og [PostgreSQL](https://www.postgresql.org/) med Supabase.  
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
- [Supabase](https://supabase.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Zod](https://zod.dev/) (skjema- og inputvalidering)
- [Tailwind CSS](https://tailwindcss.com/) + egendefinerte klasser
- UUID for ID-generering

## Komponenter
TODO: fyll ut når ferdig

## Kjøre prosjektet
1. **Klon repoet:**
`git clone https://github.com/sbjordal/TODO-app`
`cd <prosjektnavn>`
2. **Installer avhengigheter:**
`npm install` eller `pnpm install`
3. **Konfigurer miljøvariabler:**
Kopier eksempelfilen: `cp .env.example .env`  
Du trenger ikke endre verdiene — de er satt opp for å koble til min database.
4. **Kjør utviklingsserveren**: `npm run dev` eller `pnpm run dev`
Appen kjører nå på `http://localhost:3000`

## Lisens

MIT © 2025 Stine Bjordal
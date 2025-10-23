# TODO-app
**Stine Bjordal**

En To-do applikasjon bygget med [Next.js](https://nextjs.org/), [TypeScript](https://www.typescriptlang.org/) og [PostgreSQL](https://www.postgresql.org/).  
Appen lar brukere lage lister, legge til oppgaver, merke dem som ferdig, og slette dem.

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
- [PostgreSQL](https://www.postgresql.org/)
- [Zod](https://zod.dev/) (skjema- og inputvalidering)
- [Tailwind CSS](https://tailwindcss.com/) + egendefinerte klasser
- UUID for ID-generering

## Komponenter
TODO: fyll ut når ferdig

## Kjøre prosjektet
1. **Klon repoet:**
`git clone https://github.com/sbjordal/TODO-app`
2. **Installer avhengigheter:**
`npm install`
3. **Konfigurer miljøvariabler:**  
Lag en `.env`-fil i rotmappen og legg inn:
`DATABASE_URL="postgresql://bruker:passord@host:5432/databasenavn"`
4. **Kjør utviklingsserveren**: `npm run dev`
Appen kjører nå på `http://localhost:3000`

## Lisens

MIT © 2025 Stine Bjordal
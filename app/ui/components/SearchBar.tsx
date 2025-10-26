'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import TaskList from './TaskList';
import { Task } from '@/app/lib/definitions';

type Props = {
  placeholder?: string;
  tasks?: (Task & { listName?: string })[];
};

/**
 * @component SearchBar
 *
 * En søkekomponent som lar brukeren filtrere oppgaver på tvers av lister.
 * 
 * Funksjonalitet:
 * - Søker etter oppgaver basert på tittel.
 * - Oppdaterer URL med søkeparameter (`?q=...`) slik at søk kan deles eller beholdes ved navigasjon.
 * - Viser resultatliste i sanntid med `TaskList`.
 * - Viser melding dersom ingen oppgaver matcher søket.
 *
 * Props:
 * - `placeholder` (string, optional): Tekst som vises i søkefeltet. Default: `"Søk..."`.
 * - `tasks` (Task[], optional): Liste over oppgaver som skal kunne søkes i.
 *
 * Bruk:
 * Brukes på dashbordet for å søke i oppgaver på tvers av alle lister.
 */

export default function SearchBar({ placeholder = 'Søk...', tasks }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initial = searchParams.get('q') ?? '';
  const [term, setTerm] = useState(initial);

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('q', term);
    } else {
      params.delete('q');
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch();
  };

  // Filtrer kun hvis vi har fått inn tasks
  const filteredTasks = term && tasks
    ? tasks.filter((t) =>
        t.title.toLowerCase().includes(term.toLowerCase())
      )
    : [];

  return (
    <div className="w-full flex flex-col items-center">
      <div className="search-container">
        <MagnifyingGlassIcon className="icon" />
        <input
          type="text"
          placeholder={placeholder}
          className="input search-input"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="my-button" onClick={handleSearch}>
          Søk
        </button>
      </div>

      {/* Viser søkeresultater */}
      {term && tasks && (
        <>
          {filteredTasks.length === 0 ? (
            <p className="mt-4 text-gray-600">Ingen oppgaver funnet.</p>
          ) : (
            <TaskList tasks={filteredTasks} />
          )}
        </>
      )}
    </div>
  );
}

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
 * En søkekomponent som lar brukeren filtrere oppgaver på tvers av lister.
 */

export default function SearchBar({ placeholder = 'Søk...', tasks }: Props) {
  const router = useRouter();
  const [term, setTerm] = useState('');

  // Filtrer kun hvis vi har fått inn tasks
  const filteredTasks = term && tasks
    ? tasks.filter((t) =>
        t.title.toLowerCase().includes(term.toLowerCase().trim())
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
        />
        <button className="my-button" onClick={() => setTerm('')}>
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

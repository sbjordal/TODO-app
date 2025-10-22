export type Task = {
    id: string;
    listId: string; //koblet til listen oppgaven tilhører
    title: string;
    completed: boolean;
    dueDate?: string | null;
    tags?: string[];
    createdAt: string;
    updatedAt?: string | null;
}

export type List = {
    id: string;
    userId: string;
    name: string;
    type: string; //legger til rette for flere listetyper (skole, jobb, handleliste, gaveliste, etc)
    createdAt: string;
    updatedAt?: string | null;
    tasks?: Task[];
}

export type User = { //ønsker å ha flere brukere etterhvert
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt: string;
    updatedAt?: string | null;
}


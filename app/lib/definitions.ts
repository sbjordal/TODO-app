/* Database-tabellene */

export type Task = {
    id: string;
    listId: string; //koblet til listen oppgaven tilhører
    title: string;
    completed: boolean;
    dueDate?: Date | null;
    tags?: any;
    createdAt: Date;
    updatedAt?: Date | null;
}

export type TodoList = {
  id: string;
  userId: string;
  name: string;
  createdAt: Date;
  updatedAt?: Date | null;
  tasks: Task[];
};


export type User = { //ønsker å ha flere brukere etterhvert
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt?: Date | null;
}


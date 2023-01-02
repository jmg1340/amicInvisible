export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}


export interface Participant {
	nom: string;
	email: string;
	grup: string;
}

export interface Participants extends Array<Participant>{}
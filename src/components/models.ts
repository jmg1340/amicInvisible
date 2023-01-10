
export interface	Configuracio {
	servidor: string,
	port: string,
	usuari: string,
	pwd: string
}


export interface Grup {
  id: number;
	nom: string;
}

export interface Grups extends Array<Grup>{}


export interface Participant {
	id: number;
	idGrup: number;
	nom: string;
	email: string;
	excepcions: number[]
}

export interface Participants extends Array<Participant>{}
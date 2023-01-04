import { Grups, Participants } from "../../components/models"

export interface ExampleStateInterface {
  prop: boolean;
	participants: Participants;
	grups: Grups;
}

function state(): ExampleStateInterface {
	return {
		prop: false,

		grups: [
			{ id: 1, nom: "FAMILIA JORDI"},
			{ id: 2, nom: "FAMILIA ANA"}
		],

		participants: [
			{
				id: 10,
				nom: "jordi2",
				email: "jordi.miserachs@gmail.com",
				idGrup: 1
			},
			{
				id: 11,
				nom: "Mariona2",
				email: "exempleMariona@gmail.com",
				idGrup: 1
			},
			{
				id: 12,
				nom: "Rosa M.2",
				email: "exempleRosaM@gmail.com",
				idGrup: 1
			},
			{
				id: 13,
				nom: "Ricard2",
				email: "exempleRicard@gmail.com",
				idGrup: 2
			},
		],


  }
};

export default state;

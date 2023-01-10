import { Configuracio, Grups, Participants } from "../../components/models"

export interface ExampleStateInterface {
  // prop: boolean;
	configuracio: Configuracio;
	participants: Participants;
	grups: Grups;
}

function state(): ExampleStateInterface {
	return {
		// prop: false,

		configuracio: {
			servidor: "",
			port: "",
			usuari: "",
			pwd: ""
		},
		
		grups: [
			{ id: 1, nom: "FAMILIA JORDI"},
			{ id: 2, nom: "FAMILIA ANA"}
		],

		participants: [
			{
				id: 10,
				nom: "jordi2",
				email: "jordi.miserachs@gmail.com",
				idGrup: 1,
				excepcions: []
			},
			{
				id: 11,
				nom: "Mariona2",
				email: "exempleMariona@gmail.com",
				idGrup: 1,
				excepcions: []
			},
			{
				id: 12,
				nom: "Rosa M.2",
				email: "exempleRosaM@gmail.com",
				idGrup: 1,
				excepcions: []
			},
			{
				id: 13,
				nom: "Ricard2",
				email: "exempleRicard@gmail.com",
				idGrup: 2,
				excepcions: []
			},
		],


  }
};

export default state;

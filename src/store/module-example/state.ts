import { Participant, Participants } from "../../components/models"

export interface ExampleStateInterface {
  prop: boolean;
	participants: Participants;
}

function state(): ExampleStateInterface {
  return {
    prop: false,
		participants: [
			{
				nom: "jordi2",
				email: "jordi.miserachs@gmail.com",
				grup: "familia Jordi"
			},
			{
				nom: "Mariona2",
				email: "exempleMariona@gmail.com",
				grup: "familia Jordi"
			},
			{
				nom: "Rosa M.2",
				email: "exempleRosaM@gmail.com",
				grup: "familia Jordi"
			},
			{
				nom: "Ricard2",
				email: "exempleRicard@gmail.com",
				grup: "familia Ana"
			},
		]

  }
};

export default state;

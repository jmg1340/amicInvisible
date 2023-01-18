import { MutationTree } from 'vuex';
import { ExampleStateInterface } from './state';

const mutation: MutationTree<ExampleStateInterface> = {

	carregarDadesDeLocalStorage (state: ExampleStateInterface, payload) {
		state.grups = payload.grups;
		state.participants = payload.participants;
		state.configuracio = payload.configuracio;
	},




	/* ****** GRUPS ******/

	eliminarParticipantsGrup (state: ExampleStateInterface, payload) {
		// ... busquem les dades (objecte) segons el id
		state.participants = state.participants.filter( p => p.idGrup !== parseInt(payload.idGrup))
	},

	eliminarGrup (state: ExampleStateInterface, payload) {
		// ... busquem les dades (objecte) segons el id
		state.grups = state.grups.filter( g => g.id !== parseInt(payload.idGrup))
	},


	guardarGrup (state: ExampleStateInterface, payload) {
		// ... busquem les dades (objecte) segons el id
		const obj = state.grups.find( (g) => g.id === parseInt(payload.idGrup))

		
		if ( obj !== undefined ) {
			// ... modifiquem les dades
			obj.id = payload.idGrup;
			obj.nom = payload.nom;
		} else {
			// ... afegim nou participant
			console.log("Grup NO TROBAT. Es tracta d'un nou Grup")
			state.grups.push({
				id : payload.idGrup,
				nom : payload.nom,
				ultimSorteig: []
			})
		}
	},






	/* ****** PARTICIPANTS ******/

  guardarParticipant (state: ExampleStateInterface, payload) {
		console.log("payload a MUTATION", payload)
		
		if ( payload.mode === "editar" ) {
			
			// ... busquem les dades (objecte) segons el id
			const obj: any = state.participants.find( (p) => p.id === parseInt(payload.id))

			// ... modifiquem les dades
			obj.id = payload.id;
			obj.idGrup = payload.idGrup;
			obj.nom = payload.nom;
			obj.email = payload.email;
			obj.excepcions = payload.excepcions;

		} else if ( payload.mode = "afegir") {
			// ... afegim nou participant
			console.log("Participant NO TROBAT. Es tracta d'un nou participant")
			state.participants.push({
				id : payload.id,
				idGrup : payload.idGrup,
				nom : payload.nom,
				email : payload.email,
				excepcions: payload.excepcions
			})
		}

  },

	eliminarParticipant (state: ExampleStateInterface, payload) {
		// ... busquem les dades (objecte) segons el id
		state.participants = state.participants.filter( p => p.id !== parseInt(payload.idParticipant))
	},





	/* ****** CONFIGURACIO ******/
	guardarConfiguracio (state: ExampleStateInterface, payload) {
		state.configuracio.servidor = payload.servidor
		state.configuracio.port = payload.port
		state.configuracio.usuari = payload.usuari
		state.configuracio.pwd = payload.pwd
	},
	
	
	
	
		/* ****** SORTEIG ******/
	guardarSorteig (state: ExampleStateInterface, payload) {
		// ... busquem les dades (objecte) segons el id
		const objGrup = state.grups.find( (g) => g.id === parseInt(payload.idGrup))
		if (objGrup !== undefined)
			objGrup.ultimSorteig = payload.ultimSorteig

	}




	




};

export default mutation;

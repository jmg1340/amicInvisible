import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { ExampleStateInterface } from './state';

const actions: ActionTree<ExampleStateInterface, StateInterface> = {
  guardarDadesParticipant (context, payload) {

		let idAEnviar: number | null = null

		if (payload.mode === "editar") {
			idAEnviar = parseInt(payload.id)
		} else if ( payload.mode === "afegir") {
			// trobar el id del participant que tingui el numero més alt i sumar-li 1
			idAEnviar = Math.max( ...context.state.participants.map( p => p.id ) ) + 1
		}


		context.commit(
			"example/guardarParticipant", 
			{
				id: idAEnviar,
				idGrup: parseInt(payload.idGrup),
				nom: payload.nom,
				email: payload.email
		}, 
		{ 
			root: true 
		})
  }
};

export default actions;

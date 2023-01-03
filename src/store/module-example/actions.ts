import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { ExampleStateInterface } from './state';

const actions: ActionTree<ExampleStateInterface, StateInterface> = {
  guardarDadesParticipant (context, payload) {
    console.log("payload", payload)

		if (payload.mode === "editar") {
			
		}
  }
};

export default actions;

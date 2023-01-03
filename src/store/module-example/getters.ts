import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { ExampleStateInterface } from './state';

const getters: GetterTree<ExampleStateInterface, StateInterface> = {
  getParticipantsGrup (context) {
    console.log("--- GET PARTICIPANTS GRUP ----")
		return (nomGrup: string) => {
			console.log("getParticipantsGrup - nomGrup: " + nomGrup);
			return "retorn del getter getParticipantsGrup"
		}
  }
};

export default getters;

import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { ExampleStateInterface } from './state';


const getters: GetterTree<ExampleStateInterface, StateInterface> = {
  getParticipantsGrup : ( context ) => {
    console.log("--- GET PARTICIPANTS GRUP ----")
		
  }
};

export default getters;

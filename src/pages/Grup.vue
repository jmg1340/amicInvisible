<template>
	<div class="row  justify-center q-ma-xs">
		<q-card class="col">
			<q-card-section>

				<div class="row justify-end">
					
					<q-btn dense label="Afegir" class="q-mb-xs bg-primary text-white" noCaps @click="afegirParticipant"/>
				</div>
				
				<div class="row text-white bg-grey-8">

							<div class="col q-pa-xs">Nom</div>
							<div class="col q-pa-xs">Email</div>
							<div class="col q-pa-xs"></div>

				</div>

				<div class="row items-center pintaRecuadre" v-for="(participant, index) in participantsGrup" :key="index" >
					<participant-dades :participant="participant"/>
				</div>


			</q-card-section>
		</q-card>
	</div>

</template>

<script lang="ts">
import { Participant, Participants } from '../components/models';
import ParticipantDades from "../components/ParticipantDades.vue"
import ParticipantEditarAfegir from "./ParticipantEditarAfegir.vue"
import { defineComponent, computed } from "vue";

import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router';

import { useStore } from 'vuex'
import { storeKey } from '../store/index'



export default defineComponent ({

	name: "Grup",
	components: { ParticipantDades },

	props: {
		// participants: {
    //   type: Array as PropType<Participants[]>,
    //   default: () => []			
		// },
		idGrup: {
			type: String,
			required: true
		}
	},

	setup(props) {
		const $q = useQuasar()
		const router = useRouter();

		const store = useStore(storeKey)		

		const grupId: number = parseInt(props.idGrup)
		
		const nomGrup = (store.state.example.grups.find( (g: any) => g.id === grupId ))?.nom

		// const participants = store.state.example.participants
		const participantsGrup = computed(() => store.state.example.participants.filter( (p) => p.idGrup === grupId))
		

		const afegirParticipant = () => { 
			router.push({ name: "afegirEditarParticipant", query: { 
				idGrup: grupId,
				mode: "afegir" 
				} });
		}



		return { nomGrup, participantsGrup, afegirParticipant }
	}


})
</script>





<style scoped lang="css">
	.pintaRecuadre {
		border-left: 1px solid grey;
		border-bottom: 1px solid grey;
		border-right: 1px solid grey;
	}
</style>
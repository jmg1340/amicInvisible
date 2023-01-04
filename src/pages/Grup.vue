<template>
	<div class="row items-center justify-center q-pa-lg">
		<div class="col-6">

			<div class="row justify-between">
				<div class="text-h5">Grup: <span class="text-grey-8">{{ nomGrup }} </span></div>
				<q-btn dense label="Afegir" class="q-mb-md bg-primary text-white" noCaps @click="afegirParticipant"/>
			</div>
			
			<q-markup-table separator="cell" dense>
				<thead class="text-white bg-grey-8">
					<tr>
						<th>Nom</th>
						<th>Email</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(participant, index) in participantsGrup" :key="index" @click="editarParticipant(participant.id, participant.nom, participant.email)">
						<participant-dades :participant="participant" />
					</tr>
				</tbody>
			</q-markup-table>
		</div>
	</div>

</template>

<script lang="ts">
import { Participant, Participants } from '../components/models';
import ParticipantDades from "../components/ParticipantDades.vue"
import ParticipantEditarAfegir from "./ParticipantEditarAfegir.vue"
import { defineComponent, computed, PropType } from "vue";

import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router';

import { useStore } from 'vuex'
import { storeKey } from '../store/index'

export default defineComponent ({

	name: "Grup",
	components: { ParticipantDades, ParticipantEditarAfegir },

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

		const grupId = parseInt(props.idGrup)
		const nomGrup = (store.state.example.grups.find( (g: any) => g.id === grupId ))?.nom

		const participants = store.state.example.participants
		const participantsGrup = computed(() => participants.filter( (p) => p.idGrup === grupId)).value
		

		const afegirParticipant = () => { 
			router.push({ name: "afegirEditarParticipant", query: { 
				idGrup: grupId, 
				mode: "afegir" 
				} });
		}

		const editarParticipant = (id: number, nom: string, email: string) => { 
			router.push({ name: "afegirEditarParticipant", query: { 
				id: id,
				idGrup: grupId,
				nom: nom, 
				email: email,
				mode: "editar" } });
		}









		return { nomGrup, participantsGrup, afegirParticipant, editarParticipant }
	}


})
</script>





<style scoped>

</style>
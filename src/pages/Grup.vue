<template>
	<div class="row items-center justify-center q-pa-lg">
		<div class="col-6">

			<div class="row justify-between">
				<div class="text-h5">GRUP: <span class="text-grey-8">{{ nomGrup }} </span></div>
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
					<tr v-for="(participant, index) in participantsGrup" :key="index" @click="editarParticipant(participant.nom, participant.email)">
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
		nomGrup: {
			type: String,
			required: true
		}
	},

	setup(props) {
		const $q = useQuasar()
		const router = useRouter();

		const store = useStore(storeKey)		

		// ------------------
		const xx = computed( () => store.getters.example.getParticipantsGrup( props.nomGrup ) )
		console.log("xx", xx)
		// ------------------
		

		const participants = store.state.example.participants
		const participantsGrup = computed(() => participants.filter( (p) => p.grup === props.nomGrup)).value
		

		const afegirParticipant = () => { 
			router.push({ name: "afegirEditarParticipant", query: { 
				nomGrup: props.nomGrup, 
				mode: "afegir" 
				} });
		}

		const editarParticipant = (nom: string, email: string) => { 
			router.push({ name: "afegirEditarParticipant", query: { 
				nomGrup: props.nomGrup,
				nom: nom, 
				email: email,
				mode: "editar" } });
		}









		return { participantsGrup, afegirParticipant, editarParticipant }
	}


})
</script>





<style scoped>

</style>
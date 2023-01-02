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
							<!-- <th>Grup</th> -->
						</tr>
					</thead>
					<tbody>
						<tr v-for="(participant, index) in participantsGrup" :key="index">
							<participant-dades :participant="participant" />
						</tr>
					</tbody>
				</q-markup-table>

		</div>



		<q-dialog v-model="snAfegirEditar">
			<div class="q-ma-lg">

				<q-card>
					<q-card-section>
						<q-form
						>
							<q-input
								filled
								type="string"
								v-model="name"
								label="Nom"
								lazy-rules
								:rules="[ val => val && val.length > 0 || 'No pot estar buit']"
							/>

							<q-input
								filled
								type="string"
								v-model="age"
								label="Email"
								lazy-rules
								:rules="[
									val => val.includes('@') || 'Format incorrecte',
									val => val.includes('.') || 'Format incorrecte',
								]"
							/>

							<div>
								<q-btn label="Guardar" type="submit" color="primary"/>
								<q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
							</div>
						</q-form>
					</q-card-section>
				</q-card>








				<!-- <ParticipantEditarAfegir :objAfegirEditar="objAfegirEditar" /> -->
			</div>
		</q-dialog>
	</div>






</template>

<script lang="ts">
import { Participant, Participants } from '../components/models';
import ParticipantDades from "../components/ParticipantDades.vue"
import ParticipantEditarAfegir from "../components/ParticipantEditarAfegir.vue"
import { defineComponent, computed, PropType } from "vue";
import { useQuasar } from 'quasar'

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

		const participants: Participants = [
			{
				nom: "jordi",
				email: "jordi.miserachs@gmail.com",
				grup: "familia Jordi"
			},
			{
				nom: "Mariona",
				email: "exempleMariona@gmail.com",
				grup: "familia Jordi"
			},
			{
				nom: "Rosa M.",
				email: "exempleRosaM@gmail.com",
				grup: "familia Jordi"
			},
			{
				nom: "Ricard",
				email: "exempleRicard@gmail.com",
				grup: "familia Ana"
			},
		]
		

		const participantsGrup = computed(() => participants.filter( (p) => p.grup === props.nomGrup)).value
		

		let snAfegirEditar = false

		let objAfegirEditar = {
			activar: false,
			mode: ""
		}
		const afegirParticipant = () => { 
			objAfegirEditar.activar = true;
			objAfegirEditar.mode = "afegir"

			snAfegirEditar = true

			// console.log("objAfegirEditar", objAfegirEditar)
			console.log("snAfegirEditar", snAfegirEditar)
		}









		return { participantsGrup, objAfegirEditar, snAfegirEditar, afegirParticipant }
	}


})
</script>





<style scoped>

</style>
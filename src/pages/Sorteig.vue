<template>
	<div class="q-ma-md">

		<div class="text-center">
			<q-btn color="negative" label="Sorteig" noCaps @click="sorteig()"/>
		</div>


		<div class="row">
			<div class="col">
				Participant
			</div>
			<div class="col">
				Amic invisble
			</div>
		</div>

		<div class="row"
					v-for= "(obj, index) in participantsSortejats" :key="index"
		>
			<div class="col">
				{{obj.objParticipant.nom}}
			</div>
			<div class="col">
				{{obj.objAmicInvisible.nom}}
			</div>
		</div>


	</div>

</template>

<script lang="ts">

import { defineComponent, Ref, ref, computed } from "vue";

import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router';

import { useStore } from 'vuex'
import { storeKey } from '../store/index'



export default defineComponent ({

	components: {  },

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
		const participantsGrup = computed(() => store.state.example.participants.filter( (p) => p.idGrup === grupId)).value

		const participantsSortejats : Ref<any> = ref([])



		const sorteig = () => {
			console.log("---------------")


			// 1. Obtenim 2 arrays: un de Ids de tots els participants i un altre igual que servira per anar descomptant els Ids que ja han estat sortejats

			const arrIDs = participantsGrup.map(p => p.id)
			let arrIDsPendentsAssignar = participantsGrup.slice(0).map(p => p.id)
			// console.log("arrIDsPendentsAssignar", arrIDsPendentsAssignar)


			// 2. Creem un array en blanc on aniran els ids assignats segons sorteig
			let pAssignats: number[] = []


			let tornarAFerSorteig: boolean
			do{

				tornarAFerSorteig = false
				
				// 3. Fem bucle per tots els ids participants i fem l'assignació segons sorteig
				arrIDs.forEach ( (id, index) => {
	
					// per cada id sortejem l'amic invisible. Aquest sorteig serà dels Ids pendents d'assignar (tb no es tindrà en compte el id del participant actual si encara esta en els pendents d'assignar)
	
					// array de Ids pendents sense id del participant actual.
					const idsPendNoActual = arrIDsPendentsAssignar.filter( id2 => id2 !== id)
	
					// Procedim al sorteig.
					const iDAmicInvisible: number = idsPendNoActual[generarPosicioRandom(idsPendNoActual.length)]
	
					// el id Amic obtingut, el posem al array resultatFinal
					pAssignats.push(iDAmicInvisible)
	
					// i treiem id amic sortejat del array de ids pendents d'assignar
					arrIDsPendentsAssignar = arrIDsPendentsAssignar.filter ( id => id !== iDAmicInvisible)
	
				})
	
				// pot ser que l'ultim id participant tingui com id Amic el valor "undefined". Si és així es pq el id pendent que queda per sortejar es justament el id del participant. En aquest cas s'ha de tornar a fer el sorteig.
	
				// Tambe hem de veure que dels IDs amics sortejats, a cap participant i hagi tocat una excepció. En aquest cas s'ha de repetir el sorteig.

				const snHiHaExcepcions : boolean = ! participantsGrup.every ( (p, idx) => {
						console.log("isArray(p.excepcions)", Array.isArray(p.excepcions))
						let sn: boolean = ! p.excepcions.includes( pAssignats[idx] )
						console.log("p.id:", p.id, "idAI", pAssignats[idx], "p.excepcions:", p.excepcions, "p.excepcions[0]", p.excepcions[0], "includes?", sn)
						return sn
						})


				if ( pAssignats[arrIDs.length - 1] === undefined || snHiHaExcepcions	){
					arrIDsPendentsAssignar = participantsGrup.slice(0).map(p => p.id)
					pAssignats = []
					tornarAFerSorteig = true
				}
				

			} while ( tornarAFerSorteig )



			// en aquest punt tenim 2 arrays: una amb els ids dels participants i un altre amb els ids dels amics invisibles assignats
			participantsSortejats.value = []
			
			for (const [index, name] of arrIDs.entries()) {
				console.log( arrIDs[index], pAssignats[index])
				let oParticipant = participantsGrup[index]
				let oAmicInvisible = participantsGrup.find ( ai => ai.id === pAssignats[index] )
				participantsSortejats.value.push({
					objParticipant : oParticipant,
					objAmicInvisible : oAmicInvisible
				})
			}







			function generarPosicioRandom (lenArrPend: number) {
					const min = 0, max = lenArrPend

					// find diff
					let difference = max - min;

					// generate random number 
					let rand = Math.random();

					// multiply with difference 
					rand = Math.floor( rand * difference);

					// add with min value 
					rand = rand + min;

					return rand;
			}


		

			return { participantsSortejats }


		}







		return { sorteig, participantsSortejats }
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
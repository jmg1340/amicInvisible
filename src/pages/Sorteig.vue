<template>
	<div class="q-ma-md">

		<div class="text-center">
			<q-btn color="negative" label="Sorteig" noCaps @click="sorteig()"/>
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

		



		const sorteig = () => {
			let arrIDsPendentsAssignar = participantsGrup.slice(0).map(p => p.id)
			console.log("arrIDsPendentsAssignar", arrIDsPendentsAssignar)

			let pAssignats: number[] = []
			let resultatFinal: object [] = []




				const assignarId  = (i: number, lenArrPend: number) => {
					// usuari de la posicio i
					const idUsuari =arrIDsPendentsAssignar[i]
	
					// array dels participants a no tenir en compte (el idUsuari, excepcions del idUsuari i participants ja assignats)
					const arrNoEnCompte = [
						idUsuari,
						...participantsGrup[i].excepcions,
						...pAssignats
					]
	
					console.log("arrNoEnCompte", arrNoEnCompte)
	
	
					let idIndex: number = -1
					
					let idTrobat: boolean = false
					while (! idTrobat){
						const indexSortejat = generarPosicioRandom()
	
						// mirar si el id corresponent a index de arrIDsPendentsAssignar no esta a arrNoEnCompte
						idIndex = arrIDsPendentsAssignar[indexSortejat]
	
						if (! arrIDsPendentsAssignar.includes(idIndex)) idTrobat = true
						console.log("idTrobat", idTrobat)
	
					}
	
	
	
	
					function generarPosicioRandom () {
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
	
	
	
					return idIndex
				}



			participantsGrup.forEach ((p, i) => {
				const idAssignat = assignarId(i, arrIDsPendentsAssignar.length)
				pAssignats.push(idAssignat)

				resultatFinal.push({ id: arrIDsPendentsAssignar.shift(), idAssignat})
			})

			console.log("resultatFinal", resultatFinal)







		}







		return { sorteig }
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
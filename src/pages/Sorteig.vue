<template>
	<div class="q-ma-sm">

		<div class="row items-center q-mb-md">
			<div class="col text-center">
				<q-btn color="negative" label="Sorteig" noCaps @click="confirmaSorteig()"/>
			</div>
			<!-- <div class="col text-right"> -->
				<!-- <q-btn icon="mail" type="push" dense rounded size="xl" @click="enviarATots()"/> -->
			<!-- </div> -->
		</div>


		<div class="row text-bold text-h6 q-mb-sm">
			<div class="col text-center">
				Participant
			</div>
			<div class="col">
				<div class="row justify-center items-center">
					<div class="col-auto">Amic invisible</div>
					<q-toggle
						class="col-auto"
						v-model="participantsVisibles"
						checked-icon="visibility"
						color="green"
						unchecked-icon="visibility_off"
						toggle-order="ft"
					/>
					<div class="col-auto">&nbsp;</div>		
				</div>

			</div>
		</div>

		<div class="row items-center text-center q-pa-sm pintaRecuadre"
		v-for= "(obj, index) in participantsSortejats" :key="index"
		>
			<div class="col">
				{{obj.objParticipant.nom}}
			</div>
			<div class="col" v-if="obj.visibilitat">
				{{obj.objAmicInvisible.nom}}
			</div>
			<div  class="col" v-if="!obj.visibilitat">
				--------
			</div>
			<div class="col-auto">
					<q-toggle
						class="col-auto"
						v-model="obj.visibilitat"
						checked-icon="visibility"
						color="green"
						unchecked-icon="visibility_off"
						dense
					/>			
				<q-btn class="col q-ml-sm" icon="mail" dense flat rounded @click="enviarAmic(obj)"/>
			</div>
		</div>


	</div>

</template>

<script lang="ts">

import { defineComponent, Ref, ref, computed, onMounted, watch } from "vue";

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
		const nomGrup = computed((): any => store.state.example.grups.find( (g) => g.id === grupId)).value.nom
		console.log("nomGrup:", nomGrup)

		const participantsGrup =  computed(() => store.state.example.participants.filter( (p) => p.idGrup === grupId)).value

		const participantsSortejats : Ref<any> = ref([])
		const participantsVisibles : Ref<boolean | null> = ref(false)
		
		onMounted( () => {
			console.log("ON MOUNTED")
			participantsSortejats.value = JSON.parse( JSON.stringify(store.state.example.grups.find( (g) => g.id === grupId )?.ultimSorteig ))
			console.log( "participantsSortejats.value", participantsSortejats.value)

			participantsSortejats.value.forEach ( (o: any) => o.visibilitat = participantsVisibles.value)

			watch ( participantsSortejats.value, (currentValue, oldValue)=> {
				const totsVisibles = currentValue.every ( (obj: any) => obj.visibilitat === true )
				const totsInvisibles = currentValue.every ( (obj: any) => obj.visibilitat === false )

				console.log("totsInvisibles", totsInvisibles, "totsVisibles", totsVisibles)

				if ( totsVisibles ) {
					participantsVisibles.value = true
				} else if ( totsInvisibles ) {
					participantsVisibles.value = false
				} else {
					participantsVisibles.value = null
				}

			},{ deep: true })

		})



		watch ( participantsVisibles , (currentValue, oldValue)=> {
			if ( participantsVisibles.value === true ) {
				participantsSortejats.value.forEach ( (o: any) => o.visibilitat = true)
			}
			if ( participantsVisibles.value === false ) {
				participantsSortejats.value.forEach ( (o: any) => o.visibilitat = false)
			}
		})


		const enviarAmic = ( o: any ) => {
			console.log("enviar a tots")
			// console.log(store.state.example.configuracio.usuari)
			// console.log(store.state.example.configuracio.pwd)

			const to = o.objParticipant.email
			const subject = "AMIC INVISIBLE (" + nomGrup + ")"
			const body = `
				El teu amic invisible esta més abaix
				%0D%0A %0D%0A %0D%0A %0D%0A %0D%0A %0D%0A%0D%0A %0D%0A %0D%0A %0D%0A %0D%0A %0D%0A 
				%0D%0A %0D%0A %0D%0A %0D%0A %0D%0A %0D%0A%0D%0A %0D%0A %0D%0A %0D%0A %0D%0A %0D%0A 
				%0D%0A %0D%0A %0D%0A %0D%0A %0D%0A %0D%0A%0D%0A %0D%0A %0D%0A %0D%0A %0D%0A %0D%0A 
				Amic invisible: ${o.objAmicInvisible.nom.toUpperCase()}
				%0D%0A %0D%0A
			`

			// const bodyEncoded = window.btoa(unescape(encodeURIComponent(body)));
			// const bodyDecoded = decodeURIComponent(escape(window.atob(bodyEncoded)));

			// console.log("bodyEncoded", bodyEncoded)
			// console.log("bodyDecoded", bodyDecoded)
			

			window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;

		}



		const confirmaSorteig = () => {
      $q.dialog({
        title: 'Confirmar',
        message: `ATENCIÓ. Un nou sorteig, matxacarà les dades guardades de l'últim sorteig. Endavant?`,
        ok: {
          push: true,
					color: "positive",
					label: "Sí"
        },
        cancel: {
          push: true,
          color: 'negative',
					label: "No"
        },
        persistent: true
      }).onOk(() => {
        // Hem d'eliminar el grup i els participants del grup
				sorteig()

      }).onOk(() => {
        // console.log('>>>> second OK catcher')
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })

		}





		const sorteig = () => {
			console.log("---------------")


			// 1. Obtenim 2 arrays: un de Ids de tots els participants i un altre igual que servira per anar descomptant els Ids que ja han estat sortejats

			const arrIDs = participantsGrup.map((p: any) => p.id)
			let arrIDsPendentsAssignar = participantsGrup.slice(0).map((p: any) => p.id)
			// console.log("arrIDsPendentsAssignar", arrIDsPendentsAssignar)


			// 2. Creem un array en blanc on aniran els ids assignats segons sorteig
			let pAssignats: number[] = []


			let tornarAFerSorteig: boolean
			do{

				tornarAFerSorteig = false
				
				// 3. Fem bucle per tots els ids participants i fem l'assignació segons sorteig
				arrIDs.forEach ( (id: any) => {
	
					// per cada id sortejem l'amic invisible. Aquest sorteig serà dels Ids pendents d'assignar (tb no es tindrà en compte el id del participant actual si encara esta en els pendents d'assignar)
	
					// array de Ids pendents sense id del participant actual.
					const idsPendNoActual = arrIDsPendentsAssignar.filter( (id2: any) => id2 !== id)
	
					// Procedim al sorteig.
					const iDAmicInvisible: number = idsPendNoActual[generarPosicioRandom(idsPendNoActual.length)]
	
					// el id Amic obtingut, el posem al array resultatFinal
					pAssignats.push(iDAmicInvisible)
	
					// i treiem id amic sortejat del array de ids pendents d'assignar
					arrIDsPendentsAssignar = arrIDsPendentsAssignar.filter ( (id: any) => id !== iDAmicInvisible)
	
				})
	
				// ====== REPETIR EL SORTEIG EN ELS SEGÜENTS CASOS ========

				// pot ser que l'ultim id participant tingui com id Amic el valor "undefined". Si és així es pq el id pendent que queda per sortejar es justament el id del participant. En aquest cas s'ha de tornar a fer el sorteig.
	
				// Tambe hem de veure que dels IDs amics sortejats, a cap participant i hagi tocat una excepció. En aquest cas s'ha de repetir el sorteig.

				const snHiHaExcepcions : boolean = ! participantsGrup.every ( (p: any, idx: any) => {
						console.log("isArray(p.excepcions)", Array.isArray(p.excepcions))
						let sn: boolean = ! p.excepcions.includes( pAssignats[idx] )
						// console.log("p.id:", p.id, "idAI", pAssignats[idx], "p.excepcions:", p.excepcions, "p.excepcions[0]", p.excepcions[0], "includes?", sn)
						return sn
						})

				
				// obtencio de array de ids ultim sorteig
				const arrIdsUltSort = participantsSortejats.value.map ( (obj: any) => obj.objAmicInvisible.id)
				

				// Si algun participant li ha tocat el mateix amic invisible de l'ultim sorteig, es repeteix el sorteig
				// console.log("arrIdsUltSort" ,arrIdsUltSort, "pAssignats", pAssignats)
				const snAmicInvRepe = () => {
					for ( let index = 0; index < arrIDs.length; index++ ) {
						// console.log(arrIdsUltSort[index], pAssignats[index])
						if (arrIdsUltSort[index] == pAssignats[index]) return true
					}
					return false
				}
				// console.log( "snAmicInvRepe", snAmicInvRepe())




				if ( pAssignats[arrIDs.length - 1] === undefined || snHiHaExcepcions  || snAmicInvRepe() ){
					arrIDsPendentsAssignar = participantsGrup.slice(0).map( (p: any) => p.id)
					pAssignats = []
					tornarAFerSorteig = true
				}
				

			} while ( tornarAFerSorteig )



			// en aquest punt tenim 2 arrays: una amb els ids dels participants i un altre amb els ids dels amics invisibles assignats
			participantsSortejats.value = []
			
			for (const [index, name] of arrIDs.entries()) {
				// console.log( arrIDs[index], pAssignats[index])
				participantsSortejats.value.push({
					objParticipant : participantsGrup[index],
					objAmicInvisible : participantsGrup.find ( (ai: any) => ai.id === pAssignats[index] ),
					visibilitat: participantsVisibles.value
				})
			}


			// guardem aquest sorteig com a ultim sorteig d'aquest grup
			store.commit("example/guardarSorteig", {
				idGrup: grupId,
				ultimSorteig: participantsSortejats.value
			})

			participantsSortejats.value = JSON.parse( JSON.stringify( participantsSortejats.value ))

			// participantsVisibles.value = false


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

	









		return { confirmaSorteig, participantsSortejats, participantsVisibles, enviarAmic, nomGrup }
	}


})
</script>





<style scoped lang="css">
	.pintaRecuadre {
		border-left: 1px solid grey;
		border-bottom: 1px solid grey;
		border-right: 1px solid grey;
		border-top: 1px solid grey;
	}
</style>
<template>
	
	<q-card class="q-ma-lg">
		<q-card-section>
			{{ nomGrup }}
		</q-card-section>
		<q-card-section>
			<q-form
				@submit="onSubmit"
				
				class="q-gutter-md"
			>
				<q-input
					filled
					type="string"
					v-model="nom"
					label="Nom"
					lazy-rules
					:rules="[ val => val && val.length > 0 || 'No pot estar buit']"
				/>

				<q-input
					filled
					type="string"
					v-model="email"
					label="Email"
					lazy-rules
					:rules="[
						val => val.includes('@') || 'Format incorrecte',
						val => val.includes('.') || 'Format incorrecte',
					]"
				/>




				<div>
					EXCECPIONS
				</div>
				<excepcions :idGrup="idGrup" :idPart="id" @onChangeArrExcepcions="alCanviarArrExcepcions"/>


				<div class="row justify-between">
					<q-btn class="col-auto" label="Guardar" type="submit" color="positive"/>
					<q-btn class="col-auto" label="Cancelar" color="negative"  @click="onCancelar()"/>
				</div>
			</q-form>
		</q-card-section>
	</q-card>



	
</template>

<script lang="ts">
import { Ref, ref, defineComponent, onMounted  } from 'vue'
import { useRoute, useRouter } from 'vue-router';

import { useStore } from 'vuex'
import { storeKey } from '../store/index'

import excepcions from '../components/Excepcions.vue'

export default defineComponent({
	components: { excepcions },

	setup() {

		const route = useRoute();
		const router = useRouter();

		const store = useStore(storeKey)

		const id2: string = (route.query.id)
		const id: number = parseInt(id2)
		const idGrup = route.query.idGrup
		const nom: Ref<any> = ref("")
		const email: Ref<any> = ref("")
	
		console.log("typeof(id)", typeof(id))
		console.log("typeof(idGrup)", typeof(idGrup))

		const nomGrup = (store.state.example.grups.find( (g: any) => g.id === idGrup ))?.nom
		let arrExcepcions = (store.state.example.participants.find( (p: any) => p.id === id ))?.excepcions
		console.log("GRUP arrExcepcions:", arrExcepcions)

		onMounted(() => {
			if ( route.query.mode === "editar" ){
				nom.value = route.query.nom
				email.value = route.query.email
			}
		})

		const onSubmit = () => {
			console.log("onSubmit apretat. arrExcepcions:", arrExcepcions)
			
			if (! arrExcepcions ) (store.state.example.participants.find( (p: any) => p.id === id ))?.excepcions

			store.dispatch( "example/guardarDadesParticipant", {
				mode: route.query.mode, 
				id: route.query.id,
				idGrup: idGrup,
				nom: nom.value, 
				email: email.value,
				excepcions: arrExcepcions
				} )

			router.push(`/grup/${idGrup}`)
		}

		const onCancelar = () => {
			// console.log("onReset apretat")
			router.push(`/grup/${idGrup}`)
		}

		// watch(
		// 	() => props.objAfegirEditar,
		// 	(first, second) => {
		// 		console.log("props.objAfegirEditar ha canviat", second)
		// 	}
		// )

		const alCanviarArrExcepcions = (nouArrE: any) => {
			arrExcepcions = nouArrE
			// console.log("nouArrE", arrExcepcions)
		}

		return { nomGrup, nom, id, idGrup, email, onSubmit, onCancelar, alCanviarArrExcepcions, arrExcepcions}
	}
})
</script>

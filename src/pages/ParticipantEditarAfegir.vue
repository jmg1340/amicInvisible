<template>

	<q-card class="q-ma-lg">
		<q-card-section class="text-center text-h6">
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


				<div class="row">
					<div class="col-8">
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

					</div>
					<div class="col">
						<div class="column items-center">
							<div class="col">Correu de prova</div>
							<div class="col-auto">
								<q-btn class="col q-ml-sm" icon="mail" dense flat rounded @click="enviarCorreuProva()"/>
							</div>
						</div>
					</div>
				</div>







				<div>
					No vull que em toqui mai:
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

		const mode = route.query.mode

		let id: any
		if ( mode === "afegir" ){
      const propostaId: any = Math.max( ...store.state.example.participants.map( p => p.id ))
			id = (( propostaId === -Infinity ? 0 : propostaId ) + 1).toString()
		} else {
			id = route.query.id
		}

		let arrExcepcions: number[] | undefined

		const idGrup = route.query.idGrup

		const nom: Ref<any> = ref("")
		const email: Ref<any> = ref("")

		// console.log("typeof(id)", typeof(id))
		// console.log("typeof(idGrup)", typeof(idGrup))

		const nomGrup = (store.state.example.grups.find( (g: any) => g.id == idGrup ))?.nom
		console.log("GRUP nomGrup:", nomGrup)


		onMounted(() => {
			if ( mode === "afegir" ){
				// id = (Math.max( ...store.state.example.participants.map( p => p.id ) ) + 1).toString()
				arrExcepcions = []
			} else {
				// id = route.query.id
				nom.value = (store.state.example.participants.find( (p: any) => p.id == id ))?.nom
				email.value = (store.state.example.participants.find( (p: any) => p.id == id ))?.email
				arrExcepcions = (store.state.example.participants.find( (p: any) => p.id == id ))?.excepcions
			}
			console.log("ON MOUNTED - id", id)
			console.log("ON MOUNTED - arrExcepcions:", arrExcepcions)
		})





		const onSubmit = () => {

			console.log("ON SUBMIT - arrExcepcions:", arrExcepcions)

			store.commit("example/guardarParticipant", {
				mode: route.query.mode,
				id: parseInt(id),
				idGrup: (typeof( idGrup ) === "string") ? parseInt(idGrup) : null,
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


		const alCanviarArrExcepcions = (nouArrE: any) => {
			arrExcepcions = nouArrE
			// console.log("nouArrE", arrExcepcions)
		}


		const enviarCorreuProva = () => {
			const to = email.value
			const subject = "AMIC INVISIBLE: verificacio comtpe de correu"
			const body = `
				Hola %0D%0A
				Pots contestar aquest correu confirmant que l'has rebut? %0D%0A
				%0D%0A
				Merci! %0D%0A
				%0D%0A
				%0D%0A
			`
			window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
		}


		return { nomGrup, nom, id, idGrup, email, arrExcepcions, onSubmit, onCancelar, alCanviarArrExcepcions, enviarCorreuProva}
	}
})
</script>

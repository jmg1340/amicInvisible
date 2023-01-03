<template>
	
	<q-card class="q-ma-lg">
		<q-card-section>
			<q-form
				@submit="onSubmit"
				@reset="onReset"
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

				<div class="row justify-between">
					<q-btn class="col-auto" label="Guardar" type="submit" color="primary"/>
					<q-btn class="col-auto" label="Reset" type="reset" color="primary" flat  />
				</div>
			</q-form>
		</q-card-section>
	</q-card>



	
</template>

<script lang="ts">
import { Ref, ref, defineComponent, onMounted  } from 'vue'
import { useRoute } from 'vue-router';

import { useStore } from 'vuex'
import { storeKey } from '../store/index'

export default defineComponent({
	// props: {
	// 	objAfegirEditar: {
	// 		type: Object
	// 	}
	// },

	setup() {

		const route = useRoute();
		const store = useStore(storeKey)

		const nom: Ref<any> = ref("")
		const email: Ref<any> = ref("")

		const grup = route.query.nomGrup

		onMounted(() => {
			if ( route.query.mode === "editar" ){
				nom.value = route.query.nom
				email.value = route.query.email
			}
		})

		const onSubmit = () => {
			console.log("onSubmit apretat")
			store.dispatch( "example/guardarDadesParticipant", {
				mode: route.query.mode, 
				grup: route.query.nomGrup,
				nom: nom.value, 
				email: email.value
				} )


		}

		const onReset = () => {
			console.log("onReset apretat")
		}

		// watch(
		// 	() => props.objAfegirEditar,
		// 	(first, second) => {
		// 		console.log("props.objAfegirEditar ha canviat", second)
		// 	}
		// )

		return { grup, nom, email, onSubmit, onReset}
	},
})
</script>

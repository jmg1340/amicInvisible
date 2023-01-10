<template>
	
	<q-card class="q-ma-lg">
		<q-card-section class="text-center">
			CONFIGURACIÓ
		</q-card-section>
		<q-card-section>
			<q-form
				@submit="onSubmit"
				
				class="q-gutter-md"
			>
				<q-input
					filled
					type="string"
					v-model="servidor"
					label="Servidor de correu"
					lazy-rules
					:rules="[ val => val && val.length > 0 || 'No pot estar buit']"
				/>

				<q-input
					filled
					type="string"
					v-model="port"
					label="Port del servidor de correu"
					lazy-rules
					:rules="[ val => val && val.length > 0 || 'No pot estar buit']"
				/>

				<q-input
					filled
					type="string"
					v-model="usuari"
					label="Usuari"
					lazy-rules
					:rules="[ val => val && val.length > 0 || 'No pot estar buit']"
				/>

				<q-input
					filled
					type="password"
					v-model="pwd"
					label="Pwd"
					lazy-rules
					:rules="[ val => val && val.length > 0 || 'No pot estar buit']"
				/>





				<div class="row justify-center">
					<q-btn class="col-auto" label="Guardar" type="submit" color="positive"/>
					<!-- <q-btn class="col-auto" label="Cancelar" color="negative"  @click="onCancelar()"/> -->
				</div>
			</q-form>
		</q-card-section>
	</q-card>



	
</template>

<script lang="ts">
import { Ref, ref, defineComponent, onMounted  } from 'vue'

import { useStore } from 'vuex'
import { storeKey } from '../store/index'

import {  useRouter } from 'vue-router';

export default defineComponent({


	setup() {


		const store = useStore(storeKey)
		const router = useRouter();


		const servidor: Ref<any> = ref("")
		const port: Ref<any> = ref("")
		const usuari: Ref<any> = ref("")
		const pwd: Ref<any> = ref("")
	

		onMounted(() => {
			servidor.value = store.state.example.configuracio.servidor
			port.value = store.state.example.configuracio.port
			usuari.value = store.state.example.configuracio.usuari
			pwd.value = store.state.example.configuracio.pwd
		})

		const onSubmit = () => {

			store.commit("example/guardarConfiguracio", {
				servidor: servidor.value, 
				port: port.value,
				usuari: usuari.value,
				pwd: pwd.value
				} )

			router.push("/")
		}



		return { servidor, port, usuari, pwd, onSubmit }
	}
})
</script>

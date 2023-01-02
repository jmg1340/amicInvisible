<template>
	
	<q-card>
		<q-card-sectionn>
			<q-form
				@submit="onSubmit"
				@reset="onReset"
				class="q-gutter-md"
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
		</q-card-sectionn>
	</q-card>



	
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue'

export default defineComponent({
	props: {
		objAfegirEditar: {
			type: Object
		}
	},

	setup(props) {

		watch(
			() => props.objAfegirEditar,
			(first, second) => {
				console.log("props.objAfegirEditar ha canviat", second)
			}
		)

		
	},
})
</script>

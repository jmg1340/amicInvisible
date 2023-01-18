<template>
	<div>

    <q-list dense>
      <!--
        Rendering a <label> tag (notice tag="label")
        so QCheckboxes will respond to clicks on QItems to
        change Toggle state.
      -->

      <q-item 
			v-for="(p, index) in participantsGrup"
			:key="index"
			v-ripple
			tag="label"
			>
        <q-item-section avatar>
          <q-checkbox v-model="arrExcepcions" :val="p.id" color="black" />  
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ p.nom }} </q-item-label>
        </q-item-section>
      </q-item>


		</q-list> 

		<!-- <div>
			Seleccio: {{ arrExcepcions }}
		</div> -->

	</div>
</template>




<script lang="ts">
import { Ref, ref, defineComponent, computed, watch } from "vue";
import { useStore } from 'vuex'
import { storeKey } from '../store/index'

export default defineComponent({
	name: "excepcions",
	
	props: {
		idGrup: {type: String, required: true},
		idPart: {type: String, required: true}
	},

	emits: ['onChangeArrExcepcions'],

	setup( props, ctx) {
		const store = useStore(storeKey)

		const participantsGrup = computed(() => store.state.example.participants.filter( (p) => p.idGrup === parseInt(props.idGrup) && p.id !== parseInt(props.idPart)))

		const arrExcepcions: Ref<number[]> = ref(
			store.state.example.participants.find( (p) => p.idGrup === parseInt(props.idGrup) && p.id === parseInt(props.idPart))?.excepcions || []
		)

		console.log("EXCEPCIONS - arrExcepcions", arrExcepcions)


		watch(() => arrExcepcions.value, (currentValue, oldValue) => {
			// console.log("currentValue", currentValue);
			// console.log("oldValue", oldValue);
			ctx.emit("onChangeArrExcepcions", currentValue)
		});


		return { participantsGrup, arrExcepcions }
	}



})



</script>

<style scoped>

</style>
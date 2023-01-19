<template>
  <router-view />
</template>
<script lang="ts">
import { defineComponent, watch, computed, onMounted } from 'vue';

import { useStore } from 'vuex'
import { storeKey } from './store/index'

import { useQuasar } from 'quasar'
export default defineComponent({
  name: 'App',

	setup(){
		const store = useStore(storeKey)		
		const $q = useQuasar()

		onMounted( () => {
			const state2: any = $q.localStorage.getItem("estatAmicInvisible")

			if ( state2 ) {
				store.commit("example/carregarDadesDeLocalStorage", JSON.parse( state2 )  )
			}
		})


		const stateParticipants = computed ( () => store.state.example)
		console.log("APP VUE: abans de watch:", stateParticipants.value)

		watch ( stateParticipants.value , (currentValue, oldValue) => {
			console.log("APP.VUE CurrentValue:", currentValue)

			$q.localStorage.set("estatAmicInvisible", JSON.stringify(currentValue))
		})

		
	}
})
</script>

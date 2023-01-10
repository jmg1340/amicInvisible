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
			console.log("sorteig")

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
<template>
	<div class="q-ma-xs">

				<div class="text-h6 text-center">Grup: <span class="text-grey-8">{{ nomGrup }} </span></div>

        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >

          <q-tab name="participants" label="Participants" />
          <q-tab name="sorteig" label="Sorteig" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="participants">
            <compGrup :idGrup="grupId" />
          </q-tab-panel>

          <q-tab-panel name="sorteig">
            <compSorteig :idGrup="grupId" />
          </q-tab-panel>
        </q-tab-panels>


	</div>

</template>

<script lang="ts">

import { defineComponent, Ref, ref } from "vue";

import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router';

import { useStore } from 'vuex'
import { storeKey } from '../store/index'

import compGrup from './Grup.vue'
import compSorteig from './Sorteig.vue'

export default defineComponent ({

	components: { compGrup, compSorteig },

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

		const tab: Ref<any> = ref("participants")
		const grupId = parseInt(props.idGrup)
		const nomGrup = (store.state.example.grups.find( (g: any) => g.id === grupId ))?.nom


		return { nomGrup, tab, grupId: props.idGrup }
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
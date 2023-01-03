<template>
  <div class="row items-center justify-center q-pa-lg">

		<div class="col-6">

			<q-btn label="Nou grup" noCaps color="negative" class="q-mb-lg" @click="prompt"/>

			<q-list bordered separator v-for="nom_grup in grupsParticipants" :key="nom_grup" >
				<q-item clickable v-ripple @click="mostrarGrup(nom_grup)">
					<q-item-section>
						{{ nom_grup }}
					</q-item-section>
				</q-item>
			</q-list>

		</div>

  </div>
</template>

<script lang="ts">
import { Participant, Participants } from 'components/models';
import { defineComponent, ref, computed } from 'vue';

import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router';

import { useStore } from 'vuex'
import { storeKey } from '../store/index'

export default defineComponent({
  name: 'PageIndex',
  components: {  },
  setup() {
		const $q = useQuasar()
		const router = useRouter();
		const store = useStore(storeKey)

		const nouGrup = ""
		const participants = store.state.example.participants

		const grupsParticipants = computed( () => {
			let grups:string[] = []
			participants.forEach( (participant ) => {

				const elementCoincident = grups.some( elem => participant.grup == elem )
				if ( ! elementCoincident ) grups.push(participant.grup)
			})

			// console.log("grups", grups)
			return grups
		})


    function prompt () {
      $q.dialog({
        title: 'NOU GRUP',
        message: 'Nom del nou grup:',
        prompt: {
          model: nouGrup,
          type: 'text' // optional
        },
        cancel: true,
        persistent: true
      }).onOk(data => {
        // console.log('>>>> OK, received', data)
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    }


		const mostrarGrup = (nom: string) => {
			// console.log("parametre", router.push)
			router.push(`/grup/${nom}`)
		}






    return { grupsParticipants, prompt, nouGrup, mostrarGrup };
  }
});
</script>

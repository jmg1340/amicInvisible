<template>
  <div class="row items-center justify-center q-pa-lg">

		<div class="col-10">

			<q-btn label="Nou grup" noCaps color="negative" class="q-mb-lg" @click="afegirModificarGrup('afegir', 0, '')"/>

			<q-list bordered separator v-for="obj in grupsParticipants" :key="obj.id" >
				<q-item>
					<q-item-section clickable v-ripple @click="mostrarGrup(obj.id)">
						{{ obj.nom }}
					</q-item-section>
					<q-item-section top side>
						<div class="q-gutter-xs">
							<q-btn flat dense round color="orange" icon="edit" @click="afegirModificarGrup('editar', obj.id, obj.nom)"/>
							<q-btn flat dense round color="negative" icon="delete" @click="eliminarGrup(obj.id, obj.nom)"/>
						</div>
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

		const grupsParticipants = computed( () => store.state.example.grups )


    function eliminarGrup (id:number, nom: string) {
      $q.dialog({
        title: 'Confirmar',
        message: `També s'eliminaran els participants del grup "${nom.toUpperCase()}".Ok?`,
        ok: {
          push: true,
					color: "positive",
					label: "Sí"
        },
        cancel: {
          push: true,
          color: 'negative',
					label: "No"
        },
        persistent: true
      }).onOk(() => {
        // Hem d'eliminar el grup i els participants del grup
				store.commit("example/eliminarParticipantsGrup", { idGrup: id })
				store.commit("example/eliminarGrup", { idGrup: id })

      }).onOk(() => {
        // console.log('>>>> second OK catcher')
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    }





		let nomGrup: string = ""

    function afegirModificarGrup (mode: string, idGrup: number, nom: string) {
			// console.log("MODE", mode, "IDGRUP", idGrup, "NOM", nom)

			nomGrup = (mode === "editar") ? nom : ""

			$q.dialog({
				title: `${ (mode === "afegir") ? "Nou grup" : "Modificar nom del grup"} `,
				message: 'Nom del grup:',
				prompt: {
					model: nomGrup,
					type: 'text' // optional
				},
				cancel: true,
				persistent: true
			}).onOk(data => {

				console.log('>>>> OK, received', data)
				if (data.trim().length > 0) {

					if (mode === "afegir")
						idGrup = Math.max( ...store.state.example.grups.map( g => g.id ) ) + 1


					store.commit("example/guardarGrup", {
						idGrup: idGrup,
						nom: data.trim()
					})
				}

			}).onCancel(() => {
				// console.log('>>>> Cancel')
			}).onDismiss(() => {
				// console.log('I am triggered on both OK and Cancel')
			})

    }


		const mostrarGrup = (idGrup: string) => {
			router.push(`/grup/${idGrup}`)
		}






    return { grupsParticipants, afegirModificarGrup, eliminarGrup, nomGrup, mostrarGrup };
  }
});
</script>

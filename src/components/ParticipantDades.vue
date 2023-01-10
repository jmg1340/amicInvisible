<template>
	
		<div class="col q-pa-xs">
			{{ participant.nom }}
			<q-badge 
			v-if="participant.excepcions.length !== 0"
			align="top" 
			rounded
			color="red">{{ participant.excepcions.length }}</q-badge>
		</div>
		<div class="col q-pa-xs">{{ participant.email }}</div>
		<div class="col">
			<div class="row justify-end q-gutter-xs">
				<q-btn class="col-auto" flat dense round color="brown-6" icon="mail" @click="enviarCorreu()"/>
				<q-btn class="col-auto" flat dense round color="orange" icon="edit" @click="editarParticipant()"/>
				<q-btn class="col-auto" flat dense round color="negative" icon="delete" @click="eliminarParticipant()"/>
			</div>
		</div>
	
</template>

<script>
// import { Participant } from "./models"
import { defineComponent } from "vue";
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar'

import { useStore } from 'vuex'
import { storeKey } from '../store/index'

// import nodemailer from 'nodemailer'

export default defineComponent({
	name: "dadesParticipant",
	props: {
		participant: {
			type: Object
		},
	},

	setup( props ) {
		const $q = useQuasar()
		const router = useRouter();
		const store = useStore(storeKey)

		const editarParticipant = () => { 
			router.push({ name: "afegirEditarParticipant", query: { 
				id: props.participant.id,
				idGrup: props.participant.idGrup,
				nom: props.participant.nom, 
				email: props.participant.email,
				mode: "editar" } });
		}

		const eliminarParticipant = () => {
      $q.dialog({
        title: 'Confirmar',
        message: `Eliminar "${props.participant.nom.toUpperCase()}" ?`,
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
				store.commit("example/eliminarParticipant", { idParticipant: props.participant.id })

      }).onOk(() => {
        // console.log('>>>> second OK catcher')
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })

		}


	const enviarCorreu = () => {
      $q.dialog({
        title: 'Confirmar',
        message: `Enviar correu de prova a "${props.participant.nom.toUpperCase()}" ?`,
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

				// let transporter = nodemailer.createTransport({
				// 	host: store.state.example.configuracio.servidor,
				// 	port: parseInt(store.state.example.configuracio.port),
				// 	secure: this.port == 465 ? true : false, // true for 465, false for other ports
				// 	auth: {
				// 			user: store.state.example.configuracio.usuari,
				// 			pass: store.state.example.configuracio.pwd
				// 	}	
				// })


				const message = {
						from: store.state.example.configuracio.usuari,
						to: props.participant.email,
						subject: "Amic invisible - correu de prova",
						text: "Abans d'enviar l'amic invisible, prego confirmis que has rebut aquest correu"
				}

				// transporter.sendMail(message, function(err, info) {
				// 		if (err) {
				// 			console.log(err)
				// 		} else {
				// 			console.log(info);
				// 		}
				// })


      }).onOk(() => {
        // console.log('>>>> second OK catcher')
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })

		}






		return { editarParticipant, eliminarParticipant, enviarCorreu }

	}

})
</script>

<style>

</style>
<template>
	
		<td class="">{{ participant.nom }}</td>
		<td class="">{{ participant.email }}</td>
		<!-- <td class="">{{ participant.grup }}</td> -->
	
</template>

<script>
// import { Participant } from "./models"
import { defineComponent } from "vue";

export default defineComponent({
	name: "dadesParticipant",
	props: {
		participant: {
			type: Object
		},
	}


})
</script>

<style>

</style>
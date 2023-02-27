<script>
	//import CommunityIcon from './components/icons/IconCommunity.vue';

	export default {
		components: {
			//CommunityIcon,
		},
		data() {
			return {
				pastExercises: [],
			}
		},
		beforeMount() {
			//
		},
		methods: {
			consoleLog(string) {
				console.log(string);
			},
		}
	};
</script>

<template>
	<main>
		<h1 class="title">Vue Exercise Tracking App</h1>
		<table class="table">
			<thead>
				<tr>
					<th>Date Completed</th>
					<th>Description</th>
					<th>Time (Minutes)</th>
					<th>Distance (Meters)</th>
					<th>Sets</th>
					<th>Reps</th>
					<th>Weight Amount (Kilograms)</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="pastExercise in pastExercises">
					<td>{{ pastExercise.date }}</td>
					<td>{{ pastExercise.description }}</td>
					<td>{{ pastExercise.time }}</td>
					<td>{{ pastExercise.distance }}</td>
					<td>{{ pastExercise.sets }}</td>
					<td>{{ pastExercise.reps }}</td>
					<td>{{ pastExercise.weight }}</td>
				</tr>
			</tbody>
		</table>
	</main>
</template>

<style scoped>
	main {
		margin: 1rem 0;
		min-width: 62vw;
	}
	table {
		margin-top: 3rem;
	}
</style>

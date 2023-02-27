<script>
	//import CommunityIcon from './components/icons/IconCommunity.vue';

	export default {
		components: {
			//CommunityIcon,
		},
		data() {
			return {
				pastExercises: [],
				formExerciseType: 'aerobic'
			}
		},
		beforeMount() {
			//
		},
		methods: {
			consoleLog(string) {
				console.log(string);
			},
			switchExerciseType(type) {
				this.formExerciseType = type;
				const formElements = document.querySelector('form').elements;
				if(type === 'aerobic') {
					formElements.sets.value = '';
					formElements.reps.value = '';
					formElements.weight.value = '';
				}
				else if(type === 'anaerobic') {
					formElements.time.value = '';
					formElements.distance.value = '';
				}
			},
			formSubmit(event) {
				const formElements = event.target.elements; // Modified from Sean Ray on StackOverflow: https://stackoverflow.com/questions/42694457/getting-form-data-on-submit
				this.pastExercises.push({
					date: formElements.date.value,
					description: formElements.description.value,
					time: formElements.time.value,
					distance: formElements.distance.value,
					sets: formElements.sets.value,
					reps: formElements.reps.value,
					weight: formElements.weight.value
				});
				console.log('pastExercises:', this.pastExercises);
			}
		}
	};
</script>

<template>
	<main>
		<h1 class="title">Vue Exercise Tracking App</h1>
		<h2 class="title is-4">Add Exercise</h2>
		<form @submit.prevent="formSubmit">
			<div class="field">
				<label class="label">Date Completed</label>
				<div class="control">
					<input class="input" type="text" name="date">
				</div>
			</div>
			<div class="field">
				<label class="label">Description</label>
				<div class="control">
					<textarea class="textarea" name="description"></textarea>
				</div>
			</div>
			<div class="control exercise-type">
				<p class="label">Exercise Type</p>
				<label class="radio">
					<input type="radio" @change="switchExerciseType('aerobic')" name="answer" checked>
					Aerobic
				</label>
				<label class="radio">
					<input type="radio" @change="switchExerciseType('anaerobic')" name="answer">
					Anaerobic
				</label>
			</div>
			<div class="field">
				<label class="label">Time (Minutes)</label>
				<div class="control">
					<input class="input" type="number" name="time" :disabled="formExerciseType === 'anaerobic' ? true : false">
				</div>
			</div>
			<div class="field">
				<label class="label">Distance (Meters)</label>
				<div class="control">
					<input class="input" type="number" name="distance" :disabled="formExerciseType === 'anaerobic' ? true : false">
				</div>
			</div>
			<div class="field">
				<label class="label">Sets</label>
				<div class="control">
					<input class="input" type="number" name="sets" :disabled="formExerciseType === 'aerobic' ? true : false">
				</div>
			</div>
			<div class="field">
				<label class="label">Reps</label>
				<div class="control">
					<input class="input" type="number" name="reps" :disabled="formExerciseType === 'aerobic' ? true : false">
				</div>
			</div>
			<div class="field">
				<label class="label">Weight Amount (Kilograms)</label>
				<div class="control">
					<input class="input" type="number" name="weight" :disabled="formExerciseType === 'aerobic' ? true : false">
				</div>
			</div>
			<div class="field">
				<div class="control">
					<button class="button is-link save-exercise" type="submit">Save Exercise</button>
				</div>
			</div>
		</form>
		<h2 class="title is-4">Past Exercises</h2>
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
	.exercise-type {
		margin-bottom: 1rem;
	}
	h2 {
		margin-top: 2rem;
	}
	.save-exercise {
		margin-top: 0.5rem;
	}
</style>

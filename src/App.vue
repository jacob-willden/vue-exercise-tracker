<script>
	//import CommunityIcon from './components/icons/IconCommunity.vue';

	export default {
		components: {
			//CommunityIcon,
		},
		data() {
			return {
				pastExercises: [],
				formExerciseType: 'aerobic',
				oldDate: '',
				index: 0,
				modalElement: null
			}
		},
		mounted() {
			this.modalElement = this.$refs.modal;
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
			newExerciseSubmit(event) {
				// Get elements by name, via Mozilla Developer Network: https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/elements
				const formElements = event.target.elements;
				this.pastExercises.push({
					description: formElements.description.value,
					time: formElements.time.value,
					distance: formElements.distance.value,
					sets: formElements.sets.value,
					reps: formElements.reps.value,
					weight: formElements.weight.value,
					//date: formElements.date.value
				});
				console.log('pastExercises:', this.pastExercises);
			},
			openDateModal(oldDate, index) {
				if(oldDate) {
					this.oldDate = oldDate;
				}
				else {
					this.oldDate = '';
				}
				this.index = index;
				this.modalElement.showModal();
			},
			dateSubmit(event) {
				const newDate = event.target.elements.date.value;
				this.pastExercises[this.index].date = newDate;
				this.modalElement.close();
			}
		}
	};
</script>

<template>
	<main>
		<h1 class="title">Vue Exercise Tracking App</h1>
		<h2 class="title is-4">Add Exercise</h2>
		<form @submit.prevent="newExerciseSubmit">
			<div class="field">
				<label for="description" class="label">Description</label>
				<textarea id="description" class="textarea" name="description"></textarea>
			</div>
			<fieldset>
				<legend>Exercise Type</legend>
				<div class="radio">
					<input id="aerobic" type="radio" @change="switchExerciseType('aerobic')" name="answer" checked>
					<label for="aerobic">Aerobic</label>
				</div>
				<div class="radio">
					<input id="anaerobic" type="radio" @change="switchExerciseType('anaerobic')" name="answer">
					<label for="anaerobic">Anaerobic</label>
				</div>
			</fieldset>
			<div class="field">
				<label for="time" class="label">Time (Minutes)</label>
				<input id="time" class="input" type="number" name="time" :disabled="formExerciseType === 'anaerobic' ? true : false">
			</div>
			<div class="field">
				<label for="distance" class="label">Distance (Meters)</label>
				<input id="distance" class="input" type="number" name="distance" :disabled="formExerciseType === 'anaerobic' ? true : false">
			</div>
			<div class="field">
				<label for="sets" class="label">Sets</label>
				<input id="sets" class="input" type="number" name="sets" :disabled="formExerciseType === 'aerobic' ? true : false">
			</div>
			<div class="field">
				<label for="reps" class="label">Reps</label>
				<input id="reps" class="input" type="number" name="reps" :disabled="formExerciseType === 'aerobic' ? true : false">
			</div>
			<div class="field">
				<label for="weight" class="label">Weight Amount (Kilograms)</label>
				<input id="weight" class="input" type="number" name="weight" :disabled="formExerciseType === 'aerobic' ? true : false">
			</div>
			<div class="field">
				<button class="button is-link save-exercise" type="submit">Save Exercise</button>
			</div>
		</form>
		<h2 class="title is-4">Past Exercises</h2>
		<table class="table">
			<thead>
				<tr>
					<th>Description</th>
					<th>Time (Minutes)</th>
					<th>Distance (Meters)</th>
					<th>Sets</th>
					<th>Reps</th>
					<th>Weight Amount (Kilograms)</th>
					<th>Date Completed</th>
				</tr>
			</thead>
			<tbody>

				<tr v-for="(pastExercise, index) in pastExercises"> <!-- Pass index to v-for, from the official Vue guide: https://vuejs.org/guide/essentials/list -->
					<td>{{ pastExercise.description }}</td>
					<td>{{ pastExercise.time }}</td>
					<td>{{ pastExercise.distance }}</td>
					<td>{{ pastExercise.sets }}</td>
					<td>{{ pastExercise.reps }}</td>
					<td>{{ pastExercise.weight }}</td>
					<td><p class="exercise-date">{{ pastExercise.date }}</p>
						<button @click="openDateModal(pastExercise.date, index)" :key="index" class="button">{{ pastExercise.date ? 'Edit' : 'Add' }}</button>
					</td>
				</tr>
			</tbody>
		</table>

		<dialog ref="modal">
			<button @click="modalElement.close()" class="close-button">
				<img src="./assets/close.svg" alt="Close"/>
			</button>
			<form @submit.prevent="dateSubmit">
				<div class="field">
					<label for="date" class="label">Date Completed</label>
					<input id="date" class="input" type="text" name="date" :value="oldDate">
				</div>
				<div class="field">
					<button class="button is-link" type="submit">Save</button>
				</div>
			</form>
		</dialog>
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
	.exercise-date {
		margin-bottom: 0.5rem;
	}
	.save-exercise {
		margin-top: 0.5rem;
	}
</style>

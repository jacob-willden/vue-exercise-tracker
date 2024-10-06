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
				const formElements = event.target.elements; // Modified from Sean Ray on StackOverflow: https://stackoverflow.com/questions/42694457/getting-form-data-on-submit
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
			<!-- <div class="field">
				<label class="label">Date Completed</label>
				<div class="control">
					<input class="input" type="text" name="date">
				</div>
			</div> -->
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

				<tr v-for="(pastExercise, index) in pastExercises"> <!-- Pass index to v-for, from Terry on StackOverflow: https://stackoverflow.com/questions/55592307/vue-js-v-for-how-to-style-html-depending-on-list-index -->
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
			<button @click="modalElement.close()" class="button">Close</button>
			<form @submit.prevent="dateSubmit">
				<div class="field">
					<label class="label">Date Completed</label>
					<div class="control">
						<input class="input" type="text" name="date" :value="oldDate">
					</div>
				</div>
				<div class="field">
					<div class="control">
						<button class="button is-link" type="submit">Save</button>
					</div>
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

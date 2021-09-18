<template>
	<div class="difficulty">
		<input
			type="radio"
			:id="difficulty.name"
			name="difficulty"
			:value="difficulty.name"
			:checked="difficulty.checked"
			:disabled="disabled"
			@change="changeDifficulty(difficulty)"/>
		<label :for="difficulty.name">{{ difficulty.name }}</label><br>
	</div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
	name: 'RadioButton',

	props: {
		difficulty: Object,
		disabled: Boolean
	},

	methods: {
		...mapActions(['setDifficulty']),
		changeDifficulty(difficulty) {
			this.setDifficulty(difficulty);
		}
	}
}
</script>

<style lang="scss" scoped>
.difficulty {
	margin: 0 1rem;

	input[type="radio"] {
		appearance: none;
		width: 1rem;
		height: 1rem;
		padding: .2rem;
		background-clip: content-box;
		border: .1rem solid purple;
		border-radius: 50%;

		&:checked {
			background-color: purple;
		}

		&:disabled {
			border-color: lightgray;
			&:checked {
				background-color: lightgray;
			}
		}
	}

	label {
		text-transform: capitalize;
	}
}
</style>

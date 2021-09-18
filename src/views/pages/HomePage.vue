<template>
	<section class="home">
		<div class="game-section">
			<div class="difficulties">
				<RadioButton
					v-for="difficulty in difficulties"
					:difficulty="difficulty"
					:disabled = "gameActive"
					:key="difficulty.name" />
			</div>

			<button class="btn" @click="startOrStopGame">
				<template v-if="gameActive">
					Stop Game
				</template>
				<template v-else>
					Start Game
				</template>
			</button>

			<div class="number">{{ number }}</div>

			<input
				type="text"
				ref="letterInput"
				v-model="letter"
				class="letter-input"
				placeholder="Input Letter"
				:disabled = "!gameActive || disableInput"
				@keypress="checkMatching" />

			<div class="alphabet">
				<AlphabetLetter
					v-for="(number, letter) in alphabet"
					:letter="letter"
					:number="number"
					:key="letter"
					:matched="matched[number]" />
			</div>
		</div>

		<div class="score-section">
			<span>SCORE</span>
			<span class="hit">HIT: {{ hit }}</span>
			<span class="miss">MISS: {{ miss }}</span>
			<span class="left">LEFT: {{ left }}</span>
		</div>

		<Modal :show="showGameOverMessage" @closeModal="showGameOverMessage = false">
			<template slot="header">
				<div class="modal-title">Game Over!</div>
			</template>
			<template slot="body">
				<div class="modal-desc">You can try again.</div>
			</template>
			<template slot="footer">
				<button class="btn" @click="showGameOverMessage = false">OK</button>
			</template>
		</Modal>
	</section>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import RadioButton from '../components/RadioButton';
import AlphabetLetter from '../components/AlphabetLetter';
import Modal from '../components/modal'

export default {
	name: 'HomePage',

	data() {
		return {
			gameActive: false,
			showGameOverMessage: false,
			timerID: null,
			disableInput: false,
			letter: null,
			number: null,
			listOfNumbers: [],
			hit: 0,
			miss: 0,
			left: 0,
			matched: {}
		}
	},

	computed: {
		...mapState(['difficulties', 'selectedDifficulty', 'alphabet']),
		...mapGetters(['selectedDifficulty', 'alphabetNumbers']),
	},

	mounted() {
		this.listOfNumbers = [...this.alphabetNumbers];
	},

	methods: {
		startOrStopGame() {
			this.gameActive = !this.gameActive;

			if (this.gameActive) {
				this.number = null;
				this.listOfNumbers = [...this.alphabetNumbers];
				this.left = this.listOfNumbers.length;
				this.hit = 0;
				this.miss = 0;
				this.matched = {};
				this.setNewNumberAndCheckMatching();
				this.startCounter();
				this.$nextTick(() => this.$refs.letterInput.focus());
			}
			else {
				if (this.timerID) {
					clearInterval(this.timerID);
				}
			}
		},
		startCounter() {
			this.timerID = setInterval(this.setNewNumberAndCheckMatching, this.selectedDifficulty.time, true);
		},
		setNewNumberAndCheckMatching() {
			this.setNewNumber();
			this.checkMatching();
		},
		setNewNumber() {
			if (this.listOfNumbers.length) {
				this.letter = null;
				this.disableInput = false;
				const randomIndex = Math.floor((Math.random() * this.listOfNumbers.length));
				this.number = this.listOfNumbers[randomIndex];
				this.listOfNumbers.splice(randomIndex, 1);
				this.left--;
				this.$nextTick(() => this.$refs.letterInput.focus());
			}
			else {
				clearInterval(this.timerID);
				this.gameActive = false;
				this.showGameOverMessage = true;
			}
		},
		checkMatching() {
			setTimeout(() => {
				if (this.letter) {
					const key = this.letter.toUpperCase();
					if ((key in this.alphabet) && this.number === this.alphabet[key]) {
						this.matched[this.number] = 'success';
						this.hit++;
					}
					else {
						this.matched[this.number] = 'failure';
						this.miss++;
					}
					this.disableInput = true;
				}
				else
					this.matched[this.number] = 'failure';
			}, 0);
		}
	},

	components: {
		RadioButton,
		AlphabetLetter,
		Modal
	}
}
</script>

<style lang="scss" scoped>
.home {
	display: flex;
}

.game-section {
	flex-basis: 70%;

	.difficulties {
		display: flex;
		justify-content: center;
		margin-bottom: 2rem;
	}

	.number {
		height: 3rem;
		line-height: 1;
		font-size: 3rem;
		margin: 2rem auto;
	}

	.letter-input {
		width: 8rem;
		margin-bottom: 3rem;
		padding: .4rem;
		text-align: center;

		&:disabled {
			cursor: not-allowed;
			background-color: lavender;
		}
	}

	.alphabet {
		display: flex;
		flex-wrap: wrap;
		max-width: 20rem;
		margin: 0 auto;

		@media screen and (min-width: 768px) {
			max-width: 25rem;

		}
	}
}

.score-section {
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	flex-grow: 1;
	margin-right: 2%;

	> * {
		margin-bottom: 1rem;
	}

	.hit {
		color: lightgreen;
	}
	.miss {
		color: red;
	}
	.left {
		color: purple;
	}
}

.btn {
	padding: .5rem 1rem;
	background: transparent;
	color: purple;
	border: .1rem solid purple;
}
</style>

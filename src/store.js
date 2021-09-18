import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		difficulties: [
			{ name: 'easy', checked: false, time: 5000 },
			{ name: 'medium', checked: true, time: 3500 },
			{ name: 'hard', checked: false, time: 2000 }
		],
		alphabet: [...Array(26).keys()].reduce((obj, key) => Object.assign(obj, { [String.fromCharCode(key + 65)]: key + 1 }), {})
	},
	mutations: {
		SET_DIFFICULTY(state, newDifficulty) {
			let difficultyIndex = state.difficulties.findIndex(difficulty => difficulty.name === newDifficulty.name);
			state.difficulties.forEach(
				(difficulty, index) =>
					index === difficultyIndex ? difficulty.checked = true : difficulty.checked = false
			);
		},
	},
	actions: {
		setDifficulty({ commit }, difficulty) {
			commit('SET_DIFFICULTY', difficulty);
		},
	},
	getters: {
		selectedDifficulty: (state) => state.difficulties.find(difficulty => difficulty.checked === true),
		alphabetNumbers: (state) => Object.values(state.alphabet)
	},
});

export default store;

<template>
	<div class="alphabet-cell" :class="{ success: matched === 'success', failure: matched === 'failure'}">
		<span class="letter">{{ letter }}</span>
		<span class="number">({{ number }})</span>
	</div>
</template>

<script>
export default {
	name: 'AlphabetLetter',

	props: {
		letter: String,
		number: Number,
		matched: String
	}
}
</script>

<style lang="scss" scoped>
.alphabet-cell {
	flex-basis: 25%;
	margin: .5rem 0;
	color: dimgray;
	font-weight: bold;

	@media screen and (min-width: 768px) {
		flex-basis: 1/6 * 100%;
	}

	.letter {
		display: inline-block;
		width: 35%;
		text-align: center;
	}

	.number {
		display: inline-block;
		width: 65%;
		text-align: left;
	}

	&.success {
		color: lightgreen;
	}

	&.failure {
		color: red;
	}
}
</style>

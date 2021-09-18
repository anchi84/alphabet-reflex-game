<template>
	<transition :name="transitionName">
		<div class="modal-mask" v-if="show">
			<div class="modal-wrapper" @click.self="close">
				<div class="modal-container">
					<div class="modal-header">
						<slot name="header"></slot>
					</div>

					<div class="modal-body">
						<slot name="body"></slot>
					</div>

					<div class="modal-footer">
						<slot name="footer"></slot>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
export default {
	props: {
		show: {
			type: Boolean,
			default: false,
		},
		transitionName: {
			type: String,
			required: false,
			default: 'modal',
		},
	},
	methods: {
		close() {
			this.$emit('closeModal');
		},
	},
};
</script>

<style lang="scss">
.modal-mask {
	position: fixed;
	z-index: 9998;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	display: table;
	transition: opacity 0.3s ease;
}

.modal-wrapper {
	display: table-cell;
	vertical-align: middle;
}

.modal-container {
	width: 90%;
	max-width: 25rem;
	margin: 0 auto;
	background: #fff;
	color: purple;
	border-radius: 0.2rem;
	box-shadow: 0 0.2rem 0.8rem rgba(0, 0, 0, .33);
	transition: all 0.3s ease;
}

.modal-header {
	background: purple;
	color: #fff;
	padding: 1rem 1.5rem;

	.modal-title {
		font-size: 2rem;
	}
}

.modal-body {
	padding: 1rem 1.5rem;

	.modal-desc {
		font-size: 1.5rem;
	}
}

.modal-footer {
	padding: 1rem 1.5rem;
}

.modal-enter {
	opacity: 0;
}

.modal-leave-active {
	opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
	-webkit-transform: scale(1.1);
	transform: scale(1.1);
}
</style>

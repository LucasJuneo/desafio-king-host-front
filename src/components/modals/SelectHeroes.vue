<template>
	<div class="modal fade show d-block" tabindex="-1">
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">Selecione um Herói</h5>
				<button type="button" class="btn-close" @click="close"></button>
			</div>
			<div v-if="heroes.length > 0" class="modal-body">
				<div class="hero d-flex gap-2 p-2" :id="'hero' + hero.id" v-for="hero in heroes" :key="hero.id" @click="select(hero)">
					<img :src="hero.thumbnail.path + '.' + hero.thumbnail.extension" :alt="hero.name">
					<div class="info">
						<p class="name"><b>{{ hero.name }}</b></p>
						<p class="description small">{{ hero.description != '' ? hero.description : 'Sem descrição' }}</p>
					</div>
				</div>

			</div>
			<div v-else class="modal-body">
				<p>Nenhum Herói encontrado, tente novamente.</p>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-secondary" @click="close">Cancelar</button>
				<button type="button" class="btn btn-success" :disabled="disableButton" @click="submit">Selecionar</button>
			</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		heroes: Array
	},
	data() {
		return {
			disableButton: true,
			selectedHero: {}
		}
	},
	methods: {
		close() {
			this.$emit('close');

		},
		select(hero) {
			let element = this.$el.querySelectorAll('.hero')
			for(let i = 0; i < element.length; i++){
				element[i].classList.remove('selected');
			}
			this.$el.querySelector('#hero' + hero.id).classList.add('selected');
			
			this.disableButton = false;
			
			this.selectedHero = {
				name: hero.name,
				description: hero.description != '' ? hero.description : 'Sem descrição',
				img: hero.thumbnail.path + '.' + hero.thumbnail.extension,
			};
		},
		submit() {
			if (this.disableButton == false) {
				this.$emit('selectedHero', this.selectedHero);
			}
		}
	}
}
</script>

<style scoped>
	.modal {
		backdrop-filter: blur(5px);
		background: #66666650;
	}
	.modal-body {
		max-height: 400px;
		overflow-y: auto;
		overflow-x: hidden;
	}
	.modal-body img {
		width: 100px;
	}
	.hero {
		cursor: pointer;
	}
	.hero:hover {
		background: #dbcfe7;
	}
	.hero.selected {
		background: #bfa2dd;
	}
	.description {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2; /* number of lines to show */
				line-clamp: 2; 
		-webkit-box-orient: vertical;
	}
</style>
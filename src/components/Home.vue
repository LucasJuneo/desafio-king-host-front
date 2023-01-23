<template>
	<div class="home py-4">
		<div class="row">
			<h6 class="mb-3">Busque seus 3 heróis preferidos da Marvel</h6>
			<div class="col-10">
				<input class="form-control" type="text" placeholder="Busque um herói" v-model="hero" v-on:keyup.enter="submit" :disabled="selectedHeroes.length >= 3 ? true : false">
			</div>
			<div class="col-2">
				<button v-if="!loading" class="w-100 btn btn-success" :disabled="selectedHeroes.length >= 3 ? true : false" @click="submit">Buscar</button>
				<button v-else class="w-100 btn btn-success" type="button" disabled>
					<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
					Loading...
				</button>
			</div>
			<p class="small mt-1"><b>Busque 1 herói por vez em inglês. <br> Sugestões:</b> Hulk - Spider-man - Iron man - Captain America - Thor - Wolverine - Doctor Strange</p>
		</div>

		<div v-if="selectedHeroes.length > 0" class="mt-5">
			<div class="selected-hero mb-2 border rounded overflow-hidden" v-for="hero in selectedHeroes" :key="hero.id">
				<div class="row">
					<img :src="hero.img" :alt="hero.name" class="col-4 col-md-2">
					<div class="col-6 col-md-8">
						<p class="name"><b>{{ hero.name }}</b></p>
						<p class="description small">{{ hero.description != '' ? hero.description : 'Sem descrição' }}</p>
					</div>
				</div>
			</div>
		</div>

		<div v-if="selectedHeroes.length >= 3" class="mt-5">
			<p class="text-center m-0">Clique no botão abaixo para confirmar os seus 3 heróis preferidos!</p>
			<p class="text-center m-0">Caso queira mudar suas escolhas basta clicar em "Reinicar" no menu.</p>
			<button class="btn btn-success d-block mx-auto mt-4" @click="finish">Finalizar</button>
		</div>
	</div>

	<select-heroes-component
		v-if="showSelectHeroes"
		:heroes="heroesSearched"
		@close="showSelectHeroes = false"
		@selectedHero="selectedHero"
	></select-heroes-component>
</template>

<script>
import axios from 'axios'
import selectHeroesComponent from './modals/SelectHeroes.vue'

export default {
	components: {
		selectHeroesComponent
	},
	data() {
		return {
			hero: '',
			heroesSearched: [],
			selectedHeroes: [],
			loading: false,
			showSelectHeroes: false
		}
	},
	methods: {
		submit() {
			if (this.selectedHeroes.length >= 3) {
				alert("só 3 heróis podem ser selecionados");
				return;
			}

			this.loading = true;

			axios.get(process.env.VUE_APP_BACKEND_URL + 'heroes', {
				params: {
					name: this.hero
				},
				headers: {
					Authorization: process.env.VUE_APP_BACKEND_TOKEN
				},
			})
			.then((response) => {
				let data = response.data.data;
				if (data != undefined) {
					this.showSelectHeroes = true;
					this.heroesSearched = data.results;
				}
			})
			.finally(() => { 
				this.hero = '';
				this.loading = false; 
			});
		},
		selectedHero(hero) {
			this.showSelectHeroes = false;
			if (this.selectedHeroes.some(elem => JSON.stringify(elem) === JSON.stringify(hero))) {
				alert("Você deve gostar muito desse herói, mas selecione 3 diferentes ;)");
				return;
			}
			this.selectedHeroes.push(hero);
			if (this.selectedHeroes.length >= 3) {
				this.$nextTick(() => window.scrollTo(0, document.body.scrollHeight));
			}
		},
		finish() {
			axios.post(process.env.VUE_APP_BACKEND_URL + 'heroes', {
				params: {
					heroes: this.selectedHeroes
				},
				headers: {
					Authorization: process.env.VUE_APP_BACKEND_TOKEN
				},
			})
		}
	},
}
</script>

<style scoped>
	.selected-hero .description {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 3; /* number of lines to show */
				line-clamp: 3; 
		-webkit-box-orient: vertical;
	}
</style>
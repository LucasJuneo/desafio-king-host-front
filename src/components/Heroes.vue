<template>
	<div class="py-4">
		<h3 class="mb-4 text-center">Lista de Heróis preferidos</h3>

		<div v-if="!loading">
			<div v-for="hero in heroes" :key="hero.id" class="border-top py-3">
				<p class="text-center fs-4 fw-bold">{{ hero.name }}</p>
				<img :src="hero.img" :alt="hero.name" class="d-block m-auto w-md-50 w-100 mb-2">
				<div>{{ hero.description }}</div>
				<div class="mt-4 text-center">
					<a :href="'/heroes/' + hero.id + '/stories'" class="btn btn-success">Ver histórias</a>
				</div>
			</div>
		</div>

		<div v-else class="d-flex align-items-center justify-content-center gap-3">
			<div class="spinner-border" role="status" aria-hidden="true"></div>
			<strong>Carregando...</strong>
		</div>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	data() {
		return {
			heroes: [],
			loading: true
		}
	},
	methods: {
		getHeroes() {
			axios.get(process.env.VUE_APP_BACKEND_URL + 'heroes', {
				params: {
					name: this.hero
				},
				headers: {
					Authorization: process.env.VUE_APP_BACKEND_TOKEN
				},
			})
			.then((response) => {
				console.log(response);
				let data = response.data;
				if (data.success != true) {
					alert('erro! Tente novamente mais tarde');
					return;
				}

				if (data.heroes.length == 0) {
					this.$router.push('/');
				}

				this.heroes = data.heroes;
			})
			.catch((error) => {
				console.log(error);
				alert('erro! Tente novamente mais tarde');
			})
			.finally(() => { 
				this.loading = false; 
			});
		}
	},
	created() {
		this.getHeroes();
	},
}
</script>
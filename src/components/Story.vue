<template>
	<div class="py-4">
		<h3 class="mb-4 text-center">Lista de Histórias</h3>

		<div v-for="story in stories" :key="story.id" class="border-top py-3">
			<div class="row">
				<img :src="story.thumbnail" :alt="story.title" class="col-4">
				<div class="col-8">
					<p class="mb-5 fs-4 fw-bold">{{ story.title }}</p>
					<div>{{ story.description }}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	data() {
		return {
			stories: []
		}
	},
	methods: {
		getStory(id) {
			axios.get(process.env.VUE_APP_BACKEND_URL + 'heroes/' + id + '/stories', {
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

				this.stories = data.stories;
			})
			.catch((error) => {
				console.log(error);
				this.$router.push('/');
			});
		}
	},
	created() {
		this.getStory(this.$route.params.id);
	},
}
</script>
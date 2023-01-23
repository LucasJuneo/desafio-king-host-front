<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png">
   <router-link to="/">Go to About</router-link> -->
	<div class="header py-4">
		<div class="container">
			<h1 class="text-center text-white fs-3">Desafio Técnico</h1>
			<nav class="nav-bar d-flex gap-4 rounded p-3">
				<a href="https://king.host/" target="_blank">
					<img class="logo" src="./assets/logo.svg" alt="King Host">
				</a>
				<router-link to="/" class="text-white text-decoration-none">Sobre mim</router-link>
				<span class="text-danger text-decoration-none ms-auto" role="button" @click="reset">Reiniciar</span>
			</nav>
		</div>
	</div>
	<div class="container">
		<router-view></router-view>
	</div>

</template>

<script>
// import logoSvg from './assets/logo.svg';

export default {
  name: 'App',
  components: {
    // logoSvg
  }
}
</script>

<style scoped>
	.header {
		background: #5f23a0;
	}
	.nav-bar {
		background: #461B76;
	}
	.logo {
		width: 150px;
	}
</style>

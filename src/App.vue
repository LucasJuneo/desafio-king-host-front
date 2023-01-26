<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png">
   <router-link to="/">Go to About</router-link> -->
	<div class="header py-4">
		<div class="container">
			<div class="menu-button d-none" @click="toggleMenu"></div>
			<h1 class="title text-center text-white fs-3">Desafio Técnico</h1>
			<div class="nav-bar-container" @click.self="toggleMenu">
				<nav class="nav-bar d-flex gap-4 rounded p-3">
					<a href="https://king.host/" target="_blank" class="logo-link">
						<img class="logo" src="./assets/logo.svg" alt="King Host">
					</a>
					<router-link to="/about" class="text-white text-decoration-none">Sobre mim</router-link>
					<span class="text-danger text-decoration-none ms-auto" role="button" @click="reset">Reiniciar</span>
				</nav>
			</div>
		</div>
	</div>
	<div class="container">
		<router-view></router-view>
	</div>

</template>

<script>
import axios from 'axios';

export default {
	name: 'App',
	methods: {
		reset() {
			let confirm = window.confirm('Tem certeza que deseja limpar todos os dados do banco de dados e reiniciar o sistema?');
			if( confirm) {
				axios.get(process.env.VUE_APP_BACKEND_URL + 'reset', {
					headers: {
						Authorization: process.env.VUE_APP_BACKEND_TOKEN
					},
				})
				.then(() => {
					this.$router.go('/');
				})
				.catch((error) => {
					console.log(error);
					alert('erro! Tente novamente mais tarde');
				})
			}
		},
		toggleMenu() {
			document.querySelector('.nav-bar-container').classList.toggle('active');
		}
	},
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
	@media screen and (max-width: 767px) {
		.header > .container {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
		.nav-bar-container {
			position: fixed;
			top: 0;
			bottom: 0;
			left: -100%;
			width: 100%;
			background: #461B7650;
			backdrop-filter: blur(5px);
			transition: 0.3s ease all;
		}
		.nav-bar-container.active {
			left: 0;
		}
		.nav-bar {
			content: '';
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			flex-direction: column;
			width: 200px;
			border-radius: unset!important;
			background: white;
			padding-top: 230px!important;
			z-index: -1;
		}
		.nav-bar > * {
			color: #333!important;
			margin-left: 0!important;

		}
		.logo-link {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 200px;
			display: flex;
			align-items: center;
			justify-content: center;
			background: #461B76;
		}
		.menu-button {
			position: relative;
			display: block!important;
			width: 23px;
			height: 16px;
			border-top: 2px solid white;
			border-bottom: 2px solid white;
			cursor: pointer;
		}
		.menu-button:after {
			content: '';
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			width: 100%;
			height: 2px;
			background: white;
		}
	}
</style>

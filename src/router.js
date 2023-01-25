import { createWebHistory, createRouter } from 'vue-router';
import Home from '@/components/Home.vue';
import Heroes from '@/components/Heroes.vue';

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
	},
	{
		path: '/heroes',
		name: 'Heroes',
		component: Heroes,
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
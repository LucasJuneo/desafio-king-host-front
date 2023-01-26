import { createWebHistory, createRouter } from 'vue-router';
import Home from '@/components/Home.vue';
import Heroes from '@/components/Heroes.vue';
import Story from '@/components/Story.vue';
import About from '@/components/About.vue';

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
	{
		path: '/heroes/:id/stories',
		name: 'Story',
		component: Story,
	},
	{
		path: '/about',
		name: 'About',
		component: About,
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
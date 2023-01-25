import { createWebHistory, createRouter } from 'vue-router';
import Home from '@/components/Home.vue';
import Heroes from '@/components/Heroes.vue';
import Story from '@/components/Story.vue';

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
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
import { createRouter, createWebHistory } from "vue-router";

import AppHome from "./views/AppHome.vue";
import AppFilm from "./views/AppFilm.vue";
import AppSeries from "./views/AppSeries.vue";
import AppGenre from "./views/AppGenre.vue";

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: "/", name: "home", component: AppHome },
		{ path: "/film", name: "film", component: AppFilm },
		{ path: "/series", name: "series", component: AppSeries },
		{ path: "/genre", name: "genre", component: AppGenre },
	],
});

export { router };

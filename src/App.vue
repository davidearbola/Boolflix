<script>
import AppHeader from "./components/AppHeader.vue";
import FilmJumbo from "./components/FilmJumbo.vue";
import { RouterView } from "vue-router";

export default {
	components: {
		AppHeader,
		FilmJumbo,
	},
};
</script>

<template>
	<FilmJumbo />
	<AppHeader />
	<RouterView />
</template>

<style scoped></style>

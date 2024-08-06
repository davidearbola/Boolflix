<script>
import { RouterLink } from "vue-router";
import Store from "../data/store.js";
import axios from "axios";

export default {
	name: "AppHeader",
	data() {
		return {
			Store,
		};
	},
	methods: {
		searchByName(el, array) {
			const options = {
				method: "GET",
				url: "https://api.themoviedb.org/3/search/multi",
				params: { query: el, include_adult: "false", language: "en-US", page: "1" },
				headers: {
					accept: "application/json",
					Authorization:
						"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjY5N2EwNjU3NzNjN2Y4ZjM0ZTdmOGFjMjhjNWIxZCIsIm5iZiI6MTcyMjg1ODYyNy45MzM5MSwic3ViIjoiNjY1NzBjNTNlZjA1ZDkwNTA1NTk5NjM1Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.vI_Sn799TJ7qxVmvvWeUPf9SmS2_tLeQFqXmWndDvkw",
				},
			};
			axios.request(options).then((response) => {
				Store[array] = response.data.results;
			});
		},
	},
};
</script>

<template>
	<nav class="d-flex justify-content-center align-items-center gap-5">
		<span><router-link class="text-decoration-none text-white" :to="{ name: 'home' }">Home</router-link></span>
		<span><router-link class="text-decoration-none text-white" :to="{ name: 'film' }">Film</router-link></span>
		<span><router-link class="text-decoration-none text-white" :to="{ name: 'series' }">Series</router-link></span>
		<span @click="Store.selectedGenre = false"
			><router-link class="text-decoration-none text-white" :to="{ name: 'genre' }">Genre</router-link></span
		>
		<input type="text" placeholder="search" v-model="Store.inputValue" @input="searchByName(Store.inputValue, 'search')" />
	</nav>
</template>

<style scoped>
nav {
	height: 3rem;
}
input {
	outline: none;
	background-color: #222;
	color: gray;
	border: none;
	border-radius: 15px;
	padding: 0 1rem;
}
</style>

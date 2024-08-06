<script>
import axios from "axios";
import Store from "../data/store.js";
import FilmCard from "../components/FilmCard.vue";
export default {
	name: "AppHome",
	components: {
		FilmCard,
	},
	data() {
		return {
			popularFilm: null,
			popularTv: null,
			popularDay: null,
			Store,
		};
	},
	methods: {
		getPopularFilms() {
			const options = {
				method: "GET",
				url: "https://api.themoviedb.org/3/movie/popular",
				params: { language: "en-US", page: "1" },
				headers: {
					accept: "application/json",
					Authorization:
						"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjY5N2EwNjU3NzNjN2Y4ZjM0ZTdmOGFjMjhjNWIxZCIsIm5iZiI6MTcyMjg1ODYyNy45MzM5MSwic3ViIjoiNjY1NzBjNTNlZjA1ZDkwNTA1NTk5NjM1Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.vI_Sn799TJ7qxVmvvWeUPf9SmS2_tLeQFqXmWndDvkw",
				},
			};
			axios.request(options).then((response) => {
				this.popularFilm = response.data.results;
			});
		},
		getPopularTv() {
			const options = {
				method: "GET",
				url: "https://api.themoviedb.org/3/tv/popular",
				params: { language: "en-US", page: "1" },
				headers: {
					accept: "application/json",
					Authorization:
						"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjY5N2EwNjU3NzNjN2Y4ZjM0ZTdmOGFjMjhjNWIxZCIsIm5iZiI6MTcyMjg1ODYyNy45MzM5MSwic3ViIjoiNjY1NzBjNTNlZjA1ZDkwNTA1NTk5NjM1Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.vI_Sn799TJ7qxVmvvWeUPf9SmS2_tLeQFqXmWndDvkw",
				},
			};
			axios.request(options).then((response) => {
				this.popularTv = response.data.results;
			});
		},
		getPopularDay() {
			const options = {
				method: "GET",
				url: "https://api.themoviedb.org/3/trending/all/day",
				params: { language: "en-US" },
				headers: {
					accept: "application/json",
					Authorization:
						"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjY5N2EwNjU3NzNjN2Y4ZjM0ZTdmOGFjMjhjNWIxZCIsIm5iZiI6MTcyMjg1ODYyNy45MzM5MSwic3ViIjoiNjY1NzBjNTNlZjA1ZDkwNTA1NTk5NjM1Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.vI_Sn799TJ7qxVmvvWeUPf9SmS2_tLeQFqXmWndDvkw",
				},
			};
			axios.request(options).then((response) => {
				this.popularDay = response.data.results;
			});
		},
		changeJumbo(elemento) {
			Store.jumbo = elemento;
		},
	},
	mounted() {
		this.getPopularFilms();
		this.getPopularTv();
		this.getPopularDay();
	},
};
</script>

<template>
	<div class="my_container my_bar">
		<h3 v-if="popularFilm && !Store.inputValue">Film più visti</h3>
		<div v-if="popularFilm && !Store.inputValue" class="d-flex gap-2 overflow-x-scroll mb-3 my_bar pb-2">
			<FilmCard v-for="film in popularFilm" :el="film.poster_path" @mouseenter="changeJumbo(film)" />
		</div>
		<h3 v-if="popularTv && !Store.inputValue">Serie TV più viste</h3>
		<div v-if="popularTv && !Store.inputValue" class="d-flex gap-2 overflow-x-scroll mb-3 my_bar pb-2">
			<FilmCard v-for="serie in popularTv" :el="serie.poster_path" @mouseenter="changeJumbo(serie)" />
		</div>
		<h3 v-if="popularTv && !Store.inputValue">Film e Serie TV più viste oggi</h3>
		<div v-if="popularTv && !Store.inputValue" class="d-flex gap-2 overflow-x-scroll my_bar pb-2">
			<FilmCard v-for="record in popularDay" :el="record.poster_path" @mouseenter="changeJumbo(record)" />
		</div>
		<h3 v-if="Store.search && Store.inputValue">Ricerca: "{{ Store.inputValue }}"</h3>
		<div v-if="Store.search && Store.inputValue" class="d-flex flex-wrap gap-2 pb-2">
			<FilmCard v-for="record in Store.search" :el="record.poster_path" @mouseenter="changeJumbo(record)" />
		</div>
	</div>
</template>

<style scoped>
.my_container {
	height: calc(100% - 23rem);
	padding: 1rem;
	overflow-y: auto;
}
</style>

<script>
import axios from "axios";
import Store from "../data/store.js";
import FilmCard from "../components/FilmCard.vue";

export default {
	name: "AppFilm",
	components: {
		FilmCard,
	},
	data() {
		return {
			film: null,
			pageNum: 1,
			Store,
		};
	},
	methods: {
		getFilm(page) {
			const options = {
				method: "GET",
				url: "https://api.themoviedb.org/3/discover/movie",
				params: {
					include_adult: "false",
					include_video: "false",
					language: "en-US",
					page: page,
					sort_by: "popularity.desc",
				},
				headers: {
					accept: "application/json",
					Authorization:
						"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjY5N2EwNjU3NzNjN2Y4ZjM0ZTdmOGFjMjhjNWIxZCIsIm5iZiI6MTcyMjg1ODYyNy45MzM5MSwic3ViIjoiNjY1NzBjNTNlZjA1ZDkwNTA1NTk5NjM1Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.vI_Sn799TJ7qxVmvvWeUPf9SmS2_tLeQFqXmWndDvkw",
				},
			};
			axios.request(options).then((response) => {
				this.film = response.data.results;
				Store.jumbo = this.film[0];
			});
		},
		changeJumbo(elemento) {
			Store.jumbo = elemento;
		},
		next() {
			this.pageNum++;
			console.log(this.pageNum);
			this.getFilm(this.pageNum);
		},
		previous() {
			this.pageNum--;
			console.log(this.pageNum);
			this.getFilm(this.pageNum);
		},
	},
	mounted() {
		this.getFilm(this.pageNum);
	},
};
</script>

<template>
	<div v-if="!Store.inputValue" class="d-flex p-3">
		<span v-show="pageNum > 1" @click="previous()">Indietro</span>
		<span class="ms-auto" @click="next()">Avanti</span>
	</div>
	<div class="my_container my_bar">
		<div v-if="film && !Store.inputValue" class="d-flex gap-2 flex-wrap justify-content-between pb-2">
			<FilmCard v-for="film in film" :el="film.poster_path" @mouseenter="changeJumbo(film)" />
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

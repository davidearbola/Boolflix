<script>
import axios from "axios";
import Store from "../data/store.js";
import FilmCard from "../components/FilmCard.vue";

export default {
	name: "AppGenre",
	components: {
		FilmCard,
	},
	data() {
		return {
			genreFilm: null,
			genreTv: null,
			Store,
			movieStr: "movie",
			tvStr: "tv",
			film: null,
			tv: null,
		};
	},
	methods: {
		getGenre(el, array) {
			const options = {
				method: "GET",
				url: `https://api.themoviedb.org/3/genre/${el}/list`,
				params: { language: "en" },
				headers: {
					accept: "application/json",
					Authorization:
						"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjY5N2EwNjU3NzNjN2Y4ZjM0ZTdmOGFjMjhjNWIxZCIsIm5iZiI6MTcyMjg1ODYyNy45MzM5MSwic3ViIjoiNjY1NzBjNTNlZjA1ZDkwNTA1NTk5NjM1Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.vI_Sn799TJ7qxVmvvWeUPf9SmS2_tLeQFqXmWndDvkw",
				},
			};
			axios.request(options).then((response) => {
				this[array] = response.data.genres;
			});
		},
		getGenreFilm(el) {
			Store.genreStr = "movie";
			Store.selectedGenre = true;
			let idGenre = el;
			const options = {
				method: "GET",
				url: "https://api.themoviedb.org/3/discover/movie",
				params: {
					include_adult: "false",
					include_video: "false",
					language: "en-US",
					page: "1",
					sort_by: "popularity.desc",
					with_genres: idGenre,
				},
				headers: {
					accept: "application/json",
					Authorization:
						"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjY5N2EwNjU3NzNjN2Y4ZjM0ZTdmOGFjMjhjNWIxZCIsIm5iZiI6MTcyMjg1ODYyNy45MzM5MSwic3ViIjoiNjY1NzBjNTNlZjA1ZDkwNTA1NTk5NjM1Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.vI_Sn799TJ7qxVmvvWeUPf9SmS2_tLeQFqXmWndDvkw",
				},
			};
			axios.request(options).then((response) => {
				this.film = response.data.results;
			});
		},
		getGenreTv(el) {
			Store.genreStr = "tv";
			Store.selectedGenre = true;
			let idGenre = el;
			const options = {
				method: "GET",
				url: "https://api.themoviedb.org/3/discover/tv",
				params: {
					include_adult: "false",
					include_video: "false",
					language: "en-US",
					page: "1",
					sort_by: "popularity.desc",
					with_genres: idGenre,
				},
				headers: {
					accept: "application/json",
					Authorization:
						"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjY5N2EwNjU3NzNjN2Y4ZjM0ZTdmOGFjMjhjNWIxZCIsIm5iZiI6MTcyMjg1ODYyNy45MzM5MSwic3ViIjoiNjY1NzBjNTNlZjA1ZDkwNTA1NTk5NjM1Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.vI_Sn799TJ7qxVmvvWeUPf9SmS2_tLeQFqXmWndDvkw",
				},
			};
			axios.request(options).then((response) => {
				this.tv = response.data.results;
			});
		},
		changeJumbo(elemento) {
			Store.jumbo = elemento;
		},
	},
	mounted() {
		this.getGenre(this.movieStr, "genreFilm");
		this.getGenre(this.tvStr, "genreTv");
	},
};
</script>

<template>
	<div v-if="genreFilm && genreTv && !Store.selectedGenre && !Store.inputValue" class="my_container my_bar">
		<div class="row">
			<p class="col-6">Generi Film:</p>
			<p class="col-6">Generi Serie Tv:</p>
		</div>
		<div class="row m-0">
			<div class="col-6 d-flex flex-wrap my_border">
				<div class="col-3 py-2 mb-2" v-for="genre in genreFilm" @click="getGenreFilm(genre.id)">
					<span class="my_genre">{{ genre.name }}</span>
				</div>
			</div>
			<div class="col-6 d-flex flex-wrap">
				<div class="col-4 py-2 mb-2" v-for="genre in genreTv" @click="getGenreTv(genre.id)">
					<span class="my_genre">{{ genre.name }}</span>
				</div>
			</div>
		</div>
	</div>
	<div v-if="Store.selectedGenre && !Store.inputValue" class="my_container my_bar">
		<div v-if="film && Store.genreStr == 'movie'" class="d-flex gap-2 flex-wrap justify-content-between pb-2">
			<FilmCard v-for="film in film" :el="film.poster_path" @mouseenter="changeJumbo(film)" />
		</div>
		<div v-if="tv && Store.genreStr == 'tv'" class="d-flex gap-2 flex-wrap justify-content-between pb-2">
			<FilmCard v-for="tv in tv" :el="tv.poster_path" @mouseenter="changeJumbo(tv)" />
		</div>
	</div>
	<div v-if="Store.inputValue" class="my_container my_bar">
		<h3 v-if="Store.search && Store.inputValue">Ricerca: "{{ Store.inputValue }}"</h3>
		<div v-if="Store.search && Store.inputValue" class="d-flex flex-wrap gap-2 pb-2">
			<FilmCard v-for="record in Store.search" :el="record.poster_path" @mouseenter="changeJumbo(record)" />
		</div>
	</div>
</template>

<style scoped>
.my_genre {
	background-color: #222;
	border-radius: 15px;
	padding: 0.5rem 1rem;
}

.my_container {
	height: calc(100% - 23rem);
	padding: 1rem;
	overflow-y: auto;
}

.my_border {
	border-right: 2px solid #222;
}
</style>

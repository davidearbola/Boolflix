<script>
import Store from "../data/store.js";
export default {
	name: "FilmJumbo",
	data() {
		return {
			Store,
		};
	},
	methods: {
		getImg(elemento) {
			return `https://image.tmdb.org/t/p/w1280/${elemento}`;
		},
	},
};
</script>

<template>
	<div v-if="Store.jumbo" class="my_jumbo">
		<div class="my_box_img">
			<img :src="getImg(Store.jumbo.backdrop_path)" />
		</div>
		<div class="my_box_details">
			<h3 v-if="Store.jumbo.original_title">{{ Store.jumbo.original_title }}</h3>
			<h3 v-if="Store.jumbo.original_name">{{ Store.jumbo.original_name }}</h3>
			<p>{{ Store.jumbo.overview }}</p>
		</div>
	</div>
</template>

<style scoped>
.my_jumbo {
	height: 20rem;
	width: 100%;
	position: relative;
}

.my_box_img {
	width: 100%;
	height: 100%;
	position: absolute;
}

.my_box_details {
	width: 40%;
	height: 100%;
	padding: 1rem;
	background-color: rgba(0, 0, 0, 0.311);
	z-index: 999;
	position: relative;
	overflow: hidden;
}

img {
	object-fit: cover;
	object-position: center;
	width: 100%;
	height: 100%;
}
</style>

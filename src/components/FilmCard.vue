<script>
export default {
	name: "FilmCard",
	props: ["el", "details"],
	data() {
		return {};
	},
	methods: {
		getImg(elemento) {
			return `https://image.tmdb.org/t/p/w500/${elemento}`;
		},
	},
};
</script>

<template>
	<img class="my_poster" :src="getImg(el)" />
</template>

<style scoped>
.my_poster {
	width: 200px;
}
</style>

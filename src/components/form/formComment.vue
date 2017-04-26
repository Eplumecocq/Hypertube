<template>
	<div class="formComment-container">
		<article class="media">
			<figure class="media-left">
					<p class="image is-64x64">
					<img :src="src">
					</p>
			</figure>
			<div class="media-content">
					<div class="field">
						<p class="control">
							<textarea class="textarea" v-model="message" @keyup="verifyComment" placeholder="Add a comment..."></textarea>
						</p>
					</div>
					<div class="field">
						<p class="control">
							<button class="button is-primary is-outlined" :disabled="error != '' ? true : false" @click="createComment" >Post comment</button>
						</p>
					</div>
					<div v-if="error != ''" class="error-comment is-danger">{{ error }}</div>
				</div>
		</article>
	</div>
</template>

<script>
import { EventBus } from '../../bus'
const movieService = require('../../services/movie.service')
'use strict'
export default {
	name: 'formComment',
	props: ['username', 'imdbId'],
	data: function () {
		return {
			message: '',
			error: '',
			timestamp: 0
		}
	},
	computed: {
		src: function () {
			return `/pictures/${this.username}?${this.timestamp}`
		}
	},
	created: function () {
		this.timestamp = Date.now()
	},
	methods: {
		verifyComment: function () {
			let pattern = new RegExp(/^[a-zA-Z0-9'\s().:,-]{5,500}$/)
			let result = pattern.test(this.message)
			if (result == false && this.message != '')
				this.error = "Your comment must only contains letters, and have between 5 and 500 characters"
			else
				this.error = ''
		},
		createComment: function () {
			movieService.createComment(this.message, this.imdbId)
				.then(function (res) {
					if (!res.data.error) {
						EventBus.$emit('addCom', { username: this.username, comment: this.message })
						this.message = ''
					}
					else
						console.log('something went wrong!')
				}.bind(this))
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../../scss/_variables.scss';
.textarea {
  background-color: $medium-grey;
  margin-bottom: 10px !important;
	border: 0;
  font-family: $font-fira;
	font-size: 15px;
  color: white;
  &:focus{
    outline: none;
    border-color: white;
  }
}
.formComment-container {
    margin-top: 40px;
		margin-left: auto;
		margin-right: auto;
		width: 70%;
}
.is-64x64 img {
  width: 64px !important;
  height: 64px !important;
}
.button {
	float: right;
}
.error-comment {
	font-size: 20px;
}
</style>
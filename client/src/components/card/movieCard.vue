<template>
<div class="grid movie-card-container" @mouseenter="showInfo = true" @mouseleave="showInfo = false">
    <figure class="" v-bind:class="{'watched-movie': watched}">
        <img :src="movie.imageMedium"/>
        <div v-if="watched" class="watched-movie-container">
          <h2>WATCHED</h2>
        </div>
        <div class="info-movie-container" id="info_movie" v-if="showInfo && !watched">
          <span class="overtext over-title">{{movieTitle}} ({{movie.productionYear}})</span>
          <span class="overtext over-rating">{{movie.rating}} / 10</span>
          <span class="overtext over-genres">{{movieGenres}}</span>
        </div>
    </figure>
</div>
</template>

<script>
'use strict'
export default {
  name: 'movie-card',
  props: ['movie', 'userMovie'],
  data () {
    return {
      showInfo: false
    }
  },
  computed: {
    watched: function () {
      if (this.userMovie)
        return (this.userMovie.indexOf(this.movie.imdbId) != -1)
      return false
    },
    movieGenres: function () {
      return this.movie.genres.join(', ')
    },
    movieSummary: function () {
      return this.movie.summary.substr(0, 100) + '…'
    },
    movieTitle: function () {
      if (this.movie.title.length > 23)
        return this.movie.title.substr(0, 23) + '…'
      return this.movie.title
    }
  }
 }
</script>

<style lang="scss" scoped>
@import '../../scss/_variables.scss';
.info-movie-container {
    overflow: hidden;
}
.movie-card-container {
    height: 100%;
}
.movie-card-container .info-movie-container .overtext {
    opacity: 0;
    position: absolute;
    width: 100%;
}
.movie-card-container:hover img {
    filter: brightness(30%);
    transition: all .3s;
}
.movie-card-container:hover {
    border: 3px solid $orange-red;
}
.movie-card-container:hover .info-movie-container .overtext {
  opacity: 1;
  color: white;
  padding: 10px;
  transition: all .3s ease .3s;
  font-family: $font-oswald;
}
.over-title {
  top: 0;
  word-break: break-word;
  left: 50%;
  transform: translateX(-50%);
  font-size: 28px;
}
.over-rating {
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  font-size: 20px;
}
.over-genres {
  top: 40%;
  left: 50%;
  font-size: 18px;
  font-weight: 100;
  transform: translateX(-50%);    
}
.over-year {
  top: 50%;
  left: 50%;
  font-size: 18px;
  font-weight: 100;
}
.grid {
	position: relative;
	text-align: center;
}
.grid img {
  width: 100%;
  height: 100%;
	position: relative;
	display: block;
}
.grid figure {
  height: 100%;
}
.watched-movie img {
  filter: brightness(30%);
}
.watched-movie {
  border: none;
}
.watched-movie-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  color: rgba(255, 255, 255, 0.7);
  font-size: 30px;
  font-family: $font-fira;
}
</style>

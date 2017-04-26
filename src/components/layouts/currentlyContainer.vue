<template>
  <div v-if="movies" class="currentlyContainer">
      <router-link v-for="movie in movies" :to="'/movies/' + movie.imdbId" :key="movie.imdbId" class="movie-card-link in-container">
        <movie-card class="trigger" :movie="movie"></movie-card>
        <div class="progress toshow">
          <div class="progress__filled" :style="movie.progress"></div>
        </div>
      </router-link>
  </div>
</template>

<script>
'use strict'
const userService = require('../../services/user.service.js')
const movieService = require('../../services/movie.service.js')

export default {
  name: 'currentlyContainer',
  components: {
    'movie-card': require('../../components/card/movieCard')
  },
  data() {
    return {
     movies: []
    }
  },
  created: function () {
    userService.getCurrentUser()
      .then(res => {
        if (res.data.data) {
          let currentMovies = res.data.data.currentMovies
          currentMovies.map(movie => {
            movieService.getMovie(movie.imdbId)
              .then(res => {
                if (res.data.data) {
                  let currMovie = res.data.data
                  let currentProgress = (movie.timestamp / (currMovie.runtime * 60)) * 100
                  currMovie.progress = `flex-basis: ${currentProgress}%`
                  this.movies.push(currMovie)
                }
              })
          })
        }
      })
  }
}
</script>

<style lang="scss" scoped>
@import '../../scss/_variables.scss';
.currentlyContainer {
  position: relative;
  display: flex;
  flex: 1 1 0;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: flex-start;
  padding-left: 20px;
  padding-right: 20px;
  margin-bottom: 15px;
}
.movie-card-link {
  width: 235px;
}
.progress {
  margin-top: 5px;
  flex: 10;
  position: relative;
  display: flex;
  width: 95%;
  margin-left: auto;
  margin-right: auto;
  flex-basis: 100%;
  height: 5px;
  transition: height 0.3s;
  background:rgba(0,0,0,0.5);
}
.progress__filled {
  flex: 0;
  background: $light-grey;
}
.toshow {
  display: flex;
}
.in-container {
  margin-top: 20px;
}
@media screen and (max-width: 2600px) {
  .currentlyContainer .movie-card-link {
    width: calc(1 / 10 * 100%);
  }
}
@media screen and (max-width: 2500px) {
  .currentlyContainer .movie-card-link {
    width: calc(1 / 9 * 100%);
  }
}
@media screen and (max-width: 2300px) {
  .currentlyContainer .movie-card-link{
    width: calc(1 / 8 * 100%);
  }
}
@media screen and (max-width: 2000px) {
  .currentlyContainer .movie-card-link {
    width: calc(1 / 7 * 100%);
  }
}
@media screen and (max-width: 1800px) {
  .currentlyContainer .movie-card-link {
    width: calc(1 / 6 * 100%);
  }
}
@media screen and (max-width: 1500px) {
    .currentlyContainer .movie-card-link {
    width: calc(1 / 5 * 100%);
  }
}
@media screen and (max-width: 1200px) {
    .currentlyContainer .movie-card-link {
    width: calc(1 / 4 * 100%);
  }
}
@media screen and (max-width: 900px) {
    .currentlyContainer .movie-card-link {
    width: calc(1 / 3 * 100%);
  }
}
@media screen and (max-width: 600px) {
    .currentlyContainer .movie-card-link {
    width: calc(1 / 2 * 100%);
  }
}
@media screen and (max-width: 400px) {
    .currentlyContainer .movie-card-link {
    width: 90%;
  }
}
@media screen and (max-width: 200px) {
    .currentlyContainer .movie-card-link {
    width: 80%;
  }
}
</style>

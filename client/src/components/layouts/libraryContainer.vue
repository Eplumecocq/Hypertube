<template>
  <div @scroll="fetchData" ref="mainContainer" class="main-container">
      <div ref="topSpace" style="width: 100%; height: 0px"></div>
      <div :class="{'hover-locked': hoverLocked}" id="lib" v-if="movies.length > 0 && typeof userMovie != 'string'" ref="container" class="library-container">
        <router-link v-for="movie in movies" :to="'/movies/' + movie.imdbId" :key="movie.imdbId"
                     class="movie-card-link in-container">
          <movie-card :movie="movie" :userMovie="userMovie"></movie-card>
        </router-link>
      </div>
      <div class="shrug" v-if="movies.length === 0 && loading != true">¯\_(ツ)_/¯</div>
  </div>
</template>

<script>
import { EventBus } from '../../bus'
const movieService = require('../../services/movie.service.js')
const userService = require('../../services/user.service.js')

export default {
  name: 'library-container',
  components: {
    'movie-card': require('../../components/card/movieCard')
  },
  data: function () {
    return {
      loading: true,
      open: false,
      movies: [],
      offset: 200,
      lock: false,
      hoverLocked: false,
      lastQuery: '',
      userMovie: '',
      count: 0,
      width: 0,
      TOGGLER: 6,
      LIMIT: 200,
      REMOVE: 3,
      SCROLL: 0.9,
      HEADER: 49
    }
  },
  mounted: function () {
    movieService.getMovies('limit=' + this.LIMIT + '&axis=-1')
      .then(res => {
        this.movies = res.data.data
        this.loading = false
      })
    userService.getCurrentUser()
      .then(res => this.userMovie = res.data.data.seenMovies)
    EventBus.$on('search', function (query) {
      this.loading = true
      let q = ''
      for (let data in query) {
        if (query[data] != ' ' && query[data])
          q = q + data + '=' + query[data] + '&'
      }
      this.lastQuery = q 
      movieService.getMovies(q.slice(0, -1))
        .then(res => {
          this.loading = false
          if (res.data.data && res.data.data.length > 0)
            this.movies = res.data.data
          else {
            this.movies = []
          }
        })
    }.bind(this))
  },
  methods: {
    fetchData: function (e) {
      this.loading = true
      this.hoverLocked = true;
      if (this.scrollTimeout) 
        clearTimeout(this.scrollTimeout);
      this.scrollTimeout = setTimeout(() => this.hoverLocked = false, 400);
      let movieCards = Array.from(document.querySelectorAll('.in-container'))
      if (movieCards && movieCards.length > 0) {
        this.empty = false
        let pos = e.currentTarget.scrollTop
        let scrollHeight = e.currentTarget.scrollHeight
        let card = movieCards[0].getBoundingClientRect()
        let imageSize = card.height
        let bottom = movieCards[movieCards.length - 1].getBoundingClientRect().bottom -
                    this.$refs.mainContainer.offsetHeight - this.HEADER
        let i = 0
        
        while (i < movieCards.length - 1 && movieCards[i].getBoundingClientRect().bottom
          == movieCards[i + 1].getBoundingClientRect().bottom)
          i = i + 1
        this.width = i + 1
        if (bottom <= imageSize * this.TOGGLER && this.lock == false) {
          this.lock = true
          movieService.getMovies(this.lastQuery + 'offset=' + this.offset + '&limit=' + (this.width * this.REMOVE))
            .then(res => {
              this.loading = false
              this.movies.push(...res.data.data)
              this.offset = this.offset + this.width * 3
              this.$nextTick(() => {
                this.lock = false
              })
            })
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../scss/_variables.scss';
.hover-locked {
  pointer-events: none;
}
.library-container {
  position: relative;
  overflow: auto;
  display: flex;
  flex: 1 1 0;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: flex-start;
}
.main-container {
  position: absolute;
  top: 3.5rem;
  bottom: 0;
  left: 0;
  overflow: auto;
  right: 240px;
  transition: right .4s;
}

.is-sidebar-close .main-container {
  right: 0;
}

.my-title{
  position: absolute;
  color: white !important;
  top: 400px;
  left: 20px;
  font-family: $font-fira;
}

.movie-card-link{
  width: 235px;
}

@media screen and (max-width: 2600px) {
  .library-container .movie-card-link{
    width: calc(1 / 10 * 100%);
  }
}
@media screen and (max-width: 2500px) {
  .library-container .movie-card-link{
    width: calc(1 / 9 * 100%);
  }
}
@media screen and (max-width: 2300px) {
  .library-container .movie-card-link{
    width: calc(1 / 8 * 100%);
  }
}
@media screen and (max-width: 2000px) {
  .library-container .movie-card-link{
    width: calc(1 / 7 * 100%);
  }
}
@media screen and (max-width: 1800px) {
  .library-container .movie-card-link{
    width: calc(1 / 6 * 100%);
  }
}
@media screen and (max-width: 1500px) {
  .library-container .movie-card-link{
    width: calc(1 / 5 * 100%);
  }
}
@media screen and (max-width: 1200px) {
  .library-container .movie-card-link{
    width: calc(1 / 4 * 100%);
  }
}
@media screen and (max-width: 900px) {
  .library-container .movie-card-link{
    width: calc(1 / 3 * 100%);
  }
}
@media screen and (max-width: 770px) {
   .main-container {
    right: 0;
  }
}
@media screen and (max-width: 600px) {
  .library-container .movie-card-link {
    width: calc(1 / 2 * 100%);
  }
}
@media screen and (max-width: 400px) {
  .library-container .movie-card-link {
    width: 100%;
  }
}
.shrug {
  color: white;
  left: 50%;
  transform: translateX(-50%);
  font-size: 100px;
  position: absolute;
}
</style>

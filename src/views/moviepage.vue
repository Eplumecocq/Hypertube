<template>
  <div class="is-global-container has-grey-background">
    <header-no-side></header-no-side>
    <div class="main-player-container">
    <section v-if="Object.keys(movie).length > 5" class="player-container has-linear-gradient" :style="{'background-image' : 'url('+background+')'}">
      <div class="player-component above-overlay">
        <player :movie="movie"></player>
      </div>
      <div class="info-movie above-overlay">
        <infoMovie :movie="movie"></infoMovie>
      </div>
    </section>
    <section class="comment-area-container">
      <span class="area__toggler" v-if="comments" @click="areaToggler">
        <span class="icon is-big">
          <i v-if="!toShow" class="fa fa-eye"></i>
          <i v-else class="fa fa-eye-slash"></i>
        </span>
        Comments ({{comments.length}})
      </span>
      <div class="" v-if="movie && toShow"> 
        <comments v-for="comment in comments" :key="comment.username" :username="comment.username" :content="comment.comment"></comments>
      </div>
      <formComment v-if="movie && username && id" :imdbId="id" :username="username"></formComment>
    </section>
    </div>
  </div>
</template>

<script>
'use strict'
import { EventBus } from '../bus'
const movieService = require('../services/movie.service.js')
const userService = require('../services/user.service.js')

export default {
  props: ['imdbId'],
  name: 'moviepage',
  components: {
    'header-no-side' : require('../components/layouts/headerNoSide'),
    'player': require('../components/assets/player'),
    'comments' : require('../components/assets/comments'),
    'formComment' : require('../components/form/formComment'),
    'infoMovie' : require('../components/assets/infoMovie')
  },
  data: function () {
    return {
      id: '',
      movie: {},
      comments: [],
      background: '',
      username: '',
      toShow: false,
      seenMovies: ''
    }
  },
  beforeRouteEnter(to, from, next) {
    if (to.params && to.params.imdbId)
      movieService.getMovie(to.params.imdbId).then(res => {
        if (typeof res.data.data.length == "undefined")
          next(function (vm) {
            vm.movie = res.data.data
            vm.comments = res.data.data.comments
            vm.background = vm.movie.background
          })
        else
          next('/')
      })
    else
      next('/')
  },
  created: function () {
    this.id = this.$route.params.imdbId
    userService.getCurrentUser().then(res => {
      this.username = res.data.data.username
    })
    EventBus.$on('addCom', function (data) {
      this.comments.push(data)
    }.bind(this))
  },
  methods: {
    areaToggler: function () {
      this.toShow = !this.toShow
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/_variables.scss';
.has-linear-gradient::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-size: 55%;
  transform: translate3d(0,0,0);
  background: linear-gradient(to bottom, transparent, $background-grey);
}

.above-overlay{
  z-index: 200;
}

.player-container {
  position: relative;
  display: flex;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
  z-index: 1;
}

.comment-area-container {
  margin-top: 30px;
  position: relative;
  padding: 10px;
  z-index: 1;
}

.player-component {
  position: relative;
  height: 100%;
  max-width: 1150px;
  max-height: 710px;
  width: 60%;
}

.info-movie {
  position: relative;
  width: 40%;
  height: 100%;
  padding: 10px;
}

.area__toggler {
  position: relative;
  left: 170px;
  /*bottom: 21px;*/
  color: $light-grey;
  font-family: $font-fira;
    &:hover {
      color: $orange-red;
      cursor: pointer;
    }
}

.main-player-container {
  display: block;
}

@media screen and (max-width: 950px) {
  .player-container {
    flex-direction: column;
  }
  .player-component {
    width: 100%;
  }
}

@media screen and (max-width: 950px) {
  .info-movie {
    width: 100%;
  }
}
</style>

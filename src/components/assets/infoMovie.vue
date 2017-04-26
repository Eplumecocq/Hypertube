<template>
  <div class="movie-info-container">
    <div class="movie-info-header">
      <h1 class="title is-2 my--title">{{movie.title}}</h1>
        <div class="info">
            <p>
              <span class="icon is-small">
                <i class="fa fa-clock-o"></i>
              </span> {{movie.runtime}} min
            </p>
            <p>
              <span class="icon is-small">
                <i class="fa fa-star-o"></i>
              </span> {{movie.rating}}/10
            </p>
            <p>
              <span class="icon is-small">
                <i class="fa fa-calendar"></i>
              </span> {{movie.productionYear}}
            </p>
            <p>
              <span class="icon is-small">
                <i class="fa fa-globe"></i>
              </span> {{movie.language}}
            </p>
        </div>
    </div>
    <div class="movie-info-summary">
      <p>{{movie.summary}}</p>
    </div>
    <div class="movie-info-cast">
      <div class="value-content"><p><strong class="key-content">Directed by : </strong>{{movieDirectors}}</p></div>
      <div class="value-content"><p><strong class="key-content">Produced by : </strong>{{movieProducers}}</p></div>
      <div class="value-content"><p><strong class="key-content">Casting : </strong>{{movieCasting}}</p></div>
      <div class="value-content"><p><strong class="key-content">Genres : </strong>{{movieGenres}}</p></div>
    </div>  
  </div>
</template>

<script>
'use strict'
  export default {
    name: 'info-movie',
    props: ['movie'],
    computed: {
      movieGenres: function () {
        return this.movie.genres.join(', ')
      },
      movieCasting: function () {
        return this.movie.actors.slice(0, 10).join(', ')
      },
      movieDirectors: function () {
        return this.movie.directors.join(', ')
      },
      movieProducers: function () {
        return this.movie.producers.slice(0, 3).join(', ')
      }
  }
}
</script>

<style lang="scss" scoped>
@import '../../scss/_variables.scss';
.movie-info-container {
  display: flex;
  flex-direction: column;
}
.movie-info-header {
  position: relative;
  width: 100%;
  text-align: center;
}
.movie-info-header, .movie-info-summary, .movie-info-cast {
  padding: 10px;
}
.info {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
}
.info p {
  margin-left: 20px;
  color: white;
  font-size: 15px;
  text-shadow: 0 0 3px rgba(0,0,0, .50);
  font-family: $font-fira;
  line-height: 1rem;  
    &:first-of-type{
      margin-left: 0;
    }
}
.movie-info-summary {
  width: 100%;
}
.movie-info-summary p {
  margin-top: 28px;
  color: white;
  font-size: 15px;
  font-family: $font-fira;
}
.my--title {
  margin-top: 10px;
  color: white;
  font-weight: 700;
  font-family: $font-oswald;
  text-shadow: 0 0 5px rgba(0,0,0, .50);
  margin-bottom: 10px !important;
}
.info-cast-content, .value-content {
  color: white;
  font-family: $font-fira;
}
.key-content {
  color: $light-grey;
  text-shadow: 0 0 3px rgba(0,0,0, .50);  
}
.value-content {
  margin-top: 10px;
}
</style>

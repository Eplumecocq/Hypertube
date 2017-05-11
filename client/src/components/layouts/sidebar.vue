<template>
 <div class="my--sidebar">
   <div class="search-container">
    <div class="field has-small-padd">
      <p class="control has-icon">
        <input v-on:change="search" id="searchData" class="input sidebar-input-search" type="text" placeholder="Search">
        <span class="icon is-small">
          <i class="fa fa-search"></i>
        </span>
      </p>
    </div>
   </div>
   <div class="filters-container">
     <sidebar-select multiple labelName="Search By" class="sidebar-select-style" name="type"
                     id="searchType" :options="types" v-on:input="search"></sidebar-select>
     <sidebar-select multiple="true" class="sidebar-select-style is-upper" labelName="Filter By" name="genre"
                     id="selectedGenres" :options="genres" v-on:input="search"></sidebar-select>
     <sidebar-select class="sidebar-select-style" labelName="Order By" name="sort"
                     id="orderType" v-on:input="search" :options="sort" :enabler="0"></sidebar-select>
     <div class="slide-contain">
       <custom-slider name="date" labelName="Year" minVal="1920" maxVal="2017"></custom-slider>
       <custom-slider name="rating" labelName="Rating" minVal="0" maxVal="10"></custom-slider>
     </div>
   </div>
  </div>
</template>

<script>
const movieService = require('../../services/movie.service.js')
import { EventBus } from '../../bus'
export default {
  name: 'sidebar',
  components: {
    'sidebar-select': require('../form/selectSidebar'),
    'custom-slider': require('../form/materialSlider')
  },
  data: function () {
    return {
      sort: {
        asc: [
          { text:'IMDb rating', value: 'Asc/rating' },
          { text: 'Year', value: 'Asc/productionYear' }],
        desc: [
          { text:'IMDb rating', value: 'Desc/rating' },
          { text: 'Year', value: 'Desc/productionYear' }],
      },
      orderType: 'title',
      axis: 1,
      genres: ["Action", "Adventure", "Animation", "Biography",
               "Comedy", "Crime", "Documentary", "Drama", "Family", "Fantasy",
               "Film-noir", "History", "Horror", "Music", "Musical", "Mystery",
               "Romance", "Sci-Fi", "Sport", "Thriller", "War", "Western"],
      selectedGenres: [''],
      types: ['Title', 'Actors', 'Producers', 'Directors'],
      searchType: 'title',
      searchData: ' ',
      dateMin: 1800,
      dateMax: 2017,
      ratingMin: 0,
      ratingMax: 10
    }
  },
  mounted: function () {
    EventBus.$on('multiple', function (value) {
      this.selectedGenres = value
      EventBus.$emit('search', {
        q: this.searchData,
        search: this.searchType,
        order: this.orderType,
        axis: this.axis,
        date: this.dateMin + ',' + this.dateMax,
        rating: this.ratingMin + ',' + this.ratingMax,
        genres: this.selectedGenres
      })
    }.bind(this))
    EventBus.$on('slider', function (value) {
      for (let i in value) {
        this[i] = value[i]
      }
      EventBus.$emit('search', {
        q: this.searchData,
        search: this.searchType,
        order: this.orderType,
        axis: this.axis,
        date: this.dateMin + ',' + this.dateMax,
        rating: this.ratingMin + ',' + this.ratingMax,
        genres: this.selectedGenres
      })
    }.bind(this))
  },
  methods: {
    search: function (e) {
      let value = e.currentTarget.value
      let id = e.currentTarget.id
      if (value.includes('Desc/')) {
        this.axis = -1
        this.orderType = value.split('/')[1]
      }
      else if (value.includes('Asc/')) {
        this.axis = 1
        this.orderType = value.split('/')[1]
      }
      else {
        this[id] = value
      }
      EventBus.$emit('search', {
        q: this.searchData,
        search: this.searchType,
        order: this.orderType,
        axis: this.axis,
        date: this.dateMin + ',' + this.dateMax,
        rating: this.ratingMin + ',' + this.ratingMax,
        genres: this.selectedGenres
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../scss/_variables.scss';
.my--sidebar {
  position: absolute;
  right: 0;
  width: 240px;
  height: 100vh;
  z-index: 0;
  background-color: $background-grey;
  transition: transform .4s;
  border-left: 1px solid $light-grey;
}
.is-sidebar-close .my--sidebar {
  transform: translateX(100%);
}
.search-container {
  border-bottom: 1px solid $light-grey;
  min-height: 3.5rem;
    @media screen and (max-width: 844px){
      min-height: 50px;
    }
}
.has-small-padd {
  padding-top: 5px;
}
.sidebar-input-search {
  background-color: transparent;
  border: none;
  outline: none;
  margin-left: -4px;
  margin-top: 3px;
  font-family: $font-fira;
  font-size: 15px;
  color: white;
}
.icon {
  margin-top: 2px;
}
.filters-container {
  margin: 20px;
  height: 30rem;
  max-height: 60rem;
}
.reset-button {
  margin-top: 70px;
  width: 100%;
}
.is-upper span {
  bottom: 100px !important;
}
</style>

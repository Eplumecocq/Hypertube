<template>
  <div class="is-global-container has-grey-background">
    <header-nav></header-nav>
    <div>
      <currently-container></currently-container>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'mymovies',
    components: {
      'header-nav': require('../components/layouts/headerNoSide'),
      'movie-card': require('../components/card/movieCard'),
      'currently-container': require('../components/layouts/currentlyContainer')
    },
    data () {
      return {
      }
    }
  }
</script>

<style lang="scss" scoped>
@import '../scss/_variables.scss';

</style>
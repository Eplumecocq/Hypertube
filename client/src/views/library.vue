<template>
  <div class="is-global-container has-grey-background" v-bind:class="{'is-sidebar-close': open}">
    <header-nav v-on:sidebarState="open = !open"></header-nav>
    <div>
      <library-container></library-container>
    </div>
    <sidebar-nav></sidebar-nav>
  </div>
</template>

<script>
export default {
  components: {
    'header-nav': require('../components/layouts/header'),
    'sidebar-nav': require('../components/layouts/sidebar'),
    'library-container': require('../components/layouts/libraryContainer'),
  },
  data: function() {
    return {
      open: false,
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

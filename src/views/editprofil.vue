<template>
<div class="has-grey-background is-global-container">
  <header-no-side></header-no-side>
    <div class="container my--container">
      <div class="columns column is-offset-2">
        <edit-form></edit-form>
      </div>
    </div>
</div>
</template>

<script>
  export default {
    components: {
      'edit-form': require('../components/form//formEditProfil'),
      'avatar': require('../components/assets/avatar'),
      'header-no-side' : require('../components/layouts/headerNoSide'),
    }
  }
</script>

<style lang="scss" scoped>
@import '../scss/_variables.scss';

.my--container{
  margin-top: 100px !important;
}

</style>

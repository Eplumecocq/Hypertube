<template>
<div class="has-grey-background is-global-container">
    <div class="container my--container">
      <form-title title="Login"></form-title>
      <login-form></login-form>
    </div>
</div>
</template>

<script>
  export default {
    components: {
      'login-form': require('../components/form/formLogin'),
      'form-title': require('../components/assets/sectionTitle')
    }
  }
</script>

<style lang="scss" scoped>
@import '../scss/_variables.scss';
.my--container{
  margin-top: 100px;
}
</style>

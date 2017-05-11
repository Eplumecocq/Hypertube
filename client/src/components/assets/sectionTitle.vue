<template>
  <div class="form-title-container">
      <h1 class="title is-2 form-title-color">{{title}}</h1>
  </div>
</template>

<script>
export default {
  props:
    ['title']
}

</script>

<style lang="scss" scoped>
@import '../../scss/_variables.scss';
.form-title-container {
  text-align: center;
  margin-bottom: 50px;
}
.form-title-color {
  color: white;
}
</style>

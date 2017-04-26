<template>
  <div class="column is-4 center-image-Incolumn">
    <figure>
      <img
        :src="src"
        class="my--image-square">
    </figure>
  </div>
</template>

<script>
export default {
  props: ['src']
}
</script>

<style lang="scss" scoped>
@import '../../scss/_variables.scss';
 .my--image-square {
   width: 200px;
   margin-top: 40px;
   cursor: pointer; 
 }
 .center-image-Incolumn {
   text-align: center;
 }
</style>


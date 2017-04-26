<template>
  <div id="app">
    <transition
      name="pageAnimation"
      >
     <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang='scss' scoped>
.pageAnimation-enter, .pageAnimation-leave-to{
  opacity: 0;
  position: absolute;
  transform: translateX(-100vh);
}

.pageAnimation-enter-active, .pageAnimation-leave-active{
  transition: opacity .9s ease-in-out .1s, transform .9s ease-in-out .1s;
}
</style>

<template>
  <div class="nav my--nav-border has-grey-background nav--pos">
    <div class="nav-left">
      <a class="nav-item nav-logo">
        <router-link to="/browse">
          <h1 class="title my--title hype--anim">HYPE<span>R</span>TUBE</h1>
        </router-link>
      </a>
    </div>
    <span class="nav-toggle my--toggle nav-logo" v-on:click="hamburger = !hamburger">
      <span></span><span></span><span></span>
    </span>
    <div class="nav-right nav-menu" v-bind:class="{'is-active' : hamburger}">
      <a class="nav-item">
        <span>
          <router-link to="/me/edit">
            <p class="nav--button">MY PROFILE</p>
          </router-link>
        </span>
      </a>
      <a class="nav-item">
        <span>
          <router-link to="/me/mymovies">
            <p class="nav--button">MY MOVIES</p>
          </router-link>
        </span>
      </a>
      <a class="nav-item">
        <span>
          <p class="nav--button" @click="logout">LOGOUT</p>
        </span>
      </a>
    </div>
      <a class="nav-item toggler nav-logo" v-on:click="toggleSidebar">
        <svg v-if="!sidebarOpened" class="nc-icon outline" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="18px" height="18px" viewBox="0 0 24 24"> <polyline fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="square" stroke-miterlimit="10" points="7,2 17,12 7,22 " transform="translate(0, 0)" stroke-linejoin="miter"></polyline> </svg>
        <svg v-if="sidebarOpened" class="nc-icon outline" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="18px" height="18px" viewBox="0 0 24 24"> <polyline fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="square" stroke-miterlimit="10" points="17,2 7,12 17,22 " transform="translate(0, 0)" stroke-linejoin="miter"></polyline> </svg>
      </a>
  </div>
</template>

<script>
'use strict'
const userService = require('../../services/user.service.js')
export default {
  name: 'header',
  data() {
    return{
      hamburger: false,
      sidebarOpened: false
    }
  },
  methods: {
    toggleSidebar() {
      this.$emit('sidebarState')
      this.sidebarOpened = !this.sidebarOpened
    },
    logout () {
      userService.logout().then(data => location.href = '/')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../scss/_variables.scss';
.my--title {
  overflow: hidden;
  color: white;
  font-family: $font-bungee;
}
.nav-item p {
  font-weight: 400;
  font-family: $font-fira;
  color: white;
}
.my--nav-border {
  border-bottom: 1px solid $light-grey;
}
.nav-toggle span {
  background-color: white;
}
.nav--pos {
  position: absolute;
  left: 0;
  right: 240px;
  transition: right .4s;
}
.is-sidebar-close .nav--pos {
  right: 0;
}
.nav--button {
    &:hover{
  color: $orange-red;
  }
  &:focus{
    color: $orange-red;
  }
}
.my--toggle:hover {
  background-color: transparent;
}
.my--toggle:hover span {
  background-color: $orange-red;
}
.toggler:hover polyline {
  stroke: $orange-red;
}
.nav-right {
  background-color: transparent;
}
@media screen and (max-width: 768px) {
.nav-menu .nav-item {
  background-color: $background-grey;
  }
  .nav-item:last-child:not(.nav-logo) {
  border-bottom: 1px solid $light-grey;
  }
}
.nav-left {
  overflow: hidden;
}
.hype--anim {
	-webkit-transition: color 0.3s;
	transition: color 0.3s;
}
.hype--anim:hover {
	color: white;
}
.hype--anim span {
	color: white;
	display: inline-block;
	transform: perspective(1000px) rotate3d(0,1,0,0deg);
	transition: transform 0.5s, color 0.5s;
	transition-timing-function: cubic-bezier(0.2,1,0.3,1);
}
.hype--anim:hover span {
	color: $orange-red;
	transform: perspective(1000px) rotate3d(0,1,0,180deg);
}
</style>

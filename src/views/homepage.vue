<template>
<div class="landing-fixed-background">
    <section class="section My--hero-transparent My--hero-gradient">
      <div class="My--title">
          <h1 class="hype--anim">HYPE<span>R</span>TUBE</h1>
          <h2 class="title less-title-size subtitle">Less time to search</h2>
          <h2 class="title more-title-size subtitle">More time to watch</h2>
      </div>
      <div class="signing-buttons columns">
        <div class="column is-half is-offset-one-quarter">
           <button id="scrollToggler" v-on:click="scrollToAnchor" class="button is-large is-primary is-outlined my--button">Register</button>
          <router-link to="/login">
            <button class="button is-large is-primary is-outlined my--button my--button-login" id="loginButton">Login</button>
          </router-link>
          </div>
        </div>
    </section>
    <section class="hero is-medium My--hero">
      <div class="hero-body my--hero-body-nopadding">
        <jumbotron></jumbotron>
      </div>
    </section>
    <section class="hero is-fullheight My--hero">
      <div class="hero-body my--hero-body-nopadding">
        <div class="container">
         <form-title title="Register"></form-title>
          <div class="columns column is-offset-2">
            <register-form id="registerSection"></register-form>
          </div>
        </div>
      </div>
    </section>
</div>
</template>

<script>
import smoothScroll from 'smooth-scroll'
export default {
  data: function () {
    return {
    }
  },
  components: {
    'register-form': require('../components/form/formRegister'),
    'jumbotron': require('../components/assets/featuresSection'),
    'form-title': require('../components/assets/sectionTitle')
  },
  methods: {
    scrollToAnchor() {
      let anchor = document.querySelector('#registerSection');
      let toggle = document.querySelector('#scrollToggler');
      let options = {
        speed: 1100,
        easing: 'easeInCubic'
      }
      smoothScroll.animateScroll(anchor, toggle, options);
    }
  }
}
</script>

<style lang='scss' scoped>
@import '../scss/_variables.scss';

.label {
  color: $medium-grey;
}

.landing-fixed-background {
  background: url('../assets/pictures/hyperback.png') fixed;
  background-attachment:fixed;
  width: 100vw;
  position: absolute;
  z-index: 0;

    &:before {
  opacity: 0.78;
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  background: linear-gradient(to right, $background-grey 0, $background-grey 100%);
  }
}

.My--hero{
  background-color: $background-grey;
  margin-top: 500px;
}

.My--hero-transparent{
  height: 500px;
  background-color: transparent;
}

.hero--transparent + .My--hero {
  margin-top: 0;
}

.My--title{
  margin-top: 150px;
  margin-bottom: 100px;
  text-align: center;
  color: $orange-red;
  font-size: 11.000vw;
  font-family: $font-bungee;
    @media screen and (min-width: $break-large) {
      font-size: 130px;
    }
}

.hype--anim {
	color: $orange-red;
	-webkit-transition: color 0.3s;
	transition: color 0.3s;
}
.hype--anim:hover {
	color: white;
}
.hype--anim span {
	color: $orange-red;
	display: inline-block;
	transform: perspective(1000px) rotate3d(0,1,0,0deg);
	transition: transform 0.5s, color 0.5s;
	transition-timing-function: cubic-bezier(0.2,1,0.3,1);
}
.hype--anim:hover span {
	color: $orange-red;
	transform: perspective(1000px) rotate3d(0,1,0,180deg);
}

.my--hero-body-nopadding{
  padding: 50px 50px;
}

.register-title-container{
  text-align: center;
  margin-bottom: 50px;
}

.register-title-color{
  color: white;
}

.signing-buttons{
  text-align: center;
}

.signing-buttons button{
  color: white;
  }

  .my--button{
  -webkit-backdrop-filter: blur(20px);
  -moz-backdrop-filter: blur(20px);
  backdrop-filter: blur(20px);
  margin: 0;
  }

.my--button-login{
  width: 107px;
  margin-left: 100px;
}

.subtitle{
  color: white;
  font-family: $font-oswald;
}

.less-title-size{
  font-size: 3vw;
  font-weight: 100;
    @media screen and (min-width: $break-large) {
          font-size: 37px;
        }
}

.more-title-size{
  font-size: 4vw;
  font-weight: 900;
  @media screen and (min-width: $break-large) {
          font-size: 47px;
        }
}

</style>

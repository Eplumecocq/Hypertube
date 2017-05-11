<template>
  <div class="columns">
    <div id="background"></div>
    <div id="midground"></div>
    <div id="foreground"></div>
    <div class="msg-container column is-half is-offset-one-quarter">
      <span class="msg-error">The page you're looking for lost itself in the galaxy</span>
      <span class="code-error">404</span>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import '../scss/_variables.scss';

.msg-container {
  position: relative;
  z-index: 300;
  height: 500px;
  width: 400px;
  margin-top: 200px;
}

.msg-error, .code-error {
  position: absolute;
  right: 0;
  left: 0;
  text-align: center;
  color: white;
  font-family: $font-bungee;
}

.msg-container .msg-error {
  font-size: 18px;
  top: 160px;

}
.msg-container .code-error {
  font-size: 160px;
  bottom: 0;
}

@-webkit-keyframes ANIME_BCKG {
	from {
		background-position: 5% 5%
	}
	to {
		background-position: 1300% 600%
	}
}

#background {
	background: url('../assets/pictures/starbackground.png');
  min-width: 100vw;
	position: absolute;
	top: 0;
  left: 0;
  right: 0;
  bottom: 0;
	z-index: 100;

	-webkit-animation-name: ANIME_BCKG;
	-webkit-animation-duration: 500s;
	-webkit-animation-timing-function: linear;
	-webkit-animation-iteration-count: infinite;
}

#midground {
	background: url('../assets/pictures/starmidground.png') repeat 20% 20%;
	position: absolute;
	top: 0; left: 0; right: 0; bottom: 0;
	z-index: 200;

	-webkit-animation-name: ANIME_BCKG;
	-webkit-animation-duration: 350s;
	-webkit-animation-timing-function: linear;
	-webkit-animation-iteration-count: infinite;
}

#foreground {
	background: url('../assets/pictures/starforeground.png') repeat 35% 35%;
	position: absolute;
	top: 0; left: 0; right: 0; bottom: 0;
	z-index: 300;

	-webkit-animation-name: ANIME_BCKG;
	-webkit-animation-duration: 300s;
	-webkit-animation-timing-function: linear;
	-webkit-animation-iteration-count: infinite;
}
</style>

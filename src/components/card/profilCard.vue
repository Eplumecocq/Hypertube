<template>
  <div class="container">
    <div class="card my--card">
      <div class="card-image my--image-container">
        <figure class="image is-4by3">
          <img :src="srcAvatar"
           alt="Image">
        </figure>
      </div>
      <div class="card-content">
        <div class="media columns">
          <div class="column center-content">
            <p class="card-content-color title is-5">{{firstName}} {{lastName}}</p>
          </div>
          <div class="column center-content">
            <p class="subtitle is-6">@{{username}}</p>
          </div>
          <div class="column center-content">
              <small><i class="icon is-small fa fa-globe icon--marge-color" aria-hidden="true"></i></small><small class="subtitle is-5">{{language}}</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'profil-card',
  props: ['srcAvatar', 'firstName', 'lastName', 'username', 'language']
}
</script>

<style lang="scss" scoped>
@import '../../scss/_variables.scss';
.my--card {
  max-width: 500px;
  margin: auto;
  margin-top: 200px;
  font-family: $font-fira;
  color: $light-grey;
  background-color: transparent;
  box-shadow: none;
  border: 2px solid $orange-red;
}
.my--card img {
  max-width: 350px;
  max-height: 350px;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;
}
.icon--marge-color {
  margin-top: 5px;
  margin-right: 4px;
}
.card-content-color {
  color: white;
}
.subtitle {
  color: $light-grey;
}
.card-content {
  margin-top: 40px;
}
.center-content {
  text-align: center;
}
</style>

<template>
<div class="oauth--container">
  <p class="control is-grouped">
    <br>
    <a
      href="/oauth/github"
      class="button github--style my--oauth-button">
      <span class="icon">
        <i class="fa fa-github"></i>
      </span>
      <span>GitHub</span>
    </a>
    <a
      href="/oauth/google"
      class="button my--oauth-button google--style">
      <span class="icon">
        <i class="fa fa-google"></i>
      </span>
      <span>Google</span>
    </a>
  </p>
  <p class="control is-grouped">
    <br>
    <a
      href="/oauth/42"
      class="button my--oauth-button intra-margin intra--style">
      <span class="icon">
        <img src="../../assets/pictures/42logowhite.png" style="margin-left: -10px;">
      </span>
      <span>Intra</span>
    </a>
    <a
      href="/oauth/facebook"
      class="button my--oauth-button facebook--style">
      <span class="icon">
        <i class="fa fa-facebook"></i>
      </span>
      <span>Facebook</span>
    </a>
  </p>
</div>
</template>

<script>
export default {
  name: 'oauth-buttons'
  }
</script>

<style lang="scss" scoped>
@import '../../scss/_variables.scss';

.oauth--container {
  margin-top: 40px;
}

.my--oauth-button {
  width: $form-input-size;
}

.facebook--style {
  background-color: transparent;
  border: 1px solid $facebook-lightcolor;
  color: $facebook-lightcolor;

    &:hover{
      background-color: $facebook-color;
      border: 1px solid $facebook-color;
      color: white;
      border: none;
    }
    &:focus {
        background-color: $facebook-color;
        color: white;
        outline: none;
        box-shadow: none;
        border: none;
      }
}

.github--style {
  background-color: transparent;
  border: 1px solid white;
  color: white;
  margin-right: 4px;

    &:hover{
      background-color: white;
      color: black;
      border: none;
    }
    &:focus {
        background-color: white;
        color: $background-grey;
        outline: none;
        box-shadow: none;
        border: none;
      }
}

.google--style {
  background-color: transparent;
  border: 1px solid $google-color;
  color: $google-color;

    &:hover{
      background-color: $google-color;
      color: white;
      border: none;
    }
     &:focus {
        background-color: $google-color;
        color: white;
        outline: none;
        box-shadow: none;
        border: none;
      }
}
.intra--style {
  background-color: transparent;
  border: 1px solid $intra-color;
  color: $intra-color;
  margin-right: 4px;

    &:hover{
      background-color: $intra-color;
      color: white;
      border: none;
    }
    &:focus {
        background-color: $intra-color;
        color: white;
        outline: none;
        box-shadow: none;
        border: none;
      }
}
</style>


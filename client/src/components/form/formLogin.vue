<template>
  <div>
    <div class="column is-half is-offset-one-quarter">
      <p class="control">
        <custom-input
          labelName="Username"
          name="username"
          type="text"
          v-model="user.username">
        </custom-input>
        <p class="control"></p>
        <custom-input
          labelName="Password"
          name="password"
          type="password"
          v-model="user.password">
        </custom-input>
        <br>
        <p class="control">
          <button
            v-bind:class="{ 'is-disabled': !this.valid, 'is-loading': this.buttonIsLoading }"
            class="button is-primary is-outlined my--login-button-size"
            v-on:click="login">{{buttonMessage}}</button>
            <button
            class="button my--login-button-size fgtpwd--button"
            v-on:click="showForgetpwdForm = !showForgetpwdForm">
            Trouble logging in?</button>
        </p>
      <oauth-buttons></oauth-buttons>
    </div>
    <transition name="bounce">
      <recover-form
        :showForgetpwdForm="showForgetpwdForm"></recover-form>
    </transition>
  </div>
</template>

<script>
  import { EventBus } from '../../bus';
  const userService = require('../../services/user.service')

  export default {
    data: function () {
      return {
        buttonMessage: 'Let’s go!',
        buttonIsLoading: false,
        showForgetpwdForm: false,
        valid: false,
        errors: {
          username: false,
          password: false
        },
        user: {
          username: '',
          password: ''
        }
      }
    },
    mounted: function () {
      EventBus.$on('error', function (inputName, inputError) {
        this.errors[inputName] = inputError
        this.valid = this.checkForm()
      }.bind(this))
    },
    components: {
      'custom-input': require('./materialInputs'),
      'oauth-buttons': require('../button/oauthButtons'),
      'form-title': require('../assets/sectionTitle'),
      'recover-form': require('../form/formRecover')
    },
    methods: {
      login: function () {
        userService.postLog(this.user)
          .then(res => {
              this.buttonIsLoading = false
              if (res.data.error) {
                this.buttonMessage = res.data.error.message
                setTimeout(function () { this.buttonMessage = 'Let’s go!' }.bind(this), 2000)
              } else location.href = '/browse'
          })
        this.buttonIsLoading = true
      },
      checkForm: function () {
        for (let input in this.errors) {
          if (this.errors.hasOwnProperty(input)) {
            if (!this.errors[input]) return false
          }
        }
        return true
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../scss/_variables.scss';
  .my--login-button-size {
    width: $form-input-size;
    margin-top: 10px;
    &:focus {
      background-color: $orange-red;
      color: #fff;
    }
  }
  .fgtpwd--button {
    margin-top: 30px;
    background-color: transparent;
    border: 1px solid $light-grey;
    color: $light-grey;
    outline: none;

      &:hover {
        background-color: $light-grey;
        color: $background-grey;
        border: none;
      }
      &:focus {
        background-color: $light-grey;
        color: $background-grey;
        outline: none;
        box-shadow: none;
        border: none;
      }
  }
.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-out .5s;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes bounce-out {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(0);
  }
}
.forgetPwdForm{ 
  margin-top: 30px;
}
</style>

<template>
    <div
    class="column is-half is-offset-one-quarter forgetPwdForm"
    v-if="showForgetpwdForm">
        <custom-input
        labelName="Email"
        name="email"
        type="email"
        v-model="email">
        </custom-input>
        <br>
        <p class="control">
        <button
            v-bind:class="{ 'is-success': this.isSuccess, 'is-disabled': !this.validRecover }"
            class="button is-primary is-outlined my--login-button-size"
            v-on:click="recover">{{ buttonMessage }}</button>
        </p>
    </div>
</template>

<script>
  import { EventBus } from '../../bus';
  const userService = require('../../services/user.service.js')

    export default {
      props: ['showForgetpwdForm'],
      components: {
        'custom-input': require('./materialInputs')
      },
      mounted: function () {
        EventBus.$on('error', function (inputName, inputError) {
          this.validRecover = inputError
        }.bind(this))
      },
      data: function () {
        return {
          validRecover: false,
          buttonMessage: 'Recover my password',
          isSuccess: false,
          email: ''
        }
      },
      methods: {
        recover: function () {
          userService.recoverPassword(this.email)
            .then(function (res) {
               if (res.data.error) {
                this.buttonMessage = res.data.error.message
                setTimeout(function () { this.buttonMessage = 'Recover my password' }.bind(this), 2000)
               } else {
                  this.buttonMessage = 'Success!'
                  this.isSuccess = true
                  setTimeout(function () {
                    this.buttonMessage = 'Recover my password' 
                    this.isSuccess = false
                  }.bind(this), 3000)
               }
            }.bind(this))
        }
      }
    }
</script>

<style scoped lang='scss'>
  @import '../../scss/_variables.scss';
  .my--login-button-size {
    width: $form-input-size;
    margin-top: 10px;
    &:focus {
      background-color: $orange-red;
      color: #fff;
    }
  }
</style>

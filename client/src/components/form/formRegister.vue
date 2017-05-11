<template>
    <div class="column columns">
      <avatar
        :src="avatar">
      </avatar>
      <div class="column is-5">
          <custom-input
            labelName="Username"
            name="username"
            type="text"
            v-model="user.username">
          </custom-input>
          <p class="control"></p>
          <custom-input
            labelName="First Name"
            name="firstName"
            type="text"
            v-model="user.firstName">
          </custom-input>
          <p class="control"></p>
          <custom-input
            labelName="Last name"
            name="lastName"
            type="text"
            v-model="user.lastName">
          </custom-input>
          <p class="control"></p>
          <custom-input
            labelName="Email"
            name="email"
            type="text"
            v-model="user.email">
          </custom-input>
          <p class="control">
          <custom-input
            labelName="Password"
            name="password"
            :type="type"
            v-model="user.password">
          </custom-input>
          <span class="icon is-small my-eye-icon">
            <i class="fa fa-eye"
            v-on:click="typePassword"></i>
          </span>
          </p>
          <p class="control"></p>
          <custom-select
            labelName="Subtitle language preference"
            name="language"
            defaultText="Select a language"
            :options="languages"
            v-model="user.language">
          </custom-select>
          <p class="control">
            <br>
            <button
              class="button is-primary is-outlined my--button-size"
              v-bind:class="{ 'is-disabled': !this.valid }"
              v-on:click="submit">{{ buttonMessage }}</button>
          </p>
          <oauth-buttons></oauth-buttons>
      </div>
    </div>
</template>

<script>
  const userService = require('../../services/user.service')
  import { EventBus } from '../../bus';

  export default {
    name: 'formRegister',
    components: {
      'avatar': require('../assets/avatar'),
      'custom-input': require('./materialInputs'),
      'custom-select': require('./materialSelect'),
      'oauth-buttons': require('../button/oauthButtons')
    },
    mounted: function () {
      EventBus.$on('error', function (inputName, inputError) {
          this.errors[inputName] = inputError
          this.valid = this.checkForm()
      }.bind(this))
    },
    data: function () {
      return {
        buttonMessage: 'Register',
        valid: false,
        errors: {
          username: false,
          firstName: false,
          lastName: false,
          email: false,
          password: false,
          language: true,
        },
        user: {
          username: '',
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          language: 'english'
        },
        type: 'password',
        languages: [
          { text: 'English', value: 'english' },
          { text: 'French', value: 'french'},
          { text: 'Spanish', value: 'spanish'},
          { text: 'German', value: 'german'},
          { text: 'Portuguese', value: 'portuguese'},
          { text: 'Italian', value: 'italian'}
        ]
      }
    },
     computed: {
      avatar: function () {
        return 'https://api.adorable.io/avatars/285/' + 
        this.user.username + '.png'
      }
    },
    methods: {
      submit: function () {
        if (this.checkForm) {
          userService.postUser(this.user)
            .then(function (res) {
              if (res.data.error) {
                this.buttonMessage = res.data.error.message
                setTimeout(function () { this.buttonMessage = 'Register' }.bind(this), 2000)
              } else location.href = '/browse'
            }.bind(this))
        }
      },
      typePassword: function () {
       this.type = (this.type == 'password') ? 'text' : 'password'
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
.my--button-size {
  margin-top: 40px;
  width: $form-input-size;
}
.my-eye-icon {
  position: absolute;
  top: 2.8em;
  right: .6em;
  color: white;
    &:hover{
      cursor: pointer;
    }
}
</style>

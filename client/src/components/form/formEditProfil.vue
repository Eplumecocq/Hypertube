<template>
  <div class="column columns">
    <upload-picture
      :curPic="avatar"
      name="avatar"></upload-picture>
    <div class="column is-5">
        <custom-input
          labelName="First Name"
          name="firstName"
          type="text"
          labelUp="true"
          v-model="user.firstName">
        </custom-input>
        <p class="control"></p>
        <custom-input
          labelName="Last name"
          name="lastName"
          type="text"
          labelUp="true"
          v-model="user.lastName">
        </custom-input>
        <p class="control"></p>
        <custom-input
          labelName="Email"
          name="email"
          type="text"
          labelUp="true"
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
          <i v-if="!hidden" class="fa fa-eye"
          v-on:click="typePassword"></i>
          <i v-else class="fa fa-eye-slash"
          v-on:click="typePassword"></i>
        </span>
        </p>
        <p class="control"></p>
        <custom-select
          labelName="Subtitle language preference"
          defaultText="Select a language"
          :options="languages"
          v-model="user.language">
        </custom-select>
        <p class="control">
          <br>
          <button
            v-bind:class="{ 'is-success': this.isSuccess, 'is-danger': this.isDanger }"
            class="button my--button-size is-primary is-outlined"
            v-on:click="modifyInfo">{{ buttonMessage }}</button>
        </p>
    </div>
  </div>
</template>

<script>
  const userService = require('../../services/user.service')
  export default {
    name: 'editProfilForm',
    components: {
      'custom-input': require('./materialInputs'),
      'custom-select': require('./materialSelect'),
      'avatar': require('../assets/avatar'),
      'upload-picture': require('../assets/uploadPicture')
    },
    data: function () {
      return {
        type: 'password',
        isSuccess: false,
        isDanger: false,
        buttonMessage: 'Edit your infos',
        avatar: '',
        file: '',
        hidden: false,
        user: {
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          language: 'english'
        },
        languages: [
          { text: 'English', value: 'english' },
          { text: 'French', value: 'french' },
          { text: 'Spanish', value: 'spanish' },
          { text: 'German', value: 'german' },
          { text: 'Portuguese', value: 'portuguese' },
          { text: 'Italian', value: 'italian' }
        ]
      }
    },
    methods: {
      typePassword: function () {
        if (this.type == 'password') {
          this.type = 'text'
          this.hidden = true
        } else if (this.type == 'text') {
          this.type = 'password'
          this.hidden = false
        }
      },
      modifyInfo: function () {
        userService.putCurrentUser(this.user)
          .then(res => {
            if (res.data.meta) {
              this.buttonMessage = 'Success!'
              this.isSuccess = true
               setTimeout(function () {
                 this.buttonMessage = 'Let’s go!' 
                 this.isSuccess = false
              }.bind(this), 3000)
            }
            if (res.data.error) {
              this.buttonMessage = 'Fail'
              this.isDanger = true
               setTimeout(function () {
                 this.buttonMessage = 'Let’s go!' 
                 this.isDanger = false
              }.bind(this), 3000)
            }
          })
      }
    },
    // MODIFY THIS TO SET THE VARIABLES
    created: function () {
      userService.getCurrentUser()
        .then(res => {
          for (var index in res.data.data) {
            if (this.user[index] != undefined)
              this.user[index] = res.data.data[index]
          }
          this.avatar = '/pictures/' + res.data.data.username
        })
    }
  }
</script>

<style lang="scss">
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
.is-danger {
  color: #fff !important;
}
</style>

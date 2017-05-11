<template>
  <div class="is-global-container has-grey-background">
    <header-no-side></header-no-side>
      <card-profil
        :srcAvatar="user.avatar"
        :username="user.username"
        :firstName="user.firstName"
        :lastName="user.lastName"
        :language="user.language"
        v-if="exist"></card-profil>
      <p v-if="!exist">user doesn’t exist</p>
  </div>
</template>

<script>
const userService = require('../services/user.service')

export default {
  data(){
    return {
      exist: false,
      user: {
        username: '',
        firstName: '',
        lastName: '',
        language: '',
        avatar: ''
      }
    }
  },
  components: {
    'card-profil': require('../components/card/profilCard'),
    'header-no-side': require('../components/layouts/headerNoSide')
  },
  created: function () {
    let username = this.$route.params.username
    userService.getUser(username)
      .then(res => {
        if (res.data.data && res.data.data.length != 0 ) {
          for (var index in res.data.data) {
            if (this.user[index] != undefined)
              this.user[index] = res.data.data[index]
          }
          this.user.avatar = `/pictures/${this.user.username}`
          this.exist = !this.exist
        }
      })
  }
}
</script>

<style lang="scss">
</style>

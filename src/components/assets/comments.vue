<template>
   <div class="comments-container">
    <article class="media">
      <figure class="media-left">
        <p class="image is-64x64">
          <img :src="src">
        </p>
      </figure>
      <div class="media-content">
        <div class="content">
          <p>
            <router-link :to="'/users/' + username">
              <strong class="username-comment">{{username}}</strong>
            </router-link>
            <br>
            <span class="content-comment">
             {{content}}
            </span>
          </p>
        </div>
      </div>
    </article>
   </div> 
</template>

<script>
export default {
  name: 'comments',
  props: ['username', 'content'],
  data: function () {
    return {
      timestamp: 0
    }
  },
  created: function () {
    this.timestamp = Date.now()
  },
  computed: {
    src: function () {
      return `/pictures/${this.username}?${this.timestamp}`
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../scss/_variables.scss';
.comments-container {
  padding: 10px;
  margin-left: auto;
  margin-right: auto;
  width: 70%;
  margin-top: 20px;
  border-bottom: 1px solid black;
}
.username-comment {
  color: $orange-red;
  font-family: $font-fira;  
}
.content-comment {
  color: white;
  word-break: break-all;
  font-family: $font-fira;
}
.is-64x64 img {
  width: 48px !important;
  height: 48px !important;
}
</style>
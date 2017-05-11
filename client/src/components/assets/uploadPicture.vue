<template>
  <div class="column is-4 center-image-Incolumn">
    <figure>
      <div class="img--wrapper" v-on:click="triggerInput">
        <img
          :src="currentAvatar"
          class="my--image-square"
          width="300">
          <svg class="nc-icon outline hidden" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="48px" height="48px" viewBox="0 0 48 48"><g transform="translate(0, 0)"> <line fill="none" stroke="#fff" stroke-width="2" stroke-linecap="square" stroke-miterlimit="10" x1="24" y1="4" x2="24" y2="44" stroke-linejoin="miter"></line> <line fill="none" stroke="#fff" stroke-width="2" stroke-linecap="square" stroke-miterlimit="10" x1="44" y1="24" x2="4" y2="24" stroke-linejoin="miter"></line> </g></svg>
      </div>
      <input
        type="file"
        ref="fileInput"
        name="name"
        @change="onFileChange"
        class="image-input__input">
        <button
          v-bind:class="{ 'is-disabled': !this.isUpload, 'is-success': this.isSuccess, 'is-danger': this.isDanger }"
          class="button my--button-size is-primary is-outlined"
          v-on:click="uploadPicture">{{ buttonMsg }}</button>
    </figure>
  </div>
</template>

<script>
  const axios = require('axios')
  export default {
    props: ['curPic', 'name'],
    data: function () {
      return {
        newPicture: '',
        isUpload: false,
        file: '',
        buttonMsg: 'Upload',
        isSuccess: false,
        isDanger: false,
        timestamp: 0,
      }
    },
    created: function () {
      this.timestamp = Date.now()
    },
    computed: {
      currentAvatar: function () {
        return (!this.isUpload) ? this.curPic + `?${this.timestamp}` : this.newPicture
      }
    },
    methods: {
      triggerInput: function (event) {
        event.preventDefault()
        this.$refs.fileInput.click()
      },
      onFileChange: function (event) {
        let files = event.target.files || event.dataTransfer.files
        if (!files.length) return
        this.file = files[0]
        if (this.file.type == 'image/png' || this.file.type == 'image/jpeg')
          this.createImage(files[0])
        else {
          this.setMsgButton('invalid file format')
          this.file = ''
          event.target.value = ''
        }
      },
      createImage: function (file) {
        let reader = new FileReader()
        let vm = this

        reader.onload = (event) => {
          let image = new Image()
          image.src = event.target.result
          this.newPicture = image.src
          this.isUpload = true
        }
        reader.readAsDataURL(file)
      },
      removeImage: function () {
        this.newPicture = ''
      },
      uploadPicture: function () {
        if (this.isUpload) {
          let formData = new FormData()
          formData.append('avatar', this.file)
          axios.put('/api/me', formData)
            .then(function (res) {
              if (res.data.error) this.setMsgButton(res.data.error.message)
              else this.setMsgButton('Success!', true)
            }.bind(this))
            .catch(function (err) {
              console.log(err)
            })
        }
      },
      setMsgButton: function (message = "", success = false) {
        let prevMsg = this.buttonMsg
        this.buttonMsg = message
        if (success)        
          this.isSuccess = true
        setTimeout(function () { 
          this.buttonMsg = prevMsg 
          if (success)
            this.isSuccess = false
        }.bind(this), 2000)
      }
    }
  }
</script>

<style>
.image-input__input {
   display: none
  }
 .my--image-square {
   cursor: pointer;
   display: block;
 }
 .img--wrapper {
   margin-top: 40px;
   position: relative;
 }
 .img--wrapper:hover .my--image-square {
   filter: brightness(40%);   
 }
 .img--wrapper:hover .hidden {
   display: initial;
 }
 .hidden {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    cursor: pointer;
 }
@media screen and (max-width: 768px) {
  .my--image-square {
    display: unset;
  }
}
 .center-image-Incolumn {
   text-align: center;
 }

</style>

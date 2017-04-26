<template>
  <div>
    <div class="select-field">
        <select
          v-on:change="validation"
          class="select--default"
          v-on:input="updateValue($event.target.value)">
          <option
            id="disabled-option"
            disabled selected>{{ defaultText }}</option>
          <option
            v-for="option in options"
            :selected="value == option.value"
            v-bind:value="option.value">{{ option.text }}</option>
        </select>
        <span class="help is-danger" v-if="error">{{ error }}</span>
    </div>
  </div>
</template>

<script>
const tools = require('../../utils/tools')
import { EventBus } from '../../bus';

export default {
  props: ['labelName', 'name', 'options', 'value', 'defaultText'],
  data () {
    return {
      error: ''
    }
  },
  methods: {
    validation: function (event) {
      let value = event.currentTarget.value
      this.error = (tools.searchInArrayObj(value, this.options)) ?
      false : 'Invalid data'
      let error = (!this.error) ? true : false
      EventBus.$emit('error', this.name, error)
    },
    updateValue: function (value) {
      this.$emit('input', value)
    }
  }
}

</script>

<style lang="scss">
@import '../../scss/_variables.scss';
.select--default {
  background-color: transparent;
  width: $form-input-size;
  padding: 6px 0;
  margin-top: 30px;
  border: none;
  outline: none;
  border-bottom: 2px solid $medium-grey;
  -webkit-border-radius: 0px;
  -webkit-appearance: none;
  -moz-appearance: none;
  color: white;
  font-size: 16px;
  font-weight: 400;
  font-family: $font-fira;
}
.select-field label {
  display: none;
}
.select-field {
  position: relative;
    &:after{
      position: absolute;
      top: 3em;
      right: 0.75em;
      width: 0;
      height: 0;
      padding: 0;
      content: '';
      border-left: .25em solid transparent;
      border-right: .25em solid transparent;
      border-top: .375em solid white;
      pointer-events: none;
    }
}
#disabled-option {
  margin-bottom: 2px;
}
.is-danger {
  font-size: 13px !important;
  font-family: $font-fira;
  font-weight: 100;
  color: $red !important;
}
</style>

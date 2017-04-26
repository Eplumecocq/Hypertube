<template>
  <div>
    <div class="select-field">
      <span class="span-field">{{labelName}}</span>
        <select
          v-if="enabler == 0"
          :id="id"
          class="select--default is-upper"
          v-on:input="updateValue">
          <optgroup label="Ascendant">
            <option
              v-for="option in options.asc"
              :selected="value == option.value"
              v-bind:value="option.value">{{ option.text }}</option>
          </optgroup>
          <optgroup label="Descendant">
            <option
              v-for="option in options.desc"
              :selected="value == option.value"
              v-bind:value="option.value">{{ option.text }}</option>
          </optgroup>
        </select>
        <select
          v-else-if="multiple === 'true'"
          v-model="selectedGenres"
          multiple
          :id="id"
          class="select--default"
          v-on:change="updateMultiple">
          <option
            v-for="option in options" :value="option"> {{ option }}
          </option>
        </select>
        <select
          v-else
          :id="id"
          class="select--default"
          v-on:input="updateValue">
          <option
            v-for="option in options"
            :selected="value == option"
            v-bind:value="option.toLowerCase()">{{ option }}</option>
          </select>
        <span class="help is-danger" v-if="error">{{ error }}</span>
    </div>
  </div>
</template>

<script>
const tools = require('../../utils/tools')
import { EventBus } from '../../bus';

export default {
  props: ['labelName', 'multiple', 'name', 'options', 'value', 'enabler', 'id'],
  data () {
    return {
      error: '',
      selectedGenres: []
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
    },
    updateMultiple: function () {
      EventBus.$emit('multiple', this.selectedGenres)
    }
  }
}

</script>

<style lang="scss" scoped>
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
  margin-bottom: 30px;
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
.is-danger {
  font-size: 13px !important;
  font-family: $font-fira;
  font-weight: 100;
  color: $red !important;
}
.span-field {
  position: absolute;
  bottom: 35px;
  font-size: 13px;
  color: $light-grey;
}
.is-upper span {
  bottom: 105px;
}
</style>

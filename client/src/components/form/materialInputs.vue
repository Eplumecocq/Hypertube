<template>
  <div
    class="field"
    v-bind:class="classObject">
    <label
      :for="name" class="field-label"
      v-bind:class="classObject">{{labelName}}</label>
    <input
      class="field-input"
      :type="type"
      :name="name"
      :value="value"
      v-on:focus="onFocused = true"
      v-on:blur="validate"
      v-on:input="updateValue($event.target.value)"
      v-bind:class="{'has-error': error}">
    <span class="help is-danger" v-if="error">{{error}}</span>
  </div>
</template>

<script>
import validator from "../../utils/validator/validator.js"
import { EventBus } from '../../bus';

export default {
  props: ['name', 'labelName', 'type', 'value', 'labelUp'],
  data () {
    return {
      onFocused: false,
      error: '',
      hasLabel: false,
    }
  },
  mounted: function () {
    if (this.labelUp != undefined)
      this.onFocused = this.labelUp
  },
  methods: {
    validate: function(event) {
      this.onFocused = false;
      let currentInput = event.currentTarget
      let errorMessage = validator.validate(currentInput.name, this.labelName, currentInput.value)
      this.hasLabel = (currentInput.value != '')
      this.error = errorMessage
      let error = (!this.error) ? true : false
      EventBus.$emit('error', this.name, error)
    },
    updateValue: function (value) {
      this.$emit('input', value)
    }
  },
  computed: {
    classObject: function () {
      return {
        'is-err': this.error,
        'has-error': this.error,
        'is-focused': this.onFocused,
        'has-label': this.hasLabel,
        'is-success': !this.error && this.error !== ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../scss/_variables.scss';
.field {
  position: relative;
  height: 72px;
  padding: 16px 0 8px 0;
}
.field-label {
color: white;
position: relative;
line-height: 16px;
font-size: 16px;
font-weight: 400;
display: block;
font-family: $font-fira;
transform: translateY(24px);
transition: transform 0.3s;
transform-origin: 0 50%;
}
.field-input {
  position: relative;
  display: block;
  width: 90%;
  padding: 8px 0;
  line-height: 16px;
  font-size: 16px;
  color: white;
  background-color: transparent;
  border: none;
  outline: none;
  -webkit-appearance: none;
}
.field::after, .field::before {
  content: '';
  height: 2px;
  width: $form-input-size;
  position: absolute;
  bottom: 6px;
  left: 0;
  background-color: $medium-grey;
}
.field::after {
  transform: scaleX(0);
  transition: transform 0.3s;
}
.field::after.is-err {
  background-color: $red;
}
.field::after .field-label.has-error {
  background-color: $red;
}
.is-focused .field-label {
  transform: translateY(0) scale(0.75);
}
.field.is-focused::after {
  transform: scaleX(1);
}
.has-label .field-label {
  transform: translateY(0) scale(0.75);
}
.has-label .field-label.has-error {
  color: $red;
}
.has-label .field-label.is-success {
  color: $green;
}
.is-danger {
  font-size: 13px;
  font-family: $font-fira;
  font-weight: 100;
  color: $red;
}
</style>

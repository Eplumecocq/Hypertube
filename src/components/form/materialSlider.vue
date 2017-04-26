<template>
  <div class="range-container">
    <label class="label-font-color" for="rangeSlider">{{labelName}}</label>
    <span class="field-value" for="rangeSlider">{{finalMinVal}} - {{finalMaxVal}}</span>
    <div class="control is-horizontal">
      <input type="checkbox" class="my--checkbox" id="slider-toggler" v-model="checked">
      <section id="rangeSlider" class="range-slider">
          <span class="range-values"></span>
          <input ref="min" id="min" v-on:change="updateChange" type="range" :min="minVal" :max="maxVal" v-model="currentMinVal" class="my--range" :disabled="!checked">
          <input ref="max" id="max" v-on:change="updateChange" type="range" :min="minVal" :max="maxVal" v-model="currentMaxVal" class="my--range" :disabled="!checked">
      </section>
    </div>
  </div>
</template>

<script>
'use strict'
import { EventBus } from '../../bus';
export default {
  name: 'materialSlider',
  props: ['minVal', 'maxVal', 'labelName', "name"],
  data () {
    return {
      checked: false,
      currentMinVal: 0,
      currentMaxVal: 0
    }
  },
  mounted: function () {
    this.currentMinVal = this.minVal
    this.currentMaxVal = this.maxVal
  },
  computed: {
    finalMinVal: function () {
      return Math.min(this.currentMinVal, this.currentMaxVal)
    },
    finalMaxVal: function () {
      return Math.max(this.currentMinVal, this.currentMaxVal)
    }
  },
  methods: {
    updateChange: function () {
      EventBus.$emit('slider', {
        [this.name + 'Min']: this.finalMinVal,
        [this.name + 'Max']: this.finalMaxVal
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../scss/_variables.scss';
.range-container {
  margin-top: 20px;
}
.range-container:first-child {
  margin-top: 60px;
}
section.range-slider {
  position: relative;
  width: 200px;
  height: 35px;
  text-align: center;
}
input[type=range] {
  -webkit-appearance: none;
  -moz-appearance: none;
}
.my--range {
  pointer-events: none;
  cursor: ew-resize;
  position: absolute;
  overflow: hidden;
  left: 0;
  top: 15px;
  width: 100%;
  outline: none;
  height: 18px;
  margin: 0;
  padding: 0;
  background-color: transparent;
}
.my--range::-webkit-slider-thumb {
  -webkit-appearance: none;
  pointer-events: all;
  position: relative;
  z-index: 1;
  height: 18px;
  width: 18px;
  bottom: 8px;
  border-radius: 50%;
  background-color: $medium-grey;
  border: 3px solid $background-grey;
  transition: background-color .3s;
  outline: 0;
}
.my--range::-webkit-slider-runnable-track {
  width: 100%;
  height: 3px;
  border-radius: 1.3px;
  transition: background-color .3s;
  background: $orange-red;
}
.my--range[disabled]::-webkit-slider-thumb {
  transition: background-color .3s;
  background-color: $light-grey;
}
.my--range[disabled]::-webkit-slider-runnable-track {
  transition: background-color .3s;
  background-color: $light-grey;
}
.my--range::-moz-range-thumb {
  pointer-events: all;
  position: relative;
  z-index: 10;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  border: none;
  background-color: $medium-grey;
}
.my--range::-moz-range-track {
  position: relative;
  z-index: -1;
  background: $orange-red;
  height: 3px;
}

.my--range:last-of-type::-moz-range-track {
  background: none transparent;
}

.my--checkbox{
  position: relative;
  width: 1rem;
  height: 1rem;
  margin-right: .75rem;
  margin-top: 17px;
  cursor: pointer;
  -webkit-appearance: none;
  outline: 0;
    &:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      z-index: 1;
      width: 100%;
      height: 100%;
      border: 2px solid $light-grey;
      transition: all .3s ease-in-out;
    }
    &:checked:before {
      height: 50%;
      transform: rotate(-45deg);
      border-top-style: none;
      border-right-style: none;
      border-color: $orange-red;
    }
}
.label-font-color {
  font-size: 16px;
  color: $light-grey;
  font-family: $font-fira;
}
.field-value {
  color: white;
}
</style>

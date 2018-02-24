<template>
  <div class="individual" @click="setCurrent(personData.id)">
    <div
      class="head"
      :class="{
        male: personData.isMale,
        minor: isMinor && !isMe && !isCurrent,
        me: isMe,
        current: isCurrent,
      }"
    >
      {{personData.firstname}}
    </div>
    <div class="name">
      {{personData.lastname}}
    </div>
  </div>
</template>

<script>
import IPA from 'ipa.js';
import { mapGetters, mapMutations } from 'vuex';

const ipa = new IPA({
  firstname: String,
  lastname: String, 
});

export default {
  name: 'individual',
  props: {
    data: {
      type: Object,
    },
    isMinor: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters([
      'me',
      'current',
    ]),
    personData() {
      return ipa.guarantee(this.data, false);
    },
    isMe() {
      return this.personData.id === (this.me && this.me.id);
    },
    isCurrent() {
      return this.personData.id === (this.current && this.current.id);
    }
  },
  methods: {
    ...mapMutations([
      'setCurrent',
    ])
  }
}
</script>

<style lang="less" scoped>

  @male-color: #506bc2;
  @female-color: #ff656c;

  .individual {
    text-align: center;
    padding: 0 5px;
    cursor: pointer;
  }

  .head {
    @size: 50px;
    @font: 24px;
    box-sizing: border-box;
    font-family: SimSun, STSong;
    width: @size;
    height: @size;
    border-radius: 50%;
    margin: auto;
    color: white;
    font-weight: bolder;
    padding-top: (@size - @font) / 2 - 2px;
    background: white;
    border: 1px solid @female-color;
    color: @female-color;
    transition: 0.3s;
    font-size: @font;
    &.me, &.current, &:hover {
      background: @female-color;
      color: white;
    }
    &.me {
      box-shadow: 0 0 0 1px white, 0 0 0 2px @female-color;
    }
    &.male {
      border-color: @male-color;
      color: @male-color;
      &.me, &.current, &:hover {
        background: @male-color;
        color: white;
      }
      &.me {
        box-shadow: 0 0 0 1px white, 0 0 0 2px @male-color;
      }
    }
    &.minor {
      opacity: 0.4;
      transform: scale(0.8) translate(-5px);
    }
  }

  .name {
    line-height: 30px;
  }
</style>

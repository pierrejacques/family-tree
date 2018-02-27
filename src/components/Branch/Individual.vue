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
    ]),
  }
}
</script>

<style lang="less" scoped>

  @male-color: #6378c0;
  @female-color: #ff8187;

  .individual {
    text-align: center;
    padding: 0 5px;
    cursor: pointer;
  }

  .head {
    display: flex;
    justify-content: center;
    align-items: center;
    @size: 50px;
    @font: 20px;
    box-sizing: border-box;
    width: @size;
    height: @size;
    line-height: @font;
    font-size: @font;
    border-radius: 50%;
    color: white;
    font-weight: bolder;
    background: white;
    border: 2px solid @female-color;
    color: @female-color;
    transition: 0.3s;
    &.me, &.current, &:hover {
      background: @female-color;
      color: white;
    }
    &.me {
      box-shadow: 0 0 0 2px white, 0 0 0 4px lighten(@female-color, 10%);
    }
    &.male {
      border-color: @male-color;
      color: @male-color;
      &.me, &.current, &:hover {
        background: @male-color;
        color: white;
      }
      &.me {
        box-shadow: 0 0 0 2px white, 0 0 0 4px lighten(@male-color, 10%);
      }
    }
    &.minor {
      opacity: 0.5;
      transform: scale(0.8) translate(-5px);
    }
  }

  .name {
    line-height: 35px;
  }
</style>

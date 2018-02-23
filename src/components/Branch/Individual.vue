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

  @male-color: #277ceb;
  @female-color: #f34268;

  .individual {
    text-align: center;
    padding: 0 5px;
    cursor: pointer;
  }

  .head {
    @size: 50px;
    box-sizing: border-box;
    width: @size;
    height: @size;
    border-radius: 50%;
    margin: auto;
    color: white;
    font-weight: bolder;
    padding-top: 13px;
    background: white;
    border: 1px solid @female-color;
    color: @female-color;
    &.me, &.current {
      background: @female-color;
      color: white;
    }
    &.me {
      box-shadow: 0 0 0 1px white, 0 0 0 2px @female-color;
    }
    &.male {
      border-color: @male-color;
      color: @male-color;
      &.me, &.current {
        background: @male-color;
        color: white;
      }
      &.me {
        box-shadow: 0 0 0 1px white, 0 0 0 2px @male-color;
      }
    }
    &.minor {
      opacity: 0.4;
    }
  }

  .name {
    text-decoration: underline;
    line-height: 30px;
  }
</style>

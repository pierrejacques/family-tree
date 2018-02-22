<template>
  <div class="individual">
    <div
      :data-id="personData.id"
      class="head"
      :class="{
        male: personData.isMale,
        minor: isMinor && !isMe && !personData.isCurrent,
        me: isMe,
        current: personData.isCurrent,
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
    isMe: {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    personData() {
      return ipa.guarantee(this.data, false);
    },
  },
}
</script>

<style lang="less" scoped>

  @male-color: #277ceb;
  @female-color: #f34268;

  .individual {
    text-align: center;
    padding: 0 5px;
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
    cursor: pointer;
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

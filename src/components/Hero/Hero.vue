<template>
  <div class="hero">
    <p class="character">{{character}}</p>
    <i class="iconfont icon-edit"></i>
    <img v-if="!isImgError" src="data.icon" class="portrait" @error="isImgError = true"/>
    <div v-else class="portrait"></div>
    <h3>{{data.firstname}} {{data.lastname}}</h3>
    <p>{{data.bornOn | dateFormat}} -
      <template v-if="!data.isAlive">
        {{data.deadOn | dateFormat}}
      </template>
      （{{data.age | stamp2year}}岁）
    </p>
    <dl class="details" v-for="(value, key, idx) in data.info" :key="key">
      <dt>{{key}}：</dt>
      <dd :key="idx">{{value}}</dd>
    </dl> <!-- TODO: 样式优化-->
    <slot></slot>
  </div>
</template>

<script>
import IPA from 'ipa.js';

const infoIpa = new IPA({
  character: String,
  data: {
    firstname: String,
    lastname: String,
    info: Object,
    bornOn: String,
    isAlive: false,
  }
});

export default {
  name: 'hero',
  props: ['info'],
  data() {
    return {
      isImgError: false,
    }
  },
  computed: {
    infoData() {
      return infoIpa.guarantee(this.info, false);
    },
    character() {
      return this.infoData.character;
    },
    data() {
      const rawData = this.infoData.data;
      rawData.age = new Date() - new Date(rawData.bornOn);
      return rawData;
    }
  },
  filters: {
    stamp2year(num) {
      return Math.ceil(num/1000/60/60/24/365);
    },
    dateFormat(str) {
      return (str || '').replace('-', '年').replace('-', '月');
    }
  }
}
</script>

<style lang="less" scoped>
.hero {
  position: relative;
  text-align: center;
  background: white;
  font-size: 12px;
  width: 250px;
  margin: 20px;
  padding: 20px;
  box-shadow: 0 2px 7px hsla(205, 20%, 50%, 0.3);
  
  .portrait {
    margin: auto;
    width: 100px;
    height: 100px;
    background: rgb(148, 148, 148);
  }
}

.details {
  display: block;
  margin: auto;
  width: 200px;
  dt {
    white-space: pre;
    width: 30px;
  }
  dt, dd {
    display: inline-block;
    text-align: left;
  }
}

.character {
  position: absolute;
  box-sizing: border-box;
  @size: 50px;
  @font: 16px;
  left: -@size / 2;
  padding-top: (@size - @font) / 2;
  width: @size;
  height: @size;
  line-height: @font;
  font-size: @font;
  background: white;
  color: gray;
  box-shadow: 0 1px 4px hsla(0, 0, 0, 0.3);
  border-radius: 50%;
}

.icon-edit {
  @pos: 10px;
  position: absolute;
  right: @pos;
  top: @pos;
  font-size: 18px;
  color: hsl(0, 0%, 67%);
  transition: 0.3s;
  cursor: pointer;
  &:hover {
    color: hsl(0, 0%, 20%);
  }
}
</style>

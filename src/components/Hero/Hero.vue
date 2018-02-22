<template>
  <div class="hero">
    <p>{{character}}</p>
    <img src="data.icon" alt="头像" class="portrait"/>
    <h3>{{data.firstname}} {{data.lastname}}</h3>
    <p>{{data.bornOn | dateFormat}} -
      <template v-if="!data.isAlive">
        {{data.deadOn | dateFormat}}
      </template>
    </p>
    <dl class="details">
      <dt>年龄：</dt>
      <dd>{{data.age | stamp2year}}</dd>
    </dl>
    <dl class="details" v-for="(value, key, idx) in data.info" :key="key">
      <dt>{{key}}：</dt>
      <dd :key="idx">{{value}}</dd>
    </dl>
    <h3></h3>
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
  text-align: center;
  .portrait {
    width: 200px;
    height: 200px;
  }
}

.details {
  dt {
    text-align: right;
  }
  dd {
    text-align: left;
  }
  dt, dd {
    display: inline-block;
    white-space: pre;
    width: 40px;
  }
}

</style>

<template>
  <div class="infos">
    <img v-if="data.isMale" src="@/asset/img/user-male.svg" class="portrait"/>
    <img v-else src="@/asset/img/user-female.svg" class="portrait"/>
    <div v-if="!editable">
      <h3>{{data.firstname}} {{data.lastname}}</h3>
      <p>{{data.bornOn | dateFormat}} -
      <template v-if="!data.isAlive">
          {{data.deadOn | dateFormat}}
      </template>
      （{{data.age | stamp2year}}岁）
      </p>
      <dl class="details">
      <template v-for="(value, key, idx) in data.info">
        <dt :key="key">{{key}}：</dt>
        <dd :key="value">{{value}}</dd>
        <br :key="idx"/>
      </template>
      </dl>
    </div>
    <form v-else>
        <label>姓：<input type="text" v-model="form.firstname" /></label>
        <label>名：<input type="text" v-model="form.lastname" /></label>
        <label>生日：<input type="text" v-model="form.bornOn" /></label>
        <template>
          <input type="radio" v-model="gender" :value="true" @change="changeGender">男
          <input type="radio" v-model="gender" :value="false" @change="changeGender">女
        </template>
    </form>
  </div>
</template>

<script>
export default {
  name: 'infos',
  props: ['data', 'editable', 'form'],
  data() {
    return {
      gender: '',
    };
  },
  watch: {
    editable(val) {
      if (val) {
        this.gender = this.form.isMale;
      }
    }
  },
  filters: {
    stamp2year(num) {
      return Math.ceil(num/1000/60/60/24/365);
    },
    dateFormat(str) {
      return `${(str || '').replace('-', '年').replace('-', '月')}日`;
    }
  },
  methods: {
    changeGender() {
      this.$emit('changeGender', this.gender);
    }
  }
}
</script>

<style lang="less" scoped>
  .portrait {
    margin: auto;
    width: 100px;
    height: 100px;
    background: #9494946c;
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
</style>


<template>
  <div class="add">
    <h3>为{{data.firstname}}{{data.lastname}}{{text}}</h3>
    <template v-if="!action">
      <a class="btn" v-if="!data.father"
        @click="action='setFather'; text='添加父亲'; showGender = false; form.isMale = true;">添加父亲</a>
      <a class="btn" v-if="!data.mother" 
        @click="action='setMother'; text='添加母亲'; showGender = false; form.isMale = false;">添加母亲</a>
      <a class="btn" @click="action='addOffspring'; text='添加子女'; ">添加子女</a>
      <a class="btn" @click="action='setFellow'; text=`${data.fellow ? '更替' : '添加'}`; ">
        {{data.fellow ? '更替' : '添加' }}配偶
      </a>
    </template>
    <template v-else>
      <label class="short"><input placeholder="姓" type="text" v-model="form.firstname" /></label>
      <label class="long"><input placeholder="名" type="text" v-model="form.lastname" /></label>
      <div class="radio" v-if="showGender">
        <input type="radio" v-model="form.isMale" :value="true">男
        <input type="radio" v-model="form.isMale" :value="false">女
      </div>
      <a class="btn add-btn" @click="toAdd">确认添加</a>
    </template>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import IPA from 'ipa.js';

const ipa = new IPA({
  firstname(val) {
    return {
      isValid: Boolean(val),
    }
  },
  lastname(val) {
    return {
      isValid: Boolean(val),
    }
  }
});

export default {
  name: 'add',
  props: ['data'],
  data() {
    return {
      action: null,
      form: {
        isMale: true,
      },
      text: '添加亲属',
      showGender: true,

    }
  },
  methods: {
    ...mapMutations([
      'setFather',
      'setMother',
      'addOffspring',
      'setFellow',
    ]),
    toAdd() {
      if (ipa.check(this.form)) {
        this[this.action]({
          id: this.data.id,
          info: this.form,
        });
        this.$emit('added');
      }
    },
  }
}
</script>

<style lang="less" scoped>
.add {
  .btn {
    display: block;
    &:hover {
      color: #3869d1;
    }
  }
}
.short, .long {
  display: inline;
}
.short input {
  width: 40px;
}
.long input {
  width: 80px;
}
.add-btn {
  background: #fffa;
  margin: 20px 20px 0;
}
</style>


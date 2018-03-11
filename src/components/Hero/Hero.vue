<template>
  <div class="hero" :class="{female: !data.isMale}">
    <p class="character">{{character}}</p>
    <add 
      v-if="addable" 
      class="content-area"
      :data="data"
      @added="addable = false"
    ></add>
    <div 
      v-else-if="deleting"
      class="content-area"
      >
      <h3>确定要删除成员{{data.firstname}}{{data.lastname}}吗？</h3>
      <a @click="deleting = false" class="btn btn-safe">取消</a>
      <a @click="expireFromTree(data.id)" class="btn btn-warning">删除</a>
    </div>
    <infos
      v-else
      class="content-area" 
      :data="data" 
      :editable="editable"
      :form="editForm"
      @changeGender="setGender"
    ></infos>
    <div class="operator-group">
      <template v-if="!editable && !addable && !deleting"> <!-- 根选项 -->
        <a class="operator" @click="toEdit">
          <i class="iconfont icon-edit"></i>
        </a>
        <a class="operator" @click="addable = true">
          <i class="iconfont icon-add"></i>
        </a>
        <a class="operator" v-if="current && current.id === data.id" @click="setMe()">
          <i class="iconfont icon-set-me"></i>
        </a>
        <a class="operator" 
          v-if="current && current.id === data.id" 
          :class="{disabled:!deletable()}" 
          @click="deletable() ? deleting = true : ''">
          <i class="iconfont icon-delete"></i>
        </a>
        <!-- <a class="operator"
          v-if="current && current.id === data.id"
          @click="clearCurrent">
          <i class="iconfont icon-cancel"></i>
        </a> -->
      </template>
      <template v-if="editable"> <!-- 编辑控制 -->
        <a class="operator" @click="commitForm">
          <i class="iconfont icon-ok"></i>
        </a>
        <a class="operator" @click="editable = false">
          <i class="iconfont icon-cancel"></i>
        </a>
      </template>
      <template v-if="addable"> <!-- 添加控制 -->
        <a class="operator" @click="addable = false">
          <i class="iconfont icon-back"></i>
        </a>
      </template>
      <template v-if="deleting"> <!-- 删除控制 -->
        <a class="operator" @click="deleting = false">
          <i class="iconfont icon-back"></i>
        </a>
      </template>
    </div>
  </div>
</template>

<script>
import IPA from 'ipa.js';
import { mapGetters, mapMutations } from 'vuex';
import Infos from './Infos';
import Add from './Add';

const infoIpa = new IPA({
  character: String,
  data: {
    firstname: String,
    lastname: String,
    info: Object,
    bornOn: String,
    isAlive: true,
  }
});

export default {
  name: 'hero',
  data() {
    return {
      editable: false,
      addable: false,
      deleting: false,
      editForm: {},
    }
  },
  components: {
    infos: Infos,
    add: Add,
  },
  props: ['info'],
  computed: {
    ...mapGetters([
      'current',
    ]),
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
  methods: {
    ...mapMutations([
      'setMe',
      'changeInfo',
      'expireFromTree',
      'clearCurrent',
    ]),
    toEdit() {
      this.editForm.firstname = this.data.firstname;
      this.editForm.lastname = this.data.lastname;
      this.editForm.bornOn = this.data.bornOn;
      this.editForm.isMale = this.data.isMale;
      this.editable = true;
    },
    commitForm() {
      this.changeInfo({
        id: this.data.id,
        data: this.editForm,
      });
      this.editable = false;
    },
    setGender(val) {
      this.editForm.isMale = val;
    },
    deletable() {
      return (
        Boolean(this.data.father) + 
        Boolean(this.data.mother) +
        Boolean(this.data.fellow) +
        Boolean(this.data.exs.length > 0) +
        Boolean(this.data.offsprings.length > 0)
      ) <= 2;
    },
  }
}
</script>

<style lang="less" scoped>
@pad: 20px;

.hero {
  display: flex;
  position: relative;
  text-align: center;
  background: white;
  font-size: 12px;
  width: 250px;
  margin: 20px;
  background: #d3eaff;
  box-shadow: 0 2px 6px #3334;
  pointer-events: all;
  &.female {
    background: #ffe0d2;
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
    box-shadow: 0 1px 4px #0004;
    border-radius: 50%;
  }
  .content-area {
    flex-grow: 1;
    padding: @pad 0;
  }
  .operator-group {
    padding: @pad 5px @pad;
    background: #666c;
  }
}

.operator {
  display: block;
  width: 40px;
  height: 30px;
  text-align: center;
  font-size: 18px;
  color: #ccc;
  transition: 0.3s;
  cursor: pointer;
  &:hover {
    color: #fff;
  }
  &.disabled {
    cursor: not-allowed;
    color: #9f9f9f;
  }
}
</style>

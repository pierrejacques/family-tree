<template>
  <div class="home-page">
    <setting></setting>
    <div class="tree" v-if="me">
      <branch 
        :up="true" 
        :down="true" 
        :root="me"
        :isRoot="true"
        :layer="0"
      ></branch>
    </div>
    <aside class="info-bar">
      <hero v-if="me" :info="{ character: '我', data: me }"></hero>
      <template v-if="current">
        <a class="btn" @click="transpose">
          <i class="iconfont icon-tranpose"></i>
        </a>
        <hero :info="{ character: relation, data: current }">
          <a class="btn" @click="setMe()">设为"我"</a>
        </hero>
      </template>
    </aside>
  </div>
</template>

<script>
import IPA from 'ipa.js';
import axios from 'axios';
import { mapGetters, mapMutations } from 'vuex';
import Branch from '@/components/Branch/Branch';
import Hero from '@/components/Hero/Hero';
import Setting from '@/components/Setting/Setting';

const ipa = new IPA({
  members: Object,
  meId: String,
});

export default {
  name: 'home',
  components: {
    branch: Branch,
    hero: Hero,
    setting: Setting,
  },
  mounted() {
    let localData;
    try {
      localData = JSON.parse(localStorage.getItem('tree'));
    } catch(e) {
      localData = null;
    }
    if (ipa.check(localData)) {
      this.$store.commit('buildTree', localData);
    } else {
      axios.get('static/tree.json').then(
        res => {
          this.$store.commit('buildTree', res.data);
        },
        error => {
          throw new Error(error);
        }
      );
    }
  },
  computed: {
    ...mapGetters([
      'me',
      'current',
      'relation',
    ]),
  },
  methods: {
    ...mapMutations([
      'setMe',
      'transpose'
    ]),
    // TODO: 切换表类（2维度）
    // TODO: 添加成员
    // TODO: 保存树
  }
};
</script>

<style lang="less">
  .home-page {
    display: flex;
    position: relative;
    min-height: 100vh;
    padding-left: 50px;
  }
  .tree {
    flex-grow: 1;
    padding-top: 100px;
  }
  .info-bar {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 350px;
  }
  .btn {
    padding: 5px 16px;
    margin: 5px;
    background: #eee;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
  }
  .icon-tranpose {
    font-size: 24px;
  }
</style>

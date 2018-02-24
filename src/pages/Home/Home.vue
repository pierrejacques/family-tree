<template>
  <div class="home-page">
    <setting></setting>
    <div class="tree" v-if="me">
      <branch
        class="root-branch"
        :up="true"
        :down="true"
        :root="root"
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
        <hero :info="{ character: relation, data: current }"></hero>
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
      'root',
      'me',
      'current',
      'relation',
    ]),
  },
  methods: {
    ...mapMutations([
      'transpose'
    ]),
  }
};
</script>

<style lang="less">
  .home-page {
    display: flex;
    position: relative;
    min-height: 100vh;
    align-items: stretch;
    padding-left: 50px;
    .tree {
      flex-grow: 1;
      padding-top: 100px;
    }
    .info-bar {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .icon-tranpose {
      font-size: 24px;
    }
    .root-branch {
      margin: 20px;
      margin-right: 50px;
    }
  }
</style>

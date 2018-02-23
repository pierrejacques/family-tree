<template>
  <div class="home-page">
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
        <a class="btn" @click="transpose">换位</a>
        <hero :info="{ character: relation, data: current }"></hero>
        <a class="btn" @click="setMe()">设为「 我 」</a>
      </template>
    </aside>
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters, mapMutations } from 'vuex';
import Branch from '@/components/Branch/Branch';
import Hero from '@/components/Hero/Hero';

export default {
  name: 'home',
  components: {
    branch: Branch,
    hero: Hero,
  },
  mounted() {
    axios.get('static/tree.json').then(
      res => {
        this.$store.commit('buildTree', res.data);
      },
      error => {
        throw new Error(error);
      }
    );
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

<style scoped>
  .home-page {
    display: flex;
    min-height: 100vh;
  }
  .tree {
    flex-grow: 1;
    background: #f7feff;
    padding-top: 100px;
  }
  .info-bar {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 350px;
    box-shadow: 0 0 7px rgba(0, 0, 0, 0.15);
  }
  .btn {
    padding: 5px 16px;
    background: #eee;
    border-radius: 4px;
    cursor: pointer;
  }
</style>

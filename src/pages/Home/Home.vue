<template>
  <div class="home-page">
    <div 
      class="tree" 
      v-if="treeData.me" 
      @click="setCurrent($event)">
      <branch 
        :up="true" 
        :down="true" 
        :root="treeData.me"
        :isRoot="true"
        :isPater="true"
        :layer="0"
      ></branch>
    </div>
    <aside class="info-bar">
      <hero v-if="treeData.me" :info="{ character: '我', data: treeData.me }"></hero>
      <template v-if="treeData.current">
        <a class="btn" @click="transpose">换位</a>
        <hero :info="{ character: treeData.relation(), data: treeData.current }"></hero>
        <a class="btn" @click="setMe()">设为「 我 」</a>
      </template>
    </aside>
  </div>
</template>

<script>
import axios from 'axios';
import Branch from '@/components/Branch/Branch';
import Hero from '@/components/Hero/Hero';
import { reconstruct } from '@/model';

export default {
  name: 'home',
  components: {
    branch: Branch,
    hero: Hero,
  },
  data() {
    return {
      treeData: {},
    }
  },
  mounted() {
    axios.get('static/tree.json').then(
      res => {
        this.treeData = reconstruct(res.data);
      },
      error => {
        throw new Error(error);
      }
    );
  },
  methods: {
    setMe() {
      this.treeData.setMe(this.treeData.current);
      this.treeData.current = null;
    },
    setCurrent(e) {
      const dataId = e.target.attributes['data-id'];
      if (!dataId) {
        this.treeData.current = null;
        return;
      };
      const person = this.treeData.members[dataId.value];
      this.treeData.setCurrent(person);
    },
    transpose() {
      this.treeData.transpose();
    },
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

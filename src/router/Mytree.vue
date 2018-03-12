<template>
  <div class="home-page">
    <setting></setting>
    <div class="tree" v-if="me">
      <div class="inline-block">
        <branch
          class="root-branch"
          :up="true"
          :down="true"
          :root="root"
          :isRoot="true"
          :layer="0"
        ></branch>
      </div>
    </div>
    <aside class="info-bar">
      <hero v-if="me" :info="{ character: '我', data: me }"></hero>
      <template v-if="current">
        <a class="btn hover" @click="transpose">
          <i class="iconfont icon-tranpose"></i>
        </a>
        <hero :info="{ character: relation, data: current }"></hero>
      </template>
    </aside>
    <mask-dialog v-if="isMaskOn"></mask-dialog>
  </div>
</template>

<script>
import IPA from 'ipa.js';
import axios from 'axios';
import { mapState, mapGetters, mapMutations } from 'vuex';
import Branch from '@/components/Branch/Branch';
import Hero from '@/components/Hero/Hero';
import Setting from '@/components/Setting/Setting';
import Dialog from '@/components/Dialog';

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
    'mask-dialog': Dialog,
  },
  mounted() {
    axios.get('api/latestTree').then(
      res => {
        if (res.data.hasTree) {
          let treeData;
          try {
            treeData = JSON.parse(res.data.tree.data);
          } catch(e) {
            console.log(e); // 解析错误的情况
          }
          if (res.data.hasTree && ipa.check(treeData)) {
            this.buildTree(treeData);
          }
        } else {
          this.newTree();
        }
      },
    );
  },
  computed: {
    ...mapState([
      'isMaskOn',
    ]),
    ...mapGetters([
      'root',
      'me',
      'current',
      'relation', // FIXME: 交换时没有更新
    ]),
  },
  methods: {
    ...mapMutations([
      'transpose',
      'buildTree',
      'newTree',
    ]),
  }
};
</script>

<style lang="less">
  .home-page {
    min-height: 100vh;
    .tree {
      overflow: auto;
      box-sizing: border-box;
      min-height: 100vh;
      padding: 0 350px 0 80px;
    }
    .inline-block {
      display: inline-block;
      min-width: 100%;
      margin: 100px 0;
    }
    .info-bar {
      position: fixed;
      right: 0;
      top: 0;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-left: 20px;
      background: #fffa;
      pointer-events: none;
    }
    .icon-tranpose {
      font-size: 24px;
    }
    .hover:hover {
      background: #eee;
    }
  }
</style>

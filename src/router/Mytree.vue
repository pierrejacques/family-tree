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
        const data = res.data.tree;
        let treeData;
        try {
          treeData = JSON.parse(data.data);
        } catch(e) {
          throw new Error(e);
        }
        if (res.data.hasTree && ipa.check(treeData)) {
          this.$store.commit('buildTree', treeData);
        }
      },
      err => {

      }
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
      'relation',
    ]),
  },
  methods: {
    ...mapMutations([
      'transpose',
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

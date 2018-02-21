<template>
  <div v-if="treeData">
    <tree-node :person="treeData.me"></tree-node>
  </div>
</template>

<script>
import axios from 'axios';
import UpBranch from './UpBranch';
import DownBranch from './DownBranch';
import TreeNode from './TreeNode';
import { Person, Tree, reconstruct } from '@/model';

export default {
  name: 'tree-component',
  components: {
    'up-branch': UpBranch,
    'down-branch': DownBranch,
    'tree-node': TreeNode,
  },
  data() {
    return {
      treeData: null,
      me: null,
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
    setMe(person) {
      tree.setMe(person);
    },
    setCurrent(person) {
      tree.setCurrent(person);
    },
    transpose() {
      tree.transpose();
    }
  }
}
</script>

<style>

</style>

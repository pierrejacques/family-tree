<template>
  <div v-if="treeData">
    <branch 
      :up="true" 
      :down="true" 
      :root="treeData.me"
      :isPater="true"
      :layer="0"
    ></branch>
  </div>
</template>

<script>
import axios from 'axios';
import Branch from './Branch';
import TreeNode from './TreeNode';
import { Person, Tree, reconstruct } from '@/model';

export default {
  name: 'tree-component',
  components: {
    'branch': Branch,
    'tree-node': TreeNode,
  },
  data() {
    return {
      treeData: null,
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

<template>
  <div>

  </div>
</template>

<script>
import axios from 'axios';
import Branch from './Branch';
import { Person, Tree, reconstruct } from '@/model';

export default {
  name: 'tree-component',
  components: {
    'branch': Branch,
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
        this.treeData.updateTags();
        console.log(this.treeData);
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

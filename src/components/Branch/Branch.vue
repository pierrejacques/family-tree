<template>
  <div v-if="Math.abs(layer) <= 3" class="branch">
    <div v-if="up" class="tree-row">
      <branch
        v-if="root[parent]"
        :up="true"
        :root="root[parent]"
        :layer="layer - 1"
        :isPater="isPater"
      ></branch>
    </div>
    <tree-node class="node" :person="root" :isMe="isRoot"></tree-node>
    <div v-if="down" class="tree-row">
      <branch
        v-for="(child, idx) in root.offsprings"
        :key="idx"
        :root="child"
        :down="true"
        :layer="layer + 1"
      ></branch>
    </div>
  </div>
</template>

<script>
import TreeNode from './TreeNode';

export default {
  name: 'branch',
  components: {
    'tree-node': TreeNode,
  },
  props: {
    root: {
      type: Object,
      default: () => ({
        offsprings: [],
      }),
    },
    isRoot: {
      type: Boolean,
      default: false,
    },
    up: {
      type: Boolean,
      default: false,
    },
    down: {
      type: Boolean,
      default: false,
    },
    isPater: {
      type: Boolean,
      default: true,
    },
    layer: {
      type: Number,
    }
  },
  computed: {
    parent() {
      return this.isPater ? 'father' : 'mother';
    }
  }
}
</script>

<style>
  .branch {
    flex-grow: 1;
  }
  .tree-row {
    display: flex;
    justify-content: space-around;
    width: 100%;
  }    
</style>

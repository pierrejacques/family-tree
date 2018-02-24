<template>
  <div class="branch">
    <div v-if="up" class="tree-row">
      <branch
        v-if="root[parent]"
        :up="true"
        :root="root[parent]"
        :layer="layer - 1"
      ></branch>
    </div>
    <tree-node class="node" :person="root"
        :class="{
          'full-h': isMiddle,
          'right-h': isFirst,
          'left-h': isLast,
        }"
    ></tree-node>
    <div v-if="down" class="tree-row">
      <branch
        v-for="(child, idx) in root.offsprings"
        :key="idx"
        :root="child"
        :down="true"
        :layer="layer + 1"
        :isMiddle="idx > 0 && idx < root.offsprings.length - 1"
        :isFirst="idx === 0 && root.offsprings.length > 1"
        :isLast="idx !== 0 && idx === root.offsprings.length - 1"
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
    up: {
      type: Boolean,
      default: false,
    },
    down: {
      type: Boolean,
      default: false,
    },
    layer: {
      type: Number,
    },
    isRoot: {
      type: Boolean,
      default: false,
    },
    isFirst: {
      default: false,
    },
    isLast: {
      default: false,
    },
    isMiddle: {
      default: false,
    }
  },
  computed: {
    parent() {
      return this.$store.state.isPater ? 'father' : 'mother';
    },
  }
}
</script>

<style lang="less" scoped>
@line: 1px solid #bbb;
.tree-row {
  display: flex;
  justify-content: center;
  width: 100%;
}

.tree-node::before {
  content: '';
  position: absolute;
  z-index: -1;
  left: 0;
  right: 50%;
  top: 0;
  bottom: 50%;
  border-right: @line;
}

.full-h {
  border-top: @line;
}

.tree-node.left-h::after {
  content: '';
  position: absolute;
  z-index: -1;
  top: 0;
  bottom: 50%;
  left: 0;
  right: 50%;
  border-top: @line;
}

.tree-node.right-h::after {
  content: '';
  position: absolute;
  z-index: -1;
  top: 0;
  bottom: 50%;
  left: 50%;
  right: 0;
  border-top: @line;
}
</style>

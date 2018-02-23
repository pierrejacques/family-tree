<template>
  <div class="setting">
		<button class="operator" @click="saveTree">
			<i class="iconfont icon-save"></i>
		</button>
    <div class="folder" :class="{unfolded: !parentFolded}">
      <button class="operator" v-for="(type, idx) in parentTypes" :key="idx" @click="selectParent(type)">
        <i class="iconfont" :class="`icon-${type}`"></i>
      </button>
    </div>
    <div class="folder" :class="{unfolded: !treeFolded}">
      <button class="operator" v-for="(type, idx) in treeTypes" :key="idx" @click="selectTree(type)">
        <i class="iconfont" :class="`icon-${type}-tree`"></i>
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

const treeTypes = [
  'self',
  'parent',
  'grand',
];

const parentTypes = [
  'pater',
  'mater',
]

export default {
  name: 'setting',
  data() {
    return {
      parentFolded: true,
      treeFolded: true,
    }
  },
  computed: {
    ...mapState([
      'isPater',
      'treeType',
    ]),
    treeTypes() {
      const arr = treeTypes.sort((a, b) => ((a === this.treeType) < (b === this.treeType)));
      return this.treeFolded ? arr.slice(0, 1) : arr;
    },
    parentTypes() {
      const current = this.isPater ? 'pater' : 'mater';
      const arr = parentTypes.sort((a, b) => ((a === current) < (b === current)));
      return this.parentFolded ? arr.slice(0, 1) : arr;
    },
  },
	methods: {
		...mapMutations([
      'saveTree',
      'setPater',
      'setTree',
    ]),
    selectTree(type) {
      this.treeFolded = !this.treeFolded;
      this.setTree(type);
    },
    selectParent(type) {
      this.parentFolded = !this.parentFolded;
      this.setPater(type === 'pater');
    },
	},
}
    
</script>

<style lang="less" scoped>
@width: 50px;
@background: #666;

.setting {
  position: absolute;
  z-index: 10;
  left: 0;
  width: @width;
  height: 100vh;
	background: @background;
	color: white;
  box-shadow: 0 0 7px rgba(0, 0, 0, 0.15);
}
.operator {
	width: @width;
	height: 50px;
  margin: auto;
  background: @background;
	i {
		font-size: 30px;
		color: #ddd;
  }
  &:hover {
    background: #333;
  }
}
.folder {
  width: @width;
  text-align: left;
  &.unfolded {
    width: @width * 3;
  }
  .operator {
    display: inline-block;
  }
}
</style>

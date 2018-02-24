<template>
  <div class="setting">
		<button class="operator" @click="saveTree">
      <i class="iconfont icon-save"></i>
		</button>
    <div class="folder" :class="{unfolded: !parentFolded}">
      <button class="operator" v-for="(type, idx) in parentTypes" :key="idx" @click="selectParent(type)">
        <i class="iconfont" :class="`icon-${type.name}`"></i>
      </button>
    </div>
    <div class="folder" :class="{unfolded: !treeFolded}">
      <button class="operator" v-for="(type, idx) in treeTypes" :key="idx" @click="selectTree(type)">
        <i class="iconfont" :class="`icon-${type.name}-tree`"></i>
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

const treeTypes = [
  {
    name: 'self',
    desc: '个人树：“我”作为根节点的树'
  },
  {
    name: 'parent',
    desc: '家庭树：以“我”的家长作为根结点'
  },
  {
    name: 'grand',
    desc: '最大树：以最高嫡系亲属为根结点'
  }
];

const parentTypes = [
  {
    name: 'pater',
    desc: '父系树：按父亲向上拓展'
  },
  {
    name: 'mater',
    desc: '母系树：按母亲向上拓展'
  }
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
      const arr = treeTypes.sort((a, b) => ((a.name === this.treeType) < (b.name === this.treeType)));
      return this.treeFolded ? arr.slice(0, 1) : arr;
    },
    parentTypes() {
      const current = this.isPater ? 'pater' : 'mater';
      const arr = parentTypes.sort((a, b) => ((a.name === current) < (b.name === current)));
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
      this.parentFolded = true;
      this.setTree(type);
    },
    selectParent(type) {
      this.parentFolded = !this.parentFolded;
      this.treeFolded = true;
      this.setPater(type.name === 'pater');
    },
	},
}
    
</script>

<style lang="less" scoped>
@width: 50px;
@background: #333;

.setting {
  position: fixed;
  height: 100vh;
  z-index: 10;
  left: 0;
  width: @width;
	background: @background;
	color: white;
  box-shadow: 2px 0 7px rgba(0, 0, 0, 0.1);
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
    background: #555;
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

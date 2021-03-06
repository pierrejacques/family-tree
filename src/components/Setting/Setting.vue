<template>
  <aside class="aside-wrapper">
    <div class="stretch-box" :class="{ folded: infoFolded }">
      <div class="info-detail">
        <img class="user-head" src="../../asset/img/user-head.svg">
        <p class="user-title">{{userInfo.username}}</p>
        <p class="user-title" v-if="userInfo.nickname">{{userInfo.nickname}}</p>
        <div class="function-area">
          家谱历史版本
          <ul>
            <li v-for="tree in historyTrees" :key="tree._id">
              <a class="pointer" @click.prevent="getTree(tree._id)">
                {{tree.createdOn}}
              </a>
            </li>
          </ul>
          <a class="btn-logout pointer" @click="logout">退出登陆</a>
        </div>
      </div>
    </div>
    <div class="setting">
      <div class="user-info pointer" @click="triggleInfo">
        <img class="user-head" v-if="infoFolded" src="../../asset/img/user-head.svg">
        <i v-else class="iconfont icon-back"></i>
        <tooltip v-if="infoFolded">查看用户信息</tooltip>
      </div>
      <button class="operator" @click="saveTree">
        <i class="iconfont icon-save"></i>
        <tooltip>保存当前家谱</tooltip>
      </button>
      <div class="folder">
        <button class="operator" v-for="(type, idx) in parentTypes" :key="idx" @click="selectParent(type)">
          <i class="iconfont" :class="`icon-${type.name}`"></i>
          <tooltip position="bottom">{{type.desc}}</tooltip>
        </button>
      </div>
      <!-- <div class="folder">
        <button class="operator" v-for="(type, idx) in treeTypes" :key="idx" @click="selectTree(type)">
          <i class="iconfont" :class="`icon-${type.name}-tree`"></i>
        </button>
      </div> -->
  </div>
  </aside>

</template>

<script>
import IPA from 'ipa.js';
import { mapState, mapMutations } from 'vuex';
import axios from 'axios';
import Tooltip from '../Shared/Tooltip';

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
    desc: '父系树'
  },
  {
    name: 'mater',
    desc: '母系树'
  }
];

let interval;

export default {
  name: 'setting',
  components: {
    tooltip: Tooltip,
  },
  data() {
    return {
      parentFolded: true,
      treeFolded: true,
      infoFolded: true,
      historyTrees: [],
    }
  },
  computed: {
    ...mapState([
      'isPater',
      'treeType',
      'tree',
      'userInfo',
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
  mounted() {
    this.getHistoryInfo();
    this.startAutoSave();
  },
  beforeDestroy() {
    clearInterval(interval);
  },
	methods: {
		...mapMutations([
      'setPater',
      'setTree',
      'setLogin',
    ]),
    startAutoSave() {
      let interval = setInterval(() => {
        if (this.tree) {
          this.saveTree(true);
        }
      }, 5 * 60 * 1000);
    },
    getHistoryInfo() {
      const schema = new IPA({
        code: Number,
        data: [{
          _id: String,
          createdOn: String,
        }],
        msg: String,
        success: false,
      });
      axios.get('/api/gethistory').then(
        res => {
          const result = schema.guarantee(res.data);
          if (result.success) {
            this.historyTrees = result.data;
          }
        }
      );
    },
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
    saveTree(passive = false) {
      this.msg = '';
      axios.post('/api/savetree', {
        data: this.tree.toString(),
      }).then(res => {
        this.msg = '';
        if (res.data.result === 1) {
          this.msg = passive ? '已自动保存' : '保存成功';
        } else if (res.data.result === -1 && !passive) {
          this.msg = '没有变更';
        }
      }).catch(err => {
        localStorage.setItem('family_tree_temp_save', this.tree.toString());
        this.msg = '服务器保存失败，已将最新版本存至本地'; 
      });
    },
    triggleInfo() {
      this.infoFolded = !this.infoFolded;
    },
    getTree(_id) {
      console.log(`to get tree ${_id}`); // TODO:
    },
    logout() {
      this.setLogin({ loggedIn: false });
      this.$router.push({ name: 'Intro' });
      axios.get('/api/logout').then(
        res => {
      
        },
        err => {},
      )
    }
	},
}
    
</script>

<style lang="less" scoped>
@width: 50px;
@background: #333;
.aside-wrapper {
  display: flex;
  position: fixed;
  z-index: 1;
}

.stretch-box {
  position: relative;
  @w: 300px;
  width: @w;
  background: lighten(@background, 5%);
  transition: 0.3s;
  &.folded {
    width: 0;
  }
  .info-detail {
    width: @w;
  }
}

.info-detail {
  position: absolute;
  top: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
  font-size: 14px;
  .user-head {
    margin: 40px auto 20px;
    opacity: 0.8;
  }
  .user-title {
    margin: 5px 0;
    color: #ccc;
  }
  .function-area {
    border-top: 1px solid #333;
    margin: 20px;
    padding: 20px 0;
    .btn-logout {
      color: #888888;
    }
  }
}

.setting {
  height: 100vh;
  left: 0;
  width: @width;
	background: @background;
	color: white;
  box-shadow: 2px 0 7px rgba(0, 0, 0, 0.1);
}
.user-info {
  position: relative;
  @margin-x: 10px;
  width: @width - 2 * @margin-x;
  margin: 0 @margin-x 10px;
  padding: 20px 0 10px;
  border-bottom: 1px solid #111;
  .user-head {
    width: 100%;
    margin: auto;
    opacity: 0.65;
    transition: 0.3s;
  }
  &:hover {
    .user-head {
      opacity: 0.9;
    }
  }
}
.operator {
  display: inline-block;
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
  display: inline;
  text-align: left;
  white-space: nowrap;
}
.icon-back {
  color: #ccc;
  margin-left: 5px;
  line-height: 35px;
}

.pointer {
  cursor: pointer;
}
</style>

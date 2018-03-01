import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';

Vue.use(Vuex);

const state = {
  // tree related
  tree: {},
  isPater: true,
  treeType: 'grand',
  newCommer: {},

  // dialog related
  isMaskOn: false,
  dialogAction: null,
  dialogCache: {},
};

const getters = {
  me: state => state.tree && state.tree.me,
  current: state => state.tree && state.tree.current,
  relation: state => state.tree && state.tree.relation(),
  root: state => {
    const me = state.tree && state.tree.me;
    if (!me) {
      return null;
    }
    const type = state.treeType;
    const parent = state.isPater ? 'father' : 'mother';
    const another = state.isPater ? 'mother' : 'father';
    if (type === 'parent') {
      return me[parent] || me[another] || me;
    }
    if (type === 'grand') {
      let root = me;
      while (root[parent] || root[another]) {
        root = root[parent] || root[another];
      }
      return root;
    }
    return me;
  }
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
});

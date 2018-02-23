import Vue from 'vue';
import Vuex from 'vuex';
import reconstruct from './reconstruct';
import Person from './person';
import Tree from './tree';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tree: {},
    isPater: true,
  },
  getters: {
    me: state => state.tree && state.tree.me,
    current: state => state.tree && state.tree.current,
    relation: state => state.tree && state.tree.relation(),
  },
  mutations: {
    buildTree(state, data) {
      state.tree = reconstruct(data);
    },
    setMe(state) {
      state.tree.setMe(state.tree.current);
      state.tree.current = null;
    },
    setCurrent(state, id) {
      const person = state.tree.members[id];
      if (!person) {
        state.tree.current = null;
      }
      state.tree.setCurrent(person);
    },
    transpose(state) {
      state.tree.transpose();
    },
    setPater(state, bool) {
      state.isPater = bool;
    }
  },
});

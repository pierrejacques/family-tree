import Vue from 'vue';
import Vuex from 'vuex';
import reconstruct from './reconstruct';
import Person from './person';
import Tree from './tree';

Vue.use(Vuex);

const state = {
  tree: {},
  isPater: true,
  treeType: 'grand',
  newCommer: {},
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

const mutations = {
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
  },
  setTree(state, type) {
    state.treeType = type.name;
  },
  saveTree(state) {
    localStorage.setItem('tree', state.tree.toString());
  },
  changeInfo(state, { id, data }) {
    const person = state.tree.members[id];
    person.firstname = data.firstname;
    person.lastname = data.lastname;
    person.bornOn = data.bornOn;
    person.isMale = data.isMale;
    if (person.father) person.father.sort();
    if (person.mother) person.mother.sort();
  },
  setFather(state, { id, info }) {
    const father = new Person(info);
    state.tree.add(father);
    const person = state.tree.members[id];
    person.setFather(father);
    father.addOffspring(person);
    if (person.mother) {
      person.mother.setFellow(father);
      father.setFellow(person.mother);
    }
  },
  setMother(state, { id, info }) {
    const mother = new Person(info);
    state.tree.add(mother);
    const person = state.tree.members[id];
    person.setMother(mother);
    mother.addOffspring(person);
    if (person.father) {
      person.father.setFellow(mother);
      mother.setFellow(person.father);
    }
  },
  addOffspring(state, { id, info }) {
    const child = new Person(info);
    state.tree.add(child);
    const person = state.tree.members[id];
    person.addOffspring(child);
    if (person.isMale) {
      child.setFather(person);
      if (person.fellow) {
        child.setMother(person.fellow);
        person.fellow.addOffspring(child);
      }
    } else {
      child.setMother(person);
      if (person.fellow) {
        child.setFather(person.fellow);
        person.fellow.addOffspring(child);
      }
    }
  },
  setFellow(state, { id, info }) {
    const fellow = new Person(info);
    state.tree.add(fellow);
    const person = state.tree.members[id];
    person.setFellow(fellow);
    fellow.setFellow(person);
  },
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
});

import axios from 'axios';
import reconstruct from '../models/reconstruct';
import Person from '../models/Person';
import Tree from '../models/Tree';

export default {
  setLogin(state, info) {
    state.userInfo = info;
  },
  buildTree(state, data) { // 从存储资料重建
    state.tree = reconstruct(data);
  },
  newTree(state) { // 新建
    const person = new Person({
      firstname: '姓',
      lastname: '名',
    });
    const tree = new Tree();
    tree.add(person);
    tree.me = person;
    state.tree = tree;
  },
  clearCurrent(state) {
    state.tree.current = null;
  },
  closeMask(state) {
    state.isMaskOn = false;
    state.idToDelete = null;
    state.dialogCache = {};
    state.dialogAction = null;
  },
  callDialog(state, { action, cache }) {
    state.isMaskOn = true;
    state.dialogCache = cache;
    state.dialogAction = action;
  }
}
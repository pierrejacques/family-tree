import axios from 'axios';
import reconstruct from '../models/reconstruct';

export default {
  setLogin(state, info) {
    state.userInfo = info;
  },
  buildTree(state, data) {
    state.tree = reconstruct(data);
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
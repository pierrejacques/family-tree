import reconstruct from '../models/reconstruct';

export default {
  buildTree(state, data) {
    state.tree = reconstruct(data);
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
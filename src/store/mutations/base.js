import reconstruct from '../models/reconstruct';

export default {
  buildTree(state, data) {
    state.tree = reconstruct(data);
  },
}
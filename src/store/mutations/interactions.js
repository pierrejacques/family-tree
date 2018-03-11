export default {
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
  changeInfo(state, { id, data }) {
    const person = state.tree.members[id];
    person.firstname = data.firstname;
    person.lastname = data.lastname;
    person.bornOn = data.bornOn;
    person.isMale = data.isMale;
    if (person.father) person.father.sort();
    if (person.mother) person.mother.sort();
  },
}
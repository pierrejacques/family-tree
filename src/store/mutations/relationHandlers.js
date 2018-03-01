import Person from '../models/Person';

export default {
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
    person.offsprings.forEach(child => {
      fellow.addOffspring(child);
    });
  },
  expireFromTree(state, id) {
    const person = state.tree.members[id];
    if (person) person.expire();
    state.tree.current = null;
    delete state.tree.members[id];
  },
};
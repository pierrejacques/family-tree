export default class Tree {
  constructor(member = {}) {
    this.members = member;
  }

  add(person) {
    this.members[person.id] = person;
  }

  toString() {
    return JSON.stringify(this.members);
  }
}

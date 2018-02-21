import Person from './person';

export default class Tree {
  constructor(member = {}) {
    this.members = member;
    this.tags = {};
    this.me = null;
    this.current = null;
  }

  add(person) {
    this.members[person.id] = person;
  }

  toString() {
    return JSON.stringify({
      members: this.members,
      meId: this.me.id,
    });
  }

  has(person) {
    return Boolean(this.members[person.id]);
  }

  setMe(person) {
    if (!this.has(person)) {
      return false;
    }
    this.me = person;
    return true;
  }

  setCurrent(person) {
    if (!this.has(person)) {
      return false;
    }
    this.current = person === this.me ? null : person;
    return true;
  }

  transpose() {
    if (this.current) {
      [this.me, this.current] = [this.current, this.me];
    }
  }

  setTag(id, value, version) {
    const currentTag = this.tags[id];
    const person = this.members[id];
    if (person && (!currentTag || currentTag.version !== version)) {
      this.tags[id] = { value, version };
      const fellow = this.members[person.fellow];
      if (fellow) {
        this.setTag(fellow, value, version);
      }
      const mother = this.members[person.mother];
      if (mother) {
        this.setTag(mother, value - 1, version);
      }
      const father = this.members[person.father];
      if (father) {
        this.setTag(father, value -1, version);
      }
      person.offsprings.forEach(child => {
        this.setTag(this.members[child], value + 1, version);
      });
      person.exs.forEach(fellow => {
        this.setTag(this.members[fellow], value, version);
      });
    }
  }

  updateTags() {
    const version = (+new Date()).toString(36);
    if (!this.me) {
      return false;
    }
    this.setTag(this.me.id, 0, version);
    console.log(this.tags);
  }
 
  fatherTree() {

  }

  motherTree() {

  }
}

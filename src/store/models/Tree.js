import Person from './Person';
import Relation from './Relation';

export default class Tree {
  constructor(member = {}) {
    this.members = member; // 全体成员
    this.me = null;
    this.current = null;
  }

  add(person) {
    this.members[person.id] = person;
  }

  toString() {
    const cmpMembers = {};
    Object.values(this.members).forEach(person => {
      cmpMembers[person.id] = person.compress();
    });
    return JSON.stringify({
      members: cmpMembers,
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
    Object.values(this.members).forEach(one => {
      one.isMe = one === person;
    })
    return true;
  }

  setCurrent(person) {
    if (!this.has(person)) {
      return false;
    }
    const val = person === this.me ? null : person;
    this.current = val;
    Object.values(this.members).forEach(one => {
      one.isCurrent = one === val;
    });
    return true;
  }

  transpose() {
    if (this.current) {
      const me = this.me;
      this.setMe(this.current);
      this.setCurrent(me);
    }
  }

  relation() {
    if (!this.me || !this.current) {
      return '未知';
    }
    return new Relation(this.me, this.current).calculate();
  }
}

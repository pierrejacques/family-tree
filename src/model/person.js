import md5 from 'js-md5';

const dateFormatChecker = str => /^(\d\d\d\d)-([0-1][0-9])-([0-3][0-9])$/.test(str);

const getToday = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1);
  const date = today.getDate();
  const filler = str => `${str.toString().length > 1 ? '' : '0'}${str}`;
  return `${year}-${filler(month)}-${filler(date)}`;
};

export default class Person {
  constructor({
    firstname,
    lastname,
    id = '',
    info = {},
    bornOn = getToday(),
    deadOn = getToday(),
    isMale = true,
    isAlive = true,
    fellow = '',
    father = '',
    mother = '',
    offsprings = [],
    exs = [],
  }) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.bornOn = bornOn;
    this.deadOn = deadOn;
    this.info = info;
    this.isMale = isMale;
    this.isAlive = isAlive;
    this.fellow = fellow;
    this.father = father;
    this.mother = mother;
    this.offsprings = offsprings;
    this.exs = exs;
    this.id = id || this.genId();
  }

  genId() {
    const createTime = (+new Date()).toString(36);
    const randomValue = Math.floor(Math.random() * 10000).toString(36);
    const code = `${createTime}${randomValue}${this.bornOn}${this.firstname}${this.lastname}`;
    return md5(code).slice(0, 7);
  }

  setDead(str = '') {
    if (this.isAlive) {
      return false;
    }
    this.isAlive = false;
    this.deadOn = dateFormatChecker(str) ? str : getToday();
    return true;
  }

  addOffspring(person) {
    const id = person.id;
    if (this.id !== id && this.offsprings.indexOf(id) === -1) {
      this.offsprings.push(id);
      return true;
    }
    return false;
  }

  removeOffspring(person) {
    const idx = this.offsprings.indexOf(person.id);
    if (idx !== -1) {
      this.offsprings.splice(idx, 1);
      return true;
    }
    return false;
  }

  setFather(person) {
    const id = person.id;
    if (this.father || this.id === id) {
      return false;
    }
    this.father = id;
    return true;
  }

  setMother(person) {
    const id = person.id;
    if (this.mother || this.id === id) {
      return false;
    }
    this.mother = id;
    return true;
  }

  setFellow(person) {
    const id = person.id;
    if (id === this.id) {
      return false;
    }
    if (this.fellow) {
      this.exs.push(this.fellow);
    }
    this.fellow = id;
    return true;
  }
}

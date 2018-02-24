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
  }) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.bornOn = bornOn;
    this.deadOn = deadOn;
    this.info = info;
    this.isMale = isMale;
    this.isAlive = isAlive;
    this.fellow = null;
    this.father = null;
    this.mother = null;
    this.offsprings = [];
    this.exs = [];
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

  sort() {
    this.offsprings.sort((a, b) => new Date(a.bornOn) > new Date(b.bornOn));
  }

  addOffspring(person) {
    if (this !== person && this.offsprings.indexOf(person) === -1) {
      this.offsprings.push(person);
      this.sort();
      return true;
    }
    return false;
  }

  removeOffspring(person) {
    const idx = this.offsprings.indexOf(person);
    if (idx !== -1) {
      this.offsprings.splice(idx, 1);
      return true;
    }
    return false;
  }

  setFather(person) {
    if (this.father || this === person) {
      return false;
    }
    this.father = person;
    return true;
  }

  setMother(person) {
    if (this.mother || this === person) {
      return false;
    }
    this.mother = person;
    return true;
  }

  setFellow(person) {
    if (this === person) {
      return false;
    }
    if (this.fellow) {
      this.exs.push(this.fellow);
    }
    this.fellow = person;
    return true;
  }

  compress() {
    const obj = Object.assign({}, this);
    delete obj.fellow;
    delete obj.mother;
    delete obj.father;
    delete obj.offsprings;
    delete obj.exs;
    obj.fellowId = this.fellow && this.fellow.id;
    obj.motherId = this.mother && this.mother.id;
    obj.fatherId = this.father && this.father.id;
    obj.offspringsId = this.offsprings.map(person => person.id);
    obj.exsId = this.exs.map(person => person.id);
    return obj;
  }
}

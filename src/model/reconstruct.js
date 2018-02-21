import IPA from 'ipa.js';
import Person from './person';
import Tree from './tree';

const ipa = new IPA({
    meId: String,
    members: Object,
  });
  
export default data => {
  if (!ipa.check(data)) {
      return false;
  }
  const members = {};
  Object.values(data.members).forEach(cmpPerson => {
      members[cmpPerson.id] = new Person(cmpPerson);
  });
  Object.values(data.members).forEach(cmpPerson => {
      const person = members[cmpPerson.id];
      cmpPerson.offspringsId.forEach(id => {
        person.addOffspring(members[id]);
      });
      cmpPerson.exsId.forEach(id => {
        person.setFellow(members[id]);
      });
      person.setFather(members[cmpPerson.fatherId]);
      person.setMother(members[cmpPerson.motherId]);
      person.setFellow(members[cmpPerson.fellowId]);
  });
  const tree = new Tree(members);
  tree.setMe(members[data.meId]);
  return tree;
};
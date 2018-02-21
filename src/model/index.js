import IPA from 'ipa.js';
import Person from './person';
import Tree from './tree';

const ipa = new IPA({
  meId: String,
  members: Object,
});

const reconstruct = data => {
  if (!ipa.check(data)) {
    return false;
  }
  const members = {};
  Object.values(data.members).forEach((person) => {
    members[person.id] = new Person(person);
  });
  const tree = new Tree(members);
  tree.setMe(members[data.meId]);
  return tree;
};

export {
    Person,
    Tree,
    reconstruct,
};
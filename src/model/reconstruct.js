import Person from './person';
import Tree from './tree';

export default (str) => {
  const membersData = JSON.parse(str);
  const members = {};
  Object.values(membersData).forEach((person) => {
    members[person.id] = new Person(person);
  });
  return new Tree(members);
};

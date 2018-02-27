import matchBridgePattern from './bridgePatterns';
import collapseUp from './collapseUpchain';
import collapseDown from './collapseDownchain';
import finalMerge from './finalMerge';

export default class Relation {
  constructor(from, to) {
    const family = new Set([...document.getElementsByClassName('major-visible-node')].map(item => item.getAttribute('data-id')));
    const upchain = [{
      person: from,
      relation: '自己',
    }];
    const downchain = [{
      person: to,
      relation: '自己',
    }];
    const expand = chain => {
      let pointer = chain[0], isFather;
      const getId = (who) => pointer.person[who] && pointer.person[who].id;
      if (!family.has(pointer.person.id)) {
        chain.unshift({
          person: chain[0].person.fellow,
          relation: chain[0].person.isMale ? '妻子' : '丈夫',
        });
      }
      pointer = chain[0];
      while (
        (isFather = family.has(getId('father'))) || family.has(getId('mother'))
      ) {
        const parent = isFather ? 'father' : 'mother';
        const relation = isFather ? '父亲' : '母亲';
        pointer = {
          person: pointer.person[parent],
          relation,
        };
        chain.unshift(pointer);
      }
    };
    expand(upchain);
    expand(downchain);
    this.isValid = upchain[0].person.id === downchain[0].person.id;
    this.upchain = upchain;
    this.downchain = downchain;
    if (this.isValid) {
      this.trim();
    }
  }

  trim() {
    while (this.upchain[1] && this.downchain[1] && this.upchain[1].person === this.downchain[1].person) {
      this.upchain.shift();
      this.downchain.shift();
    }
    const newDownchain = [];
    this.downchain.forEach((item, idx, arr) => {
      if (idx > 0) {
        const gender = item.person.isMale;
        const map = {
          父亲: gender ? '儿子' : '女儿',
          母亲: gender ? '儿子' : '女儿',
          丈夫: '妻子',
          妻子: '丈夫',
        };
        const relation = map[arr[idx - 1].relation];
        newDownchain.push({
          person: item.person,
          relation,
        });
      }
    });
    this.downchain = newDownchain;
  }

  calculate() {
    if (!this.isValid) {
      return '未知';
    }
    let pattern, bridge = '';
    // 塌缩平辈桥接
    while (this.upchain[0] && this.downchain[0] &&
      (pattern = matchBridgePattern( this.upchain[0], this.downchain[0]))
    ) {
      bridge = pattern.resolve(this.upchain, this.downchain, bridge);
      this.upchain.shift();
      this.downchain.shift();
    }
    this.upchain.pop();
    const upRelation = this.upchain.reverse().map(i => i.relation);
    const downRelation = this.downchain.map(i => i.relation);
    // 塌缩上链
    while (upRelation.length > 1) {
      const base = upRelation[0];
      const comin = upRelation[1];
      upRelation[0] = collapseUp(base, comin);
      upRelation.splice(1, 1);
    }
    // 塌缩下链
    while (downRelation.length > 1) {
      const base = downRelation[0];
      const comin = downRelation[1];
      downRelation[0] = collapseDown(base, comin);
      downRelation.splice(1, 1);
    }
    // 塌缩上中下
    return finalMerge(upRelation[0], bridge, downRelation[0]);
  }
}
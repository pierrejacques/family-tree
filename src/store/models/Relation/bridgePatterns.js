const getSort = (u, d) => new Date(u[1].person.bornOn) > new Date(d[0].person.bornOn);

const patterns = [
  {
    pre: '父亲',
    post: '儿子',
    resolve(u, d, c) {
      const sort = getSort(u, d);
      if (c === '亲兄' || c === '亲弟' || c === '堂兄' || c === '堂弟') return sort ? '堂兄' : '堂弟';
      if (c[1] === '姐' || c[1] === '妹' || c[0] === '表') return sort ? '表兄' : '表弟';
      return sort ? '亲兄' : '亲弟';
    }
  },
  {
    pre: '父亲',
    post: '女儿',
    resolve(u, d, c) {
      const sort = getSort(u, d);
      if (c === '亲兄' || c === '亲弟' || c === '堂兄' || c === '堂弟') return sort ? '堂姐' : '堂妹'; 
      if (c[1] === '姐' || c[1] === '妹' || c[0] === '表') return sort ? '表姐' : '表妹';
      return sort ? '亲姐' : '亲妹';
    }
  },
  {
    pre: '母亲',
    post: '儿子',
    resolve(u, d, c) {
      const sort = getSort(u, d);
      if (c) return sort ? '表哥' : '表弟'; 
      return sort ? '亲兄' : '亲弟';
    }
  },
  {
    pre: '母亲',
    post: '女儿',
    resolve(u, d, c) {
      const sort = getSort(u, d);
      if (c) return sort ? '表姐' : '表妹'; 
      return sort ? '亲姐' : '亲妹';
    }
  },
];

export default (upNode, downNode) => {
  let ret = false;
  patterns.forEach(pat => {
    if (pat.pre === upNode.relation && pat.post === downNode.relation) {
      ret = pat;
    }
  });
  return ret;
};
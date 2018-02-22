const { 
    Person, 
    Tree
} = require('../dist/bundle');

const tree = new Tree();

// layer-1
const jht = new Person({
    firstname: '金',
    lastname: '红田',
    bornOn: '1940-12-21',
    info: {
        出生地: '奉贤, 上海',
        兴趣: '看电视',
    }
});
tree.add(jht);

const zxy = new Person({
    firstname: '张',
    lastname: '小英',
    bornOn: '1943-12-12',
    isMale: false,
});
tree.add(zxy);

zxy.setFellow(jht);
jht.setFellow(zxy);


// layer-2
const jgh = new Person({
    firstname: '金',
    lastname: '国华',
    bornOn: '1965-10-27',
});
tree.add(jgh);

jgh.setFather(jht);
jgh.setMother(zxy);
jht.addOffspring(jgh);
zxy.addOffspring(jgh);

const fwh = new Person({
    firstname: '冯',
    lastname: '文华',
    bornOn: '1968-09-05',
    isMale: false,
});
tree.add(fwh);

fwh.setFellow(jgh);
jgh.setFellow(fwh);

const jgf = new Person({
    firstname: '金',
    lastname: '国飞',
    bornOn: '1970-01-01',
});
tree.add(jgf);

jgf.setFather(jht);
jgf.setMother(zxy);
jht.addOffspring(jgf);
zxy.addOffspring(jgf);

const xjh = new Person({
    firstname: '薛',
    lastname: '建华',
    bornOn: '1982-01-01',
    isMale: false,
});
tree.add(xjh);

xjh.setFellow(jgf);
jgf.setFellow(xjh);

const jhp = new Person({
    firstname: '金',
    lastname: '海萍',
    bornOn: '1973-12-12',
    isMale: false,
});
tree.add(jhp);

jhp.setFather(jht);
jhp.setMother(zxy);
jht.addOffspring(jhp);
zxy.addOffspring(jhp);

const zwm = new Person({
    firstname: '诸',
    lastname: '卫明',
    bornOn: '1967-12-12',
});
tree.add(zwm);

zwm.setFellow(jhp);
jhp.setFellow(zwm);

// layer-2-2
const zxc = new Person({
    firstname: '钟',
    lastname: '祥财',
    bornOn: '1957-03-03',
});
tree.add(zxc);

const yyw = new Person({
    firstname: '叶',
    lastname: '雅薇',
    bornOn: '1960-12-12',
    isMale: false,
});
tree.add(yyw);

zxc.setFellow(yyw);
yyw.setFellow(zxc);


// layer-3
const jch = new Person({
    firstname: '金',
    lastname: '辰浩',
    bornOn: '1992-12-11',
});
tree.add(jch);

jch.setFather(jgh);
jch.setMother(fwh);
jgh.addOffspring(jch);
fwh.addOffspring(jch);

const zy = new Person({
    firstname: '钟',
    lastname: '媛',
    bornOn: '1993-12-13',
    isMale: false,
});
tree.add(zy);

zy.setFellow(jch);
jch.setFellow(zy);
zy.setFather(zxc);
zy.setMother(yyw);
zxc.addOffspring(zy);
yyw.addOffspring(zy);

const jjh = new Person({
    firstname: '金',
    lastname: '家昊',
    bornOn: '2001-01-01',
});
tree.add(jjh);

jjh.setFather(jgf);
jjh.setMother(xjh);
jgf.addOffspring(jjh);
xjh.addOffspring(jjh);

const jzh = new Person({
    firstname: '金',
    lastname: '诸豪',
    bornOn: '1992-07-05',
});
tree.add(jzh);

jzh.setFather(zwm);
jzh.setMother(jhp);
zwm.addOffspring(jzh);
jhp.addOffspring(jzh);

const lj = new Person({
    firstname: '刘',
    lastname: '佳',
    bornOn: '1992-02-05',
    isMale: false,
});
tree.add(lj);

jzh.setFellow(lj);
lj.setFellow(jzh);

// layer-4
const jzg = new Person({
    firstname: '金',
    lastname: '甄姑',
    bornOn: '2021-01-03',
});
tree.add(jzg);

jzg.setFather(jch);
jzg.setMother(zy);
jch.addOffspring(jzg);
zy.addOffspring(jzg);

const jhx = new Person({
    firstname: '金',
    lastname: '赫轩',
    bornOn: '2017-01-03',
});
tree.add(jhx);

jhx.setFather(jzh);
jzh.addOffspring(jhx);
jhx.setMother(lj);
lj.addOffspring(jhx);


tree.setMe(jht);

console.log(tree.toString());
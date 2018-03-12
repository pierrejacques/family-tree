const db = require('../database')();

/* GET */

module.exports = async function (req, res, next) {
    const _id = req.cookies.user_id;
    const user = await db.validateCookie(_id);
    res.status = 200;
    if (!user) {
        res.send({
            code: 400,
            tree: '',
            msg: '没有权限',
        });
        return;
    }
    const latest = user.trees[0];
    if (!latest) {
        res.send({
            code: 400,
            tree: null,
            hasTree: false,
            msg: '该用户尚无已保存的家谱',
        })
        return;
    }
    const tree = await db.findTree({ _id: latest });
    res.send({
        code: 200,
        tree: {
            data: tree.data,
            createOn: tree.createOn,
            updateOn: tree.updateOn,
        },
        hasTree: true,
        msg: '成功获得家谱'
    })
}
const db = require('../database')();

/* POST */

module.exports = async function (req, res, next) {
    const data = req.body.data;
    const _id = req.cookies.user_id;
    res.status = 200;
    if (!_id) {
        res.send({
            code: 400,
            msg: '没有权限',
        });
        return;
    }
    if (data) {
        const user = await db.findUser({ _id });
        const result = await db.newTree(data, user.username);
        res.send({
            code: 200,
            msg: { 
                '-1': '数据未改变',
                0: '没有该用户',
                1: '保存成功'
            }[result],
        })
    } else {
        res.send({
            code: 200,
            msg: '数据格式错误',
        })
    }
}
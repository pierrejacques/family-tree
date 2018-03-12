const IPA = require('ipa.js').default;
const db = require('../database')();
const getExpire = require('../lib/getExpire');

/* POST */

const ipa = new IPA({
    username: String,
    password: String,
})

module.exports = async function (req, res, next) {
    const data = req.body;
    const msg = '';
    if (ipa.check(data)) {
        const id = await db.validateUser(data.username, data.password);
        if (id) {
            res.cookie('user_id', id, {
                expires: getExpire(),
                httpOnly: true,
            });
        }
        res.status = 200;
        res.send({
            code: 200,
            isValid: !!id,
            msg: id ? '登陆成功' : '用户名或密码错误',
        });
    } else {
        res.status = 400
        res.send({
            code: 400,
            msg: '数据格式有误!'
        })
    }
}
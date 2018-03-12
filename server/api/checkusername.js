const IPA = require('ipa.js').default;
const db = require('../database')();

/* GET */

const ipa = new IPA({
    username: String,
});

module.exports = async function (req, res, next) {
    const data = req.query;
    if (ipa.check(data)) {
        res.status = 200;
        const isValid = !await db.findUser(data.username);
        res.send({
            code: 200,
            isValid,
            msg: isValid ? '用户名可用' : '已有相同的用户名',
        });
    } else {
        res.status = 400
        res.send({
            code: 400,
            msg: '数据格式有误!'
        });
    }
}
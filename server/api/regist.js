const IPA = require('ipa.js').default
const db = require('../database')();

/* POST */

const ipa = new IPA({
    username: String,
    password: String,
    nickname: String,
})

module.exports = async function (req, res, next) {
    const data = req.body
    if (ipa.check(data) && data.username && data.password && data.nickname) {
        const code = 200;
        const success = !!await db.addUser(data);
        res.status = 200;
        res.send({ 
            code: 200,
            success: success,
            msg: success ? '用户名添加成功！' : '已有相同的用户名，请尝试其他名字！',
        });
    } else {
        res.status = 400
        res.send({
            code: 400,
            msg: '数据格式有误!'
        })
    }
}
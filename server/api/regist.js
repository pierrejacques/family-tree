const IPA = require('ipa.js').default
const db = require('../database')();
const getExpire = require('../lib/getExpire');

/* POST */

const ipa = new IPA({
    username: String,
    password: String,
})

module.exports = async function (req, res, next) {
    const data = req.body;
    if (ipa.check(data) && data.username && data.password) {
        const code = 200;
        const user = await db.addUser(data);
        res.status = 200;
        if (user) {
            res.cookie('user_id', user._id, {
                expires: getExpire(),
                httpOnly: true,
            });
        }
        res.send({ 
            code: 200,
            success: !!user,
            msg: user ? '用户名添加成功！' : '已有相同的用户名，请尝试其他名字！',
        });
    } else {
        res.status = 400
        res.send({
            code: 400,
            msg: '数据格式有误!'
        })
    }
}
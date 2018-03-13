const db = require('../database')();

/* GET */

module.exports = async function (req, res, next) {
    const _id = req.cookies.user_id;
    let isValid = false;
    res.status = 200;
    if (_id) {
        isValid = await db.validateCookie(_id);
    }
    if (isValid) {
        const user = await db.findUser({ _id });
        res.send({
            code: 200,
            msg: '请求成功',
            data: {
                username: user.username,
                loggedIn: true,
            }
        })
    } else {
        res.send({
            code: 200,
            data: {
                loggedIn: false,
            },
            msg: '对不起，您尚未登陆'
        })
    }

}
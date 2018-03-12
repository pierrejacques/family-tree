const db = require('../database')();

/* GET */

module.exports = async function (req, res, next) {
  const _id = req.cookies.user_id;
  await db.logoutUser(_id);
  res.status = 200;
  res.cookie('user_id', _id, {
    expires: new Date(0),
    httpOnly: true,
  });
  res.status = 200;
  res.send({
    code: 200,
    msg: '已登出',
  });
  res.end();
}
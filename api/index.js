const router = require('express').Router()
const regist = require('./regist');
const checkusername = require('./checkusername');
const login = require('./login');
const saveTree = require('./saveTree');
const userinfo = require('./userinfo');
const latestTree = require('./latestTree');
const logout = require('./logout');

router.get('/userinfo', userinfo);
router.get('/checkusername', checkusername);
router.get('/latestTree', latestTree);
router.get('/logout', logout);
router.post('/regist', regist);
router.post('/login', login);
router.post('/saveTree', saveTree);


module.exports = router;

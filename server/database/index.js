const rand = require('csprng')
const crypto = require('crypto')
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const getExpire = require('../lib/getExpire');
const URI = 'mongodb://localhost:27017/db';
const CACHE_SIZE = 10;

const userSchema = new Schema({
    username: String,
    hash: String,
    salt: String,
    validTill: Date, // 有效登陆时间
    trees: [String], /* treeId */
});

const treeSchema = new Schema({
    createOn: Date,
    users: [String], /* username */
    data: String,
    hash: String,
});

class Database {
    constructor() {
        mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
        mongoose.connection.once('open', () => {
            console.log(`connected to Mongod Database @${URI}`);
        });
        mongoose.connect(URI);
        this.Users = mongoose.model('users', userSchema);
        this.Trees = mongoose.model('trees', treeSchema);
    }

    findUser(query) {
        const q = typeof query === 'string' ? { username: query } : query;
        return new Promise((resolve, reject) => {
            this.Users.findOne(q).exec((err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    }

    async addUser({ username, password }) {
        const result = await this.findUser(username);
        if (result) return false;
        const salt = rand(160, 36);
        const hash = crypto.createHash('sha256').update(`${salt}${password}`).digest('hex');
        return await this.Users.create({ 
            username,
            hash,
            salt,
            trees: [],
            validTill: getExpire(),
        });
    }

    async validateUser(username, password) {
        const result = await this.findUser(username);
        if (!result) return false;
        const { hash, salt } = result;
        const validId = crypto.createHash('sha256').update(`${salt}${password}`).digest('hex') === hash && result._id;
        if (validId) {
            await this.Users.updateOne({ _id: validId }, { validTill: getExpire() });
        }
        return validId;
    }

    async validateCookie(_id) {
        if (!_id) return false;
        const user = await this.findUser({ _id });
        if (user && user.validTill - Date.now() > 0) {
            await this.Users.updateOne({ _id }, { validTill: getExpire() });
            return user;
        }
        return false;
    }

    async clearUsers(condition = {}) {
        return await this.Users.remove(condition);
    }

    async logoutUser(_id) {
        return await this.Users.updateOne({ _id }, { validTill: new Date(0) });
    }

    findTree(_id) {
        return new Promise((resolve, reject) => {
            this.Trees.findOne({ _id }).exec((err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    }

    async newTree(data, username) {
        const hash = crypto.createHash('md5').update(data).digest('hex');
        const user = await this.findUser(username);
        if (!user) return 0;
        if (user.trees[0]) {
            const latestTree = await this.findTree({ _id: user.trees[0] });
            if (latestTree.hash === hash) return -1;
        }
        const tree = await this.Trees.create({ 
            data,
            createOn: new Date(),
            hash,
        });
        await this._addTree2User(tree, user);
        return 1;
    }

    async shareTree(treeId, username) {
        const user = await this.findUser(username);
        if (!user) return 0;
        await this._addTree2User(tree, user);
        return 1;
    }

    async clearTrees(condition = {}) {
        return await this.Trees.remove(condition);
    }

    async _addTree2User(tree, user) {
        const newTrees = user.trees.slice();
        const newUsers = tree.users.slice();
        newTrees.unshift(tree._id);
        if (newTrees.length > CACHE_SIZE) {
            const delTree = await this.findTree(newTrees.pop());
            const idx = delTree.users.indexOf(user.username);
            if (idx !== -1) {
                delTree.users.splice(idx, 1);
                if (delTree.users.length === 0) {
                    await this.clearTrees({ _id: delTree._id });
                } else {
                    await this.Trees.updateOne({ _id: delTree._id }, { users: delTree.users, updateOn: new Date() });
                }
            }
        }
        newUsers.push(user.username);
        await this.Users.updateOne({ username: user.username }, { trees: newTrees });
        await this.Trees.updateOne({ _id: tree._id }, { users: newUsers, updateOn: new Date() });
    }
}

module.exports = (() => {
    let instance = null;
    return (...params) => {
        if (!instance) {
            instance = new Database(...params);
        }
        return instance;
    }
})();
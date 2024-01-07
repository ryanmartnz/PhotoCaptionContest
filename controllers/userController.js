const CacheService = require('./cacheController');
const cache = new CacheService(3600);
const CACHE_KEY = 'users';

const User = require('../models').User;

const bcrypt = require('bcrypt');
const saltRounds = 10;

const findUser = async (req, res, next, id) => {
    req.user = await cache.get(`${CACHE_KEY}_${id}`, () => User
        .findByPk(id, {
            attributes: ['id', 'name', 'email']
        })
        .then((user) => {
            if(!user) {
                return res.status(404).send('User not found!');
            }
            return user;
        })
        .catch((error) => res.status(500).send(error))
    );
    next();
}

const listUsers = (req, res) => {
    return User
        .findAll({
            order: [
                ['id', 'ASC'],
            ],
            attributes: ['id', 'name', 'email']
        })
        .then((users) => res.status(200).send(users))
        .catch((error) => res.status(400).send(error));
}

const listUserById = (req, res) => {
    res.status(200).send(req.user);
}

const signUp = (req, res) => {
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        return User
            .create({
                name: req.body.name,
                email: req.body.email,
                password: hash
            })
            .then((user) => res.status(201).send({
                    id: user.id,
                    name: user.name,
                    email: user.email
                })
            )
            .catch((error) => res.status(500).send(error));
    });
}

const updateUser = (req, res) => {
    if(req.curUserId !== req.user.id) {
        return res.status(400).send({
            message: "You are not authorized to update this user"
        });
    }
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        return req.user
            .update({
                name: req.body.name || req.user.name,
                password: hash || req.user.password
            })
            .then(() => cache.delete(`${CACHE_KEY}_${req.user.id}`))
            .then(() => res.status(201).send({
                    id: req.user.id,
                    name: req.user.name,
                    email: req.user.email
                })
            )
            .catch((error) => res.status(500).send(error));
    });
}

const deleteUser = (req, res) => {
    if(req.curUserId !== req.user.id) {
        return res.status(403).send({
            message: "You are not authorized to update this user"
        });
    }
    return User
        .destroy({
            where: {
                id: req.user.id
            }
        })
        .then(() => cache.delete(`${CACHE_KEY}_${req.user.id}`))
        .then(() => {
            res.clearCookie("token");
            delete req.curUserId;
            delete req.user;
            return res.status(204).send();
        })
        .catch((error) => res.status(500).send(error));
}

module.exports = {
    findUser,
    listUsers,
    listUserById,
    signUp,
    updateUser,
    deleteUser
}
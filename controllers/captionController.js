const CacheService = require('./cacheController');
const cache = new CacheService(3600);
const CACHE_KEY = 'caption';

const User = require('../models').User;
const Caption = require('../models').Captions;
const Photo = require('../models').Photos;

const findCaption = async (req, res, next, id) => {
    req.caption = await cache.get(`${CACHE_KEY}_${id}`, () => Caption
        .findByPk(id, {
            include: [{
                model: Photo,
                as: 'photo'
            }, {
                model: User,
                as: 'user',
                attributes: ['id', 'name', 'email']
            }]
        })
        .then((caption) => {
            if(!caption) {
                return res.status(404).send({
                    message: 'Caption not found!'
                });
            }
            return caption;
        })
        .catch((error) => res.status(400).send(error))
    );
    next();
}

const listCaptionById = (req, res) => {
    res.status(200).send(req.caption);
}

const addCaption = (req, res) => {
    return Caption
        .create({
            photo_id: req.body.photo_id,
            user_id: req.curUserId,
            comment: req.body.comment
        })
        .then((caption) => res.status(201).send(caption))
        .catch((error) => res.status(400).send(error));
}

const updateCaption = (req, res) => {
    if(req.curUserId !== req.caption.user_id) {
        return res.status(401).send({
            message: 'You are not authorized to edit this caption'
        });
    }
    return req.caption
        .update({
            comment: req.body.comment || req.caption.comment
        })
        .then(() => cache.delete(`${CACHE_KEY}_${req.caption.id}`))
        .then(() => res.status(200).send(req.caption))
        .catch((error) => res.status(400).send(error));
}

const deleteCaption = (req, res) => {
    if(req.curUserId !== req.caption.user_id) {
        return res.status(401).send({
            message: 'You are not authorized to edit this caption'
        });
    }
    return req.caption
        .destroy({
            where: {
                id: req.caption.id
            }
        })
        .then(() => cache.delete(`${CACHE_KEY}_${req.caption.id}`))
        .then(() => res.status(204).send())
        .catch((error) => res.status(400).send(error));
}

module.exports = {
    findCaption,
    listCaptionById,
    addCaption,
    updateCaption,
    deleteCaption,
}
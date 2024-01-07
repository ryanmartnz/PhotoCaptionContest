const CacheService = require('./cacheController');
const cache = new CacheService(3600);
const CACHE_KEY = 'photo';

const Caption = require('../models').Captions;
const Photo = require('../models').Photos;

const findPhoto = async (req, res, next, id) => {
    req.photo = await cache.get(`${CACHE_KEY}_${id}`, () => Photo
        .findByPk(id, {
            include: [{
                model: Caption,
                as: 'captions'
            }],
        })
        .then((photo) => {
            if(!photo) {
                return res.status(404).send({
                    message: 'Photo not found!',
                });
            }
            return photo;
        })
        .catch((error) => res.status(400).send(error))
    );
    next();
}

const listPhotos = (req, res) => {
    return Photo
        .findAll({
            order: [
                ['id', 'ASC'],
            ],
            attributes: ['id', 'name', 'url', 'citation']
        })
        .then((photos) => res.status(200).send(photos))
        .catch((error) => res.status(400).send(error));
}

const listPhotoById = (req, res) => {
    res.status(200).send(req.photo);
}

module.exports = {
    findPhoto,
    listPhotos,
    listPhotoById,
}
'use strict';

/**
 * @swagger
 *  components:
 *    schemas:
 *      Caption:
 *        type: object
 *        required:
 *          - photo_id
 *          - user_id
 *          - comment
 *        properties:
 *          photo_id:
 *            type: integer
 *            description: fk of the photo this comment is captioning
 *          user_id:
 *            type: integer
 *            description: fk of the user who created the comment
 *          comment:
 *            type: string
 *            description: caption for the photo
 *        example:
 *           photo_id: 2
 *           comment: This is a great photo!
 */
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Captions extends Model {
    static associate(models) {
      Captions.belongsTo(models.Photos, {
        foreignKey: 'photo_id',
        as: 'photo',
      });
      Captions.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user',
      })
    }
  }
  Captions.init({
    photo_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    comment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Captions',
  });
  return Captions;
};
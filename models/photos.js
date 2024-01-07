'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Photos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Photos.hasMany(models.Captions, {
        foreignKey: 'photo_id',
        as: 'captions'
      })
    }
  }
  Photos.init({
    name: DataTypes.STRING,
    url: DataTypes.STRING,
    citation: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Photos',
  });
  return Photos;
};
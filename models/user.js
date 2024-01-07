'use strict';
const config = require('../config/auth.config');

const jwt = require('jsonwebtoken');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Captions, {
        foreignKey: 'user_id',
        as: 'captions'
      })
    }

    generateToken() {
      return jwt.sign({
          id: this.id,
          email: this.email
        },
        config.secret, {
          expiresIn: "1h"
        });
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      isUnique: true,
      isEmail: true
    },
    password: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false,
      len: [8,20]
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
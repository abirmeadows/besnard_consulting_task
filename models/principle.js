'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Principle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    toJSON() {
      return { ...this.get(), id: undefined }
    }
  }
  Principle.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      body: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Principle must have a body' },
          notEmpty: { msg: 'Body must not be empty' },
        },
      },
    },
    {
      sequelize,
      tableName: 'principles',
      modelName: 'Principle',
    }
  )
  return Principle
}

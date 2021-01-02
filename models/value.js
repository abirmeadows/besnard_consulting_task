'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Value extends Model {
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
  Value.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      body: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Value must have a body' },
          notEmpty: { msg: 'Body must not be empty' },
        },
      },
    },
    {
      sequelize,
      tableName: 'values',
      modelName: 'Value',
    }
  )
  return Value
}

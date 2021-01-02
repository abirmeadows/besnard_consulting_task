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
      body: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Value',
    }
  )
  return Value
}

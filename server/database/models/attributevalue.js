module.exports = (sequelize, DataTypes) => {
  const AttributeValue = sequelize.define('AttributeValue', {
    value: {
      type: DataTypes.STRING,
      allowNull: false
    },
    attribute_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  AttributeValue.associate = (models) => {
    AttributeValue.belongsTo(models.Attribute, {
      foreignKey: 'attribute_id'
    });
    AttributeValue.belongsToMany(models.Product, {
      through: 'ProductAttribute',
      foreignKey: 'attribute_value_id'
    });
  };
  return AttributeValue;
};

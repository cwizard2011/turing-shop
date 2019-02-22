module.exports = (sequelize, DataTypes) => {
  const Attribute = sequelize.define('Attribute', {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {});

  Attribute.associate = (models) => {
    Attribute.hasMany(models.AttributeValue, {
      foreignKey: 'attribute_id'
    });
  };
  return Attribute;
};

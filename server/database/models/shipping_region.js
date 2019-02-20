module.exports = (sequelize, DataTypes) => {
  const ShippingRegion = sequelize.define('ShippingRegion', {
    shipping_region: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  ShippingRegion.associate = (models) => {
    ShippingRegion.belongsTo(models.Customer, {
      foreignKey: 'shipping_region_id',
    });
  };
  return ShippingRegion;
};

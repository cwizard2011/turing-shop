module.exports = (sequelize, DataTypes) => {
  const ShippingRegion = sequelize.define('ShippingRegion', {
    shipping_region_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    shipping_region: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    timestamps: false,
    tableName: 'shipping_region'
  });
  ShippingRegion.associate = (models) => {
    ShippingRegion.belongsTo(models.Customer, {
      foreignKey: 'shipping_region_id',
    });
    ShippingRegion.hasMany(models.Shipping, {
      foreignKey: 'shipping_region_id',
    });
  };
  return ShippingRegion;
};

module.exports = (sequelize, DataTypes) => {
  const ShoppingCart = sequelize.define('ShoppingCart', {
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    attribute: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    buy_now: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
  }, {});
  ShoppingCart.associate = (models) => {
    ShoppingCart.hasMany(models.Product, {
      foreignKey: 'product_id'
    });
    ShoppingCart.belongsTo(models.Customer, {
      foreignKey: 'customer_id'
    });
  };
  return ShoppingCart;
};

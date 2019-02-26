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
    ShoppingCart.belongsTo(models.Product, {
      foreignKey: 'product_id',
      onDelete: 'CASCADE'
    });
    ShoppingCart.belongsTo(models.Customer, {
      foreignKey: 'customer_id',
      onDelete: 'CASCADE'
    });
  };
  return ShoppingCart;
};

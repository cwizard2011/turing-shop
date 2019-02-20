module.exports = (sequelize, DataTypes) => {
  const ShoppingCart = sequelize.define('ShoppingCart', {
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    attributes: {
      type: DataTypes.STRING(1234),
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
    added_on: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {});
  ShoppingCart.associate = (models) => {
    ShoppingCart.hasMany(models.Product, {
      foreignKey: 'product_id'
    });
  };
  return ShoppingCart;
};

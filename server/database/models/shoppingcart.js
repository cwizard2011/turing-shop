module.exports = (sequelize, DataTypes) => {
  const ShoppingCart = sequelize.define('ShoppingCart', {
    item_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    attributes: {
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
  }, {
    timestamps: false,
    tableName: 'shopping_cart'
  });
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

module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    total_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.00
    },
    created_on: {
      type: DataTypes.DATE,
      allowNull: false
    },
    shipped_on: DataTypes.DATE,
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    comments: DataTypes.STRING,
    customer_id: DataTypes.INTEGER,
    auth_code: DataTypes.STRING,
    reference: DataTypes.STRING,
    shipping_id: DataTypes.INTEGER,
    tax_id: DataTypes.INTEGER,
  }, {});
  Order.associate = (models) => {
    Order.belongsTo(models.Customer, {
      foreignKey: 'customer_id'
    });
    Order.belongsTo(models.Shipping, {
      foreignKey: 'shipping_id'
    });
    Order.belongsTo(models.Tax, {
      foreignKey: 'tax_id'
    });
  };
  return Order;
};

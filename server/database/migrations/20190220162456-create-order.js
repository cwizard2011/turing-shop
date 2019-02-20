module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Orders', {
    order_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    comments: {
      type: Sequelize.STRING
    },
    total_amount: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.00
    },
    created_on: {
      type: Sequelize.DATE,
      allowNull: false
    },
    shipped_on: Sequelize.DATE,
    status: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    customer_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Customers',
        key: 'customer_id',
        as: 'customer_id'
      }
    },
    auth_code: {
      type: Sequelize.STRING
    },
    reference: {
      type: Sequelize.STRING
    },
    shipping_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Shippings',
        key: 'shipping_id',
        as: 'shipping_id'
      }
    },
    tax_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Taxes',
        key: 'tax_id',
        as: 'tax_id'
      }
    },
  }),
  down: queryInterface => queryInterface.dropTable('Orders')
};

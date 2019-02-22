module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Orders', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    comments: {
      type: Sequelize.STRING(255)
    },
    total_amount: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.00
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
        key: 'id',
        as: 'customer_id'
      }
    },
    auth_code: {
      type: Sequelize.STRING(50)
    },
    reference: {
      type: Sequelize.STRING(50)
    },
    shipping_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Shippings',
        key: 'id',
        as: 'shipping_id'
      }
    },
    tax_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Taxes',
        key: 'id',
        as: 'tax_id'
      }
    },
    createdAt: {
      type: Sequelize.DATE
    },
    updatedAt: {
      type: Sequelize.DATE
    }
  }),
  down: queryInterface => queryInterface.dropTable('Orders')
};

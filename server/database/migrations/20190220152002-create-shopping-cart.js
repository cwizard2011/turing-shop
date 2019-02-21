module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('ShoppingCarts', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    product_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Products',
        key: 'id',
        as: 'product_id'
      }
    },
    attribute: {
      type: Sequelize.STRING(1234),
      allowNull: false
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    buy_now: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    added_on: {
      type: Sequelize.DATE,
      allowNull: false
    },
    createdAt: {
      type: Sequelize.DATE
    },
    updatedAt: {
      type: Sequelize.DATE
    }
  }),
  down: queryInterface => queryInterface.dropTable('ShoppingCarts')
};

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('OrderDetails', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    order_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Orders',
        key: 'id',
        as: 'order_id'
      }
    },
    product_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    attribute: {
      type: Sequelize.STRING(1000),
      allowNull: false
    },
    product_name: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    unit_cost: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false
    },
    createdAt: {
      type: Sequelize.DATE
    },
    updatedAt: {
      type: Sequelize.DATE
    }
  }),
  down: queryInterface => queryInterface.dropTable('OrderDetails')
};

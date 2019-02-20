module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('OrderDetails', {
    item_id: {
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
        key: 'order_id',
        as: 'order_id'
      }
    },
    product_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    attributes: {
      type: Sequelize.STRING(1234),
      allowNull: false
    },
    product_name: {
      type: Sequelize.STRING,
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
    }
  }),
  down: queryInterface => queryInterface.dropTable('OrderDetails')
};

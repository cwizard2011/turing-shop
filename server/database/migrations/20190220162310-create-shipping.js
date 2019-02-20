module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Shippings', {
    shipping_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    shipping_type: {
      type: Sequelize.STRING,
      allowNull: false
    },
    shipping_cost: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 10.00
    },
    shipping_region_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'ShippingRegions',
        key: 'shipping_region_id',
        as: 'shipping_region_id'
      }
    }
  }),
  down: queryInterface => queryInterface.dropTable('Shippings')
};

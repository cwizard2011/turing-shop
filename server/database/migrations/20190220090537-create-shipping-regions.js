module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('ShippingRegions', {
    shipping_region_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    shipping_region: Sequelize.STRING,
  }),
  down: queryInterface => queryInterface.dropTable('ShippingRegions')
};

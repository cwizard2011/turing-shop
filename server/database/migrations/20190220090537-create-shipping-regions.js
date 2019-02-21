module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('ShippingRegions', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    shipping_region: Sequelize.STRING,
    createdAt: {
      type: Sequelize.DATE
    },
    updatedAt: {
      type: Sequelize.DATE
    }
  }),
  down: queryInterface => queryInterface.dropTable('ShippingRegions')
};

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Taxes', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    tax_type: {
      type: Sequelize.STRING,
      allowNull: false
    },
    tax_percentage: {
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
  down: queryInterface => queryInterface.dropTable('Taxes')
};

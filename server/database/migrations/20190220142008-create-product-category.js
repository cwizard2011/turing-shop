module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('ProductCategories', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    product_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    category_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    createdAt: {
      type: Sequelize.DATE
    },
    updatedAt: {
      type: Sequelize.DATE
    }
  }),
  down: queryInterface => queryInterface.dropTable('ProductCategories')
};

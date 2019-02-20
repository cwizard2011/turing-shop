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
    }
  }),
  down: queryInterface => queryInterface.dropTable('ProductCategories')
};

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('ProductAttributes', {
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
    attribute_value_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  }),
  down: queryInterface => queryInterface.dropTable('ProductAttributes')
};

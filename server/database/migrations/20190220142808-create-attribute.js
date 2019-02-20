module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Attributes', {
    attribute_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }),
  down: queryInterface => queryInterface.dropTable('Attributes')
};

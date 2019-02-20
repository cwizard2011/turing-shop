module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Departments', {
    department_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.TEXT
    },
  }),
  down: queryInterface => queryInterface.dropTable('Departments')
};

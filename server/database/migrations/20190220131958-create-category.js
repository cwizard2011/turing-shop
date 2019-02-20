module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Categories', {
    category_id: {
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
    department_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Departments',
        key: 'department_id',
        as: 'department_id'
      }
    },
  }),
  down: queryInterface => queryInterface.dropTable('Categories')
};

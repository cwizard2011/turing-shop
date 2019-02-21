module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Categories', {
    id: {
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
        key: 'id',
        as: 'department_id'
      }
    },
    createdAt: {
      type: Sequelize.DATE
    },
    updatedAt: {
      type: Sequelize.DATE
    }
  }),
  down: queryInterface => queryInterface.dropTable('Categories')
};

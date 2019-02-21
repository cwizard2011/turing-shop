module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Products', {
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
      type: Sequelize.STRING,
      allowNull: false
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
    price: {
      type: Sequelize.DECIMAL,
      allowNull: false
    },
    discounted_price: {
      type: Sequelize.DECIMAL,
      allowNull: false,
      defaultValue: 0.00
    },
    image: {
      type: Sequelize.STRING,
    },
    image_2: {
      type: Sequelize.STRING
    },
    thumbnail: {
      type: Sequelize.STRING
    },
    display: {
      type: Sequelize.INTEGER
    },
    createdAt: {
      type: Sequelize.DATE
    },
    updatedAt: {
      type: Sequelize.DATE
    }
  }),
  down: queryInterface => queryInterface.dropTable('Products')
};

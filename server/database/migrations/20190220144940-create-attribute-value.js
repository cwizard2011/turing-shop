module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('AttributeValues', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    value: {
      type: Sequelize.STRING,
      allowNull: false
    },
    attribute_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Attributes',
        key: 'id',
        as: 'attribute_id'
      }
    },
    createdAt: {
      type: Sequelize.DATE
    },
    updatedAt: {
      type: Sequelize.DATE
    }
  }),
  down: queryInterface => queryInterface.dropTable('AttributeValues')
};

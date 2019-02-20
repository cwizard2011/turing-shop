module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('AttributeValues', {
    attribute_value_id: {
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
        key: 'attribute_id',
        as: 'attribute_id'
      }
    },
  }),
  down: queryInterface => queryInterface.dropTable('AttributeValues')
};

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
      allowNull: false,
      references: {
        model: 'Products',
        key: 'id',
        as: 'product_id'
      }
    },
    attribute_value_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'AttributeValues',
        key: 'id',
        as: 'attribute_value_id'
      }
    },
    createdAt: {
      type: Sequelize.DATE
    },
    updatedAt: {
      type: Sequelize.DATE
    }
  }),
  down: queryInterface => queryInterface.dropTable('ProductAttributes')
};

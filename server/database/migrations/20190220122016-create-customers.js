module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Customers', {
    customer_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    credit_card: {
      type: Sequelize.STRING
    },
    address_1: {
      type: Sequelize.STRING
    },
    address_2: {
      type: Sequelize.STRING
    },
    city: {
      type: Sequelize.STRING
    },
    region: {
      type: Sequelize.STRING
    },
    postal_code: {
      type: Sequelize.STRING
    },
    country: {
      type: Sequelize.STRING
    },
    day_phone: {
      type: Sequelize.STRING
    },
    eve_phone: {
      type: Sequelize.STRING
    },
    mob_phone: {
      type: Sequelize.STRING
    },
    role: {
      type: Sequelize.STRING,
      isIn: [['user', 'admin']],
      defaultValue: 'user',
    },
    shipping_region_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1,
      references: {
        model: 'ShippingRegions',
        key: 'shipping_region_id',
        as: 'shipping_region_id'
      }
    },
  }),
  down: queryInterface => queryInterface.dropTable('Customers')
};

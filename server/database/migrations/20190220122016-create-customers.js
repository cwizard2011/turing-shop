module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Customers', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    email: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    password: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    credit_card: {
      type: Sequelize.TEXT
    },
    address_1: {
      type: Sequelize.STRING(100)
    },
    address_2: {
      type: Sequelize.STRING(100)
    },
    city: {
      type: Sequelize.STRING(100)
    },
    region: {
      type: Sequelize.STRING(100)
    },
    postal_code: {
      type: Sequelize.STRING(100)
    },
    country: {
      type: Sequelize.STRING(100)
    },
    day_phone: {
      type: Sequelize.STRING(100)
    },
    eve_phone: {
      type: Sequelize.STRING(100)
    },
    mob_phone: {
      type: Sequelize.STRING(100)
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
        key: 'id',
        as: 'shipping_region_id'
      }
    },
    createdAt: {
      type: Sequelize.DATE
    },
    updatedAt: {
      type: Sequelize.DATE
    }
  }),
  down: queryInterface => queryInterface.dropTable('Customers')
};

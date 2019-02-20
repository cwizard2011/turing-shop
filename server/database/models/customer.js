module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('Customer', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: { msg: 'Enter a Valid Email' },
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    credit_card: DataTypes.STRING,
    address_1: DataTypes.STRING,
    address_2: DataTypes.STRING,
    city: DataTypes.STRING,
    region: DataTypes.STRING,
    postal_code: DataTypes.STRING,
    country: DataTypes.STRING,
    shipping_region_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    day_phone: DataTypes.STRING,
    eve_phone: DataTypes.STRING,
    mob_phone: DataTypes.STRING,
    role: {
      type: DataTypes.STRING,
      isIn: {
        args: [['user', 'admin']],
        message: 'User role can only be user, admin or super admin',
      },
      defaultValue: 'user',
    },
  });

  Customer.prototype.toAuthJSON = function () {
    return {
      name: this.name,
      email: this.email
    };
  };

  Customer.associate = (models) => {
    Customer.hasOne(models.ShippingRegion, {
      foreignKey: 'shipping_region_id',
    });
  };

  return Customer;
};

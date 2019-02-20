module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    discounted_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.00
    },
    image: DataTypes.STRING,
    image_2: DataTypes.STRING,
    thumbnail: DataTypes.STRING,
    display: DataTypes.INTEGER
  }, {});

  Product.associate = (models) => {
    Product.belongsToMany(models.Category, {
      through: 'ProductCategory',
      foreignKey: 'product_id',
    });
    Product.belongsToMany(models.AttributeValue, {
      through: 'ProductAttribute',
      foreignKey: 'product_id'
    });
  };
  return Product;
};

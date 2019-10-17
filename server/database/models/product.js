module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    product_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(1000),
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
    image: DataTypes.STRING(150),
    image_2: DataTypes.STRING(150),
    thumbnail: DataTypes.STRING(150),
    display: {
      type: DataTypes.INTEGER(6),
      allowNull: false,
      defaultValue: 0.00
    }
  }, {
    timestamps: false,
    tableName: 'product'
  });

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

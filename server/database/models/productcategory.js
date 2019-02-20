module.exports = (sequelize, DataTypes) => {
  const ProductCategory = sequelize.define('ProductCategory', {
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  ProductCategory.associate = (models) => {
    ProductCategory.belongsTo(models.Product, {
      foreignKey: 'product_id'
    });
    ProductCategory.belongsTo(models.Category, {
      foreignKey: 'category_id'
    });
  };
  return ProductCategory;
};

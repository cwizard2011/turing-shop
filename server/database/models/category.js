module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    department_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.STRING(1000)
  }, {});

  Category.associate = (models) => {
    Category.belongsTo(models.Department, {
      foreignKey: 'department_id'
    });
    Category.belongsToMany(models.Product, {
      through: 'ProductCategory',
      foreignKey: 'category_id'
    });
  };
  return Category;
};

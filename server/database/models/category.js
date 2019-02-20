module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    department_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.TEXT
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

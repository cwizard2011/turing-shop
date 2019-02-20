module.exports = (sequelize, DataTypes) => {
  const Department = sequelize.define('Department', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: DataTypes.TEXT

  }, {});
  Department.associate = (models) => {
    Department.hasMany(models.Category, {
      foreignKey: 'department_id'
    });
  };
  return Department;
};

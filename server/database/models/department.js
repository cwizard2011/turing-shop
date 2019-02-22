module.exports = (sequelize, DataTypes) => {
  const Department = sequelize.define('Department', {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: DataTypes.STRING(1000)

  }, {});
  Department.associate = (models) => {
    Department.hasMany(models.Category, {
      foreignKey: 'department_id'
    });
  };
  return Department;
};

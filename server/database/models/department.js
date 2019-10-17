module.exports = (sequelize, DataTypes) => {
  const Department = sequelize.define('Department', {
    department_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: DataTypes.STRING(1000)

  }, {
    timestamps: false,
    tableName: 'department'
  });
  Department.associate = (models) => {
    Department.hasMany(models.Category, {
      foreignKey: 'department_id'
    });
  };
  return Department;
};

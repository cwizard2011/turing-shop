module.exports = (sequelize, DataTypes) => {
  const Tax = sequelize.define('Tax', {
    tax_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tax_type: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    tax_percentage: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
  }, {
    timestamps: false,
    tableName: 'tax'
  });
  Tax.associate = (models) => {
    Tax.hasMany(models.Order, {
      foreignKey: 'tax_id'
    });
  };
  return Tax;
};

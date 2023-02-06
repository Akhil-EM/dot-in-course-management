module.exports = (sequelize,DataTypes) =>{
  return sequelize.define('tokens', {
    token_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    token: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    token_type: { //AUTH REGISTRATION etc
      type: DataTypes.STRING,
      allowNull: false
    },
    token_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    }
  }, {
    sequelize,
    tableName: 'tokens',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "token_id" },
        ]
      }
    ]
  });
}
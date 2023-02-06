module.exports = (sequelize,DataTypes)=>{
    return sequelize.define('user_types', {
        user_type_id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true
        },
        user_type: {
          type: DataTypes.STRING(100),
          allowNull: false
        }
      }, {
        sequelize,
        tableName: 'user_types',
        timestamps: true,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
              { name: "user_type_id" },
            ]
          },
        ]
      });
}
module.exports = (sequelize,DataTypes) =>{
    return sequelize.define('users', {
        user_id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true
        },
        email: {
          type: DataTypes.STRING(250),
          allowNull: false
        },
        password: {
          type: DataTypes.STRING(250),
          allowNull: false
        },
        user_type_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'user_types',
            key: 'user_type_id'
          }
        },
        active: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: 0
        }
      }, {
        sequelize,
        tableName: 'users',
        timestamps: true,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
              { name: "user_id" },
            ]
          },
          {
            name: "user_type_id",
            using: "BTREE",
            fields: [
              { name: "user_type_id" },
            ]
          },
        ]
      });
}


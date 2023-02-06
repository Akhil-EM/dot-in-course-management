module.exports = (sequelize,DataTypes) =>{
    return sequelize.define('courses', {
        course_id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true
        },
        name: {
          type: DataTypes.STRING(250),
          allowNull: false
        },
        description: {
          type: DataTypes.STRING(1000),
          allowNull: false
        },
        from_date: {
          type: DataTypes.DATE,
          allowNull: false
        },
        from_time: {
          type: DataTypes.TIME,
          allowNull: false
        },
        to_time: {
          type: DataTypes.TIME,
          allowNull: false
        },
        duration: { //days
          type: DataTypes.INTEGER,
          allowNull: false
        },
        created_by: { 
          type: DataTypes.INTEGER,
          allowNull: false
        }
      }, {
        sequelize,
        tableName: 'courses',
        timestamps: true,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
              { name: "course_id" },
            ]
          }
        ]
      });
}


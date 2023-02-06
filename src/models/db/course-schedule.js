module.exports = function(sequelize, DataTypes) { 
    return sequelize.define('course_schedules', {
      course_schedules_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      course_id: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      date: {
        type: DataTypes.DATE,
        allowNull: true
      },
      from_time: {
        type: DataTypes.TIME,
        allowNull: true
      },
      to_time: {
        type: DataTypes.TIME,
        allowNull: true
      },
    }, {
      sequelize,
      tableName: 'course_schedules',
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "course_schedule_id" },
          ]
        },
      ]
    });
  };
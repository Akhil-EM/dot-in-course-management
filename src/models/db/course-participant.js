module.exports = function(sequelize, DataTypes) { 
    return sequelize.define('course_participants', {
      course_participant_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      course_id: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      student_id: {
        type: DataTypes.INTEGER,
        allowNull: true
      }
    }, {
      sequelize,
      tableName: 'course_participants',
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "course_participant_id" },
          ]
        },
      ]
    });
  };
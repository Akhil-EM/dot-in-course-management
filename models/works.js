const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('works', {
    work_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    work_title: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    work_detail: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    work_zone_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'zones',
        key: 'zone_id'
      }
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    work_picked_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    work_completed: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    },
    work_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    work_from_time: {
      type: DataTypes.TIME,
      allowNull: true
    },
    work_to_time: {
      type: DataTypes.TIME,
      allowNull: true
    },
    work_picked_on: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'works',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "work_id" },
        ]
      },
      {
        name: "work_zone_id",
        using: "BTREE",
        fields: [
          { name: "work_zone_id" },
        ]
      },
      {
        name: "created_by",
        using: "BTREE",
        fields: [
          { name: "created_by" },
        ]
      },
      {
        name: "work_picked_by",
        using: "BTREE",
        fields: [
          { name: "work_picked_by" },
        ]
      },
    ]
  });
};

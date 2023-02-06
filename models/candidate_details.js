const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('candidate_details', {
    user_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    first_name: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    gender: {
      type: DataTypes.STRING(10),
      allowNull: true,
      defaultValue: "m"
    },
    contact_number: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    address1: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    address2: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    city: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    country: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    first_language: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    nationality: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    second_language: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    experienced_in_uk: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 0
    },
    hold_uk_driving_license: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 0
    },
    has_work_permit: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'candidate_details',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
};

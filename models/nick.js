'use strict';
module.exports = (sequelize, DataTypes) => {
  const Nick = sequelize.define('Nick', {
    nick: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'unique_nick',
      set(nick) {
        this.setDataValue('nick', nick.toString().toLowerCase());
      }
    },
    strikes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    messages: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    seen: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.fn('NOW')
    }
  }, {
    indexes: [
      {
        unique: true,
        fields: ['nick']
      }
    ]
  });
  Nick.associate = function(models) {
    // associations can be defined here
  };
  return Nick;
};

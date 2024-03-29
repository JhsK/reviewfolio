// This model was generated by Forest CLI. However, you remain in control of your models.
// Learn how here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/models/enrich-your-models
module.exports = (sequelize, DataTypes) => {
  const { Sequelize } = sequelize;
  // This section contains the fields of your model, mapped to your table's columns.
  // Learn more here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/models/enrich-your-models#declaring-a-new-field-in-a-model
  const User = sequelize.define('user', {
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ticket: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    position: {
      type: DataTypes.STRING,
    },
    career: {
      type: DataTypes.INTEGER,
    },
    birthday: {
      type: DataTypes.STRING,
    },
    job: {
      type: DataTypes.ENUM('front','back','data','android','ios','devops'),
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  }, {
    tableName: 'user',
  });

  // This section contains the relationships for this model. See: https://docs.forestadmin.com/documentation/v/v6/reference-guide/relationships#adding-relationships.
  User.associate = (models) => {
    User.hasMany(models.comment, {
      foreignKey: {
        name: 'userIdKey',
        field: 'UserId',
      },
      as: 'comments',
    });
    User.hasMany(models.order, {
      foreignKey: {
        name: 'userIdKey',
        field: 'UserId',
      },
      as: 'orders',
    });
    User.hasMany(models.payment, {
      foreignKey: {
        name: 'userIdKey',
        field: 'UserId',
      },
      as: 'payments',
    });
    User.hasMany(models.programmer, {
      foreignKey: {
        name: 'userIdKey',
        field: 'UserId',
      },
      as: 'programmers',
    });
    User.hasMany(models.requestPost, {
      foreignKey: {
        name: 'userIdKey',
        field: 'UserId',
      },
      as: 'requestPosts',
    });
    User.hasMany(models.ticketHistory, {
      foreignKey: {
        name: 'userIdKey',
        field: 'UserId',
      },
      as: 'ticketHistories',
    });
  };

  return User;
};

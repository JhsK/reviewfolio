// This model was generated by Forest CLI. However, you remain in control of your models.
// Learn how here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/models/enrich-your-models
module.exports = (sequelize, DataTypes) => {
  const { Sequelize } = sequelize;
  // This section contains the fields of your model, mapped to your table's columns.
  // Learn more here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/models/enrich-your-models#declaring-a-new-field-in-a-model
  const TicketHistory = sequelize.define('ticketHistory', {
    type: {
      type: DataTypes.ENUM('plus','minus'),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  }, {
    tableName: 'ticketHistory',
  });

  // This section contains the relationships for this model. See: https://docs.forestadmin.com/documentation/v/v6/reference-guide/relationships#adding-relationships.
  TicketHistory.associate = (models) => {
    TicketHistory.belongsTo(models.user, {
      foreignKey: {
        name: 'userIdKey',
        field: 'UserId',
      },
      as: 'user',
    });
  };

  return TicketHistory;
};

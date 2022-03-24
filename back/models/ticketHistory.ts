import { DataTypes, Model } from 'sequelize';
import { dbType } from '.';
import sequelize from './sequelize';

enum HistoryType {
  'plus',
  'minus',
}

class TicketHistory extends Model {
  public readonly id!: number;
  public type!: HistoryType;
}

TicketHistory.init(
  {
    type: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ['plus', 'minus'],
    },
  },
  {
    sequelize,
    modelName: 'TicketHistory',
    tableName: 'ticketHistory',
    charset: 'utf8',
    collate: 'utf8_general_ci',
  },
);

export const associate = (db: dbType) => {
  db.TicketHistory.belongsTo(db.User);
};

export default TicketHistory;

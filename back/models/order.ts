import { DataTypes, Model } from 'sequelize';
import { dbType } from '.';
import sequelize from './sequelize';

class Order extends Model {
  public readonly id!: number;
  public tossOrderId!: string;
  public orderNickName!: string;
  public paymentKey!: string;
  public amount!: number;
  public num!: number;
}

Order.init(
  {
    tossOrderId: {
      type: DataTypes.STRING(100),
    },
    orderNickName: {
      type: DataTypes.STRING(30),
    },
    paymentKey: {
      type: DataTypes.STRING(200),
    },
    amount: {
      type: DataTypes.INTEGER,
    },
    num: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    modelName: 'Order',
    tableName: 'order',
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  },
);

export const associate = (db: dbType) => {
  db.Order.belongsTo(db.User);
};

export default Order;

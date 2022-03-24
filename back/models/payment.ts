import { DataTypes, Model } from 'sequelize';
import { dbType } from '.';
import sequelize from './sequelize';

class Payment extends Model {
  public readonly id!: number;
  public quantity!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Payment.init(
  {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Payment',
    tableName: 'payment',
    charset: 'utf8',
    collate: 'utf8_general_ci',
  },
);

export const associate = (db: dbType) => {
  db.Payment.belongsTo(db.User);
};

export default Payment;

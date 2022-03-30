import { Model } from 'sequelize';
import { dbType } from '.';
import sequelize from './sequelize';

class Application extends Model {
  public readonly id!: number;
}

Application.init(
  {},
  {
    sequelize,
    modelName: 'Application',
    tableName: 'application',
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  },
);

export const associate = (db: dbType) => {
  db.Application.belongsTo(db.Programmer);
  db.Application.belongsTo(db.RequestPost);
  db.Application.hasMany(db.Comment);
};

export default Application;

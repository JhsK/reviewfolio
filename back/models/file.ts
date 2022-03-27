import { DataTypes, Model } from 'sequelize';
import { dbType } from './index';
import { sequelize } from './sequelize';

class File extends Model {
  public readonly id!: number;
  public src!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

File.init(
  {
    src: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'File',
    tableName: 'file',
    charset: 'utf8',
    collate: 'utf8_general_ci',
  },
);

export const associate = (db: dbType) => {
  db.File.belongsTo(db.RequestPost);
};

export default File;

import { DataTypes, Model } from 'sequelize';
import { dbType } from './index';
import { sequelize } from './sequelize';

class Image extends Model {
  public readonly id!: number;
  public src!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Image.init(
  {
    src: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    modelName: 'Image',
    tableName: 'image',
    charset: 'utf8',
    collate: 'utf8_general_ci',
  },
);

export const associate = (db: dbType) => {
  db.Image.belongsTo(db.Programmer);
};

export default Image;

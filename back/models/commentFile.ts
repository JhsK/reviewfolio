import { DataTypes, Model } from 'sequelize';
import { dbType } from './index';
import { sequelize } from './sequelize';

class CommentFile extends Model {
  public readonly id!: number;
  public src!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

CommentFile.init(
  {
    src: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    modelName: 'CommentFile',
    tableName: 'commentFile',
    charset: 'utf8',
    collate: 'utf8_general_ci',
  },
);

export const associate = (db: dbType) => {
  db.CommentFile.belongsTo(db.Comment);
};

export default CommentFile;

import { DataTypes, Model } from "sequelize";
import { dbType } from ".";
import sequelize from "./sequelize";

class Programmer extends Model {
    public readonly id!: number;
    public career!: number;
    public point!: number;
    public refundPoint!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Programmer.init({
    career: {
        type: DataTypes.INTEGER,
    },
    point: {
        type: DataTypes.INTEGER,
    },
    refundPoint: {
        type: DataTypes.INTEGER,
    }
}, {
    sequelize,
    modelName: 'Programmer',
    tableName: 'programmer',
    charset: 'utf8',
    collate: 'utf8_general_ci',
});

export const associate = (db: dbType) => {

}

export default Programmer;
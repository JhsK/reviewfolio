import { DataTypes, Model } from "sequelize";
import { dbType } from ".";
import sequelize from "./sequelize";

class User extends Model {
    public readonly id!: number;
    public userName!: string;
    public nickname!: string;
    public userId!: string;
    public password!: string;
    public ticket?: number;
    public position!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
};

User.init({
    userName: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
    nickname: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true,
    },
    userId: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    ticket: {
        type: DataTypes.INTEGER,
    },
    position: {
        type: DataTypes.STRING(30),
    },
    career: {
        type: DataTypes.INTEGER,
    }
}, {
    sequelize,
    modelName: 'User',
    tableName: 'user',
    charset: 'utf8',
    collate: 'utf8_general_ci',
});

export const associate = (db: dbType) => {

}

export default User;
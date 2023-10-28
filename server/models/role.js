import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

const Role = sequelize.define(
    "role",
    {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        active: {
            type: DataTypes.BOOLEAN,
        },
        type: {
            type: DataTypes.ENUM('member', 'broker', 'admin')
        }
    },
    {   
        timestamps: false,
        underscored: true,
        freezeTableName: true,
        tableName: "role",
    }
);

export default Role;
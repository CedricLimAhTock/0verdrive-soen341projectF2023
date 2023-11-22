import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";
import Property from "./property.js";
import User from "./user.js";

const Visit = sequelize.define(
    "visit",
    {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        property_id: {
            type: DataTypes.BIGINT,
            references: {
                model: Property,
                key: "id",
            }
        },
        client_id:{
            type: DataTypes.BIGINT,
            references: {
                model: User,
                key: "id",
            }
        },
        broker_id: {
            type: DataTypes.BIGINT,
            references: {
                model: User,
                key: "id",
            }
        },
        time: {
            type: DataTypes.DATE
        },
        status:{
            type: DataTypes.ENUM("requested", "booked", "denied", "completed", "other")
        },
        message:{
            type: DataTypes.TEXT
        }
    },
    {   
        timestamps: false,
        underscored: true,
        freezeTableName: true,
        tableName: "visit",
        indexes: [
            {
                unique: true,
                fields: ["client_id", "property_id", "broker_id"]
            }
        ]
    }
);

export default Visit;
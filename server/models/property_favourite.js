import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";
import Property from "./property.js";
import User from "./user.js";

const Property_favourite = sequelize.define(
    "property_favourite",
    {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        property_id: {
            type: DataTypes.BIGINT,
            references: {
                model: Property,
                key: 'id',
            },
        },
        user_id:{
            type: DataTypes.BIGINT,
            references: {
                model: User,
                key: 'id',
            },
        }
    },
    {
        timestamps: false,
        underscored: true,
        freezeTableName: true,
        tableName: "property_favourite",
    }
);


export default Property_favourite;
import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";
import Property from "./property.js";
import Amenity from "./amenity.js";

const Property_amenity = sequelize.define(
    "property_amenity",
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
        property_id: {
            type: DataTypes.BIGINT,
            references: {
                model: Property,
                key: 'id',
            },
        },
        amenity_id: {
            type: DataTypes.BIGINT,
            references: {
                model: Amenity,
                key: 'id',
            },
        }
    },
    {
        timestamps: false,
        underscored: true,
        freezeTableName: true,
        tableName: "property_amenity",
    }
);


export default Property_amenity;
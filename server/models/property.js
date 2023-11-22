import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

const Property = sequelize.define(
    "property",
    {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: 1
        },
        civic_address: {
            type: DataTypes.STRING
        },
        apt_number: {
            type: DataTypes.STRING,
            default: null
        },
        street: {
            type: DataTypes.STRING
        },
        neighbourhood: {
            type: DataTypes.STRING
        },
        city: {
            type: DataTypes.STRING
        },
        province: {
            type: DataTypes.STRING
        },
        postal_code: {
            type: DataTypes.STRING
        },
        country: {
            type: DataTypes.STRING
        },
        listing_type: {
            type: DataTypes.ENUM("sale", "rent")
        },
        price: {
            type: DataTypes.FLOAT
        },
        living_area: {
            type: DataTypes.FLOAT
        },
        property_area: {
            type: DataTypes.FLOAT
        },
        num_bedrooms: {
            type: DataTypes.TINYINT
        },
        num_bathrooms: {
            type: DataTypes.TINYINT
        },
        num_floors: {
            type: DataTypes.TINYINT
        },
        year_built: {
            type: DataTypes.DATEONLY
        },
        listed_date: {
            type: DataTypes.DATEONLY
        },
        property_type: {
            type: DataTypes.ENUM("single-family", "duplex", "triplex", "quadruplex", "townhouse", "studio", "condominium", "other")
        },
        address: {
            type: DataTypes.STRING
        },
    },
    {
        timestamps: false,
        underscored: true,
        freezeTableName: true,
        tableName: "property",
    }
);


export default Property;
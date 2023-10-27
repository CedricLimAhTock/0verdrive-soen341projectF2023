import { DATEONLY, DataTypes, Sequelize } from "sequelize";
import sequelize from "../database/database.js";

const Property = sequelize.define(
    "property",
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
        civicAddress: {
            type: DataTypes.STRING
        },
        aptNumber: {
            type: DataTypes.STRING,
            default: null
        },
        street: {
            type: DataTypes.STRING,
        },
        neighbourhood: {
            type: DataTypes.STRING,
        },
        city: {
            type: DataTypes.STRING,
        },
        province: {
            type: DataTypes.STRING,
        },
        postalCode: {
            type: DataTypes.STRING,
        },
        country: {
            type: DataTypes.STRING,
        },
        listingType: {
            type: DataTypes.ENUM('sale', 'rent'),
        },
        price: {
            type: DataTypes.FLOAT
        },
        livingArea: {
            type: DataTypes.FLOAT
        },
        propertyArea: {
            type: DataTypes.FLOAT,
        },
        numOfBedrooms: {
            type: DataTypes.TINYINT,
        },
        numOfBathrooms: {
            type: DataTypes.TINYINT,
        },
        numOfFloors: {
            type: DataTypes.TINYINT,
        },
        yearBuilt: {
            type: DataTypes.DATEONLY,
        },
        listedDate: {
            type: DataTypes.DATEONLY,
        },
        propertyType: {
            type: DataTypes.ENUM('single-family', 'duplex', 'triplex', 'quadruplex', 'townhouse', 'studio', 'condominium', 'other'),
        }
    },
    {
        freezeTableName: true,
        tableName: "property",
    }
);


export default Property;
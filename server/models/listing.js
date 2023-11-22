import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";
import Broker from "./broker.js";
import Property from "./property.js";

const Listing = sequelize.define(
    "listings",
    {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        active: {
            type: DataTypes.BOOLEAN
        },
        broker_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: Broker,
                key: "id"
            }
        },
        property_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: Property,
                key: "id"
            }
        },
        title: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.TEXT
        }
    },
    {
        timestamps: false,
        underscored: true,
        freezeTableName: true,
        tableName: "listings"
    }
);

Broker.hasMany(Listing, { foreignKey: "broker_id" });
Property.hasMany(Listing, { foreignKey: "property_id" });
Listing.belongsTo(Property);
Listing.belongsTo(Broker);

Broker.hasMany(Property);
Property.belongsTo(Broker);

export default Listing;
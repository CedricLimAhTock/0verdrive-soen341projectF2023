import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";
import User from "./user.js";
import Property from "./property.js";
import Broker from "./broker.js";

const Offer = sequelize.define(
    "offer",
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
        user_id: {
            type: DataTypes.BIGINT,
            references: {
                model: User,
                key: 'id'
            }
        },
        broker_id: {
            type: DataTypes.BIGINT,
            references: {
                model: Broker,
                key: 'id'
            }
        },
        property_id: {
            type: DataTypes.BIGINT,
            references: {
                model: Property,
                key: 'id'
            },
        },
        price: {
            type: DataTypes.STRING
        },
        deed_of_sale_date: {
            type: DataTypes.DATE
        },
        occupancy_date: {
            type: DataTypes.DATE
        },
        status: {
            type: DataTypes.ENUM('wait', 'acknowledge', 'review', 'accept', 'deny', 'other')
        }
    },
    {
        timestamps: false,
        underscored: true,
        freezeTableName: true,
        tableName: "offer",
    }
);

User.hasMany(Offer, { foreignKey: 'user_id' });
Broker.hasMany(Offer, { foreignKey: 'broker_id' });
Property.hasMany(Offer, { foreignKey: 'property_id' });
Offer.belongsTo(Property);
Offer.belongsTo(Broker);
Offer.belongsTo(User);

export default Offer;
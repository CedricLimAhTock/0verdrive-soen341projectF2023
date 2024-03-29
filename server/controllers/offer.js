import { Op } from "sequelize";
import User from "../models/user.js";
import Offer from "../models/offer.js";
import Broker from "../models/broker.js";
import Property from "../models/property.js";
import Listing from "../models/listing.js";

const list = async (req, res) => {
    try {
        let offers = await Offer.findAll({
            attributes: ["id", "active", "broker_id", "property_id", "parent_id", "user_id", "price", "deed_of_sale_date", "occupancy_date", "status"],
            include: [
                {
                    model: User,
                    attributes: ["id", "firstname", "lastname", "address", "email", "phone"],
                    required: true
                },
                {
                    model: Broker,
                    attributes: ["id", "license_number", "agency", "email", "phone"],
                    required: true
                },
                {
                    model: Property,
                    attributes: ["id", "civic_address", "apt_number", "street", "neighbourhood", "city", "province", "postal_code", "country"],
                    required: true
                }
            ]
        });

        if (!offers) {
            return res.status(404).json();
        }
        
        res.status(200).send(offers);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error"
        });
    }
};

const listById = async (req, res) => {
    try {
        let offer = await Offer.findOne({
            attributes: ["id", "active", "broker_id", "property_id", "parent_id", "user_id", "price", "deed_of_sale_date", "occupancy_date", "status"],
            include: [
                {
                    model: User,
                    attributes: ["id", "firstname", "lastname", "address", "email", "phone"],
                    required: true
                },
                {
                    model: Broker,
                    attributes: ["id", "license_number", "agency", "email", "phone"],
                    required: true
                },
                {
                    model: Property,
                    attributes: ["id", "civic_address", "apt_number", "street", "neighbourhood", "city", "province", "postal_code", "country"],
                    required: true
                }
            ],
            where: { id: req.params.id }
        });

        if (!offer) {
            return res.status(404).json();
        } else {
            res.status(200).send(offer);
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error"
        });
    }
};

const listByUserId = async (req, res) => {
    try {
        let offer = await Offer.findAll({
            attributes: ["id", "active", "broker_id", "property_id", "parent_id", "user_id", "price", "deed_of_sale_date", "occupancy_date", "status"],
            include: [
                {
                    model: User,
                    attributes: ["id", "firstname", "lastname", "address", "email", "phone"],
                    required: true,
                    where: {id: req.params.id}
                },
                {
                    model: Broker,
                    attributes: ["id", "license_number", "agency", "email", "phone"],
                    required: true
                },
                {
                    model: Property,
                    attributes: ["id", "civic_address", "apt_number", "street", "neighbourhood", "city", "province", "postal_code", "country"],
                    required: true
                }
            ]
        });

        if (!offer) {
            return res.status(404).json();
        } else {
            res.status(200).send(offer);
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error"
        });
    }
};

const listByBrokerId = async (req, res) => {
    try {
        let offer = await Offer.findAll({
            attributes: ["id", "active", "broker_id", "property_id", "parent_id", "user_id", "price", "deed_of_sale_date", "occupancy_date", "status"],
            include: [
                {
                    model: User,
                    attributes: ["id", "firstname", "lastname", "address", "email", "phone"],
                    required: true
                },
                {
                    model: Broker,
                    attributes: ["id", "license_number", "agency", "email", "phone"],
                    required: true,
                    where: {id: req.params.id}
                },
                {
                    model: Property,
                    attributes: ["id", "civic_address", "apt_number", "street", "neighbourhood", "city", "province", "postal_code", "country"],
                    required: true
                }
            ]
        });

        if (!offer) {
            return res.status(404).json();
        } else {
            res.status(200).send(offer);
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error"
        });
    }
};

const listByMakerId = async (req, res) => {
    try {
        let offer = await Offer.findAll({
            attributes: ["id", "active", "broker_id", "property_id", "parent_id", "user_id", "price", "deed_of_sale_date", "occupancy_date", "status"],
            where: {parent_id: req.params.id},
            include: [
                {
                    model: User,
                    attributes: ["id", "firstname", "lastname", "address", "email", "phone"],
                    required: true
                },
                {
                    model: Broker,
                    attributes: ["id", "license_number", "agency", "email", "phone"],
                    required: true
                },
                {
                    model: Property,
                    attributes: ["id", "civic_address", "apt_number", "street", "neighbourhood", "city", "province", "postal_code", "country"],
                    required: true
                }
            ]
        });

        if (!offer) {
            return res.status(404).json();
        } else {
            res.status(200).send(offer);
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error"
        });
    }
};

const listByPropertyId = async (req, res) => {
    try {
        let offer = await Offer.findAll({
            attributes: ["id", "active", "broker_id", "property_id", "parent_id", "user_id", "price", "deed_of_sale_date", "occupancy_date", "status"],
            include: [
                {
                    model: User,
                    attributes: ["id", "firstname", "lastname", "address", "email", "phone"],
                    required: true
                },
                {
                    model: Broker,
                    attributes: ["id", "license_number", "agency", "email", "phone"],
                    required: true
                },
                {
                    model: Property,
                    attributes: ["id", "civic_address", "apt_number", "street", "neighbourhood", "city", "province", "postal_code", "country"],
                    required: true,
                    where: {id: req.params.id}
                }
            ]
        });

        if (!offer) {
            return res.status(404).json();
        } else {
            res.status(200).send(offer);
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error"
        });
    }
};

const create = async (req, res) => {
    try {
        let data = req.body;

        if (!data.broker_id || !data.parent_id || !data.property_id || !data.user_id) {
            return res.status(400).json({message: "Missing id for user, property or broker."});
        }
        const user = await User.findOne({ where: { id: data.user_id } });
        if (!user) {
            return res.status(400).json({message: "Invalid id for user"});
        }
        // check target broker
        const broker = await Broker.findOne({ attributes: ["id"], where: { id: data.broker_id } });
        if (!broker) {
            return res.status(400).json({message: "Invalid id for broker"});
        }
        // check owner broker
        const parent = await Broker.findOne({ attributes: ["id"], where: { id: data.parent_id } });
        if (!parent) {
            return res.status(400).json({message: "Invalid id for parent broker"});
        }
        // check property
        const listing = await Listing.findOne({ attributes: ["id"], where: { broker_id: data.broker_id, property_id: data.property_id } });
        if (!listing) {
            return res.status(400).json({message: "Property does not belong to broker."});
        }

        const [offer, created] = await Offer.findOrCreate({
            attributes: ["id"],
            where: {
                [Op.and]: [
                    { user_id: data.user_id },
                    { parent_id: data.parent_id },
                    { broker_id: data.broker_id },
                    { property_id: data.property_id }
                ]
            },
            defaults: {
                active: data.active,
                user_id: data.user_id,
                parent_id: data.parent_id,
                broker_id: data.broker_id,
                property_id: data.property_id,
                price: data.price,
                deed_of_sale_date: data.deed_of_sale_date,
                occupancy_date: data.occupancy_date,
                status: data.status
            }
        });

        

        if (!created) {
            return res.status(400).json({message: "Already exists."});
        } else {
            res.status(200).send(offer);
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error"
        });
    }
};

const update = async (req, res) => {
    try {
        let data = req.body;
        let offer_id = req.body.id;

        if (!offer_id ) {
            return res.status(400).json({message: "Missing id."});
        }

        // not changing the association
        delete data.user_id;
        delete data.parent_id;
        delete data.broker_id;
        delete data.property_id;
        delete data.id;

        let offer = await Offer.findOne({where: {id: offer_id}});

        if (!offer) {
            return res.status(400).json();
        }
        const updated = await Offer.update(data, {where: {id: offer_id}});

        res.status(200).send(updated);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error"
        });
    }
};

const updateById = async (req, res) => {
    try {
        let data = req.body;
        let offer_id = req.params.id;

        // not changing the association
        delete data.user_id;
        delete data.parent_id;
        delete data.broker_id;
        delete data.property_id;
        delete data.id;

        let offer = await Offer.findOne({where: {id: offer_id}});

        if (!offer) {
            return res.status(400).json();
        }
        const updated = await Offer.update(data, {where: {id: offer_id}});

        res.status(200).send(updated);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error"
        });
    }
};


const destroy = async (req, res) => {
    try {
        const offer = await Offer.findOne({
            attributes: ["id"],
            where: {id: req.params.id}
        });

        if (!offer) {
            return res.status(404).json();
        }

        offer.destroy();
        
        res.status(200).json();

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error"
        });
    }
};

export default { list, listById, listByUserId, listByBrokerId, listByMakerId, listByPropertyId, update, updateById, create, destroy};
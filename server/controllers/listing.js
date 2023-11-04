import Broker from "../models/broker.js";
import Property from "../models/property.js";
import Listing from "../models/listing.js";


const list = async (req, res) => {
    try {
        let listings = await Listing.findAll({attributes: ['id', 'active', 'broker_id', 'property_id', 'title', 'description']});

        if (!listings) {
            return res.status(400).json({});
        }
        
        res.status(200).send(listings);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Server error'
        });
    }
}

const listById = async (req, res) => {
    try {
        let listing = await Listing.findOne({
            attributes: ['id', 'active', 'broker_id', 'property_id', 'title', 'description'],
            where: {id: req.params.id}
        });

        if (!listing) {
            return res.status(400).json({});
        } else {
            res.status(200).send(listing);
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Server error'
        });
    }
}

const listByBrokerId = async (req, res) => {
    try {
        const listing = await Listing.findAll({
            attributes: ['id', 'active', 'broker_id', 'property_id', 'title', 'description'],
            where: {broker_id: req.params.id}
        });

        if (!listing) {
            return res.status(400).json();
        } else {
            res.status(200).send(listing);
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Server error'
        });
    }
}

const create = async (req, res) => {
    try {
        const data = req.body;

        if (!data.broker_id || !data.property_id) {
            return res.status(400).json({ message: "broker or property id cannot be null." });
        }        

        let temp = await Broker.findOne({attributes: ['id'], where: {id: data.broker_id }});

        if (!temp) {
            return res.status(400).json({ message: "broker does not exist." });
        }

        temp = await Property.findOne({attributes: ['id'], where: {id: data.property_id }});

        if (!temp) {
            return res.status(400).json({ message: "property does not exist." });
        }

        const [listing, created] = await Listing.findOrCreate({
            attributes: ['id'],
            where: {
                broker_id: data.broker_id,
                property_id: data.property_id
            },
            defaults: {
                active: data.active,
                broker_id: data.broker_id,
                property_id: data.property_id,
                title: data.title,
                description: data.description
            }
        });
        if (!created) {
            return res.status(400).json({ message: "Already exists." });
        }

        res.status(200).send(listing);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Server error'
        });
    }
}


const update = async (req, res) => {
    try {
        let data = req.body;
        let listing_id = req.body.id;

        if(listing_id == null){
            return res.status(400).json();
        }

        const listing = await Listing.findOne({attributes: ['id'], where: {id: listing_id}});

        if (!listing) {
            return res.status(400).json();
        }

        // don't allow updating broker-property
        delete data.broker_id;
        delete data.property_id;
        delete data.id;

        const updated = await Listing.update(data, {where: {id: listing_id}});

        res.status(200).send(updated);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Server error'
        });
    }
}


const updateById = async (req, res) => {
    try {
        let data = req.body;
        let listing_id = req.params.id;

        if(listing_id == null){
            return res.status(400).json();
        }

        const listing = await Listing.findOne({attributes: ['id'], where: {id: listing_id}});

        if (!listing) {
            return res.status(400).json();
        }

        // don't allow updating broker-property
        delete data.broker_id;
        delete data.property_id;
        delete data.id;

        const updated = await Listing.update(data, {where: {id: listing_id}});

        res.status(200).send(updated);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Server error'
        });
    }
}

const destroy = async (req, res) => {
    try {
        const listing = await Listing.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!listing) {
            return res.status(400).json();
        }

        listing.destroy();
        
        res.status(200).json();

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Server error'
        });
    }
}

export default {
    list, listById, listByBrokerId, create, update, updateById, destroy
};
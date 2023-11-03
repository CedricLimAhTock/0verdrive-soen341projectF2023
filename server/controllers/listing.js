import Listing from "../models/listing.js";


const list = async (req, res) => {
    try {
        let listings = await Listing.findAll({attributes: ['id', 'active', 'broker_id', 'property_id', 'title', 'description']});

        if (!listings) {
            res.status(400).json({});
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
            res.status(400).json({});
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
            res.status(400).json();
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
        let data = req.body;
        
        const [listing, created] = await Listing.findOrCreate({
            where: {
                broker_id: data.broker_id,
                property_id: data.property_id,
                title: data.title,
                description: data.description,
            },
            defaults: {
                active: 1
            }
        });
        if (!created) {
            res.status(400).json({message: "Already exists."});
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


const update = async (req, res) => {
    try {
        let data = req.body;
        if(data.id == null){
            return res.status(400).json();
        }
        const listing = await Listing.findOne({where: {id: data.id}});

        if (!listing) {
            return res.status(400).json();
        }

        await Listing.update(data, {where: {id: data.id}});

        res.status(200).json();

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

        if(data == null){
            return res.status(400).json();
        }
        const listing = await Listing.findOne({where: {id: req.params.id}});

        if (!listing) {
            return res.status(400).json();
        }

        await Listing.update(data, {where: {id: req.params.id}});

        res.status(200).json();

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
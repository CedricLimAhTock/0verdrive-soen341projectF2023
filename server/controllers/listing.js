import Listing from "../models/listing.js";


const list = async (req, res) => {
    try {
        let listings = await Listing.findAll();

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
            where: {user_id: req.params.id}
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
        const data = req.body;
        
        const [listing, created] = await Listing.findOrCreate({
            where: {
                property_id: data.property_id,
                user_id: data.user_id,
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
        if(req.body.id == null){
            return res.status(400).json();
        }
        const listing = await Listing.findOne({where: {id: req.body.id}});

        if (!listing) {
            return res.status(400).json();
        }

        await Listing.update(req.body, {where: {id: req.body.id}});

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
        if(req.body == null){
            return res.status(400).json();
        }
        const listing = await Listing.findOne({where: {id: req.params.id}});

        if (!listing) {
            return res.status(400).json();
        }

        await Listing.update(req.body, {where: {id: req.params.id}});

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

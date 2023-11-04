import Property_favourite from "../models/property_favourite.js";

const list = async (req,res) => {
    try {
        let favourite = await Property_favourite.findAll({ attributes: ['id', 'property_id', 'user_id'] });

        if (!favourite){
            return res.status(400).json({});
        }

        res.status(200).send(favourite);

    } catch(error){
        console.log(error);
        res.status(500).json({
            message: 'Server Error'
        });
    }
}

const listById = async (req,res) => {
    try {
        let favourite = await Property_favourite.findOne({
            attributes: ['id', 'property_id', 'user_id'],
            where: {id: req.params.id}
        });

        if (!favourite){
            return res.status(400).json();
        } else {
            res.status(200).send(favourite);
        }

    } catch (error){
        console.log(error);
        res.status(500).json({
            message: 'Server Error'
        });
    }
}

const listByPropertyId = async (req,res) => {
    try{
        let favourite = await Property_favourite.findAll({
            attributes: ['id', 'property_id', 'user_id'],
            where: {property_id: req.params.id}
        });

        if(!favourite){
            return res.status(400).json({});
        } else {
            res.status(200).send(favourite);
        }
    } catch (error){
        console.log(error);
        res.status(500).json({
            message: 'Server Error'
        });
    }
}


const create = async (req, res) => {
    try {
        let data = req.body;

        let listing = await Property_favourite.findOne({
            where: {
                user_id: data.user_id,
                property_id: data.property_id
            }
        });

        if (listing) {
            return res.status(400).json({message: "Already exists."});
        } else {
            listing = await Property_favourite.create({
                user_id: data.user_id,
                property_id: data.property_id
            });
            
            res.status(200).send(listing);
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Server error'
        });
    }
}

//update not needed


const destroy = async (req, res) => {
    try {
        const favourite = await Property_favourite.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!favourite) {
            return res.status(400).json();
        }

        favourite.destroy();
        
        res.status(200).json();

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Server error'
        });
    }
}

export default {list, listById, listByPropertyId, create, destroy};

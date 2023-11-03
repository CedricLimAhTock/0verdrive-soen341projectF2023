import Property_favourite from "../models/property_favourite.js";

const list = async (req,res) => {
    try {
        let favourite = await Property_favourite.findAll({ attributes: ['id', 'property_id', 'user_id'] });

        if (!favourite){
            res.status(400).json({});
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
            res.status(400).json({});
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
            where: {property_id: req.params.property_id}
        });

        if(!favourite){
            res.status(400).json({});
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

//not sure how to create and delete favourites


export default {list, listById, listByPropertyId};

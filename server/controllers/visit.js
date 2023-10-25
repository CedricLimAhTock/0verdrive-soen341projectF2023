import Visit from '../models/visit.js';

const list = async (req,res) => {
    try {
        let visit = await Visit.findAll();

        if (!visit){
            res.status(400).json({});
        }

        res.status(200).send(visit);

    } catch(error){
        console.log(error);
        res.status(500).json({
            message: 'Server Error'
        });
    }
}

const listById = async (req,res) => {
    try {
        let visit = await Visit.findOne({
            where: {id: req.params.id}
        });

        if (!visit){
            res.status(400).json({});
        } else {
            res.status(200).send(visit);
        }

    } catch (error){
        console.log(error);
        res.status(500).json({
            message: 'Server Error'
        });
    }
}

const listByStatus = async (req,res) => {
    try{
        let visit = await Visit.findAll({
            where: {status: req.params.status}
        });

        if(!visit){
            res.status(400).json({});
        } else {
            res.status(200).send(visit);
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
        visit = await Visit.findOne({
            where: {property_id: req.params.property_id}
        });

        if(!visit){
            res.status(400).json({});
        } else {
            res.status(200).send(visit);
        }
    } catch (error){
        console.log(error);
        res.status(500).json({
            message: 'Server Error'
        });
    }
}

const listByClientId = async (req,res) => {
    try{
        visit = await Visit.findOne({
            where: {client_id: req.params.client_id}
        });

        if(!visit){
            res.status(400).json({});
        } else {
            res.status(200).send(visit);
        }

    } catch (error){
        console.log(error);
        res.status(500).json({
            message: 'Server Error'
        });
    }
}

const destroy = async (req, res) => {
    try{
        const visit = await Visit.findOne({
            where:{
                id: req.params.id
            }
        });

        if(!visit){
            res.status(400).json({});
        }

        visit.destroy();

        res.status(200).json();

    } catch (error){
        console.log(error);
        res.status(500).json({
            message: 'Server Error'
        });
    }
}

//create
//update status
//destroy

export default {list, listById, listByClientId, listByPropertyId, listByStatus, destroy};
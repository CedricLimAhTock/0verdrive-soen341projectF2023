import Visit from '../models/visit.js';

const list = async (req,res) => {
    try {
        let visit = await Visit.findAll({ attributes: ['id', 'property_id', 'client_id', 'broker_id', 'time', 'status', 'message'] });

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
            attributes: ['id', 'property_id', 'client_id', 'broker_id', 'time', 'status', 'message'],
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
            attributes: ['id', 'property_id', 'client_id', 'broker_id', 'time', 'status', 'message'],
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
        let visit = await Visit.findAll({
            attributes: ['id', 'property_id', 'client_id', 'broker_id', 'time', 'status', 'message'],
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
        let visit = await Visit.findAll({
            attributes: ['id', 'property_id', 'client_id', 'broker_id', 'time', 'status', 'message'],
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

const listByBrokerId = async (req,res) => {
    try{
        let visit = await Visit.findAll({
            attributes: ['id', 'property_id', 'client_id', 'broker_id', 'time', 'status', 'message'],
            where: {broker_id: req.params.broker_id}
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


const create = async (req, res) => {
    try {
        const data = req.body;
        alert(data);
        const [visit, created] = await Visit.findOrCreate({
            where: data,
            defaults: {
                status: 'other',
                message: ""
            }
        });
        if (!created) {
            res.status(400).json({message: "Already exists."});
        } else {
            res.status(200).send(visit);
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
        const visit = await Visit.findOne({where: {id: req.body.id}});

        if (!visit) {
            return res.status(400).json();
        }

        await Visit.update(req.body, {where: {id: req.body.id}});

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

        if (req.params.id == null || req.body == null) {
            return res.status(400).json();
        }
        const visit = await Visit.findOne({where: {id: req.params.id}});

        if (!visit) {
            return res.status(400).json();
        }

        await Visit.update(req.body, {where: {id: req.params.id}});

        res.status(200).json();

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Server error'
        });
    }
}

const destroy = async (req, res) => {
    try{
        if(!req.params.id) {
            res.status(400).json({});
        }
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



export default {list, listById, listByClientId, listByBrokerId, listByPropertyId, listByStatus, create, update, updateById, destroy};
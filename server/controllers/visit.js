import Visit from '../models/visit.js';
import Property from '../models/property.js';
import Listing from '../models/listing.js';
import Broker from '../models/broker.js';

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
        
        if (!data.property_id || !data.client_id || !data.broker_id) {
            return res.status(400).json({message: "Missing id for client, broker, or property."});
        }

        // check property belongs to broker
        const property = await Property.findOne({
            attributes: ['id',
                'active',
                'civicAddress',
                'aptNumber',
                'street',
                'neighbourhood',
                'city',
                'province',
                'postalCode',
                'country',
                'listingType',
                'price',
                'livingArea',
                'propertyArea',
                'numOfBedrooms',
                'numOfBathrooms',
                'numOfFloors',
                'yearBuilt',
                'listedDate'
            ],
            where: {id: data.property_id},
            include: [
                {
                    model: Listing,
                    attributes: [], 
                    required: true, 
                    include: {
                        model: Broker,
                        required: true,
                        attributes: [],
                        where: {
                            id: data.broker_id
                        }
                    }
                }
            ]
        });

        if (!property) {
            return res.status(400).json({message: "Property does not belong to broker."});
        }

        const created = await Visit.findOne({
            where: {
                client_id: data.client_id,
                property_id: data.property_id,
                broker_id: data.broker_id
            }
        });

        if (created) {
            return res.status(400).json({message: "Already exists."});
        }
        
        const visit = await Visit.create({
                client_id: data.client_id,
                property_id: data.property_id,
                broker_id: data.broker_id,
                time: data.time,
                message: data.message,
                status: data.status
        });

        res.status(200).send(visit);
        
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

        const visit = await Visit.findOne({where: {id: data.id}});

        if (!visit) {
            return res.status(400).json();
        }

        delete data.property_id;
        delete data.broker_id;
        delete data.client_id;

        await Visit.update(data, {where: {id: data.id}});

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

        if (req.params.id == null || data == null) {
            return res.status(400).json();
        }
        const visit = await Visit.findOne({where: {id: req.params.id}});

        if (!visit) {
            return res.status(400).json();
        }

        delete data.property_id;
        delete data.broker_id;
        delete data.client_id;

        await Visit.update(data, {where: {id: req.params.id}});

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
import Property from '../models/property.js';
import Listing from '../models/listing.js';
import Broker from '../models/broker.js';

const list = async (req, res) => {
    try {
        let properties = await Property.findAll({
            attributes: [
                'id',
                'active',
                'civic_address',
                'apt_number',
                'street',
                'neighbourhood',
                'city',
                'province',
                'postal_code',
                'country',
                'listing_type',
                'price',
                'living_area',
                'property_area',
                'num_bedrooms',
                'num_bathrooms',
                'num_floors',
                'year_built',
                'listed_date',
                'property_type'
            ]
        });

        if (!properties) {
            return res.status(400).json({});
        }
        
        res.status(200).send(properties);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Server error'
        });
    }
}

const listByType = async (req, res) => {
    try {
        let properties = await Property.findAll({
            attributes: [
                'id',
                'active',
                'civic_address',
                'apt_number',
                'street',
                'neighbourhood',
                'city',
                'province',
                'postal_code',
                'country',
                'listing_type',
                'price',
                'living_area',
                'property_area',
                'num_bedrooms',
                'num_bathrooms',
                'num_floors',
                'year_built',
                'listed_date',
                'property_type'
            ],
            where: {listingtype: req.params.type}
        });

        if (!properties) {
            res.status(400).json();
        } else {
            res.status(200).send(properties);
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Server error'
        });
    }
}

const listByTypeId = async (req, res) => {
    try {
        let properties = await Property.findAll({
            attributes: [
                'id',
                'active',
                'civic_address',
                'apt_number',
                'street',
                'neighbourhood',
                'city',
                'province',
                'postal_code',
                'country',
                'listing_type',
                'price',
                'living_area',
                'property_area',
                'num_bedrooms',
                'num_bathrooms',
                'num_floors',
                'year_built',
                'listed_date',
                'property_type'
            ],
            where: {
                id: req.params.id,
                listingtype: req.params.type
            }
        });

        if (!properties) {
            res.status(400).json();
        } else {
            res.status(200).send(properties);
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Server error'
        });
    }
}

const listById = async (req, res) => {
    try {
        let property = await Property.findOne({
            attributes: [
                'id',
                'active',
                'civic_address',
                'apt_number',
                'street',
                'neighbourhood',
                'city',
                'province',
                'postal_code',
                'country',
                'listing_type',
                'price',
                'living_area',
                'property_area',
                'num_bedrooms',
                'num_bathrooms',
                'num_floors',
                'year_built',
                'listed_date',
                'property_type'
            ],
            where: {id: req.params.id}
        });

        if (!property) {
            res.status(400).json();
        } else {
            res.status(200).send(property);
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
        const properties = await Property.findAll({
            attributes: [
                'id',
                'active',
                'civic_address',
                'apt_number',
                'street',
                'neighbourhood',
                'city',
                'province',
                'postal_code',
                'country',
                'listing_type',
                'price',
                'living_area',
                'property_area',
                'num_bedrooms',
                'num_bathrooms',
                'num_floors',
                'year_built',
                'listed_date',
                'property_type'
            ],
            include: [
                {
                    model: Listing,
                    attributes: [], // don't return any columns
                    required: true, // generate INNER JOIN
                    //right: true,  // does a right join
                    include: {
                        model: Broker,
                        required: true, // generate INNER JOIN
                        attributes: [], // don't return any columns
                        //right: true,  // does a right join
                        where: {
                            id: req.params.id
                        }
                    }
                }
            ]
        });

        if (!properties) {
            res.status(400).json();
        } else {
            res.status(200).send(properties);
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

        const [property, created] = await Property.findOrCreate({
            where: data,
            defaults: {
                active: 1
            }
        });
        if (!created) {
            res.status(400).json({message: "Already exists."});
        } else {
            res.status(200).send(property);
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
        const property = await Property.findOne({where: {id: req.body.id}});

        if (!property) {
            return res.status(400).json();
        }

        await Property.update(req.body, {where: {id: req.body.id}});

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
        const property = await Property.findOne({where: {id: req.params.id}});

        if (!property) {
            return res.status(400).json();
        }

        Property.update(req.body, {where: {id: req.params.id}});

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Server error'
        });
    }
}

const destroy = async (req, res) => {
    try {
        const property = await Property.findOne({
            where: {id: req.params.id}
        });

        if (!property) {
            return res.status(400).json();
        }

        property.destroy();
        
        res.status(200).json(null);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Server error'
        });
    }
}

export default {list, listById, listByType, listByTypeId, listByBrokerId, create, update, updateById, destroy};
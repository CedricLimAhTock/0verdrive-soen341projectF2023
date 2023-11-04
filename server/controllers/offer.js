import User from '../models/user.js';
import Offer from '../models/offer.js';
import Broker from '../models/broker.js';
import Property from '../models/property.js';

const list = async (req, res) => {
    try {
        let offers = await Offer.findAll({
            attributes: ['id', 'active', 'user_id', 'property_id', 'broker_id', 'price', 'deed_of_sale_date', 'occupancy_date', 'status'],
            include: [
                {
                    model: User,
                    attributes: ['firstname', 'lastname', 'address', 'email', 'phone'],
                    required: true
                },
                {
                    model: Broker,
                    attributes: ['license_number', 'agency', 'email', 'phone'],
                    required: true
                },
                {
                    model: Property,
                    attributes: ['civicAddress', 'aptNumber', 'street', 'neighbourhood', 'city', 'province', 'postalCode', 'country'],
                    required: true
                }
            ]
        });

        if (!offers) {
            return res.status(400).json();
        }
        
        res.status(200).send(offers);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Server error'
        });
    }
}

const listById = async (req, res) => {
    try {
        let offer = await Offer.findOne({
            attributes: ['id', 'active', 'user_id', 'property_id', 'broker_id', 'price', 'deed_of_sale_date', 'occupancy_date', 'status'],
            include: [
                {
                    model: User,
                    attributes: ['firstname', 'lastname', 'address', 'email', 'phone'],
                    required: true
                },
                {
                    model: Broker,
                    attributes: ['license_number', 'agency', 'email', 'phone'],
                    required: true
                },
                {
                    model: Property,
                    attributes: ['civicAddress', 'aptNumber', 'street', 'neighbourhood', 'city', 'province', 'postalCode', 'country'],
                    required: true
                }
            ],
            where: { id: req.params.id }
        });

        if (!offer) {
            res.status(400).json();
        } else {
            res.status(200).send(offer);
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Server error'
        });
    }
}

const listByUserId = async (req, res) => {
    try {
        let offer = await Offer.findOne({
            attributes: ['id', 'active', 'user_id', 'property_id', 'broker_id', 'price', 'deed_of_sale_date', 'occupancy_date', 'status'],
            include: [
                {
                    model: User,
                    attributes: ['firstname', 'lastname', 'address', 'email', 'phone'],
                    required: true,
                    where: {id: req.params.id}
                },
                {
                    model: Broker,
                    attributes: ['license_number', 'agency', 'email', 'phone'],
                    required: true
                },
                {
                    model: Property,
                    attributes: ['civicAddress', 'aptNumber', 'street', 'neighbourhood', 'city', 'province', 'postalCode', 'country'],
                    required: true
                }
            ],
            where: { id: req.params.id }
        });

        if (!offer) {
            res.status(400).json();
        } else {
            res.status(200).send(offer);
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
        let offer = await Offer.findOne({
            attributes: ['id', 'active', 'user_id', 'property_id', 'broker_id', 'price', 'deed_of_sale_date', 'occupancy_date', 'status'],
            include: [
                {
                    model: User,
                    attributes: ['firstname', 'lastname', 'address', 'email', 'phone'],
                    required: true
                },
                {
                    model: Broker,
                    attributes: ['license_number', 'agency', 'email', 'phone'],
                    required: true,
                    where: {id: req.params.id}
                },
                {
                    model: Property,
                    attributes: ['civicAddress', 'aptNumber', 'street', 'neighbourhood', 'city', 'province', 'postalCode', 'country'],
                    required: true
                }
            ],
            where: { id: req.params.id }
        });

        if (!offer) {
            res.status(400).json();
        } else {
            res.status(200).send(offer);
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Server error'
        });
    }
}

const listByPropertyId = async (req, res) => {
    try {
        let offer = await Offer.findOne({
            attributes: ['id', 'active', 'user_id', 'property_id', 'broker_id', 'price', 'deed_of_sale_date', 'occupancy_date', 'status'],
            include: [
                {
                    model: User,
                    attributes: ['firstname', 'lastname', 'address', 'email', 'phone'],
                    required: true
                },
                {
                    model: Broker,
                    attributes: ['license_number', 'agency', 'email', 'phone'],
                    required: true
                },
                {
                    model: Property,
                    attributes: ['civicAddress', 'aptNumber', 'street', 'neighbourhood', 'city', 'province', 'postalCode', 'country'],
                    required: true,
                    where: {id: req.params.id}
                }
            ],
            where: { id: req.params.id }
        });

        if (!offer) {
            res.status(400).json();
        } else {
            res.status(200).send(offer);
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

        if (!data.user_id || !data.broker_id || !data.property_id) {
            return res.status(400).json({message: "Missing id for user, property, or broker."});
        }

        // check user
        const user = await User.findOne({ where: { id: data.user_id } });
        console.log(user);
        // check broker
        const broker = await Broker.findOne({ where: { id: data.broker_id } });
        console.log(broker);

        // check property
        const property = await Property.findOne({
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
            where: { id: data.property_id }
        });
        console.log(property);


        if (!user || !broker || !property) {
            return res.status(400).json({message: "Invalid id for user, property, or broker."});
        }

        const [offer, created] = await Offer.findOrCreate({
            where: data,
            defaults: {
                active: 1
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
            message: 'Server error'
        });
    }
}

const destroy = async (req, res) => {
    try {
        const offer = await Offer.findOne({
            where: {id: req.params.id}
        });

        if (!offer) {
            return res.status(400).json();
        }

        offer.destroy();
        
        res.status(200).json();

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Server error'
        });
    }
}

export default { list, listById, listByUserId, listByBrokerId, listByPropertyId, create, destroy};
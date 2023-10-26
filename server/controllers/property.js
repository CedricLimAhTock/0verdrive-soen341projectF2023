import Property from '../models/property.js';
import User from '../models/user.js';
import Listing from '../models/listing.js';

const list = async (req, res) => {
    try {
        let properties = await Property.findAll();

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

const create = async (req, res) => {
    try {
        const data = req.body;

        let q = {};
        if (fields.civicAddress) {
            q.civicAddress = fields.civicAddress;
        }
        if (fields.street) {
            q.street = fields.street;
        }
        if (fields.neighbourhood) {
            q.neighbourhood = fields.neighbourhood;
        }
        if (fields.city) {
            q.city = fields.city;
        }
        if (fields.province) {
            q.province = fields.province;
        }
        if (fields.postalCode) {
            q.postalCode = fields.postalCode;
        }
        if (fields.country) {
            q.country = fields.country;
        }
        if (fields.price) {
            q.price = fields.price;
        }
        if (fields.livingArea) {
            q.livingArea = {
                [Op.gte]: (!fields.livingArea.min ? 0 : fields.livingArea.min),
                [Op.lte]: (!fields.livingArea.max ? Number.MAX_SAFE_INTEGER : fields.livingArea.max)
            };
        }
        if (fields.propertyArea) {
            q.propertyArea = {
                [Op.gte]: (!fields.propertyArea.min ? 0 : fields.propertyArea.min),
                [Op.lte]: (!fields.propertyArea.max ? Number.MAX_SAFE_INTEGER : fields.propertyArea.max)
            };
        }
        if (fields.numOfBedrooms) {
            q.numOfBedrooms = {
                [Op.gte]: (!fields.numOfBedrooms.min ? 0 : fields.numOfBedrooms.min),
                [Op.lte]: (!fields.numOfBedrooms.max ? Number.MAX_SAFE_INTEGER : fields.numOfBedrooms.max)
            };
        }
        if (fields.numOfFloors) {
            q.numOfFloors = {
                [Op.gte]: (!fields.numOfFloors.min ? 0 : fields.numOfFloors.min),
                [Op.lte]: (!fields.numOfFloors.max ? Number.MAX_SAFE_INTEGER : fields.numOfFloors.max)
            };
        }
        if (fields.yearBuilt) {
            q.yearBuilt = {
                [Op.gte]: (!fields.yearBuilt.min ? 0 : fields.yearBuilt.min),
                [Op.lte]: (!fields.yearBuilt.max ? Number.MAX_SAFE_INTEGER : fields.yearBuilt.max)
            };
        }
        if (fields.listedDate) {
            q.listedDate = {
                [Op.gte]: (!fields.listedDate.min ? 0 : fields.listedDate.min),
                [Op.lte]: (!fields.listedDate.max ? Number.MAX_SAFE_INTEGER : fields.listedDate.max)
            };
        }
        if (fields.propertyType) {
            q.propertyType = fields.propertyType;
        }
        
        const [property, created] = await Property.findOrCreate({
            where: {
                civicAddress: data.civicAddress,
                aptNumber: data.aptNumber,
                street: data.street,
                neighbourhood: data.neighbourhood,
                city: data.city,
                province:data.province,
                postalCode:data.postalCode,
                country:data.country,
                listingType: data.listingType,
                price: data.price,
                livingArea: data.livingArea,
                propertyArea: data.propertyArea,
                numOfBedrooms: data.numOfBedrooms,
                numOfBathrooms: data.numOfBathrooms,
                numOfFloors: data.numOfFloors,
                yearBuilt: data.yearBuilt,
                listedDate: data.listedDate
                
            },
            defaults: {
                status: 1,
                aptNumber: ""
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
// TODO implement some query to search specific filters

export default {list, listById, listByType, listByTypeId, create, update, updateById, destroy};
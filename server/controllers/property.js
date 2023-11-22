import Property from "../models/property.js";
import Listing from "../models/listing.js";
import Broker from "../models/broker.js";

const list = async (req, res) => {
    try {
        let properties = await Property.findAll({
            attributes: [
                "id",
                "active",
                "civic_address",
                "apt_number",
                "street",
                "neighbourhood",
                "city",
                "province",
                "postal_code",
                "country",
                "listing_type",
                "price",
                "living_area",
                "property_area",
                "num_bedrooms",
                "num_bathrooms",
                "num_floors",
                "year_built",
                "listed_date",
                "property_type"
            ]
        });

        if (!properties) {
            return res.status(404).json({});
        } else {
            res.status(200).send(properties);
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error"
        });
    }
};

const listByType = async (req, res) => {
    try {
        let properties = await Property.findAll({
            attributes: [
                "id",
                "active",
                "civic_address",
                "apt_number",
                "street",
                "neighbourhood",
                "city",
                "province",
                "postal_code",
                "country",
                "listing_type",
                "price",
                "living_area",
                "property_area",
                "num_bedrooms",
                "num_bathrooms",
                "num_floors",
                "year_built",
                "listed_date",
                "property_type"
            ],
            where: {listing_type: req.params.type}
        });

        if (!properties) {
            return res.status(404).json();
        } else {
            res.status(200).send(properties);
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error"
        });
    }
};

const listByTypeId = async (req, res) => {
    try {
        let properties = await Property.findAll({
            attributes: [
                "id",
                "active",
                "civic_address",
                "apt_number",
                "street",
                "neighbourhood",
                "city",
                "province",
                "postal_code",
                "country",
                "listing_type",
                "price",
                "living_area",
                "property_area",
                "num_bedrooms",
                "num_bathrooms",
                "num_floors",
                "year_built",
                "listed_date",
                "property_type"
            ],
            where: {
                id: req.params.id,
                listing_type: req.params.type
            }
        });

        if (!properties) {
            return res.status(404).json();
        } else {
            res.status(200).send(properties);
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error"
        });
    }
};

const listById = async (req, res) => {
    try {
        let property = await Property.findOne({
            attributes: [
                "id",
                "active",
                "civic_address",
                "apt_number",
                "street",
                "neighbourhood",
                "city",
                "province",
                "postal_code",
                "country",
                "listing_type",
                "price",
                "living_area",
                "property_area",
                "num_bedrooms",
                "num_bathrooms",
                "num_floors",
                "year_built",
                "listed_date",
                "property_type"
            ],
            where: {id: req.params.id}
        });

        if (!property) {
            return res.status(404).json();
        } else {
            res.status(200).send(property);
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error"
        });
    }
};

const listByBrokerId = async (req, res) => {
    try {
        const properties = await Property.findAll({
            attributes: [
                "id",
                "active",
                "civic_address",
                "apt_number",
                "street",
                "neighbourhood",
                "city",
                "province",
                "postal_code",
                "country",
                "listing_type",
                "price",
                "living_area",
                "property_area",
                "num_bedrooms",
                "num_bathrooms",
                "num_floors",
                "year_built",
                "listed_date",
                "property_type"
            ],
            include: [
                {
                    model: Listing,
                    attributes: [], // don't return any columns
                    required: true, // generate INNER JOIN
                    include: {
                        model: Broker,
                        required: true,
                        attributes: [],
                        where: {
                            id: req.params.id
                        }
                    }
                }
            ]
        });

        if (!properties) {
            return res.status(404).json();
        } else {
            res.status(200).send(properties);
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error"
        });
    }
};

const create = async (req, res) => {
    try {
        const data = req.body;

        req.body.price ? null : delete data.price;
        req.body.living_area ? null : delete data.living_area;
        req.body.property_area ? null : delete data.property_area;
        req.body.num_bathrooms ? null : delete data.num_bathrooms;
        req.body.num_bedrooms ? null : delete data.num_bedrooms;
        req.body.num_floors ? null : delete data.num_floors;
        req.body.listed_date ? null : delete data.listed_date;
        req.body.year_built ? null : delete data.year_built;




        let property_address = [
            data.apt_number,
            data.civic_address,
            data.street,
            data.neighbourhood,
            data.city,
            data.province,
            data.country,
            data.postal_code].join(" ");

        const [property, created] = await Property.findOrCreate({
            attributes: ["id"],
            where: {id: null},
            defaults: {
                active: 1,
                civic_address: data.civic_address,
                apt_number: data.apt_number,
                street: data.street,
                neighbourhood: data.neighbourhood,
                city: data.city,
                province: data.province,
                postal_code: data.postal_code,
                country: data.country,
                listing_type: data.listing_type,
                price: data.price,
                living_area: data.living_area,
                property_area: data.property_area,
                num_bedrooms: data.num_bedrooms,
                num_bathrooms: data.num_bathrooms,
                num_floors: data.num_floors,
                year_built: data.year_built,
                listed_date: data.listed_date,
                property_type: data.property_type,
                address: property_address
            }
        });
        if (!created) {
            return res.status(400).json({message: "Failed to create."});
        } else {
            res.status(200).send(property);
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error"
        });
    }
};


const update = async (req, res) => {
    try {
        let data = req.body;
        let property_id = req.body.id;

        if (property_id == null) {
            return res.status(400).json({message: "id is null."});
        }
        const property = await Property.findOne({where: {id: property_id}});

        if (!property) {
            return res.status(404).json({message: "Does not exist."});
        }

        let property_address = [
            data.apt_number,
            data.civic_address,
            data.street,
            data.neighbourhood,
            data.city,
            data.province,
            data.country,
            data.postal_code].join(" ");
        if (property_address) {
            data.address = property_address;
        }

        delete data.id;
        await Property.update(data, {where: {id: property_id}});

        res.status(200).json();

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error"
        });
    }
};


const updateById = async (req, res) => {
    try {

        let data = req.body;
        let property_id = req.params.id;

        if (property_id == null || req.body == null) {
            return res.status(400).json({message: "id or body is null."});
        }
        const property = await Property.findOne({where: {id: property_id}});

        if (!property) {
            return res.status(404).json({message: "Does not exist."});
        }

        let property_address = [
            data.apt_number,
            data.civic_address,
            data.street,
            data.neighbourhood,
            data.city,
            data.province,
            data.country,
            data.postal_code].join(" ");
        if (property_address) {
            data.address = property_address;
        }

        delete data.id;
        await Property.update(data, { where: { id: property_id } });

        res.status(200).json();

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error"
        });
    }
};

const destroy = async (req, res) => {
    try {
        const property = await Property.findOne({
            attributes: ["id"],
            where: {id: req.params.id}
        });

        if (!property) {
            return res.status(404).json();
        }

        property.destroy();
        
        res.status(200).json(null);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error"
        });
    }
};

export default {list, listById, listByType, listByTypeId, listByBrokerId, create, update, updateById, destroy};
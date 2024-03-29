import Broker from "../models/broker.js";
import Property from "../models/property.js";
import Listing from "../models/listing.js";

const list = async (req, res) => {
  try {
    let listings = await Listing.findAll({
      attributes: [
        "id",
        "active",
        "broker_id",
        "property_id",
        "title",
        "description",
      ],
      include: [
        {
          model: Broker,
          attributes: [
            "id",
            "active",
            "user_id",
            "license_number",
            "agency",
            "email",
            "phone",
          ],
          required: true,
        },
        {
          model: Property,
          attributes: [
            "civic_address",
            "apt_number",
            "street",
            "neighbourhood",
            "city",
            "province",
            "postal_code",
            "country",
            "id",
            "active",
            "address",
            "listing_type",
            "price",
            "living_area",
            "property_area",
            "num_bedrooms",
            "num_bathrooms",
            "num_floors",
            "year_built",
            "listed_date",
            "property_type",
          ],
          required: true,
        },
      ],
    });

    if (!listings) {
      return res.status(404).json({});
    }

    res.status(200).send(listings);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

const listById = async (req, res) => {
  try {
    let listing = await Listing.findOne({
      attributes: [
        "id",
        "active",
        "broker_id",
        "property_id",
        "title",
        "description",
      ],
      include: [
        {
          model: Broker,
          attributes: [
            "id",
            "active",
            "user_id",
            "license_number",
            "agency",
            "email",
            "phone",
          ],
          required: true,
        },
        {
          model: Property,
          attributes: [
            "civic_address",
            "apt_number",
            "street",
            "neighbourhood",
            "city",
            "province",
            "postal_code",
            "country",
            "id",
            "active",
            "address",
            "listing_type",
            "price",
            "living_area",
            "property_area",
            "num_bedrooms",
            "num_bathrooms",
            "num_floors",
            "year_built",
            "listed_date",
            "property_type",
          ],
          required: true,
        },
      ],
      where: { id: req.params.id },
    });

    if (!listing) {
      return res.status(404).json({});
    } else {
      res.status(200).send(listing);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

const listByBrokerId = async (req, res) => {
  try {
    const listing = await Listing.findAll({
      attributes: [
        "id",
        "active",
        "broker_id",
        "property_id",
        "title",
        "description",
      ],
      include: [
        {
          model: Broker,
          attributes: [
            "id",
            "active",
            "user_id",
            "license_number",
            "agency",
            "email",
            "phone",
          ],
          required: true,
        },
        {
          model: Property,
          attributes: [
            "civic_address",
            "apt_number",
            "street",
            "neighbourhood",
            "city",
            "province",
            "postal_code",
            "country",
            "id",
            "active",
            "address",
            "listing_type",
            "price",
            "living_area",
            "property_area",
            "num_bedrooms",
            "num_bathrooms",
            "num_floors",
            "year_built",
            "listed_date",
            "property_type",
          ],
          required: true,
        },
      ],
      where: { broker_id: req.params.id },
    });

    if (!listing) {
      return res.status(404).json();
    } else {
      res.status(200).send(listing);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

const listByPropertyId = async (req, res) => {
  try {
    const listing = await Listing.findAll({
      attributes: [
        "id",
        "active",
        "broker_id",
        "property_id",
        "title",
        "description",
      ],
      include: [
        {
          model: Broker,
          attributes: [
            "id",
            "active",
            "user_id",
            "license_number",
            "agency",
            "email",
            "phone",
          ],
          required: true,
        },
        {
          model: Property,
          attributes: [
            "civic_address",
            "apt_number",
            "street",
            "neighbourhood",
            "city",
            "province",
            "postal_code",
            "country",
            "id",
            "active",
            "address",
            "listing_type",
            "price",
            "living_area",
            "property_area",
            "num_bedrooms",
            "num_bathrooms",
            "num_floors",
            "year_built",
            "listed_date",
            "property_type",
          ],
          required: true,
        },
      ],
      where: { property_id: req.params.id },
    });

    if (!listing) {
      return res.status(404).json();
    } else {
      res.status(200).send(listing);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

const createWithProperty = async (req, res) => {
  try {
    const data = req.body;
    console.log(req.body);

    if (!data.broker_id || !data.property) {
      return res
        .status(400)
        .json({ message: "broker id or property data cannot be null." });
    }

    let temp = await Broker.findOne({
      attributes: ["id"],
      where: { id: data.broker_id },
    });

    if (!temp) {
      return res.status(400).json({ message: "broker does not exist." });
    }

    if (!req.body.price) {
      delete data.price;
    }
    if (!req.body.living_area) {
      delete data.living_area;
    }
    if (!req.body.property_area) {
      delete data.property_area;
    }
    if (!req.body.num_bathrooms) {
      delete data.num_bathrooms;
    }
    if (!req.body.num_bedrooms) {
      delete data.num_bedrooms;
    }
    if (!req.body.num_floors) {
      delete data.num_floors;
    }

    let property_address = [
      data.property.apt_number,
      data.property.civic_address,
      data.property.street,
      data.property.neighbourhood,
      data.property.city,
      data.property.province,
      data.property.country,
      data.property.postal_code,
    ].join(" ");

    const [property, created] = await Property.findOrCreate({
      attributes: ["id"],
      where: { id: null },
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
        address: property_address,
      },
    });
    if (!created) {
      return res.status(400).json({ message: "Failed to create." });
    }

    const [listing, lcreated] = await Listing.findOrCreate({
      attributes: ["id"],
      where: {
        broker_id: data.broker_id,
        property_id: property.id,
      },
      defaults: {
        active: data.active,
        broker_id: data.broker_id,
        property_id: property.id,
        title: data.title,
        description: data.description,
      },
    });
    if (!lcreated) {
      return res.status(400).json({ message: "Already exists." });
    }

    res.status(200).send(listing);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

const create = async (req, res) => {
  try {
    const data = req.body;

    if (!data.broker_id || !data.property_id) {
      return res
        .status(400)
        .json({ message: "broker or property id cannot be null." });
    }

    let temp = await Broker.findOne({
      attributes: ["id"],
      where: { id: data.broker_id },
    });

    if (!temp) {
      return res.status(400).json({ message: "broker does not exist." });
    }

    temp = await Property.findOne({
      attributes: ["id"],
      where: { id: data.property_id },
    });

    if (!temp) {
      return res.status(400).json({ message: "property does not exist." });
    }

    const [listing, created] = await Listing.findOrCreate({
      attributes: ["id"],
      where: {
        broker_id: data.broker_id,
        property_id: data.property_id,
      },
      defaults: {
        active: data.active,
        broker_id: data.broker_id,
        property_id: data.property_id,
        title: data.title,
        description: data.description,
      },
    });
    if (!created) {
      return res.status(400).json({ message: "Already exists." });
    }

    res.status(200).send(listing);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

const update = async (req, res) => {
  try {
    let data = req.body;
    let listing_id = req.body.id;

    if (listing_id == null) {
      return res.status(400).json();
    }

    const listing = await Listing.findOne({
      attributes: ["id"],
      where: { id: listing_id },
    });

    if (!listing) {
      return res.status(400).json();
    }

    // don't allow updating broker-property
    delete data.broker_id;
    delete data.property_id;
    delete data.id;

    const updated = await Listing.update(data, { where: { id: listing_id } });

    res.status(200).send(updated);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

const updateById = async (req, res) => {
  try {
    let data = req.body;
    let listing_id = req.params.id;

    if (listing_id == null) {
      return res.status(400).json();
    }

    const listing = await Listing.findOne({
      attributes: ["id"],
      where: { id: listing_id },
    });

    if (!listing) {
      return res.status(400).json();
    }

    // don't allow updating broker-property
    delete data.broker_id;
    delete data.property_id;
    delete data.id;

    const updated = await Listing.update(data, { where: { id: listing_id } });

    res.status(200).send(updated);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

const destroy = async (req, res) => {
  try {
    const listing = await Listing.findOne({
      attributes: ["id"],
      where: {
        id: req.params.id,
      },
    });

    if (!listing) {
      return res.status(404).json();
    }

    listing.destroy();

    res.status(200).json();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

export default {
  list,
  listById,
  listByBrokerId,
  listByPropertyId,
  create,
  createWithProperty,
  update,
  updateById,
  destroy,
};

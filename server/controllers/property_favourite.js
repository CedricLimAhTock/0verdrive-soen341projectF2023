import Property_favourite from "../models/property_favourite.js";
import User from "../models/user.js";
import Property from "../models/property.js";

const list = async (req, res) => {
  try {
    let favourite = await Property_favourite.findAll({
      attributes: ["id", "property_id", "user_id"],
    });

    if (!favourite) {
      return res.status(404).json({});
    }

    res.status(200).send(favourite);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

const listById = async (req, res) => {
  try {
    let favourite = await Property_favourite.findOne({
      attributes: ["id", "property_id", "user_id"],
      where: { id: req.params.id },
    });

    if (!favourite) {
      return res.status(404).json({});
    } else {
      res.status(200).send(favourite);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

const listByUserId = async (req, res) => {
  try {
    let favourite = await Property_favourite.findAll({
      attributes: ["id", "property_id", "user_id"],
      where: { user_id: req.params.id },
    });

    if (!favourite) {
      return res.status(404).json({});
    } else {
      res.status(200).send(favourite);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

const listByPropertyId = async (req, res) => {
  try {
    let favourite = await Property_favourite.findAll({
      attributes: ["id", "property_id", "user_id"],
      where: { property_id: req.params.id },
    });

    if (!favourite) {
      return res.status(404).json({});
    } else {
      res.status(200).send(favourite);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

const listByUserPropertyId = async (req, res) => {
  try {
    let favourite = await Property_favourite.findAll({
      attributes: ["id", "property_id", "user_id"],
      where: { user_id: req.params.user_id, property_id: data.property_id },
    });

    if (!favourite) {
      return res.status(404).json({});
    } else {
      res.status(200).send(favourite);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

const create = async (req, res) => {
  try {
    const data = req.body;

    if (!data.user_id || !data.property_id) {
      return res
        .status(400)
        .json({ message: "user or property id cannot be null." });
    }

    let temp = await User.findOne({
      attributes: ["id"],
      where: { id: data.user_id },
    });

    if (!temp) {
      return res.status(400).json({ message: "invalid user." });
    }

    temp = await Property.findOne({
      attributes: ["id"],
      where: { id: data.property_id },
    });

    if (!temp) {
      return res.status(400).json({ message: "invalid property." });
    }

    const [favourite, created] = await Property_favourite.findOrCreate({
      attributes: ["id"],
      where: {
        user_id: data.user_id,
        property_id: data.property_id,
      },
    });

    if (!created) {
      return res.status(400).json({ message: "Already exists." });
    } else {
      res.status(200).send(favourite);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

const destroy = async (req, res) => {
  try {
    const favourite = await Property_favourite.findOne({
      attributes: ["id"],
      where: {
        id: req.params.id,
      },
    });

    if (!favourite) {
      return res.status(404).json();
    }

    favourite.destroy();

    res.status(200).json();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

const destroyByUserPropertyId = async (req, res) => {
  try {
    const favourite = await Property_favourite.findOne({
      attributes: ["id"],
      where: {
        user_id: req.params.user_id,
        property_id: req.params.property_id,
      },
    });

    if (!favourite) {
      return res.status(404).json();
    }

    favourite.destroy();

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
  listByUserId,
  listByPropertyId,
  listByUserPropertyId,
  create,
  destroy,
  destroyByUserPropertyId,
};

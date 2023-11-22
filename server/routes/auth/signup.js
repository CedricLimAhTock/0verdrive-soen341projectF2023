import express from "express";
import bcrypt from "bcrypt";
import { Op } from "sequelize";
import User from "../../models/user.js";
import User_role from "../../models/user_role.js";
import Role from "../../models/role.js";
import Broker from "../../models/broker.js";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    let data = req.body;

    if (!data.username || !data.password || !data.userRole) {
      return res
        .status(400)
        .json({ message: "username, password, role cannot be null." });
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;

    const role = await Role.findOne({
      attributes: ["id", "active", "type"],
      where: {
        type: data.userRole.toLowerCase().split(" ").join(""),
      },
    });

    if (!role) {
      res.status(404).json({ message: "Role does not exist." });
    }

    delete data.userRole;

    const [user, created] = await User.findOrCreate({
      attributes: ["id"],
      where: {
        username: data.username,
      },
      defaults: {
        active: 1,
        password: data.password,
        firstname: data.firstname,
        lastname: data.lastname,
        address: data.address,
        email: data.email,
        phone: data.phone,
      },
    });
    if (!created) {
      return res.status(400).json({ message: "Username already taken." });
    } else {
      // each new user must have a role associated
      const [, ur_created] = await User_role.findOrCreate({
        attributes: ["id"],
        where: {
          user_id: user.id
        },
        defaults: {
          active: 1,
          role_id: role.id
        }
      });
      if (!ur_created) {
        user.destroy();
        return res
          .status(400)
          .json({ message: "user already assigned a role." });
      }

      // if user is a broker, create an entry in broker table
      if (role.type == "broker") {
        if (!data.license_number) {
          return res
            .status(400)
            .json({ message: "Broker license cannot be null." });
        }
        if (!data.agency) {
          return res
            .status(400)
            .json({ message: "Broker agency cannot be null." });
        }
        const [, b_created] = await Broker.findOrCreate({
          attributes: ["id"],
          where: {
            [Op.or]: {
              user_id: user.id,
              license_number: data.license_number
            }
          },
          defaults: {
            active: 1,
            user_id: user.id,
            license_number: data.license_number,
            agency: data.agency,
            email: user.email,
            phone: user.phone,
          }
        });

        if (!b_created) {
          user.destroy();
          return res.status(400)
            .json({ message: "Failed to add broker entry." });
        }
      }
      res.status(200).send(user);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server error",
    });
  }
});

export default router;

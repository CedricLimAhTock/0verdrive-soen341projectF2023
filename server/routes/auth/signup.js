import express from "express";
import bcrypt from "bcrypt";
import User from "../../models/user.js";
import User_role from "../../models/user_role.js"
import Role from '../../models/role.js';
import Broker from '../../models/broker.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        let data = req.body;
      
        const hashedPassword = await bcrypt.hash(data.password, 10);
        data.password = hashedPassword;

        const role = await Role.findOne({where: {type: data.userRole.toLowerCase().split(" ").join("")}});
        
        if(!role){
            res.status(400).json({message: "Role does not exist."});
        }

        delete data.userRole;

        const [user, created] = await User.findOrCreate({
            where: data,
            defaults: {
                active: 1,
                firstname: "",
                lastname: "",
                email: "",
                phone: ""
            }
        });
        if (!created) {
            res.status(400).json({message: "Username already taken."});
        } else {
            // each new user must have a role associated
            const user_role = await User_role.create({
                active: 1,
                user_id: user.id,
                role_id: role.id
            });

            if(!user_role){
                user.destroy();
                res.status(400).json({message: "Failed to assign role."});
            }

            // if user is a broker, create an entry in broker table
            if (role.type == 'broker') {
                const broker = await Broker.create({
                    active: 1,
                    user_id: user.id,
                    license_number: "",
                    agency: "",
                    email: "",
                    phone: ""
                });

                if (!broker) {
                    user.destroy();
                    res.status(400).json({message: "Failed to add broker entry."});
                }
            }

            res.status(200).send(user);
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Server error'
        });
    }

    delete data.userRole;

    [user, created] = await User.findOrCreate({
      where: data,
      defaults: {
        active: 1,
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
      },
    });
    if (!created) {
      res.status(400).json({ message: "Username already taken." });
    } else {
      // each new user must have a role associated
      const user_role = await User_role.create({
        active: 1,
        user_id: user.id,
        role_id: role.id,
      });

      if (!user_role) {
        user.destroy();
        res.status(400).json({ message: "Failed to assign role." });
      }

      res.status(200).send(user);
    }
  } catch (err) {
    console.log(err);
    if (!created) {
      res.status(400).json({ message: "Username already taken." });
    } else {
      res.status(500).json({
        message: "Server error",
      });
    }
  }
});

export default router;

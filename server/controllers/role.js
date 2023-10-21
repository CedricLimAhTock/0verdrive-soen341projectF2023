import Role from '../models/role.js';


const list = async (req, res) => {
    try {
        let roles = await Role.findAll({
            where: {active: 1}
        });

        if (!roles) {
            res.status(400).json({});
        }
        
        res.status(200).send(roles);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Server error'
        });
    }
}

const listById = async (req, res) => {
    try {
        let role = await Role.findOne({
            where: {id: req.params.id, active: 1}
        });

        if (!role) {
            res.status(400).json({});
        } else {
            res.status(200).send(role);
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Server error'
        });
    }
}

// cannot create because it is an enum
// cannot update because they are predefined enums
// cannot delete

export default {list, listById};
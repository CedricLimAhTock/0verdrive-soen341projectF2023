import Role from '../models/role.js';


const list = async (req, res) => {
    try {
        let roles = await Role.findAll(
            {attributes: ['id', 'active', 'type']}
        );

        if (!roles) {
            res.status(404).json({});
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
            attributes: ['id', 'active', 'type'],
            where: {id: req.params.id}
        });

        if (!role) {
            res.status(404).json({});
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
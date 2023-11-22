import Message from "../models/message.js";
import User from "../models/user.js";

const list = async (req, res) => {
    try {
        let message = await Message.findAll({
            attributes: ["id", "active", "parent_id", "user_id", "message"]
        });

        if (!message) {
            return res.status(404).json({});
        }
        
        res.status(200).send(message);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error"
        });
    }
};

const listById = async (req, res) => {
    try {
        let message = await Message.findOne({
            attributes: ["id", "active", "parent_id", "user_id", "message"],
            where: {id: req.params.id}
        });

        if (!message) {
            return res.status(404).json({});
        } else {
            res.status(200).send(message);
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error"
        });
    }
};

const listSentByUserId = async (req, res) => {
    try {
        const message = await Message.findAll({
            attributes: ["id", "active", "parent_id", "user_id", "message"],
            where: {parent_id: req.params.id}
        });

        if (!message) {
            return res.status(404).json();
        } else {
            res.status(200).send(message);
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error"
        });
    }
};

const listReceivedByUserId = async (req, res) => {
    try {
        const message = await Message.findAll({
            attributes: ["id", "active", "parent_id", "user_id", "message"],
            where: {user_id: req.params.id}
        });

        if (!message) {
            return res.status(404).json();
        } else {
            res.status(200).send(message);
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

        if (!data.parent_id || !data.user_id) {
            return res.status(400).json({ message: "user id cannot be null." });
        }        

        let temp = await User.findOne({attributes: ["id"], where: {id: data.parent_id }});

        if (!temp) {
            return res.status(404).json({ message: "sender does not exist." });
        }

        temp = await User.findOne({attributes: ["id"], where: {id: data.user_id }});

        if (!temp) {
            return res.status(404).json({ message: "receiver does not exist." });
        }

        const message = await Message.create({
            attributes: ["id"],
            where: {
                active: data.active,
                parent_id: data.parent_id,
                user_id: data.user_id,
                message: data.message
            }});
        if (!message) {
            return res.status(400).json({ message: "Failed to create." });
        }

        res.status(200).send(message);
        
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
        let message_id = req.body.id;

        if(message_id == null){
            return res.status(400).json();
        }

        const message = await Message.findOne({attributes: ["id"], where: {id: message_id}});

        if (!message) {
            return res.status(404).json();
        }

        // don't allow updating association
        delete data.parent_id;
        delete data.user_id;
        delete data.id;

        const updated = await Message.update(data, {where: {id: message_id}});

        res.status(200).send(updated);
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
        let message_id = req.params.id;

        if(message_id == null){
            return res.status(400).json();
        }

        const message = await Message.findOne({attributes: ["id"], where: {id: message_id}});

        if (!message) {
            return res.status(404).json();
        }

        // don't allow updating broker-property
        delete data.parent_id;
        delete data.user_id;
        delete data.id;

        const updated = await Message.update(data, {where: {id: message_id}});

        res.status(200).send(updated);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error"
        });
    }
};

const destroy = async (req, res) => {
    try {
        const message = await Message.findOne({
            attributes: ["id"],
            where: {
                id: req.params.id
            }
        });

        if (!message) {
            return res.status(404).json();
        }

        message.destroy();
        
        res.status(200).json();

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error"
        });
    }
};

export default {
    list, listById, listReceivedByUserId, listSentByUserId, create, update, updateById, destroy
};
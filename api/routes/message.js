const router = require("express").Router();
const Message = require("../models/Message");

router.post("/", async (req, res) => {
    const newMessage = new Message(req.body);
    try {
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage).end();
    } catch (e) {
        res.status(500).json(e).end();
    }
});

router.get("/:conversationId", async (req, res) => {
    try {
        const allMessages = await Message.find({
            conversationId: req.params.conversationId
        });
        res.status(200).json(allMessages).end();
    } catch (e) {
        res.status(500).json(e).end();
    }
});

module.exports = router;
const router = require("express").Router();
const Conversation = require("../models/Conversation");

router.post("/", async (req, res) => {
    const newConversation = new Conversation({
        members: [
            req.body.senderId, req.body.receiverId
        ]
    });
    try {
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation).end();
    } catch (e) {
        res.status(500).json(e).end();
    }
});

router.get("/:userId", async (req, res) => {
    try {
        const conversation = await Conversation.find({
            members: { $in: [req.params.userId] }
        });
        res.status(200).json(conversation).end();
    } catch (e) {
        res.status(500).json(e).end();
    }
});

module.exports = router;
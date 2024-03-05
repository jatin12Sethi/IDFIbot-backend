const express = require('express')
const router = express.Router()

const usermessages = require('../models/usermessages')
router.get('/', (req, res) => {
    res.send('Successful connection to the server')
})


router.post('/', async (req, res) => {
    try {
        const existingUserMessage = await usermessages.findOne({ id: req.body.id })
        if (existingUserMessage) {
            existingUserMessage.messages.push(...req.body.messages)
            const updatedUserMessage = await existingUserMessage.save()
            res.status(200).json(updatedUserMessage)
        } else {
            const userMessages = new usermessages({
                id: req.body.id,
                messages: req.body.messages
            })
            const newMessage = await userMessages.save()
            res.status(201).json(newMessage)
        }
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})



router.get('/:id', async (req, res) => {
    try {
        const userMessage = await usermessages.findOne({ id: req.params.id })
        if (!userMessage) {
            return res.status(404).json({ message: 'User message not found' })
        }
        res.json(userMessage.messages)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


router.delete('/:id', async (req, res) => {
    try {
        const userMessage = await usermessages.findOne({ id: req.params.id })
        if (!userMessage) {
            return res.status(404).json({ message: 'User message not found' })
        }
        await usermessages.deleteOne({ id: req.params.id })
        res.status(200).json({ message: 'User deleted successfully' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})



module.exports = router
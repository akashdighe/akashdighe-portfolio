const express = require("express")
const UsersModel = require("../model/Users")
const router = express.Router();


router.post("/create", async (req, res) => {
    const newOrder = new UsersModel(req.body)
    try {
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/list", async (req, res) => {
    try {
        let list = await UsersModel.find()
            .exec();
        res.status(201).json(list);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete user by ID
router.delete("/delete/:id", async (req, res) => {
    try {
        const userId = req.params.id;
        console.log(userId);

        // Check if the user exists
        const userToDelete = await UsersModel.findById(userId);
        if (!userToDelete) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Delete the user
        await userToDelete.deleteOne();

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Could not delete the user' });
    }
});



router.post("/update/:id", async (req, res) => {
    try {
        const userId = req.params.id;

        let userList = await UsersModel.findById(userId);

        if (!userList) {
            return res.status(404).json({ error: 'userList not found' });
        }
        userList.name = req.body.name;
        userList.email = req.body.email;
        userList.phone = req.body.phone;
        userList.message = req.body.message;
        const updateduserList = await userList.save();

        res.status(200).json(updateduserList);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Could not update the userList' });
    }
});

module.exports = router
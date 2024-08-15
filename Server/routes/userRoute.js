const express = require('express');
const router = express.Router();
const { getAllUsers } = require('../db/mongo/modules/userModule'); 

// Route to get all users
router.get('/', async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
});

module.exports = router;

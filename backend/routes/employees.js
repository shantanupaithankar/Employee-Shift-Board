const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { auth, authorize } = require('../middleware/auth');

// @route   GET api/employees
// @desc    Get all employees
// @access  Admin
router.get('/', auth, authorize(['admin']), async (req, res) => {
    try {
        // Return only users, not admins? requirement just says employees. I will return all for now or filter by role 'user'.
        // "Employee Fields: ... Department" suggests these are the target for shifts.
        const employees = await User.find({ role: 'user' }).select('-password');
        res.json(employees);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const shiftController = require('../controllers/shiftController');
const { auth, authorize } = require('../middleware/auth');

// @route   POST api/shifts
// @desc    Assign a shift
// @access  Admin
router.post('/', auth, authorize(['admin']), shiftController.createShift);

// @route   GET api/shifts
// @desc    Get shifts
// @access  Admin/User (User sees own)
router.get('/', auth, shiftController.getShifts);

// @route   DELETE api/shifts/:id
// @desc    Delete shift
// @access  Admin
router.delete('/:id', auth, authorize(['admin']), shiftController.deleteShift);

module.exports = router;

const Shift = require('../models/Shift');
const User = require('../models/User');

const parseTime = (timeStr) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
};

exports.createShift = async (req, res) => {
    const { employeeId, date, startTime, endTime } = req.body;

    try {
        // Validation: Min 4 hours
        const start = parseTime(startTime);
        const end = parseTime(endTime);

        if (end <= start) {
            return res.status(400).json({ msg: 'End time must be after start time' });
        }

        if ((end - start) < 240) { // 4 hours * 60 minutes
            return res.status(400).json({ msg: 'Shift must be at least 4 hours' });
        }

        // Validation: Overlaps
        const existingShifts = await Shift.find({ employeeId, date });

        for (let shift of existingShifts) {
            const eStart = parseTime(shift.startTime);
            const eEnd = parseTime(shift.endTime);

            // Overlap condition: (StartA < EndB) and (EndA > StartB)
            if (start < eEnd && end > eStart) {
                return res.status(400).json({ msg: `Shift overlaps with existing shift: ${shift.startTime} - ${shift.endTime}` });
            }
        }

        const newShift = new Shift({
            employeeId,
            date,
            startTime,
            endTime
        });

        const shift = await newShift.save();
        res.json(shift);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getShifts = async (req, res) => {
    try {
        let query = {};
        // If user is not admin, only show their own shifts
        if (req.user.role !== 'admin') {
            query.employeeId = req.user.id;
        } else {
            // Admin can filter by employee or date
            if (req.query.employee) query.employeeId = req.query.employee;
            if (req.query.date) query.date = req.query.date;
        }

        const shifts = await Shift.find(query).populate('employeeId', 'name employeeCode department').sort({ date: -1 });
        res.json(shifts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.deleteShift = async (req, res) => {
    try {
        let shift = await Shift.findById(req.params.id);

        if (!shift) return res.status(404).json({ msg: 'Shift not found' });

        await Shift.findByIdAndDelete(req.params.id);

        res.json({ msg: 'Shift removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.seedUsers = async (req, res) => {
    try {
        // Check for Admin
        let admin = await User.findOne({ email: 'hire-me@anshumat.org' });
        if (!admin) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash('HireMe@2025!', salt);
            admin = new User({
                name: 'Admin User',
                email: 'hire-me@anshumat.org',
                password: hashedPassword,
                role: 'admin',
                employeeCode: 'ADMIN01',
                department: 'HR'
            });
            await admin.save();
            console.log('Admin seeded');
        }

        // Check for Normal User
        let user = await User.findOne({ email: 'user@example.com' });
        if (!user) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash('password123', salt);
            user = new User({
                name: 'Normal Employee',
                email: 'user@example.com',
                password: hashedPassword,
                role: 'user',
                employeeCode: 'EMP001',
                department: 'IT'
            });
            await user.save();
            console.log('User seeded');
        }
        res.status(200).json({ msg: 'Seeding complete' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const payload = {
            id: user.id,
            role: user.role
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1d' },
            (err, token) => {
                if (err) throw err;
                res.json({ token, user: { id: user.id, name: user.name, role: user.role, email: user.email } });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.register = async (req, res) => {
    const { name, email, password, department, employeeCode } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({
            name,
            email,
            password: hashedPassword,
            role: 'user', // Default role
            employeeCode,
            department
        });

        await user.save();

        const payload = {
            id: user.id,
            role: user.role
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1d' },
            (err, token) => {
                if (err) throw err;
                res.json({ token, user: { id: user.id, name: user.name, role: user.role, email: user.email } });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

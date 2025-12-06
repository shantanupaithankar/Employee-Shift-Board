const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const resetPassword = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to DB');

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('HireMe@2025!', salt);

        const res = await User.updateOne(
            { email: 'hire-me@anshumat.org' },
            { $set: { password: hashedPassword } }
        );

        console.log('Update Result:', res);
        console.log('Password has been reset to: HireMe@2025!');

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

resetPassword();

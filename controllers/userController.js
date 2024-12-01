const dayjs = require("dayjs");
const User = require("../models/userModel");

// Handle user login or registration
exports.loginUser = async (req, res) => {
    const { mobile_number, name } = req.body;

    if (!mobile_number || !name) {
        return res.status(400).json({ message: "Name and mobile number are required." });
    }

    try {
        const user = await User.findOne({ mobile_number });

        if (user) {
            const timeDifference = dayjs().diff(dayjs(user.last_login_time), "hour");

            if (timeDifference < 48) {
                return res.status(403).json({
                    message: `You can only login after ${48 - timeDifference} hours.`,
                    is_active: false, // User is blocked
                    mobile_number: user.mobile_number,
                    name: user.name,
                });
            }

            // Update last login time
            user.last_login_time = new Date();
            await user.save();

            return res.status(200).json({
                message: "Login successful!",
                is_active: true, // User is allowed
                mobile_number: user.mobile_number,
                name: user.name,
            });
        }

        // Create new user
        const newUser = new User({
            mobile_number,
            name,
            last_login_time: new Date(),
        });

        await newUser.save();

        return res.status(201).json({
            message: "User registered and logged in!",
            is_active: true, // New user is allowed
            mobile_number: newUser.mobile_number,
            name: newUser.name,
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


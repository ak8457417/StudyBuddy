// import {User} from "../config/db.js";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
//
// const createToken = (id) => {
//     return jwt.sign({ id }, process.env.JWT_SECRET)
// }
//
// const signUp = async (req, res) => {
//     const { name, email, password } = req.body;
//
//     try {
//         // Check if the email is already registered
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.json({success: false, message: "User already exists"});
//         }
//
//         if (!validator.isEmail(email)) {
//             return res.json({success: false, message: "Please enter a valid email"});
//         }
//         if (password.length < 6) {
//             return res.json({success: false, message: "Password must be at least 6 characters"});
//         }
//
//         // Hash password before saving
//         const hashedPassword = await bcrypt.hash(password, 10);
//
//         // Save user to database
//         const newUser = new User({ name, email, password: hashedPassword });
//
//         const user = await newUser.save();
//         const token = createToken(user._id);
//
//         res.json({success: true, user, token})
//     } catch (e) {
//         console.error(e);
//         res.json({success: false, message: e.message});
//     }
// }
//
// const login = async (req, res) => {
//     const { email, password } = req.body;
//
//     try {
//         // Check if user exists in the database
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.json({success: false, message: "User does not exists"});
//         }
//
//         // Compare passwords
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (isMatch) {
//             const token = createToken(user._id);
//             res.json({success: true, token: token, user: user});
//         } else {
//             res.json({success: false, message: "Invalid Credentials"});
//         }
//     } catch (e) {
//         console.log(e)
//         res.json({success: false, message: e.message})
//     }
// }
//
// export {signUp, login}

import { User } from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator"; // Import validator

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

const signUp = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, message: "User already exists" });
        }

        // Validate the email and password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }

        if (password.length < 6) {
            return res.json({ success: false, message: "Password must be at least 6 characters" });
        }

        // Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user to database
        const newUser = new User({ name, email, password: hashedPassword });

        const user = await newUser.save();
        const token = createToken(user._id);

        res.json({ success: true, user, token });
    } catch (e) {
        console.error(e);
        res.json({ success: false, message: e.message });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists in the database
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User does not exist" });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = createToken(user._id);
            res.json({ success: true, token: token, user: user });
        } else {
            res.json({ success: false, message: "Invalid Credentials" });
        }
    } catch (e) {
        console.log(e)
        res.json({ success: false, message: e.message })
    }
}

const getCurrentUser = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]; // Extract token from Bearer header
        if (!token) {
            return res.json({ success: false, message: "Unauthorized, token missing" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("-password"); // Exclude password from response

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        res.json({ success: true, user });
    } catch (e) {
        console.log(e);
        res.json({ success: false, message: "Invalid or expired token" });
    }
};

export { signUp, login, getCurrentUser };

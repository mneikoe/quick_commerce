import { body, validationResult } from "express-validator";
import User from "../models/User.js"; // Don't forget to import User

export const validateRegister = [
  body("email").isEmail().withMessage("Invalid email format").optional(),

  body("phone").isNumeric().withMessage("Phone must be numeric").optional(),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  body("role").notEmpty().withMessage("Role is required"),

  // Final check
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },
];

// in frotnend

// res.data.errors.forEach((err) => {
//   console.log(`${err.path}: ${err.msg}`);
// });

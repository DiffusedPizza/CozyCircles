// // Import necessary modules and models
// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcrypt');
// const User = require('../models/User');
// const { body, validationResult } = require('express-validator');

// // Define the account creation route
// router.post('/create-account', async (req, res) => {
//   try {
//     // Extract user data from the request body
//     const { accountType, name, email, confirmEmail, password, confirmPassword, agreeToTerms } = req.body;

//     // Validate user input (front-end validation is also recommended)
//     if (!accountType || !name || !email || !confirmEmail || !password || !confirmPassword || !agreeToTerms) {
//       return res.status(400).json({ error: 'All fields are required' });
//     }

//     if (email !== confirmEmail) {
//       return res.status(400).json({ error: 'Emails do not match' });
//     }

//     if (password !== confirmPassword) {
//       return res.status(400).json({ error: 'Passwords do not match' });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create a new user object
//     const newUser = new User({
//       accountType,
//       name,
//       email,
//       password: hashedPassword,
//       agreeToTerms,
//     });

//     // Save the user to the database
//     await newUser.save();

//     // Send a success response
//     res.status(201).json({ message: 'Account created successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');

// Define the account creation route with validation
router.post(
  '/create-account',
  [
    body('accountType').notEmpty(),
    body('name').notEmpty(),
    body('email').isEmail(),
    body('confirmEmail').custom((value, { req }) => {
      if (value !== req.body.email) {
        throw new Error('Emails do not match');
      }
      return true;
    }),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
    body('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match');
      }
      return true;
    }),
    body('agreeToTerms').isBoolean().toBoolean(),
  ],
  async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Extract validated user data from the request body
      const { accountType, name, email, password } = req.body;

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 8);

      // Create a new user object
      const newUser = new User({
        accountType,
        name,
        email,
        password: hashedPassword,
        agreeToTerms: req.body.agreeToTerms,
      });

      // Save the user to the database
      await newUser.save();

      // Send a success response
      res.status(201).json({ message: 'Account created successfully' });
    } catch (error) {
      console.error('Error during save operation:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
);

module.exports = router;


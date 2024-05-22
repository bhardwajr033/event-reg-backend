const express = require("express");
const { body, validationResult } = require("express-validator");

const formRouter = express.Router();

formRouter.post(
  "/",
  [
    body("name")
      .notEmpty()
      .withMessage("Name is required")
      .isString()
      .withMessage("Name must be a string")
      .matches(/^[a-zA-Z\s]+$/)
      .withMessage("Name can only contain letters and spaces"),
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email format"),
    body("phone_number")
      .notEmpty()
      .withMessage("Phone number is required")
      .matches(/^\d{10}$/)
      .withMessage("Phone number must be 10 digits"),
    body("event")
      .notEmpty()
      .withMessage("Event is required")
      .isString()
      .withMessage("Event must be a string"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, email, phone_number, event } = req.body;

      res.json({
        success: "Form data is valid and processed",
        data: {
          name,
          email,
          phone_number,
          event,
        },
      });
    } catch (err) {
      console.log(err);
      res.status(500).send([{ Error: err.message }]);
    }
  }
);

module.exports = formRouter;

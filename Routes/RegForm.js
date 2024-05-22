const express = require("express");
const { body, validationResult } = require("express-validator");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const formRouter = express.Router();

const saveRegistration = (data) => {
  const filePath = path.join(__dirname, "registrations.json");
  let registrations = [];

  if (fs.existsSync(filePath)) {
    const existingData = fs.readFileSync(filePath);
    registrations = JSON.parse(existingData);
  }

  registrations.push(data);

  fs.writeFileSync(filePath, JSON.stringify(registrations, null, 2));
};

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
      .matches(/^\d+$/)
      .withMessage("Phone number must contain only digits"),
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
      const id = uuidv4();
      saveRegistration({ id, name, email, phone_number, event });

      res.json({
        success: "Form data is valid and processed",
        data: {
          id,
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

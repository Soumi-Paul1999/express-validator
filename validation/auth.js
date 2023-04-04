const { check } = require("express-validator");

exports.userRegistrationValidator = [
  check("name")
    .trim()
    .notEmpty()
    .withMessage("name is missing")
    .isLength({ min: 5 })
    .withMessage("name must have at least 5 characters")
    .isLength({ max: 31 })
    .withMessage("name can have maximum 31 character "),

  check("email")
    .trim()
    .notEmpty()
    .withMessage("email is missing")
    .isEmail()
    .withMessage("not a valid email"),

  check("password")
    .trim()
    .notEmpty()
    .withMessage("password is missing")
    .isLength({ min: 5 })
    .withMessage("name must have at least 5 characters")
    .isLength({ max: 31 })
    .withMessage("name can have maximum 31 character "),

  check("dob")
    .trim()
    .notEmpty()
    .withMessage("dob is missing")
    .isISO8601()
    .toDate()
    .withMessage("dob is missing "),
];

exports.userLoginValidator = [
  check("email")
    .trim()
    .notEmpty()
    .withMessage("email is missing")
    .isEmail()
    .withMessage("not a valid email"),

  check("password")
    .trim()
    .notEmpty()
    .withMessage("password is missing")
    .isLength({ min: 5 })
    .withMessage("name must have at least 5 characters")
    .isLength({ max: 31 })
    .withMessage("name can have maximum 31 character "),
];

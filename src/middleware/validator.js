const { check } = require("express-validator");

exports.validator = (method) => {
  switch (method) {
    case "register": {
      return [
        check("email")
          .notEmpty()
          .withMessage("username tidak boleh kosong")
          .isEmail()
          .withMessage("masukkan email yang valid"),
        check("fullName").notEmpty().withMessage("username tidak boleh kosong"),
        check("role").notEmpty().withMessage("username tidak boleh kosong"),
        check("password")
          .notEmpty()
          .withMessage("password tidak boleh kosong")
          .isLength({ min: 8 })
          .withMessage("minimal 8 karakter"),
      ];
    }
    case "login": {
      return [
        check("email")
          .notEmpty()
          .withMessage("username tidak boleh kosong")
          .isEmail()
          .withMessage("masukkan email yang valid"),
        check("password")
          .notEmpty()
          .withMessage("password tidak boleh kosong")
          .isLength({ min: 8 })
          .withMessage("minimal 8 karakter"),
      ];
    }
    case "update": {
      return [
        check("email")
          .notEmpty()
          .withMessage("username tidak boleh kosong")
          .isEmail()
          .withMessage("masukkan email yang valid"),
        check("fullName").notEmpty().withMessage("username tidak boleh kosong"),
        check("role").notEmpty().withMessage("username tidak boleh kosong"),
        check("new_password")
          .notEmpty()
          .withMessage("password tidak boleh kosong")
          .isLength({ min: 8 })
          .withMessage("minimal 8 karakter"),
        check("old_password")
          .notEmpty()
          .withMessage("password tidak boleh kosong")
          .isLength({ min: 8 })
          .withMessage("minimal 8 karakter"),
        check("retype_password")
          .notEmpty()
          .withMessage("password tidak boleh kosong")
          .isLength({ min: 8 })
          .withMessage("minimal 8 karakter"),
      ];
    }
  }
};

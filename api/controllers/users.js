const mongoose = require("mongoose");

const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')

module.exports = {
  login: (req, res) => {
    console.log("login");
    console.log(req.body);

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: email })
      .then((user) => {
        if (!user) {

            /////send!!! נגמר שירות
          res.send("משתמש לא קיים");
          return res.redirect("/login");
        }

        // Load hash from your password DB.
        console.log(password);
        console.log(user.password);

        bcrypt.compare(password, user.password, (err, isMatch) => {
          console.log(isMatch);
          if (err) {
            throw err;
          }

          if (isMatch) {
            
            const token = jwt.sign({ id: user._id,email: user.email }, process.env.token, {
              expiresIn: "1H",
            });

            return res.status(200).json({
              massege: "auth gooddddd",
               token
            });
          } else {
            res.send("משתמש קיים ולא תואם, צריך למצוא ססמא");
            return;
          }
        });
      })
      .catch((err) => console.log(err));

    res.status(200);
  },

  

  register: (req, res) => {
    const { username, email, password } = req.body;

    User.findOne({ email: email }).then((user) => {
      if (user) {
        console.log("thereis");
      } else {
        const newUser = new User({
          username,
          email,
          password,
        });
        console.log(newUser);
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) {
              throw err;
            }

            newUser.password = hash;
            console.log(newUser);

            newUser
              .save()
              .then((user) => console.log("נוסף בהצלחה"))
              .catch((err) => console.log(err));
          })
        );
      }
    });

    console.log("register");
    res.status(200);
  },

  logout: (req, res) => {
    console.log("logout");
    res.status(200);
  },

};

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const passport = require('passport');

class UserController {
    /* @route '/user/' */
    index = (req, res) => {
        // Send User
        res.send({user: req.user});
    }

    /* @route '/user/register' */
    register = (req, res) => {
        // Data
        const data = req.body;

        // Validate the Registration
        let errs = this.validate(data);

        if ( errs > 0 ) {
            // Send Errors
            res.json({status: 'error', error: errs});
        }
        else {
            // Add the User if it doesn't exist yet if it does send an error
            User.findOne({ email: data.email })
                .then(user => {
                    if (user) {
                        errs.push('Email already exists');
                    }

                    // Return for then
                    return User.findOne({ username: data.username });
                })
                .then(user => {
                    if (user) {
                        errs.push('Username already exists');
                    }

                    if ( errs.length > 0 ) {
                        res.json({status: 'error', error: errs});
                    }
                    else {
                        // Add New User
                        const user = new User({
                            username: data.username,
                            email: data.email,
                            password: data.password
                        });

                        // Hash the Password
                        bcrypt.genSalt(10, (err, salt) => {
                            bcrypt.hash(user.password, salt, (err, hash) => {
                                if (err) throw err;

                                // Set User Password to Hash
                                user.password = hash;

                                // Save User
                                user.save()
                                    .then(() => res.json({status: 'success'}))
                            })
                        })
                    }
                })
        }
    }

    /* @route '/user/login' */
    login = (req, res, next) => {
        // Authenticate
        passport.authenticate('local', (err, user, message) => {
            if (err) throw err;
            // If user is not found then send error instead
            if (!user) res.json({status: 'error', error: ['Username or password is invalid']});
            else {
                // Login the User
                req.login(user, err => {
                    if (err) throw err;
                    else res.json({status: 'success', user: req.user});
                });
            }
        })(req, res, next);
    }

    /* @route '/user/logout' */
    logout = (req, res) => {
        req.logout();
        res.json({status: 'success'})
    }

    /* @route '/user/live' */
    live = (req, res) => {
        // Send a Random Number
        res.json({
            views : 35 - Math.floor(Math.random() * Math.floor(10))
        });
    }

    /* @route '/user/data' */
    data = (req, res) => {
        res.json({
            page_visits: {
                daily: [10, 31, 23, 50, 63, 94, 45],
                monthly: [391, 912, 1025, 310, 940, 960, 200]
            },
            sales: {
                daily: [2, 3, 1, 5, 6, 2, 4],
                monthly: [56, 65, 72, 11, 15, 24, 50]
            }
        })
    }

    validate = (data) => {
        let errs = [];

        if ( data.email === '' || ! data.email ) {
            errs.push('Email is required');
        }

        if ( data.username === '' || ! data.username ) {
            errs.push('Username is required');
        }

        if ( data.password === '' || ! data.password ) {
            errs.push('Password is required');
        }

        if ( data.confirmPassword === '' || ! data.confirmPassword || data.confirmPassword !== data.password ) {
            errs.push('Passwords do not match');
        }

        if ( data.password.length < 6 ) {
            errs.push('Password should be atleast 6 characters');
        }

        return errs;
    }
}

module.exports = UserController;
const db = require('../config/db.config');
const { createNewUser: createNewUserQuery, findUserByEmail: findUserByEmailQuery, getAllUsers } = require('../database/queries');
const { logger } = require('../utils/logger');

class User {
    constructor(firstname, lastname, email, password, role, phone, address) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.role = role;
        this.phone = phone;
        this.address = address;
    }

    static create(newUser, cb) {
        db.query(createNewUserQuery, 
            [
                newUser.firstname, 
                newUser.lastname, 
                newUser.email, 
                newUser.password,
                newUser.role,
                newUser.phone,
                newUser.address,
            ], (err, res) => {
                if (err) {
                    logger.error(err.message);
                    cb(err, null);
                    return;
                }
                cb(null, {
                    id: res.insertId,
                    firstname: newUser.firstname,
                    lastname: newUser.lastname,
                    email: newUser.email,
                    role: newUser.role,
                    phone: newUser.phone,
                    address: newUser.address,
                });
        });
    }

    static findByEmail(email, cb) {
        db.query(findUserByEmailQuery, email, (err, res) => {
            if (err) {
                logger.error(err.message);
                cb(err, null);
                return;
            }
            if (res.length) {
                cb(null, res[0]);
                return;
            }
            cb({ kind: "not_found" }, null);
        })
    }

    static getAllUsers(cb) {
        db.query(getAllUsers, (err, res) => {
            if (err) {
                logger.error(err.message);
                cb(err, null);
                return;
            }
            if (res.length) {
                cb(null, res);
                return;
            }
            cb({ kind: "not_found" }, null);
        })
    }
}

module.exports = User;
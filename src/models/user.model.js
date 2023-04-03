const db = require('../config/db.config');
const { createNewUser: createNewUserQuery, findUserByEmail: findUserByEmailQuery, getAllUsers } = require('../database/queries');
const { logger } = require('../utils/logger');

class User {
    constructor(firstname, lastname, role, phone, address, zipCode, email) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.role = role;
        this.phone = phone;
        this.address = address;
        this.zipCode = zipCode;
        this.email = email;
    }

    static create(newUser, cb) {
        db.query(createNewUserQuery, 
            [
                newUser.firstname, 
                newUser.lastname, 
                newUser.role,
                newUser.phone,
                newUser.address,
                newUser.zipCode,
                newUser.email,
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
                    role: newUser.role,
                    phone: newUser.phone,
                    address: newUser.address,
                    zipCode: newUser.zipCode,
                    email: newUser.email,
                });
        });
    }

    static findByEmail(phoneNumber, role, cb) {
        console.log('callback', cb); 
        db.query(findUserByEmailQuery, [phoneNumber,role], (err, res) => {
            console.log('error', err);
            if (err) {
                console.log('Error');
                logger.error(err.message);
                cb(err, null);
                return;
            }
            if (res.length) {
                console.log('Error');
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
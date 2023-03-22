const { DB_NAME } = require('../utils/secrets')

const createDB = `CREATE DATABASE IF NOT EXISTS ${DB_NAME}`;

const dropDB = `DROP DATABASE IF EXISTS ${DB_NAME}`;

const createTableUSers = `
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    firstname VARCHAR(50) NULL,
    lastname VARCHAR(50) NULL,
    role VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NULL,
    zipCode VARCHAR(255) NULL,
    address VARCHAR(255) NULL,
    created_on TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
)
`;

const createTableProducts = `
CREATE TABLE IF NOT EXISTS products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    productTitle VARCHAR(50) NULL,
    productDescription VARCHAR(255) NULL,
    productImage VARCHAR(255) NOT NULL,
    size VARCHAR(255) NOT NULL,
    color VARCHAR(255) NOT NULL,
    quantity VARCHAR(255) NULL,
    created_on TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
)
`;

const createNewUser = `
INSERT INTO users (id, firstname, lastname, role, phone, address, zipCode, created_on) VALUES(null, ?, ?, ?, ?, ?, ?, NOW())
`;

const createNewProduct = `
INSERT INTO products (id, productTitle, productImage, productDescription, color, size, quantity, created_on) VALUES(null, ?, ?, ?, ?, ?, ?, NOW())
`;

const findUserByEmail = `
SELECT * FROM users WHERE phone = ? AND role = ?
`;

const getAllUsers = `
SELECT * FROM users
`;

const getAllProducts = `
SELECT * FROM products
`;

module.exports = {
    createDB,
    dropDB,
    createTableUSers,
    createNewUser,
    findUserByEmail, 
    getAllUsers, 
    createTableProducts, 
    createNewProduct, 
    getAllProducts
};

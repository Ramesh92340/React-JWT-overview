const { Pool } = require('pg');
const config = require('../config/config');

const pool = new Pool(config);

const createUser = async (id,username, password, email) => {
    const query = `
        INSERT INTO overview (id, username, password, email)
        VALUES ($1, $2, $3,$4)
        RETURNING *;
    `;

    try {
        const { rows } = await pool.query(query, [id, username, password, email]);
        return rows[0];
    } catch (error) {
        throw error;
    }
};

const findUserByUsername = async (username) => {
    const query = 'SELECT * FROM users WHERE username = $1';

    try {
        const { rows } = await pool.query(query, [username]);
        return rows[0];
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createUser,
    findUserByUsername,
};

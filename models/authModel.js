const mysql = require('mysql2/promise.js')
const config = require('../configs/config.js')
const jwt = require('jsonwebtoken')
const path = require('path')
require('dotenv').config({
  path: path.resolve(__dirname, '..', 'configs', '.env'),
})

async function insertUser(firstName, lastName, username, email, password) {
  try {
    const conn = await mysql.createConnection(config)
    await conn.execute(
      `
            INSERT INTO users (name, surname, username, email, password)
            VALUES (?, ?, ?, ?, ?)
        `,
      [firstName, lastName, username, email, password]
    )
    await conn.end()
    return true
  } catch (error) {
    console.error('Error inserting user:', error)
    return false
  }
}
async function loginUser(username, password) {
  try {
    const conn = await mysql.createConnection(config)
    const [rows] = await conn.execute(
      'SELECT * FROM users WHERE username = ? AND password = ?',
      [username, password]
    )
    await conn.end()

    if (rows.length === 1) {
      const accessToken = jwt.sign(
        { username, password },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1h' }
      )
      return accessToken
    } else {
      return null
    }
  } catch (error) {
    console.error('Error logging in:', error)
    return null
  }
}
async function validateAccessToken(accessToken) {
  try {
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
    return decoded
  } catch (error) {
    console.error('Error validating access token:', error)
    return null
  }
}

async function changePass(newPass, username) {
  try {
    const conn = await mysql.createConnection(config)
    const [result] = await conn.execute(
      'UPDATE users SET password = ? WHERE username = ?',
      [newPass, username]
    )

    await conn.end()
    return result
  } catch (error) {
    console.error(error)
    throw error
  }
}

module.exports = {
  insertUser,
  loginUser,
  validateAccessToken,
  changePass,
}

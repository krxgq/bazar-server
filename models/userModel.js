const mysql = require("mysql2/promise.js");
const config = require("../configs/config.js");

// userModel.js
async function findByUsername(username) {
  try {
    const conn = await mysql.createConnection(config);
    const [rows] = await conn.execute(
      `SELECT * FROM users WHERE username = ?`,
      [username]
    );
    await conn.end();
    if (rows.length === 0) {
      return [];
    }
    return rows[0];
  } catch (error) {
    console.error("Error finding user by username:", error);
    return [];
  }
}

async function addFav(userID, productID) {
  try {
    const conn = await mysql.createConnection(config);
    const [rows] = await conn.execute(
      `INSERT INTO favorites (UserID, ItemID) VALUES (?, ?)`,
      [userID, productID]
    );
    await conn.end();
    return rows;
  } catch (error) {
    console.error("Error adding favorite:", error);
    return null;
  }
}
async function removeFav(userID, productID) {
  try {
    const conn = await mysql.createConnection(config);
    const [rows] = await conn.execute(
      `DELETE FROM favorites WHERE UserID = ? AND ItemID = ?`,
      [userID, productID]
    );
    await conn.end();
    return rows;
  } catch (error) {
    console.error("Error removing favorite:", error);
    return null;
  }
}
async function getAllFavorites(userID) {
  try {
    const conn = await mysql.createConnection(config);
    const [rows] = await conn.execute(
      `SELECT * FROM favorites WHERE userID = ?`,
      [userID]
    );
    await conn.end();
    return [rows];
  } catch (error) {
    console.error("Error getting all favorites:", error);
    return [];
  }
}
async function updateUser(id, ...profileData) {
  const conn = await mysql.createConnection(config);
  const [rows] = await conn.execute(
    `UPDATE users SET ? WHERE id = ?`,
    [profileData, id]
  );
}

module.exports = {
  findByUsername,
  addFav,
  removeFav,
  getAllFavorites,
  updateUser,
};

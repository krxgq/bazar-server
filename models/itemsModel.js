const mysql = require("mysql2/promise.js");
const config = require("../configs/config.js");
const { Storage } = require("@google-cloud/storage");

async function insertItem(
  title,
  price,
  description,
  userId,
  location,
  category,
  img // img is now a regular parameter
) {
  try {
    const conn = await mysql.createConnection(config);

    // Determine which query and parameters to use based on whether img is provided
    if (img) {
      await conn.execute(
        `
          INSERT INTO items (title, price, description, userID, location, category, img)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `,
        [title, price, description, userId, location, category, img]
      );
    } else {
      await conn.execute(
        `
          INSERT INTO items (title, price, description, userID, location, category)
          VALUES (?, ?, ?, ?, ?, ?)
        `,
        [title, price, description, userId, location, category]
      );
    }

    await conn.end();
    return true;
  } catch (error) {
    console.error("Error inserting announce:", error);
    return false;
  }
}

async function getItem(id) {
  try {
    const conn = await mysql.createConnection(config);
    const [rows] = await conn.execute(
      `
                SELECT * FROM items WHERE id = ?
            `,
      [id]
    );
    await conn.end();
    return rows[0];
  } catch (error) {
    console.error("Error getting announce:", error);
    return null;
  }
}
async function getAllItems() {
  try {
    const conn = await mysql.createConnection(config);
    const rows = await conn.execute("SELECT id, title, price, img FROM items;");
    await conn.end();
    return rows[0];
  } catch (error) {
    console.error("Error getting all announces:", error);
    return null;
  }
}
async function deleteItem(id) {
  try {
    const conn = await mysql.createConnection(config);
    const rows = await conn.execute(`DELETE FROM items WHERE id = ?;`, [id]);
    await conn.end();
    return rows[0];
  } catch (e) {
    console.error("Error deleting announce:", e);
    return null;
  }
}
module.exports = { insertItem, getItem, getAllItems, deleteItem };

const db = require('../config/db');

const User = {
  async findByEmail(email) {
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    return rows;
  },

  async findByPhone(phone) {
    const [rows] = await db.query("SELECT * FROM users WHERE phone = ?", [phone]);
    return rows;
  },

  async findById(userId) {
    const [rows] = await db.query("SELECT id, role, email, phone FROM users WHERE id = ?", [userId]);
    return rows;
  },

  async findAll() {
    const [rows] = await db.query("SELECT id, role, email, phone FROM users");
    return rows;
  },

  async create(user) {
    const [result] = await db.query("INSERT INTO users SET ?", user);
    return result;
  },

  async deleteById(userId) {
    const [result] = await db.query("DELETE FROM users WHERE id = ?", [userId]);
    return result;
  }
};

module.exports = User;

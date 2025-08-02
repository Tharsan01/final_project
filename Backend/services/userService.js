const bcrypt = require('bcrypt');
const User = require('../models/userModel');

const UserService = {
  async register({ role, email, phone, password, adminCode }) {
    const [existingUserEmail] = await User.findByEmail(email);
    if (existingUserEmail) throw new Error('Email already exists');

    const [existingUserPhone] = await User.findByPhone(phone);
    if (existingUserPhone) throw new Error('Phone number already exists');
    
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      role,
      email,
      phone,
      password: hashedPassword,
      admin_code: role === 'admin' ? adminCode : null,
    };

    return User.create(newUser);
  },

  async login({ identifier, password }) {
    let user;

    // Check if identifier is email or phone
    if (identifier.includes('@')) {
      [user] = await User.findByEmail(identifier.trim());
    } else {
      [user] = await User.findByPhone(identifier.trim());
    }

    if (!user) throw new Error('Invalid email/phone or password');

    const isPasswordValid = await bcrypt.compare(password.trim(), user.password);
    if (!isPasswordValid) throw new Error('Invalid email/phone or password');

    return user;
  },

  async getUsers(userId) {
    if (userId) {
      return User.findById(userId);
    }
    return User.findAll();
  },

  async deleteUser(userId) {
    const result = await User.deleteById(userId);
    if (result.affectedRows === 0) throw new Error('User not found');
    return result;
  }
};

module.exports = UserService;

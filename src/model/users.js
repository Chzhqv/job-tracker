const bcrypt = require('bcrypt');

// Dev/test-only accounts. Password for both: "password123"
const users = [
  { username: 'alice', passwordHash: bcrypt.hashSync('password123', 10) },
  { username: 'bob', passwordHash: bcrypt.hashSync('password123', 10) },
];

function findUser(username) {
  return users.find((u) => u.username === username);
}

module.exports = { findUser };
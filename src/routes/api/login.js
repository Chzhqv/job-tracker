const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { findUser } = require('../../model/users');

module.exports = (req, res) => {
  const { username, password } = req.body;
  const user = findUser(username);

  if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
    return res.status(401).json({
      status: 'error',
      error: { message: 'invalid username or password', code: 401 },
    });
  }

  const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  res.status(200).json({ status: 'ok', token });
};
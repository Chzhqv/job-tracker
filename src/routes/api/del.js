const { deleteApplication } = require('../../model/applications');

module.exports = (req, res) => {
  deleteApplication(req.params.id, req.user.username);
  res.status(200).json({ status: 'ok' });
};


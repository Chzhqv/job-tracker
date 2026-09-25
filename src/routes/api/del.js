const { deleteApplication } = require('../../model/applications');

module.exports = (req, res) => {
  deleteApplication(req.params.id);
  res.status(200).json({ status: 'ok' });
};


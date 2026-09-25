const { readApplication } = require('../../model/applications');

module.exports = (req, res) => {
  const application = readApplication(req.params.id, req.user.username);

  if (!application) {
    return res.status(404).json({
      status: 'error',
      error: { message: 'application not found', code: 404 },
    });
  }

  res.status(200).json({ status: 'ok', application });
};